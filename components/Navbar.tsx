import React, { useState, useEffect } from 'react';
import { Menu, X, Flame, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';

interface NavbarProps {
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { isAlertActive } = useAdmin();
  
  // Secret Click State
  const [secretClicks, setSecretClicks] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    const newCount = secretClicks + 1;
    if (newCount >= 10) {
      onOpenAdmin();
      setSecretClicks(0);
    } else {
      setSecretClicks(newCount);
      // Reset clicks after 2 seconds of inactivity to prevent accidental triggering over long sessions
      setTimeout(() => setSecretClicks(0), 3000);
    }
    // Also scroll top top
    window.scrollTo(0,0);
  };

  const navLinks = [
    { name: 'Início', href: '#hero' },
    { name: 'Cardápio', href: '#menu' },
    { name: 'Contato', href: '#footer' },
  ];

  const scrollToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const cartSection = document.getElementById('cart-section');
    if (cartSection) {
      cartSection.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/95 shadow-lg border-b border-white/10' : 'bg-transparent'} ${isAlertActive ? 'top-10' : 'top-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with Secret Click Handler */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer select-none" onClick={handleLogoClick}>
            <div className="bg-brand-red p-2 rounded-full transition-transform active:scale-95">
              <Flame className="w-6 h-6 text-white fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-white text-2xl font-bold uppercase tracking-wider brand-font leading-none">
                Brasa<span className="text-brand-yellow">Burguer</span>
              </span>
              <span className="text-gray-400 text-xs tracking-widest uppercase hidden sm:block">
                Artesanal de verdade
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-brand-yellow px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wider transition-colors"
                >
                  {link.name}
                </a>
              ))}
              
              <button 
                onClick={scrollToCart}
                className="relative bg-brand-red hover:bg-red-700 text-white p-3 rounded-full transition-all transform hover:scale-105 group"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-yellow text-brand-black text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-brand-dark">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
             <button 
                onClick={scrollToCart}
                className="relative text-white p-2"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-brand-red text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-dark/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white hover:bg-brand-red block px-3 py-4 rounded-md text-base font-bold uppercase text-center"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={scrollToCart}
              className="w-full text-brand-black bg-brand-yellow hover:bg-white block px-3 py-4 rounded-md text-base font-bold uppercase text-center"
            >
              Ver Carrinho ({cartCount})
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};