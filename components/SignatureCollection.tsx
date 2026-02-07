import React, { useState, useEffect } from 'react';
import { SIGNATURE_PRODUCTS, ALL_PRODUCTS, CURRENCY } from '../constants';
import { Product } from '../types';
import { Eye, Plus, X, ShoppingCart, Check, ChevronRight, Grid, ArrowLeft } from 'lucide-react';

interface SignatureCollectionProps {
  onAddToCart: (product: Product) => void;
}

const SignatureCollection: React.FC<SignatureCollectionProps> = ({ onAddToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);

  return (
    <section id="shop-section" className="bg-white dark:bg-black py-24 md:py-32 relative text-black dark:text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="reveal-content">
            <span className="text-blue-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Archive MMXXIV</span>
            <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter font-heading leading-none">
              SIGNATURE <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-black/80 to-black/40 dark:from-white dark:via-white/80 dark:to-white/40">COLLECTION</span>
            </h3>
          </div>
          <div className="text-right max-w-xs">
            <p className="text-black/50 dark:text-white/40 text-[11px] uppercase leading-relaxed tracking-widest mb-6 font-medium">
              Architectural silhouettes engineered for the modern metropolitan landscape.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20 mb-20">
          {SIGNATURE_PRODUCTS.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onQuickView={() => setSelectedProduct(product)}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <button 
            onClick={() => setIsCollectionOpen(true)}
            className="group relative px-16 py-6 font-black uppercase tracking-[0.4em] text-[10px] transition-all overflow-hidden border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] hover:border-blue-500 hover:bg-blue-500/10"
          >
            <span className="relative z-10 flex items-center gap-4 text-black dark:text-white group-hover:text-blue-500 transition-colors duration-300">
              <Grid className="w-3 h-3 group-hover:scale-110 transition-transform duration-300" /> Explore Entire Archive
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </button>
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickViewModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onAddToCart={onAddToCart}
        />
      )}

      {/* Full Collection Modal */}
      {isCollectionOpen && (
        <FullCollectionModal 
          onClose={() => setIsCollectionOpen(false)}
          onQuickView={(p) => setSelectedProduct(p)}
          onAddToCart={onAddToCart}
        />
      )}
    </section>
  );
};

