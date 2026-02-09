import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InfoSection } from './components/InfoSection';
import { MenuSection } from './components/MenuSection';
import { CartSection } from './components/CartSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { FloatingWhatsapp } from './components/FloatingWhatsapp';
import { PRODUCTS } from './constants';
import { CartProvider } from './context/CartContext';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { AdminDashboard } from './components/AdminDashboard';
import { Megaphone } from 'lucide-react';

const AlertBanner: React.FC = () => {
  const { alertMessage, isAlertActive } = useAdmin();

  if (!isAlertActive) return null;

  return (
    <div className="bg-brand-yellow text-brand-black font-bold uppercase tracking-wider text-xs md:text-sm py-2 px-4 text-center fixed top-0 w-full z-[60] shadow-lg animate-fade-in-down flex justify-center items-center gap-2 h-10">
      <Megaphone className="w-4 h-4 flex-shrink-0" />
      <span className="truncate max-w-[90%]">{alertMessage}</span>
    </div>
  );
};

const MainSite: React.FC<{ onOpenAdmin: () => void }> = ({ onOpenAdmin }) => {
  return (
    <div className="min-h-screen bg-brand-black text-white selection:bg-brand-red selection:text-white">
      <Navbar onOpenAdmin={onOpenAdmin} />
      <Hero />
      
      {/* Info Section (Hours & Location) - Overlapping Hero slightly */}
      <InfoSection />
      
      <main>
        {/* Unified Menu Section (Burgers + Combos) */}
        <MenuSection products={PRODUCTS} />
        
        {/* Banner Break */}
        <div className="relative py-24 bg-brand-red flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
            <div className="text-center z-10 px-4">
              <h2 className="text-4xl md:text-6xl font-black uppercase text-white display-font mb-4">
                Sabor Inigualável
              </h2>
              <p className="text-xl md:text-2xl text-white/90 font-medium">
                Ingredientes frescos e carne de verdade.
              </p>
            </div>
        </div>

        {/* Cart / Checkout Section */}
        <CartSection />

        {/* About Us Section */}
        <AboutSection />
      </main>

      <Footer />
      <FloatingWhatsapp />
    </div>
  );
};

const AppContent: React.FC = () => {
  const [view, setView] = useState<'site' | 'admin'>('site');

  return (
    <>
      {view === 'site' && <AlertBanner />}
      {view === 'site' ? (
        <MainSite onOpenAdmin={() => setView('admin')} />
      ) : (
        <AdminDashboard onClose={() => setView('site')} />
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <AdminProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AdminProvider>
  );
};

export default App;