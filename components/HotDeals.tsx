
import React, { useState, useEffect } from 'react';
import { HOT_DEALS, CURRENCY } from '../constants';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { Product } from '../types';

interface HotDealsProps {
  onAddToCart: (product: Product) => void;
}

const HotDeals: React.FC<HotDealsProps> = ({ onAddToCart }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ h: 23, m: 59, s: 59 });

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
    // Treat the bundle as a single product for cart purposes
    onAddToCart({
      id: deal.id,
      name: deal.title,
      price: deal.price,
      image: deal.image,
      hoverImage: deal.image,
      category: 'Bundle Offer'
    });
  };

  return (
    <section className="bg-white dark:bg-black py-24 border-y border-black/5 dark:border-white/5 overflow-hidden text-black dark:text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div>
            <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter font-heading text-blue-500">
              HOT DEALS
            </h3>
            <p className="uppercase text-xs tracking-[0.3em] font-bold text-black/40 dark:text-white/40 mt-2">Limited Time Exclusives</p>
          </div>
          
          <div className="flex items-center gap-4 bg-black/5 dark:bg-[#111] px-6 py-3 border border-blue-500/20">
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

        <div className="relative group">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video overflow-hidden border border-black/10 dark:border-white/10 shadow-xl">
              <img 
                src={deal.image} 
                alt={deal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 right-6 bg-blue-500 text-white px-4 py-2 font-black italic">
                SAVE {CURRENCY}{(deal.originalPrice - deal.price).toLocaleString()}
              </div>
            </div>

            <div className="space-y-8">
              <h4 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight">
                {deal.title}
              </h4>
              <p className="text-black/60 dark:text-white/60 text-lg">
                {deal.description}
              </p>
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-black text-blue-500">{CURRENCY}{deal.price.toLocaleString()}</span>
                <span className="text-2xl text-black/30 dark:text-white/30 line-through">{CURRENCY}{deal.originalPrice.toLocaleString()}</span>
              </div>
              <button 
                onClick={handleClaimOffer}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-6 font-black uppercase tracking-[0.2em] text-sm hover:bg-blue-500 hover:text-white hover:shadow-lg transition-all duration-300 group"
              >
                <span className="flex items-center justify-center gap-3">
                  Claim Offer
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>

          <div className="flex gap-4 mt-12 justify-end">
            <button 
              onClick={() => setActiveIndex(prev => (prev === 0 ? HOT_DEALS.length - 1 : prev - 1))}
              aria-label="Previous deal"
              className="p-4 border border-black/10 dark:border-white/10 hover:border-blue-500 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setActiveIndex(prev => (prev === HOT_DEALS.length - 1 ? 0 : prev + 1))}
              aria-label="Next deal"
              className="p-4 border border-black/10 dark:border-white/10 hover:border-blue-500 transition-colors"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotDeals;
