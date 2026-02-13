
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SignatureCollection from './components/SignatureCollection';
import QualitySpotlight from './components/QualitySpotlight';
import HotDeals from './components/HotDeals';
import SocialProof from './components/SocialProof';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ScrollToTop from './components/ScrollToTop';
import Checkout from './components/Checkout';
import { Product, CartItem } from './types';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize cart from localStorage if available
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('calabar_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Persistence: Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('calabar_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.product.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    // Keep the cart closed when adding items from product cards/quick-view
    setIsCartOpen(false);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={`min-h-screen theme-transition selection:bg-blue-500 selection:text-white bg-white dark:bg-black text-black dark:text-white`}>
      {/* Show checkout or main content */}
      {isCheckingOut ? (
        <Checkout
          cart={cart}
          onClose={() => {
            setIsCheckingOut(false);
            setIsCartOpen(false);
          }}
        />
      ) : (
        <>
          <Navbar
            scrolled={scrolled}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
            cartCount={cartCount}
            onOpenCart={() => setIsCartOpen(true)}
          />
          <main>
            <Hero />
            <SignatureCollection onAddToCart={addToCart} />
            <QualitySpotlight />
            <HotDeals onAddToCart={addToCart} />
            <SocialProof />
          </main>
          <Footer />

          <ScrollToTop />

          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cart={cart}
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
            onClear={clearCart}
            onCheckout={() => setIsCheckingOut(true)}
          />
        </>
      )}
    </div>
  );
};

export default App;
