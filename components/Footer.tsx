import React from 'react';
import { CONTACT_INFO } from '../constants';
import { MapPin, Clock, Phone, Instagram, Facebook } from 'lucide-react';
import { Flame } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-brand-dark border-t border-white/10 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-brand-red p-2 rounded-full">
                <Flame className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-white text-2xl font-bold uppercase tracking-wider brand-font">
                Brasa<span className="text-brand-yellow">Burguer</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Hambúrguer artesanal feito com paixão. Ingredientes selecionados e sabor inigualável.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-brand-orange transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-orange transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-bold uppercase mb-6 brand-font tracking-wide">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand-red shrink-0" />
                <span>{CONTACT_INFO.phoneDisplay}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-red shrink-0" />
                <span>{CONTACT_INFO.address}</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-white text-lg font-bold uppercase mb-6 brand-font tracking-wide">Horários</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-red shrink-0" />
                <div>
                  <p className="font-medium text-white">Funcionamento</p>
                  <p className="text-sm text-gray-400">{CONTACT_INFO.hours}</p>
                  <p className="text-xs text-brand-yellow mt-1 font-bold">Pedidos até 23h</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Delivery Info */}
          <div>
            <h3 className="text-white text-lg font-bold uppercase mb-6 brand-font tracking-wide">Delivery</h3>
            <p className="mb-4 text-sm text-gray-400">
              Entregamos em toda a região central. Taxa de entrega sob consulta.
            </p>
            <div className="inline-block bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-white font-bold text-sm">Retirada no Balcão</p>
              <p className="text-xs text-gray-400">Sem taxa de entrega</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} Brasa Burguer. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};