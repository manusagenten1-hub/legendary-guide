import React, { useRef } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ChevronLeft, ChevronRight, UtensilsCrossed, Zap, Award } from 'lucide-react';

interface MenuSectionProps {
  products: Product[];
}

interface CategorySectionProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  items: Product[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, subtitle, icon, items }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = window.innerWidth * 0.8; // Scroll 80% of screen width
      
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="mb-16 last:mb-0">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6 px-4 md:px-0">
        <div className="bg-brand-red/10 p-2 rounded-lg text-brand-red hidden md:block">
          {icon}
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl text-white font-bold uppercase brand-font tracking-wide flex items-center gap-2">
            <span className="md:hidden text-brand-red">{icon}</span>
            {title}
          </h3>
          <p className="text-gray-400 text-xs md:text-sm font-medium uppercase tracking-wider">{subtitle}</p>
        </div>
      </div>

      {/* Mobile Carousel View */}
      <div className="md:hidden relative group">
        {/* Navigation Buttons (Visible on mobile) */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-brand-red text-white p-2 rounded-full backdrop-blur-sm border border-white/10 transition-colors active:scale-95"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button 
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-brand-red text-white p-2 rounded-full backdrop-blur-sm border border-white/10 transition-colors active:scale-95"
          aria-label="Próximo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 px-4 pb-6 snap-x snap-mandatory hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((product) => (
            <div key={product.id} className="min-w-[85vw] sm:min-w-[300px] snap-center">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Grid View */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export const MenuSection: React.FC<MenuSectionProps> = ({ products }) => {
  // Logic to separate categories
  // 1. Combos are explicitly categorized
  const combos = products.filter(p => p.category === 'combo');
  
  // 2. Xis are burgers that contain "Xis" in the name
  const xis = products.filter(p => p.category === 'burger' && p.name.toLowerCase().includes('xis'));
  
  // 3. Burgers are the rest
  const burgers = products.filter(p => p.category === 'burger' && !p.name.toLowerCase().includes('xis'));

  return (
    <section id="menu" className="py-16 md:py-24 relative bg-brand-black min-h-screen">
      <div className="max-w-7xl mx-auto md:px-6 lg:px-8">
        
        {/* Main Header */}
        <div className="text-center mb-12 md:mb-16 px-4">
          <span className="text-brand-orange font-bold uppercase tracking-widest text-xs md:text-sm block mb-2">
            Nosso Cardápio
          </span>
          <h2 className="text-4xl md:text-6xl text-white font-bold uppercase brand-font mb-4">
            Escolha seu Pedido
          </h2>
          <div className="w-24 h-1 bg-brand-red mx-auto rounded-full"></div>
        </div>

        {/* Categories */}
        <div className="space-y-12">
          
          <CategorySection 
            title="Burgers Artesanais" 
            subtitle="Blend Angus na Brasa"
            icon={<Award className="w-6 h-6" />}
            items={burgers} 
          />

          <CategorySection 
            title="Linha Xis" 
            subtitle="O Gigante Gaúcho"
            icon={<UtensilsCrossed className="w-6 h-6" />}
            items={xis} 
          />

          <CategorySection 
            title="Combos Especiais" 
            subtitle="Burger + Fritas + Refri"
            icon={<Zap className="w-6 h-6" />}
            items={combos} 
          />

        </div>
      </div>
    </section>
  );
};