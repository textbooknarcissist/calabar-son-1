import React, { useState, useEffect } from 'react';
import { HOT_DEALS, CURRENCY, ALL_PRODUCTS } from '../constants';
import { ArrowLeft, ArrowRight, Clock, Check, X, Plus } from 'lucide-react';
import { Product, Bundle } from '../types';

interface HotDealsProps {
  onAddToCart: (product: Product) => void;
}

const HotDeals: React.FC<HotDealsProps> = ({ onAddToCart }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ h: 23, m: 59, s: 59 });
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const deal = HOT_DEALS[activeIndex];

  const handleClaimOffer = () => {
    setIsProcessing(true);

    // Simulate a brief "securing" phase for premium feel
    setTimeout(() => {
      setIsProcessing(false);
      if (deal.id === 'b1') { // Starter Pack requires selection
        setIsConfiguring(true);
      } else {
        onAddToCart({
          id: deal.id,
          name: deal.title,
          price: deal.price,
          image: deal.image,
          hoverImage: deal.image,
          category: 'Bundle Offer'
        });
      }
    }, 800);
  };

  return (
    <section className="relative bg-white dark:bg-black py-24 border-y border-black/5 dark:border-white/5 overflow-hidden text-black dark:text-white">
      {/* Decorative Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.02] dark:opacity-[0.05] transition-opacity duration-700">
        <span className="text-[20vw] font-black uppercase tracking-tighter leading-none whitespace-nowrap">
          EXCLUSIVE OFFER
        </span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="animate-fade-in">
            <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter font-heading text-blue-500">
              HOT DEALS
            </h3>
            <p className="uppercase text-xs tracking-[0.3em] font-bold text-black/40 dark:text-white/40 mt-2">Limited Time Exclusives</p>
          </div>

          <div className="flex items-center gap-4 bg-black/5 dark:bg-[#111] px-6 py-3 border border-blue-500/20 backdrop-blur-sm">
            <Clock className="w-5 h-5 text-blue-500" />
            <div className="flex gap-4 font-mono text-2xl font-bold">
              <span>{String(timeLeft.h).padStart(2, '0')}h</span>
              <span className="animate-pulse">:</span>
              <span>{String(timeLeft.m).padStart(2, '0')}m</span>
              <span className="animate-pulse">:</span>
              <span>{String(timeLeft.s).padStart(2, '0')}s</span>
            </div>
          </div>
        </div>

        <div key={activeIndex} className="relative group animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl transition-all duration-500 group-hover:shadow-blue-500/20 group-hover:border-blue-500/30">
              <img
                src={deal.image}
                alt={deal.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-6 right-6 bg-blue-500 text-white px-6 py-3 font-black italic shadow-lg animate-pulse z-10">
                SAVE {CURRENCY}{(deal.originalPrice - deal.price).toLocaleString()}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-block border border-blue-500/30 px-3 py-1 bg-blue-500/5 backdrop-blur-sm animate-pulse">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Verified Offer Available</span>
                </div>
                <h4 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight group-hover:text-blue-500 transition-colors duration-300">
                  {deal.title}
                </h4>
              </div>

              <p className="text-black/60 dark:text-white/60 text-lg leading-relaxed">
                {deal.description}
              </p>

              <div className="flex flex-col gap-1">
                <p className="text-[10px] uppercase tracking-widest font-bold text-black/30 dark:text-white/30">Limited time price</p>
                <div className="flex items-baseline gap-4">
                  <span className="text-6xl font-black text-blue-500 drop-shadow-sm">{CURRENCY}{deal.price.toLocaleString()}</span>
                  <span className="text-2xl text-black/30 dark:text-white/30 line-through decoration-blue-500/30">{CURRENCY}{deal.originalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleClaimOffer}
                disabled={isProcessing}
                className="relative w-full bg-black dark:bg-white text-white dark:text-black py-7 font-black uppercase tracking-[0.3em] text-xs transition-all duration-500 hover:bg-blue-600 hover:text-white hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/30 overflow-hidden group/btn disabled:opacity-70 disabled:cursor-wait"
              >
                {/* Shimmer Effect */}
                {!isProcessing && (
                  <div className="absolute inset-0 w-full h-full transform -skew-x-12 bg-white/10 dark:bg-black/10 animate-shimmer pointer-events-none" />
                )}

                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isProcessing ? 'Securing Deal...' : 'Claim Offer Now'}
                  {!isProcessing && <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-500" />}
                </span>
              </button>
            </div>
          </div>

          <div className="flex gap-4 mt-16 justify-end items-center">
            <div className="flex gap-2 mr-4">
              {HOT_DEALS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 transition-all duration-500 ${i === activeIndex ? 'w-8 bg-blue-500' : 'w-2 bg-black/10 dark:bg-white/10'}`}
                />
              ))}
            </div>
            <button
              onClick={() => setActiveIndex(prev => (prev === 0 ? HOT_DEALS.length - 1 : prev - 1))}
              aria-label="Previous deal"
              className="p-5 border border-black/10 dark:border-white/10 hover:border-blue-500 hover:bg-blue-500/5 transition-all group/nav"
            >
              <ArrowLeft className="w-6 h-6 group-hover/nav:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setActiveIndex(prev => (prev === HOT_DEALS.length - 1 ? 0 : prev + 1))}
              aria-label="Next deal"
              className="p-5 border border-black/10 dark:border-white/10 hover:border-blue-500 hover:bg-blue-500/5 transition-all group/nav"
            >
              <ArrowRight className="w-6 h-6 group-hover/nav:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {isConfiguring && (
        <BundleConfigModal
          deal={deal}
          onClose={() => setIsConfiguring(false)}
          onComplete={(items) => {
            onAddToCart({
              id: deal.id,
              name: `${deal.title} (${items.length} Pieces)`,
              price: deal.price,
              image: deal.image,
              hoverImage: deal.image,
              category: 'Custom Bundle'
            });
            setIsConfiguring(false);
          }}
        />
      )}
    </section>
  );
};

const BundleConfigModal: React.FC<{ deal: Bundle; onClose: () => void; onComplete: (items: Product[]) => void }> = ({ deal, onClose, onComplete }) => {
  const [selected, setSelected] = useState<Product[]>([]);
  const capacity = 3;

  const toggleProduct = (product: Product) => {
    if (selected.find(p => p.id === product.id)) {
      setSelected(selected.filter(p => p.id !== product.id));
    } else if (selected.length < capacity) {
      setSelected([...selected, product]);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 sm:p-12">
      <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose} />
      <div className="relative w-full max-w-5xl bg-white/80 dark:bg-[#050505]/80 backdrop-blur-md border border-black/10 dark:border-white/20 flex flex-col h-full max-h-[85vh] overflow-hidden animate-in zoom-in-95 duration-500 shadow-2xl">

        {/* Header */}
        <div className="p-8 border-b border-black/10 dark:border-white/10 flex justify-between items-center bg-white/20 dark:bg-white/5">
          <div>
            <span className="text-blue-500 text-[9px] font-black uppercase tracking-[0.4em] block mb-1">Configuration Utility</span>
            <h3 className="text-2xl font-black uppercase tracking-tighter">SELECT YOUR {capacity} PIECES</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Selection Area */}
        <div className="flex-1 overflow-y-auto p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 custom-scrollbar bg-transparent">
          {ALL_PRODUCTS.map(product => {
            const isSelected = selected.find(p => p.id === product.id);
            return (
              <div
                key={product.id}
                onClick={() => toggleProduct(product)}
                className={`relative cursor-pointer border group transition-all duration-500 ${isSelected ? 'border-blue-500 bg-blue-500/10 shadow-lg' : 'border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 hover:bg-black/5 dark:hover:bg-white/5'}`}
              >
                <div className="aspect-square overflow-hidden mb-3">
                  <img src={product.image} alt={product.name} className={`w-full h-full object-cover transition-transform duration-700 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`} />
                </div>
                <div className="p-4">
                  <h4 className="text-[10px] font-black uppercase tracking-tight">{product.name}</h4>
                </div>
                {isSelected && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 shadow-lg animate-in zoom-in-50">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/40 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex gap-4">
            {Array.from({ length: capacity }).map((_, i) => (
              <div key={i} className={`w-12 h-16 border-2 border-dashed flex items-center justify-center transition-all duration-500 ${i < selected.length ? 'border-blue-500 bg-blue-500/20 scale-105 shadow-inner' : 'border-black/10 dark:border-white/10'}`}>
                {i < selected.length ? (
                  <img src={selected[i].image} className="w-full h-full object-cover animate-in fade-in zoom-in-75" />
                ) : (
                  <Plus className="w-4 h-4 text-black/10 dark:text-white/10" />
                )}
              </div>
            ))}
          </div>

          <button
            disabled={selected.length < capacity}
            onClick={() => onComplete(selected)}
            className={`px-12 py-5 font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-500 ${selected.length === capacity ? 'bg-blue-500 text-white shadow-xl scale-105 hover:scale-110 hover:shadow-blue-500/30' : 'bg-black/20 dark:bg-white/10 text-black/20 dark:text-white/20 cursor-not-allowed'}`}
          >
            Add Bundle to Bag
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotDeals;
