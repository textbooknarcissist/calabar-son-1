
import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
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
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-[#0a0a0a] z-[110] shadow-2xl transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        <div className="flex justify-between items-center p-8 border-b border-black/5 dark:border-white/5">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-blue-500" />
            <h3 className="text-xl font-black uppercase tracking-tighter">Your Bag</h3>
            <span className="text-[10px] bg-blue-500 text-white px-2 py-0.5 font-black rounded-full">
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </div>
          <button onClick={onClose} aria-label="Close cart" className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-20 h-20 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-black/20 dark:text-white/20" />
              </div>
              <div>
                <h4 className="font-black uppercase tracking-tighter text-xl">Bag is empty</h4>
                <p className="text-black/40 dark:text-white/40 text-sm mt-2 uppercase tracking-widest font-bold">Time to secure the crown</p>
              </div>
              <button onClick={onClose} className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-500 hover:text-white transition-all">
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className="flex gap-6 group">
                <div className="w-24 h-32 bg-black/5 dark:bg-[#111] border border-black/5 dark:border-white/5 overflow-hidden flex-shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm uppercase tracking-tight group-hover:text-blue-500 transition-colors">{item.product.name}</h4>
                      <button onClick={() => onRemove(item.product.id)} aria-label="Remove item" className="text-black/20 dark:text-white/20 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-[10px] text-black/40 dark:text-white/40 uppercase font-black tracking-widest block mt-1">{item.product.category}</span>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div className="flex items-center border border-black/10 dark:border-white/10">
                      <button 
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        aria-label="Decrease quantity"
                        className="p-2 hover:bg-black/5 dark:hover:bg-white/5 text-black/40 dark:text-white/40"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-4 text-xs font-black">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        aria-label="Increase quantity"
                        className="p-2 hover:bg-black/5 dark:hover:bg-white/5 text-black/40 dark:text-white/40"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-bold text-sm">{CURRENCY}{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-8 bg-black/5 dark:bg-white/5 border-t border-black/5 dark:border-white/5 space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-black/40 dark:text-white/40">Subtotal</span>
              <span className="text-2xl font-black">{CURRENCY}{subtotal.toLocaleString()}</span>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={onCheckout}
                disabled={cart.length === 0}
                className="w-full bg-blue-500 text-white py-5 font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-600 transition-colors flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={onClear} className="w-full text-black/40 dark:text-white/40 py-2 text-[10px] font-black uppercase tracking-widest hover:text-red-500 transition-colors">
                Clear Cart
              </button>
            </div>
            <p className="text-center text-[9px] text-black/30 dark:text-white/30 uppercase font-black tracking-widest">
              Shipping & Taxes calculated at checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