const ProductCard: React.FC<{ product: Product; onQuickView: () => void; onAddToCart: (p: Product) => void }> = ({ product, onQuickView, onAddToCart }) => {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div 
      className="group relative flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gallery Frame */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f7f7f7] dark:bg-[#0d0d0d] mb-8 transition-all duration-700 ease-in-out border border-transparent group-hover:border-black/5 dark:group-hover:border-white/10 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        
        {/* Main Image */}
        <img 
          src={product.image} 
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${hovered ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`}
        />
        
        {/* Hover Image */}
        <img 
          src={product.hoverImage} 
          alt={`${product.name} alternate view`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${hovered ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
        />

        {/* Subtle Vignette on Hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`} />
        
        {/* Floating Badge */}
        {product.category && (
          <div className="absolute top-5 left-5 overflow-hidden">
            <div className={`bg-white/80 dark:bg-black/80 backdrop-blur-md px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.2em] transition-transform duration-500 flex items-center gap-2 ${hovered ? 'translate-y-0' : '-translate-y-full'}`}>
              <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
              {product.category}
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
          <button 
            onClick={(e) => { e.stopPropagation(); onQuickView(); }}
            className={`w-40 bg-white/10 backdrop-blur-xl text-white border border-white/20 py-3.5 text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-500 hover:bg-white hover:text-black hover:border-white hover:shadow-xl hover:scale-105 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            Quick View
          </button>
        </div>

        {/* Bottom Cart Action */}
        <button 
          onClick={handleAddToCart}
          disabled={added}
          className={`absolute bottom-0 left-0 w-full py-5 font-black uppercase tracking-[0.3em] text-[9px] transition-all duration-500 transform ${hovered ? 'translate-y-0' : 'translate-y-full'} ${added ? 'bg-green-500 text-white' : 'bg-black dark:bg-white text-white dark:text-black hover:bg-blue-500 hover:text-white hover:shadow-lg'}`}
        >
          <span className="flex items-center justify-center gap-3">
            {added ? <><Check className="w-3 h-3" /> Piece Secured</> : <><Plus className="w-3 h-3 group-hover:scale-125 transition-transform" /> Add to Order</>}
          </span>
        </button>
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <h4 className="text-[15px] font-bold uppercase tracking-tight group-hover:text-blue-500 transition-colors duration-300">
            {product.name}
          </h4>
          <span className="text-[15px] font-bold text-black/90 dark:text-white/90">
            {CURRENCY}{product.price.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center overflow-hidden">
          <span className="text-[10px] text-black/40 dark:text-white/40 uppercase tracking-[0.2em] font-bold translate-y-0 transition-transform duration-500 group-hover:-translate-y-full">
            In Stock • Fast Delivery
          </span>
          <span className="text-[10px] text-blue-500 uppercase tracking-[0.2em] font-black absolute translate-y-full transition-transform duration-500 group-hover:translate-y-0">
            Luxury Finish • 100% Cotton
          </span>
        </div>
      </div>
    </div>
  );
};

const FullCollectionModal: React.FC<{ onClose: () => void; onQuickView: (p: Product) => void; onAddToCart: (p: Product) => void }> = ({ onClose, onQuickView, onAddToCart }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-white/95 dark:bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="relative w-full h-full md:w-[95vw] md:h-[95vh] bg-white dark:bg-black md:border border-black/5 dark:border-white/10 flex flex-col overflow-hidden animate-in zoom-in-95 duration-500 shadow-2xl">
        <div className="flex justify-between items-center p-8 border-b border-black/5 dark:border-white/5">
          <div className="flex items-center gap-8">
            <button 
              onClick={onClose}
              className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-black dark:text-white hover:text-blue-500 transition-all bg-black/5 dark:bg-white/5 px-6 py-3 rounded-full"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
            </button>
            <div className="h-10 w-px bg-black/5 dark:bg-white/5" />
            <div>
              <h3 className="text-3xl font-black uppercase tracking-tighter font-heading text-black dark:text-white">EXTENDED ARCHIVE</h3>
              <p className="text-black/30 dark:text-white/30 text-[9px] uppercase tracking-[0.3em] font-black mt-1">Sourcing the streets for the perfect fit</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            aria-label="Close modal"
            className="text-black/50 dark:text-white/50 hover:text-blue-500 transition-colors p-3 border border-black/5 dark:border-white/5 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 md:p-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-20">
            {ALL_PRODUCTS.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onQuickView={() => onQuickView(product)}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>

        <div className="p-10 border-t border-black/5 dark:border-white/5 bg-white dark:bg-black flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 dark:text-white/40">Secure Global Logistics Active</span>
          </div>
          <div className="flex gap-10 items-center opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 dark:invert cursor-pointer">
            {[
              { src: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg', alt: 'PayPal', h: 'h-4' },
              { src: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg', alt: 'Apple', h: 'h-4' },
              { src: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg', alt: 'MC', h: 'h-5' },
              { src: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg', alt: 'Visa', h: 'h-3' }
            ].map((icon, idx) => (
              <img 
                key={idx}
                src={icon.src} 
                alt={icon.alt} 
                className={`${icon.h} w-auto object-contain transition-transform hover:scale-110`} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickViewModal: React.FC<{ product: Product; onClose: () => void; onAddToCart: (p: Product) => void }> = ({ product, onClose, onAddToCart }) => {
  const pushedRef = React.useRef(false);

  useEffect(() => {
    // Push a history state so browser "back" will close the modal
    try {
      window.history.pushState({ quickView: true, id: product.id }, '', `#preview-${product.id}`);
      pushedRef.current = true;
    } catch (e) {
      pushedRef.current = false;
    }

    const onPop = () => {
      onClose();
    };
    window.addEventListener('popstate', onPop);

    return () => {
      window.removeEventListener('popstate', onPop);
      if (pushedRef.current) {
        try {
          const url = window.location.pathname + window.location.search;
          window.history.replaceState(null, '', url);
        } catch (e) {
          /* ignore */
        }
      }
    };
  }, [product.id, onClose]);

  const doClose = () => {
    if (pushedRef.current && window.history && window.history.length > 0) {
      window.history.back();
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 md:p-12">
      <div 
        className="absolute inset-0 bg-white/95 dark:bg-black/95 backdrop-blur-xl transition-opacity animate-in fade-in duration-500" 
        onClick={doClose} 
      />
      
      <div className="relative w-full max-w-6xl bg-white dark:bg-[#050505] border border-black/5 dark:border-white/5 flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-500 shadow-2xl">
        <button 
          onClick={doClose}
          className="absolute top-8 left-8 z-20 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-black dark:text-white hover:text-blue-500 transition-all bg-black/5 dark:bg-white/5 px-6 py-3 rounded-full"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Exit Preview
        </button>

        <button 
          onClick={doClose}
          aria-label="Close preview"
          className="absolute top-8 right-8 z-20 text-black/50 dark:text-white/50 hover:text-blue-500 transition-colors p-2"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="w-full md:w-3/5 aspect-square md:aspect-auto relative bg-[#f7f7f7] dark:bg-[#0d0d0d]">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain p-12"
          />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
             {[1,2,3].map(i => (
               <div key={i} className={`w-1.5 h-1.5 rounded-full border border-black/20 dark:border-white/20 ${i === 1 ? 'bg-blue-500 border-blue-500' : ''}`} />
             ))}
          </div>
        </div>

        <div className="w-full md:w-2/5 p-12 md:p-20 flex flex-col justify-center border-l border-black/5 dark:border-white/5">
          <span className="text-blue-500 font-black uppercase tracking-[0.4em] text-[9px] mb-6 block">Limited Release</span>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-6 font-heading text-black dark:text-white leading-[0.9]">{product.name}</h2>
          
          <div className="flex items-center gap-6 mb-10">
            <span className="text-4xl font-light text-black/90 dark:text-white/90">{CURRENCY}{product.price.toLocaleString()}</span>
            <div className="h-6 w-px bg-black/10 dark:bg-white/10" />
            <div className="flex flex-col">
              <span className="text-[10px] text-black/40 dark:text-white/40 uppercase tracking-widest font-black">Free Priority Shipping</span>
              <span className="text-[10px] text-green-500 uppercase tracking-widest font-black">Ships within 24 hours</span>
            </div>
          </div>

          <p className="text-black/60 dark:text-white/60 leading-relaxed mb-12 text-sm md:text-base font-medium">
            Meticulously engineered with our proprietary 'Street-Flex' chassis. Featuring a 6-panel structured crown, reinforced sweatband, and custom matte-black hardware.
          </p>

          <div className="space-y-8 mb-16">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 dark:text-white/40">Select Variant</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-blue-500 underline cursor-pointer">Size Guide</span>
              </div>
              <div className="flex gap-4">
                {['S/M', 'L/XL', 'Custom'].map(size => (
                  <button key={size} className="flex-1 border border-black/10 dark:border-white/10 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:border-blue-500 hover:text-blue-500 transition-all text-black dark:text-white bg-black/[0.02] dark:bg-white/[0.02]">
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button 
              onClick={() => onAddToCart(product)}
              className="w-full bg-black dark:bg-white text-white dark:text-black py-6 font-black uppercase tracking-[0.3em] text-[10px] hover:bg-blue-500 hover:text-white hover:shadow-lg transition-all duration-500 flex items-center justify-center gap-4 group"
            >
              <ShoppingCart className="w-4 h-4 group-hover:scale-125 group-hover:-rotate-12 transition-all" /> Add to Order
            </button>
            <button 
              onClick={doClose}
              className="w-full border border-black/10 dark:border-white/10 text-black dark:text-white py-6 font-black uppercase tracking-[0.3em] text-[10px] hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all flex items-center justify-center gap-4"
            >
              Full Specifications <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignatureCollection;