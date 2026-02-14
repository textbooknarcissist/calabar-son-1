
import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { CURRENCY } from '../constants';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onClear: () => void;
  onCheckout?: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onRemove,
  onUpdateQuantity,
  onClear,
  onCheckout
}) => {
  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white/95 dark:bg-black/95 backdrop-blur-3xl z-[110] shadow-2xl transition-transform duration-700 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col border-l border-black/5 dark:border-white/5`}>
        <div className="flex justify-between items-center p-8 border-b border-black/5 dark:border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-500 flex items-center justify-center rounded-2xl shadow-lg shadow-blue-500/20">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tighter leading-none">Your Bag</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-black/40 dark:text-white/40 mt-1">
                {cart.reduce((acc, item) => acc + item.quantity, 0)} Items Secured
              </p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close cart" className="p-3 hover:bg-black/5 dark:hover:bg-white/5 rounded-2xl transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-8 py-20">
              <div className="w-24 h-24 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center animate-pulse">
                <ShoppingBag className="w-12 h-12 text-black/10 dark:text-white/10" />
              </div>
              <div>
                <h4 className="font-black uppercase tracking-tighter text-2xl">Bag is empty</h4>
                <p className="text-black/40 dark:text-white/40 text-[10px] mt-2 uppercase tracking-[0.2em] font-black">Time to secure the crown</p>
              </div>
              <button
                onClick={onClose}
                className="group relative px-10 py-5 font-black uppercase tracking-[0.2em] text-[10px] overflow-hidden transition-all"
              >
                <span className="relative z-10 text-black dark:text-white group-hover:text-white transition-colors">Continue Shopping</span>
                <div className="absolute inset-0 bg-black dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                <div className="absolute inset-0 border-2 border-black dark:border-white" />
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-6 group animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="relative w-28 h-36 bg-black/5 dark:bg-white/5 overflow-hidden group-hover:shadow-xl transition-all duration-500">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-black text-xs uppercase tracking-tight group-hover:text-blue-500 transition-colors line-clamp-2">{item.product.name}</h4>
                        <button onClick={() => onRemove(item.product.id)} aria-label="Remove item" className="text-black/20 dark:text-white/20 hover:text-red-500 transition-colors p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-[10px] text-blue-500 uppercase font-black tracking-widest block mt-2">{item.product.category}</span>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center bg-black/5 dark:bg-white/5 rounded-full px-2">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="p-2 hover:text-blue-500 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-4 text-[10px] font-black">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="p-2 hover:text-blue-500 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-black text-sm">{CURRENCY}{(item.product.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-8 bg-white dark:bg-black border-t border-black/10 dark:border-white/10 space-y-6 shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.1)]">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40 dark:text-white/40 block mb-1">Expected Total</span>
                <span className="text-3xl font-black tracking-tighter">{CURRENCY}{subtotal.toLocaleString()}</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-green-500 font-black uppercase tracking-[0.2em]">Free Local Delivery</span>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={onCheckout}
                className="w-full bg-blue-500 text-white py-6 font-black uppercase tracking-[0.3em] text-[10px] hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all flex items-center justify-center gap-3 group shadow-xl shadow-blue-500/20"
              >
                Secure Checkout <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex justify-center gap-8">
                <button onClick={onClear} className="text-[9px] font-black uppercase tracking-widest text-black/40 dark:text-white/40 hover:text-red-500 transition-colors">
                  Empty Bag
                </button>
                <button onClick={onClose} className="text-[9px] font-black uppercase tracking-widest text-black/40 dark:text-white/40 hover:text-blue-500 transition-colors">
                  Back to Shop
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 opacity-20">
              <ShieldCheck className="w-3 h-3" />
              <span className="text-[8px] font-black uppercase tracking-[0.3em]">End-to-End Encrypted</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
