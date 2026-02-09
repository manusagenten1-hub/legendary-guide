import React from 'react';
import { Flame, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-dark/30 skew-x-12 transform translate-x-20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Image Side - Order 2 on mobile to show text first, or keep standard order */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-4 bg-brand-red/20 rounded-2xl blur-xl transform rotate-3"></div>
            <img 
              src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80" 
              alt="Hambúrguer sendo preparado na brasa" 
              className="relative rounded-xl md:rounded-2xl shadow-2xl border border-white/10 w-full object-cover transform hover:scale-[1.02] transition-transform duration-500 h-64 md:h-auto"
            />
            <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-brand-yellow text-brand-black p-4 md:p-6 rounded-xl shadow-xl hidden md:block">
              <p className="font-bold text-2xl md:text-3xl display-font">100%</p>
              <p className="text-xs md:text-sm font-bold uppercase tracking-wider">Artesanal</p>
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <Flame className="w-5 h-5 md:w-6 md:h-6 text-brand-red" />
              <span className="text-brand-orange font-bold uppercase tracking-widest text-xs md:text-sm">
                Nossa História
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl text-white font-bold uppercase brand-font mb-4 md:mb-6 leading-tight">
              Não é só um hambúrguer.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange">
                É uma obsessão.
              </span>
            </h2>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4 md:mb-6">
              No <strong className="text-white">Brasa Burguer</strong>, acreditamos que a comida rápida não precisa ser industrializada. Nascemos da paixão pelo fogo e pela carne de verdade.
            </p>
            
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 md:mb-8">
              Cada blend é moído diariamente em nossa cozinha, garantindo uma suculência que você não encontra em fast-foods comuns. Nosso pão brioche é selado na manteiga, e nossos molhos são receitas secretas.
            </p>

            <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-brand-yellow mt-1 md:mt-0 shrink-0" />
                <span className="text-gray-300 text-sm md:text-base">Carne 100% Angus fresca, nunca congelada.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-brand-yellow mt-1 md:mt-0 shrink-0" />
                <span className="text-gray-300 text-sm md:text-base">Queijos de verdade e bacon crocante defumado.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-brand-yellow mt-1 md:mt-0 shrink-0" />
                <span className="text-gray-300 text-sm md:text-base">Legumes selecionados e frescos todos os dias.</span>
              </li>
            </ul>

            <div className="border-l-4 border-brand-red pl-4 md:pl-6 py-2 bg-white/5 rounded-r-lg">
              <p className="italic text-gray-300 font-medium text-sm md:text-base">
                "Nosso compromisso é entregar na sua casa a mesma experiência de comer recém-saído da grelha."
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};