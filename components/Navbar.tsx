
import React from 'react';
import { ShoppingBag, Menu, Sun, Moon, X } from 'lucide-react';

interface NavbarProps {
  scrolled: boolean;
  isDarkMode: boolean;
  toggleTheme: () => void;
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled, isDarkMode, toggleTheme, cartCount, onOpenCart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { name: 'Home', id: 'hero-section' },
    { name: 'Collection', id: 'shop-section' },
    { name: 'Story', id: 'quality-section' },
    { name: 'Style', id: 'community-section' },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 border-b ${scrolled
      ? 'bg-white/95 dark:bg-black/90 backdrop-blur-3xl py-3 md:py-4 shadow-2xl border-black/10 dark:border-white/20'
      : 'bg-white/10 dark:bg-black/10 backdrop-blur-md py-6 md:py-8 border-transparent shadow-none'
      }`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center space-x-4 md:space-x-8">
          <Menu
            className="w-6 h-6 cursor-pointer md:hidden text-black dark:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
          <ul className="hidden md:flex space-x-8 text-[10px] font-black uppercase tracking-[0.2em] text-black/50 dark:text-white/70">
            {navLinks.map(link => (
              <li
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="hover:text-blue-500 transition-colors cursor-pointer"
              >
                {link.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-lg md:text-2xl font-black tracking-tighter uppercase font-heading text-black dark:text-white">
            CALABAR <span className="text-blue-500">SON</span>
          </h1>
        </div>

        <div className="flex items-center space-x-4 md:space-x-6">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300 text-black dark:text-white"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="w-5 h-5 transition-transform hover:-rotate-12" />
            )}
          </button>

          <div onClick={onOpenCart} className="relative cursor-pointer group text-black dark:text-white">
            <ShoppingBag className="w-5 h-5 group-hover:text-blue-500 transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Immersive Mobile Overlay (Centered Glass Design) */}
      <>
        {/* Backdrop for mobile menu */}
        <div
          className={`fixed inset-0 bg-black/60 backdrop-blur-md z-[55] md:hidden transition-opacity duration-500 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setMobileMenuOpen(false)}
        />

        <div className={`fixed inset-x-4 top-[84px] h-[75vh] bg-white/80 dark:bg-black/85 backdrop-blur-3xl z-[60] shadow-2xl transition-all duration-700 md:hidden ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'} flex flex-col border border-black/10 dark:border-white/10 rounded-[2rem] overflow-hidden`}>
          {/* Header Branding in Overlay */}
          <div className="p-8 border-b border-black/5 dark:border-white/5 flex justify-center items-center relative">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-500">
              CALABAR <span className="opacity-50">SON</span>
            </h2>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute right-8 p-2 overflow-hidden group hover:rotate-90 transition-transform duration-500"
            >
              <X className="w-5 h-5 text-black dark:text-white" />
            </button>
          </div>

          {/* Centered Navigation Links */}
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <ul className="space-y-10 text-center w-full">
              {navLinks.map((link, idx) => (
                <li
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`group relative flex flex-col items-center justify-center transition-all duration-700 transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                  style={{ transitionDelay: `${idx * 100 + 200}ms` }}
                >
                  <span className="text-3xl font-black uppercase tracking-tighter text-black dark:text-white group-hover:text-blue-500 transition-colors duration-300">
                    {link.name}
                  </span>
                  <div className="w-0 h-1 bg-blue-500 mt-2 group-hover:w-12 transition-all duration-500" />
                  <span className="absolute -top-4 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 text-6xl font-black uppercase tracking-tighter whitespace-nowrap transition-opacity pointer-events-none">
                    {link.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer Branding in Overlay */}
          <div className="p-8 border-t border-black/5 dark:border-white/5 flex flex-col items-center gap-2">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 dark:text-white/20">Archive Edition // MMXXIV</p>
            <div className="flex gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500/20" />
            </div>
          </div>
        </div>
      </>
    </nav>
  );
};

export default Navbar;
