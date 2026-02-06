import React from 'react';
import { Facebook, Twitter, Instagram, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-[#050505] pt-24 pb-12 border-t border-black/5 dark:border-white/5 text-black dark:text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 font-heading">
              CALABAR <span className="text-blue-500">SON</span>
            </h2>
            <p className="text-black/50 dark:text-white/50 max-w-sm mb-8 leading-relaxed">
              Join the inner circle. Be the first to know about secret drops, exclusive collaborations, and limited edition colorways.
            </p>
            <div className="relative max-w-md">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-6 py-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-blue-500 transition-colors placeholder:text-black/20 dark:placeholder:text-white/20"
              />
              <button aria-label="Subscribe" className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 hover:text-black dark:hover:text-white transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest text-xs mb-8">Navigation</h4>
            <ul className="space-y-4 text-sm text-black/40 dark:text-white/40 font-bold uppercase tracking-tighter">
              <li className="hover:text-blue-500 transition-colors cursor-pointer">Catalog</li>
              <li className="hover:text-blue-500 transition-colors cursor-pointer">Size Guide</li>
              <li className="hover:text-blue-500 transition-colors cursor-pointer">Shipping</li>
              <li className="hover:text-blue-500 transition-colors cursor-pointer">Returns</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest text-xs mb-8">Social</h4>
            <div className="flex gap-6">
              <Instagram className="w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors" />
              <Facebook className="w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors" />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-black/5 dark:border-white/5 gap-8">
          <p className="text-[10px] text-black/30 dark:text-white/30 font-bold uppercase tracking-[0.3em]">
            &copy; 2024 Calabar Son. Designed for the Streets.
          </p>
          <div className="flex items-center gap-6 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all dark:invert">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple Pay" className="h-4" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;