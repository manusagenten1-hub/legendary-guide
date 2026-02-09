import React from 'react';
import { Clock, MapPin, Phone } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

export const InfoSection: React.FC = () => {
  // Cria o link de busca do Google Maps usando o endereço
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT_INFO.address)}`;

  return (
    <section className="bg-brand-dark border-b border-white/5 relative z-20 -mt-10 mx-4 md:mx-auto max-w-6xl rounded-xl shadow-2xl shadow-black/50 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
        
        {/* Horário */}
        <div className="p-4 md:p-8 flex flex-row md:flex-col items-center justify-start md:justify-center text-left md:text-center gap-4 md:gap-0 group hover:bg-white/5 transition-colors">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-red/10 flex items-center justify-center md:mb-4 shrink-0 group-hover:scale-110 transition-transform">
            <Clock className="w-5 h-5 md:w-6 md:h-6 text-brand-red" />
          </div>
          <div>
            <h3 className="text-white font-bold uppercase tracking-wide mb-1 md:mb-2 text-sm md:text-base">Horário de Atendimento</h3>
            <p className="text-gray-400 text-xs md:text-sm">{CONTACT_INFO.hours}</p>
            <p className="text-brand-yellow text-[10px] md:text-xs font-bold mt-1 md:mt-2">Aberto agora</p>
          </div>
        </div>

        {/* Endereço */}
        <div className="p-4 md:p-8 flex flex-row md:flex-col items-center justify-start md:justify-center text-left md:text-center gap-4 md:gap-0 group hover:bg-white/5 transition-colors">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-red/10 flex items-center justify-center md:mb-4 shrink-0 group-hover:scale-110 transition-transform">
            <MapPin className="w-5 h-5 md:w-6 md:h-6 text-brand-red" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-bold uppercase tracking-wide mb-1 md:mb-2 text-sm md:text-base">Onde Estamos</h3>
            <p className="text-gray-400 text-xs md:text-sm line-clamp-2 md:line-clamp-none">{CONTACT_INFO.address}</p>
            <a 
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-orange text-[10px] md:text-xs font-bold mt-1 md:mt-2 hover:underline inline-flex items-center gap-1"
            >
              Ver no mapa
            </a>
          </div>
        </div>

        {/* Delivery */}
        <div className="p-4 md:p-8 flex flex-row md:flex-col items-center justify-start md:justify-center text-left md:text-center gap-4 md:gap-0 group hover:bg-white/5 transition-colors">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-red/10 flex items-center justify-center md:mb-4 shrink-0 group-hover:scale-110 transition-transform">
            <Phone className="w-5 h-5 md:w-6 md:h-6 text-brand-red" />
          </div>
          <div>
            <h3 className="text-white font-bold uppercase tracking-wide mb-1 md:mb-2 text-sm md:text-base">Delivery & Retirada</h3>
            <p className="text-gray-400 text-xs md:text-sm">Pediu, chegou. Quentinho na sua casa.</p>
            <p className="text-brand-yellow text-[10px] md:text-xs font-bold mt-1 md:mt-2">{CONTACT_INFO.phoneDisplay}</p>
          </div>
        </div>

      </div>
    </section>
  );
};