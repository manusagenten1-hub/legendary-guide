import React from 'react';
import { getWhatsappLink } from '../services/whatsapp';
import { ChevronRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div id="hero" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=1920&q=80")',
        }}
      >
        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 md:pt-0">
        <div className="max-w-2xl">
          <div className="inline-block px-4 py-1 mb-4 border border-brand-yellow rounded-full bg-black/50 backdrop-blur-sm animate-fade-in-up">
            <span className="text-brand-yellow font-bold uppercase tracking-widest text-xs md:text-sm">
              O Melhor da Cidade
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-bold leading-none mb-6 drop-shadow-xl display-font uppercase">
            Hambúrguer <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-yellow">
              Artesanal
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-300 mb-8 font-light max-w-lg leading-relaxed">
            Suculento, autêntico e feito na brasa. O sabor que você merece, entregue na sua porta.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href={getWhatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-center bg-brand-red hover:bg-brand-darkRed text-white px-8 py-4 rounded-full text-lg font-bold uppercase tracking-wider transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(217,4,41,0.5)]"
            >
              Pedir Agora
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#burgers"
              className="flex items-center justify-center px-8 py-4 rounded-full text-lg font-bold uppercase tracking-wider text-white border-2 border-white/20 hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Ver Cardápio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};