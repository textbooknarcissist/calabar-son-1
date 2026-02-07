import React, { useState } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { CartItem } from '../types';
import { CURRENCY } from '../constants';

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
    country: '',
  });

  const [billing, setBilling] = useState<BillingInfo>({
    sameAsShipping: true,
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postal: '',
    country: '',
  });

  const [payment, setPayment] = useState<PaymentInfo>({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCost = 5000; // ₦5,000 flat rate
  const tax = Math.round(subtotal * 0.075); // 7.5% tax
  const total = subtotal + shippingCost + tax;

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
    if (!shipping.city.trim() || !shipping.state.trim()) {
      setError('City and state are required');
      return false;
    }
    if (!shipping.postal.trim() || !shipping.country.trim()) {
      setError('Postal code and country are required');
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
    if (!/^\d{2}\/\d{2}$/.test(payment.expiryDate)) {
      setError('Expiry date must be MM/YY format');
      return false;
    }
    if (!/^\d{3}$/.test(payment.cvv)) {
      setError('Valid 3-digit CVV required');
      return false;
    }
    setError(null);
    return true;
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShipping(prev => ({ ...prev, [name]: value }));
  };

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'sameAsShipping') {
      setBilling(prev => ({ ...prev, sameAsShipping: (e.target as HTMLInputElement).checked }));
    } else {
      setBilling(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    // Auto-format card number (add spaces every 4 digits)
    if (name === 'cardNumber') {
      value = value.replace(/\s/g, '').slice(0, 16);
      value = value.replace(/(\d{4})/g, '$1 ').trim();
    }

    // Auto-format expiry date (MM/YY)
    if (name === 'expiryDate') {
      value = value.replace(/\D/g, '').slice(0, 4);
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
      }
    }

    // CVV numbers only
    if (name === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 3);
    }

    setPayment(prev => ({ ...prev, [name]: value }));
  };

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
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">Shipping Address</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={shipping.firstName}
                  onChange={handleShippingChange}
                  className="px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/50 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm uppercase tracking-wide"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={shipping.lastName}
                  onChange={handleShippingChange}
                  className="px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/50 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm uppercase tracking-wide"
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={shipping.email}
                onChange={handleShippingChange}
                className="w-full px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/50 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={shipping.phone}
                onChange={handleShippingChange}
                className="w-full px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/50 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm"
              />

              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={shipping.address}
                onChange={handleShippingChange}
                className="w-full px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/50 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={shipping.city}
                  onChange={handleShippingChange}
                  className="px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/50 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State/Province"
                  value={shipping.state}
                  onChange={handleShippingChange}
                  className="px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/50 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="postal"
                  placeholder="Postal Code"
                  value={shipping.postal}
                  onChange={handleShippingChange}
                  className="px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/50 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm"
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={shipping.country}
                  onChange={handleShippingChange}
                  className="px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/50 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>

              {error && (
                <div className="px-4 py-3 bg-red-500/10 border border-red-500 text-red-600 dark:text-red-400 text-sm font-bold uppercase tracking-wide">
                  {error}
                </div>
              )}

              <button
                onClick={handleNextStep}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-5 font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-500 transition-colors"
              >
                Continue to Billing
              </button>
            </div>
          </div>
        )}

        {/* Billing Step */}
        {step === 'billing' && (
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">Billing Address</h2>
            <div className="space-y-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="sameAsShipping"
                  checked={billing.sameAsShipping}
                  onChange={handleBillingChange}
                  className="w-5 h-5 border border-black/20 dark:border-white/20 cursor-pointer"
                />
                <span className="text-sm font-bold uppercase tracking-wide">Same as shipping address</span>
              </label>

              {!billing.sameAsShipping && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={billing.firstName}
                      onChange={handleBillingChange}
                      className="px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/50 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm uppercase tracking-wide"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={billing.lastName}
                      onChange={handleBillingChange}
                      className="px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/50 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm uppercase tracking-wide"
                    />
                  </div>

                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={billing.address}
                    onChange={handleBillingChange}
                    className="w-full px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/50 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={billing.city}
                      onChange={handleBillingChange}
                      className="px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/50 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm"
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State/Province"
                      value={billing.state}
                      onChange={handleBillingChange}
                      className="px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/50 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="postal"
                      placeholder="Postal Code"
                      value={billing.postal}
                      onChange={handleBillingChange}
                      className="px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/50 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm"
                    />
                    <input
                      type="text"
                      name="country"
                      placeholder="Country"
                      value={billing.country}
                      onChange={handleBillingChange}
                      className="px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/50 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm"
                    />
                  </div>
                </>
              )}

              {error && (
                <div className="px-4 py-3 bg-red-500/10 border border-red-500 text-red-600 dark:text-red-400 text-sm font-bold uppercase tracking-wide">
                  {error}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => setStep('shipping')}
                  className="flex-1 bg-black/5 dark:bg-white/5 text-black dark:text-white py-5 font-black uppercase tracking-[0.2em] text-xs hover:bg-black/10 dark:hover:bg-white/10 transition-colors border border-black/10 dark:border-white/10"
                >
                  Back
                </button>
                <button
                  onClick={handleNextStep}
                  className="flex-1 bg-black dark:bg-white text-white dark:text-black py-5 font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-500 transition-colors"
                >
                  Review Order
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Review Step */}
        {step === 'review' && (
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">Order Review</h2>
            <div className="space-y-8">
              {/* Items */}
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mb-4">Order Items</h3>
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex justify-between items-start py-4 border-b border-black/5 dark:border-white/5">
                      <div>
                        <p className="font-bold text-sm">{item.product.name}</p>
                        <p className="text-xs text-black/50 dark:text-white/50 mt-1">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-sm">{CURRENCY}{(item.product.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Addresses */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mb-4">Shipping To</h3>
                  <div className="text-sm space-y-1">
                    <p className="font-bold">{shipping.firstName} {shipping.lastName}</p>
                    <p>{shipping.address}</p>
                    <p>{shipping.city}, {shipping.state} {shipping.postal}</p>
                    <p>{shipping.country}</p>
                    <p className="text-black/50 dark:text-white/50 mt-3">{shipping.email}</p>
                    <p className="text-black/50 dark:text-white/50">{shipping.phone}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mb-4">Billing Address</h3>
                  <div className="text-sm space-y-1">
                    {billing.sameAsShipping ? (
                      <p className="text-black/50 dark:text-white/50 italic">Same as shipping address</p>
                    ) : (
                      <>
                        <p className="font-bold">{billing.firstName} {billing.lastName}</p>
                        <p>{billing.address}</p>
                        <p>{billing.city}, {billing.state} {billing.postal}</p>
                        <p>{billing.country}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Totals */}
              <div className="bg-black/5 dark:bg-white/5 px-6 py-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-black/60 dark:text-white/60">Subtotal</span>
                  <span>{CURRENCY}{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-black/60 dark:text-white/60">Shipping</span>
                  <span>{CURRENCY}{shippingCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-black/60 dark:text-white/60">Tax (7.5%)</span>
                  <span>{CURRENCY}{tax.toLocaleString()}</span>
                </div>
                <div className="border-t border-black/10 dark:border-white/10 pt-3 flex justify-between font-black text-lg">
                  <span>Total</span>
                  <span>{CURRENCY}{total.toLocaleString()}</span>
                </div>
              </div>

              {error && (
                <div className="px-4 py-3 bg-red-500/10 border border-red-500 text-red-600 dark:text-red-400 text-sm font-bold uppercase tracking-wide">
                  {error}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => setStep('billing')}
                  className="flex-1 bg-black/5 dark:bg-white/5 text-black dark:text-white py-5 font-black uppercase tracking-[0.2em] text-xs hover:bg-black/10 dark:hover:bg-white/10 transition-colors border border-black/10 dark:border-white/10"
                >
                  Back
                </button>
                <button
                  onClick={handleNextStep}
                  className="flex-1 bg-black dark:bg-white text-white dark:text-black py-5 font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-500 transition-colors"
                >
                  Enter Payment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Payment Step */}
        {step === 'payment' && (
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">Payment Details</h2>
            <div className="space-y-6">
              <div className="bg-blue-500/10 border border-blue-500 px-4 py-3 rounded text-xs text-blue-600 dark:text-blue-400">
                <p className="font-bold">⚠️ Demo Mode</p>
                <p className="mt-1">Use test card: 4111 1111 1111 1111 | Any future date | Any CVC</p>
              </div>

              <input
                type="text"
                name="cardName"
                placeholder="Cardholder Name"
                value={payment.cardName}
                onChange={handlePaymentChange}
                className="w-full px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/50 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm uppercase tracking-wide"
              />

              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={payment.cardNumber}
                onChange={handlePaymentChange}
                maxLength={19}
                className="w-full px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/50 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm tracking-wider"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={payment.expiryDate}
                  onChange={handlePaymentChange}
                  maxLength={5}
                  className="px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/50 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm tracking-wider"
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={payment.cvv}
                  onChange={handlePaymentChange}
                  maxLength={3}
                  className="px-4 py-3 border border-black/10 dark:border-white/10 bg-white dark:bg-black/50 text-black dark:text-white focus:outline-none focus:border-blue-500 text-sm tracking-wider"
                />
              </div>

              <div className="bg-black/5 dark:bg-white/5 px-6 py-6">
                <div className="flex justify-between font-black text-lg mb-2">
                  <span>Total Amount</span>
                  <span>{CURRENCY}{total.toLocaleString()}</span>
                </div>
                <p className="text-xs text-black/50 dark:text-white/50 mt-4">
                  By clicking "Complete Purchase", you authorize this charge to your card. Your payment is secure and encrypted.
                </p>
              </div>

              {error && (
                <div className="px-4 py-3 bg-red-500/10 border border-red-500 text-red-600 dark:text-red-400 text-sm font-bold uppercase tracking-wide">
                  {error}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => setStep('review')}
                  disabled={isLoading}
                  className="flex-1 bg-black/5 dark:bg-white/5 text-black dark:text-white py-5 font-black uppercase tracking-[0.2em] text-xs hover:bg-black/10 dark:hover:bg-white/10 transition-colors border border-black/10 dark:border-white/10 disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmitOrder}
                  disabled={isLoading}
                  className="flex-1 bg-green-500 text-white py-5 font-black uppercase tracking-[0.2em] text-xs hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Complete Purchase'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
