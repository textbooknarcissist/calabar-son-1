
import React from 'react';
import { ShoppingBag, Menu, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  scrolled: boolean;
  isDarkMode: boolean;
  toggleTheme: () => void;
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled, isDarkMode, toggleTheme, cartCount, onOpenCart }) => {
  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-1000 border-b ${scrolled
        ? 'bg-white/70 dark:bg-black/50 backdrop-blur-2xl py-4 shadow-2xl border-black/5 dark:border-white/10'
        : 'bg-transparent py-8 border-transparent shadow-none'
      }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Menu className="w-6 h-6 cursor-pointer md:hidden text-black dark:text-white" />
          <ul className="hidden md:flex space-x-8 text-[10px] font-black uppercase tracking-[0.2em] text-black/50 dark:text-white/70">
            <li className="hover:text-blue-500 transition-colors cursor-pointer">Shop</li>
            <li className="hover:text-blue-500 transition-colors cursor-pointer">Archive</li>
            <li className="hover:text-blue-500 transition-colors cursor-pointer">Story</li>
          </ul>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-xl md:text-2xl font-black tracking-tighter uppercase font-heading text-black dark:text-white">
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

          {/* Search removed per project request */}

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
    </nav>
  );
};

export default Navbar;
