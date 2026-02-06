
import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top scroll condition
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className={`fixed bottom-8 right-8 z-[60] transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-90 pointer-events-none'}`}>
      <button
        onClick={scrollToTop}
        className="group relative w-12 h-12 flex items-center justify-center bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-black/10 dark:border-white/10 hover:border-blue-500 shadow-2xl overflow-hidden transition-all duration-300"
        aria-label="Scroll to top"
      >
        {/* Animated Background Overlay */}
        <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]" />
        
        {/* Icon */}
        <ChevronUp className="relative z-10 w-5 h-5 text-black dark:text-white group-hover:text-white transition-colors duration-300" />
        
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-blue-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
      
      {/* Scroll indicator text (Mobile hidden, shown on hover desktop) */}
      <span className="absolute right-14 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase tracking-[0.3em] text-black/40 dark:text-white/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
        Back to Top
      </span>
    </div>
  );
};

export default ScrollToTop;
