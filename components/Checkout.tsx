import React, { useState, useEffect } from 'react';
import { ArrowLeft, Loader2, Check, CreditCard, ShieldCheck, ArrowRight, Grid } from 'lucide-react';
import { CartItem } from '../types';
import { CURRENCY, LOCATIONS } from '../constants';

interface CheckoutProps {
  cart: CartItem[];
  onClose: () => void;
}

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postal: string;
  country: string;
}

interface BillingInfo {
  sameAsShipping: boolean;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postal: string;
  country: string;
}

interface PaymentInfo {
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}

type CheckoutStep = 'shipping' | 'billing' | 'review' | 'payment';

const Checkout: React.FC<CheckoutProps> = ({ cart, onClose }) => {
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [shipping, setShipping] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postal: '',
    country: 'Nigeria', // Default to Nigeria
  });

  const [billing, setBilling] = useState<BillingInfo>({
    sameAsShipping: true,
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postal: '',
    country: 'Nigeria',
  });

  const [payment, setPayment] = useState<PaymentInfo>({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });

  // Validation helpers
  const validateShipping = (): boolean => {
    if (!shipping.firstName.trim() || !shipping.lastName.trim()) {
      setError('First and last name are required');
      return false;
    }
    if (!shipping.email.includes('@')) {
      setError('Valid email is required');
      return false;
    }
    if (!shipping.phone.trim()) {
      setError('Phone number is required');
      return false;
    }
    if (!shipping.address.trim()) {
      setError('Address is required');
      return false;
    }
    if (!shipping.country || !shipping.state || !shipping.city) {
      setError('Country, state, and city are required');
      return false;
    }
    setError(null);
    return true;
  };

  const validateBilling = (): boolean => {
    if (billing.sameAsShipping) {
      setError(null);
      return true;
    }
    if (!billing.firstName.trim() || !billing.lastName.trim()) {
      setError('Billing first and last name are required');
      return false;
    }
    if (!billing.address.trim() || !billing.city.trim()) {
      setError('Billing address information is required');
      return false;
    }
    setError(null);
    return true;
  };

  const validatePayment = (): boolean => {
    if (!payment.cardName.trim()) {
      setError('Cardholder name is required');
      return false;
    }
    const cardNum = payment.cardNumber.replace(/\s/g, '');
    if (cardNum.length !== 16 || !/^\d+$/.test(cardNum)) {
      setError('Valid 16-digit card number required');
      return false;
    }
    if (!payment.expiryMonth || !payment.expiryYear) {
      setError('Expiry month and year are required');
      return false;
    }
    if (!/^\d{3}$/.test(payment.cvv)) {
      setError('Valid 3-digit CVV required');
      return false;
    }
    setError(null);
    return true;
  };

  // Location helpers
  const selectedCountry = LOCATIONS.find(c => c.country === shipping.country);
  const availableStates = selectedCountry ? selectedCountry.states : [];
  const selectedState = availableStates.find(s => s.name === shipping.state);
  const availableCities = selectedState ? selectedState.cities : [];

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCost = 5000; // ₦5,000 flat rate
  const tax = Math.round(subtotal * 0.075); // 7.5% tax
  const total = subtotal + shippingCost + tax;

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShipping(prev => {
      const newState = { ...prev, [name]: value };
      // Clear dependent fields
      if (name === 'country') {
        newState.state = '';
        newState.city = '';
      } else if (name === 'state') {
        newState.city = '';
      }
      return newState;
    });
  };

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'sameAsShipping') {
      setBilling(prev => ({ ...prev, sameAsShipping: (e.target as HTMLInputElement).checked }));
    } else {
      setBilling(prev => {
        const newState = { ...prev, [name]: value };
        if (name === 'country') {
          newState.state = '';
          newState.city = '';
        } else if (name === 'state') {
          newState.city = '';
        }
        return newState;
      });
    }
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let { name, value } = e.target;

    if (name === 'cardNumber') {
      value = value.replace(/\s/g, '').slice(0, 16);
      value = value.replace(/(\d{4})/g, '$1 ').trim();
    }

    if (name === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 3);
    }

    setPayment(prev => ({ ...prev, [name]: value }));
  };

  // Synchronize expiryDate when month/year changes
  useEffect(() => {
    if (payment.expiryMonth && payment.expiryYear) {
      setPayment(prev => ({ ...prev, expiryDate: `${payment.expiryMonth}/${payment.expiryYear.slice(-2)}` }));
    }
  }, [payment.expiryMonth, payment.expiryYear]);

  const handleNextStep = async () => {
    if (step === 'shipping') {
      if (validateShipping()) {
        setStep('billing');
      }
    } else if (step === 'billing') {
      if (validateBilling()) {
        setStep('review');
      }
    } else if (step === 'review') {
      setStep('payment');
    }
  };

  const handleSubmitOrder = async () => {
    if (!validatePayment()) return;

    setIsLoading(true);
    setError(null);

    try {
      // This is where backend integration happens
      // In a real app, you would:
      // 1. Send payment token from payment gateway (e.g., Stripe)
      // 2. NOT send raw card data

      const orderData = {
        shippingInfo: shipping,
        billingInfo: billing.sameAsShipping ? shipping : billing,
        items: cart.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
        })),
        subtotal,
        shipping: shippingCost,
        tax,
        total,
        // In production, paymentToken would come from Stripe/PayPal
        paymentToken: 'tok_placeholder', // Replace with real token from payment gateway
      };

      // TODO: Replace this with actual backend API call
      console.log('Sending order to backend:', orderData);
      // const response = await fetch('/api/orders', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(orderData),
      // });
      // const result = await response.json();

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Success! Show confirmation
      setStep('shipping'); // Reset
      alert(`Order placed successfully!\n\nOrder ID: ORD-${Date.now()}\nTotal: ${CURRENCY}${total.toLocaleString()}\n\nThank you for your purchase!`);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white dark:bg-black">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-black border-b border-black/5 dark:border-white/5">
        <div className="max-w-2xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="group flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-black dark:text-white hover:text-blue-500 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Cart
            </button>
          </div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-black/40 dark:text-white/40">
            Step {step === 'shipping' ? '1' : step === 'billing' ? '2' : step === 'review' ? '3' : '4'} of 4
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Shipping Step */}
        {step === 'shipping' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-10">
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Delivery Details</h2>
              <p className="text-xs uppercase tracking-widest font-bold text-black/40 dark:text-white/40">Enter your shipping information</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black tracking-widest text-black/40 dark:text-white/40">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="e.g. Ebuka"
                    value={shipping.firstName}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black tracking-widest text-black/40 dark:text-white/40">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="e.g. Okafor"
                    value={shipping.lastName}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black tracking-widest text-black/40 dark:text-white/40">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="okafor@example.com"
                    value={shipping.email}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black tracking-widest text-black/40 dark:text-white/40">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+234 800 000 0000"
                    value={shipping.phone}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-black tracking-widest text-black/40 dark:text-white/40">Street Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Street, house/apartment number"
                  value={shipping.address}
                  onChange={handleShippingChange}
                  className="w-full px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black tracking-widest text-black/40 dark:text-white/40">Country</label>
                  <select
                    name="country"
                    value={shipping.country}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Select Country</option>
                    {LOCATIONS.map(c => <option key={c.country} value={c.country}>{c.country}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black tracking-widest text-black/40 dark:text-white/40">State / Region</label>
                  <select
                    name="state"
                    value={shipping.state}
                    onChange={handleShippingChange}
                    disabled={!shipping.country}
                    className="w-full px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm transition-colors appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select State</option>
                    {availableStates.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black tracking-widest text-black/40 dark:text-white/40">City</label>
                  <select
                    name="city"
                    value={shipping.city}
                    onChange={handleShippingChange}
                    disabled={!shipping.state}
                    className="w-full px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm transition-colors appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select City</option>
                    {availableCities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {error && (
                <div className="px-4 py-3 bg-red-500/10 border border-red-500 text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-widest">
                  {error}
                </div>
              )}

              <button
                onClick={handleNextStep}
                className="group w-full bg-blue-500 text-white py-6 font-black uppercase tracking-[0.3em] text-[10px] hover:bg-blue-600 transition-all flex items-center justify-center gap-3 mt-8 shadow-xl hover:shadow-blue-500/20"
              >
                Continue to Billing <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* Billing Step */}
        {step === 'billing' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-10">
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Billing Information</h2>
              <p className="text-xs uppercase tracking-widest font-bold text-black/40 dark:text-white/40">Secure your payment method</p>
            </div>

            <div className="space-y-6">
              <label className="flex items-center gap-4 cursor-pointer p-6 border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 transition-colors">
                <input
                  type="checkbox"
                  name="sameAsShipping"
                  checked={billing.sameAsShipping}
                  onChange={handleBillingChange}
                  className="w-5 h-5 border border-blue-500 text-blue-500 focus:ring-0 cursor-pointer"
                />
                <span className="text-sm font-black uppercase tracking-widest">Same as shipping address</span>
              </label>

              {!billing.sameAsShipping && (
                <div className="space-y-6 pt-4 animate-in fade-in duration-300">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={billing.firstName}
                      onChange={handleBillingChange}
                      className="px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm transition-colors"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={billing.lastName}
                      onChange={handleBillingChange}
                      className="px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm transition-colors"
                    />
                  </div>

                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={billing.address}
                    onChange={handleBillingChange}
                    className="w-full px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm transition-colors"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <select
                      name="country"
                      value={billing.country}
                      onChange={handleBillingChange}
                      className="w-full px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Country</option>
                      {LOCATIONS.map(c => <option key={c.country} value={c.country}>{c.country}</option>)}
                    </select>
                    <select
                      name="state"
                      value={billing.state}
                      onChange={handleBillingChange}
                      disabled={!billing.country}
                      className="w-full px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm transition-colors appearance-none cursor-pointer disabled:opacity-50"
                    >
                      <option value="">State</option>
                      {LOCATIONS.find(c => c.country === billing.country)?.states.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                    </select>
                    <select
                      name="city"
                      value={billing.city}
                      onChange={handleBillingChange}
                      disabled={!billing.state}
                      className="w-full px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm transition-colors appearance-none cursor-pointer disabled:opacity-50"
                    >
                      <option value="">City</option>
                      {LOCATIONS.find(c => c.country === billing.country)?.states.find(s => s.name === billing.state)?.cities.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {error && (
                <div className="px-4 py-3 bg-red-500/10 border border-red-500 text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-widest">
                  {error}
                </div>
              )}

              <div className="flex gap-4 pt-6">
                <button
                  onClick={() => setStep('shipping')}
                  className="flex-1 bg-black/5 dark:bg-white/5 text-black dark:text-white py-5 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-black/10 transition-colors border border-black/10 dark:border-white/10"
                >
                  Back
                </button>
                <button
                  onClick={handleNextStep}
                  className="flex-1 bg-black dark:bg-white text-white dark:text-black py-5 font-black uppercase tracking-[0.3em] text-[10px] hover:bg-blue-500 hover:text-white transition-all shadow-xl"
                >
                  Review Order
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Review Step */}
        {step === 'review' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-10 flex justify-between items-end">
              <div>
                <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Order Review</h2>
                <p className="text-xs uppercase tracking-widest font-bold text-black/40 dark:text-white/40">Confirm your selection & details</p>
              </div>
              <div className="hidden md:flex items-center gap-2 bg-blue-500/10 px-4 py-2 border border-blue-500/20">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Secure Checkout</span>
              </div>
            </div>

            <div className="space-y-10">
              {/* Order Items List */}
              <div className="bg-black/5 dark:bg-white/5 p-8 rounded-2xl border border-black/5 dark:border-white/5">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-blue-500 mb-6 flex items-center gap-3">
                  <Grid className="w-4 h-4" /> Your Selection
                </h3>
                <div className="divide-y divide-black/5 dark:divide-white/5">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex justify-between items-center py-6 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-16 bg-black/10 dark:bg-white/10 overflow-hidden">
                          <img src={item.product.image} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div>
                          <p className="font-black text-sm uppercase tracking-tighter">{item.product.name}</p>
                          <p className="text-[10px] uppercase font-black tracking-widest text-black/40 dark:text-white/40 mt-1">QTY: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-black text-sm">{CURRENCY}{(item.product.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Information Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-black/20 p-6 border border-black/10 dark:border-white/10">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mb-4 flex justify-between">
                    Shipping Details <button onClick={() => setStep('shipping')} className="text-blue-500 hover:underline">Edit</button>
                  </h3>
                  <div className="text-sm space-y-1 font-bold uppercase tracking-tight">
                    <p className="text-blue-500">{shipping.firstName} {shipping.lastName}</p>
                    <p className="text-[12px]">{shipping.address}</p>
                    <p className="text-[12px]">{shipping.city}, {shipping.state}</p>
                    <p className="text-[10px] text-black/40 dark:text-white/40 pt-2">{shipping.email}</p>
                    <p className="text-[10px] text-black/40 dark:text-white/40">{shipping.phone}</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-black/20 p-6 border border-black/10 dark:border-white/10">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mb-4 flex justify-between">
                    Payment Method <button onClick={() => setStep('billing')} className="text-blue-500 hover:underline">Edit</button>
                  </h3>
                  <div className="text-sm space-y-1 font-bold uppercase tracking-tight">
                    {billing.sameAsShipping ? (
                      <p className="text-[12px] italic opacity-50">Same as shipping details</p>
                    ) : (
                      <>
                        <p className="text-blue-500">{billing.firstName} {billing.lastName}</p>
                        <p className="text-[12px]">{billing.address}</p>
                        <p className="text-[12px]">{billing.city}, {billing.state}</p>
                      </>
                    )}
                    <div className="pt-4 flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-black/20" />
                      <span className="text-[10px] uppercase tracking-widest opacity-30 italic">Pay via Card / NFC</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Final Totals */}
              <div className="bg-blue-500 text-white p-8 rounded-3xl shadow-2xl shadow-blue-500/20">
                <div className="space-y-3 mb-8 opacity-80">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span>{CURRENCY}{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span>Shipping</span>
                    <span>{CURRENCY}{shippingCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span>Vat Tax (7.5%)</span>
                    <span>{CURRENCY}{tax.toLocaleString()}</span>
                  </div>
                </div>
                <div className="border-t border-white/20 pt-6 flex justify-between items-center">
                  <span className="text-xs font-black uppercase tracking-[0.3em]">Total Value</span>
                  <span className="text-5xl font-black tracking-tighter">{CURRENCY}{total.toLocaleString()}</span>
                </div>
              </div>

              {error && (
                <div className="px-4 py-3 bg-red-500/10 border border-red-500 text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-widest">
                  {error}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => setStep('billing')}
                  className="flex-1 bg-black/5 dark:bg-white/5 text-black dark:text-white py-5 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-black/10 transition-colors border border-black/10 dark:border-white/10"
                >
                  Back
                </button>
                <button
                  onClick={handleNextStep}
                  className="flex-1 bg-black dark:bg-white text-white dark:text-black py-5 font-black uppercase tracking-[0.3em] text-[10px] hover:bg-blue-500 hover:text-white transition-all shadow-xl"
                >
                  Pay secure
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Payment Step */}
        {step === 'payment' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-10">
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Payment</h2>
              <p className="text-xs uppercase tracking-widest font-bold text-black/40 dark:text-white/40">Secure & encrypted transaction</p>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-blue-500/5 border border-blue-500/10 flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-500">Demo Environment</p>
                  <p className="text-sm font-bold mt-1">Use test card: <span className="bg-blue-500/10 px-2 py-0.5 rounded">4111 1111 1111 1111</span></p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-black tracking-widest text-black/40 dark:text-white/40">Cardholder Name</label>
                <input
                  type="text"
                  name="cardName"
                  placeholder="NAME AS ON CARD"
                  value={payment.cardName}
                  onChange={handlePaymentChange}
                  className="w-full px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm font-bold uppercase tracking-widest"
                />
              </div>

              <div className="space-y-1.5 relative">
                <label className="text-[10px] uppercase font-black tracking-widest text-black/40 dark:text-white/40">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="0000 0000 0000 0000"
                    value={payment.cardNumber}
                    onChange={handlePaymentChange}
                    maxLength={19}
                    className="w-full px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm tracking-[0.2em] font-black"
                  />
                  <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/20" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black tracking-widest text-black/40 dark:text-white/40">Expiration Date</label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      name="expiryMonth"
                      value={payment.expiryMonth}
                      onChange={handlePaymentChange}
                      className="px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm font-bold appearance-none cursor-pointer"
                    >
                      <option value="">MM</option>
                      {Array.from({ length: 12 }, (_, i) => {
                        const m = (i + 1).toString().padStart(2, '0');
                        return <option key={m} value={m}>{m}</option>;
                      })}
                    </select>
                    <select
                      name="expiryYear"
                      value={payment.expiryYear}
                      onChange={handlePaymentChange}
                      className="px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm font-bold appearance-none cursor-pointer"
                    >
                      <option value="">YYYY</option>
                      {Array.from({ length: 11 }, (_, i) => {
                        const y = (new Date().getFullYear() + i).toString();
                        return <option key={y} value={y}>{y}</option>;
                      })}
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black tracking-widest text-black/40 dark:text-white/40">CVV / CVC</label>
                  <input
                    type="text"
                    name="cvv"
                    placeholder="000"
                    value={payment.cvv}
                    onChange={handlePaymentChange}
                    maxLength={3}
                    className="w-full px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm tracking-widest font-black"
                  />
                </div>
              </div>

              <div className="bg-black/5 dark:bg-white/5 p-8 border border-black/5 dark:border-white/5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase tracking-widest text-black/40 dark:text-white/40">Arrival Estim.</span>
                  <span className="text-xs font-black uppercase text-blue-500">3 - 5 BUSINESS DAYS</span>
                </div>
                <div className="flex justify-between items-center border-t border-black/5 dark:border-white/5 pt-4">
                  <span className="text-xs font-black uppercase tracking-widest text-black/40 dark:text-white/40">Total to Pay</span>
                  <span className="text-2xl font-black">{CURRENCY}{total.toLocaleString()}</span>
                </div>
              </div>

              {error && (
                <div className="px-4 py-3 bg-red-500/10 border border-red-500 text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-widest">
                  {error}
                </div>
              )}

              <div className="flex gap-4 pt-6">
                <button
                  onClick={() => setStep('review')}
                  disabled={isLoading}
                  className="flex-1 bg-black/5 dark:bg-white/5 text-black dark:text-white py-5 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-black/10 transition-colors border border-black/10 dark:border-white/10 disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmitOrder}
                  disabled={isLoading}
                  className="flex-1 bg-green-500 text-white py-5 font-black uppercase tracking-[0.3em] text-[10px] hover:bg-green-600 transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl hover:shadow-green-500/20"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      SECURELY PROCESSING...
                    </>
                  ) : (
                    <>
                      COMPLETE PURCHASE <Check className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
              <p className="text-center text-[9px] uppercase font-black tracking-widest text-black/20 dark:text-white/20 mt-4">
                Payments are processed via encrypted SSL gateway. CC data is never stored on our servers.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
