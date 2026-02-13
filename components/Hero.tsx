
import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToShop = () => {
    const shopSection = document.getElementById('shop-section');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-black px-6">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 dark:from-black/40 via-white/0 dark:via-black/0 to-transparent z-10" />
        <img
          src="/assets/images/hero/hero-background.jpg"
          alt="Premium Streetwear Background"
          className="w-full h-full object-cover opacity-100 dark:opacity-80"
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 container mx-auto text-center mt-20 md:mt-24">
        <h2 className="text-4xl md:text-6xl lg:text-[4.5rem] font-black uppercase tracking-tighter leading-[0.85] mb-6 font-heading text-black dark:text-white">
          THE CROWN <br /> OF THE <span className="text-blue-500">STREETS</span>
        </h2>

        <p className="text-sm md:text-lg text-black/90 dark:text-white/70 max-w-xl mx-auto mb-10 tracking-wide font-light leading-relaxed drop-shadow-sm">
          Artisanal precision meets architectural urban design. Elevate your silhouette with the world's most structured luxury headwear.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToShop}
            className="group relative bg-black dark:bg-white text-white dark:text-black px-10 py-4 font-bold uppercase tracking-widest text-xs overflow-hidden transition-all hover:pr-14 w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Shop the Drop <ArrowRight className="w-4 h-4" />
            </span>
            <div className="absolute top-0 left-0 h-full w-0 bg-blue-500 transition-all duration-300 group-hover:w-full" />
          </button>

          <button className="px-10 py-4 border border-black/20 dark:border-white/20 hover:border-blue-500 hover:bg-blue-500 hover:text-white text-black dark:text-white font-bold uppercase tracking-widest text-xs transition-all w-full sm:w-auto backdrop-blur-md">
            The Story
          </button>
        </div>
      </div>

      {/* Decorative vertical scroll indicator */}
      <div className="absolute bottom-6 left-6 md:left-12 flex flex-col items-center gap-2 overflow-hidden">
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] rotate-180 [writing-mode:vertical-lr] text-black/30 dark:text-white/30 h-20 flex items-center overflow-hidden">
          Discovery
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-blue-500 to-transparent hover:from-blue-600 transition-colors duration-300" />
      </div>

      {/* Floating social tag */}
      <div className="absolute bottom-6 right-6 md:right-12 hidden md:block">
        <span className="text-[9px] font-black uppercase tracking-widest text-black/20 dark:text-white/20 border-b border-black/10 dark:border-white/10 pb-1">
          @calabar.son // 2024
        </span>
      </div>
    </section>
  );
};

export default Hero;
