import React from 'react';
import { Product } from '../types';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { items, addToCart, updateQuantity } = useCart();
  const cartItem = items.find(item => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="group bg-brand-dark rounded-2xl overflow-hidden border border-white/5 hover:border-brand-orange/50 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-orange/10 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-48 sm:h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent opacity-60 z-10" />
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 z-20 bg-brand-yellow text-brand-black font-bold px-2 py-1 md:px-3 md:py-1 rounded-lg text-sm md:text-lg shadow-lg">
          R$ {product.price.toFixed(2).replace('.', ',')}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6 flex flex-col flex-grow">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 brand-font uppercase tracking-wide group-hover:text-brand-orange transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 md:mb-6 flex-grow line-clamp-3 md:line-clamp-none">
          {product.description}
        </p>

        {quantity === 0 ? (
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-white/5 hover:bg-brand-red text-white border border-white/10 hover:border-transparent py-3 rounded-xl font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 group/btn active:scale-95"
          >
            <ShoppingCart className="w-5 h-5 group-hover/btn:-translate-y-1 transition-transform" />
            Adicionar
          </button>
        ) : (
          <div className="flex items-center justify-between bg-brand-darkRed/20 border border-brand-red/30 rounded-xl p-1">
            <button 
              onClick={() => updateQuantity(product.id, -1)}
              className="w-10 h-10 flex items-center justify-center bg-brand-red text-white rounded-lg hover:bg-red-700 transition-colors active:scale-90"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-white font-bold text-lg">{quantity}</span>
            <button 
              onClick={() => updateQuantity(product.id, 1)}
              className="w-10 h-10 flex items-center justify-center bg-brand-red text-white rounded-lg hover:bg-red-700 transition-colors active:scale-90"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};