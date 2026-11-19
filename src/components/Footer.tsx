import { Clock, Phone, MapPin, ArrowUpRight, Instagram } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { ResilientImage } from './ResilientImage';

export function Footer() {
  return (
    <footer className="w-full bg-[#1B1411] text-[#EEDFDA] relative overflow-hidden border-t border-[#C9A24B]/35 pb-20 md:pb-0">
      <div className="absolute inset-0 jaali-lattice pointer-events-none opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 pt-14 pb-10">
        {/* Brand Identity & Tagline */}
        <div className="flex flex-col items-center text-center mb-10">
          <ResilientImage
            src={RESTAURANT_INFO.logoUrl}
            alt="Hyderabadi Mehfil Logo"
            fallbackLabel="HM"
            className="w-14 h-14 rounded-full object-cover shadow-md border border-[#C9A24B]/50 mb-3 bg-[#1B1411]"
          />
          <h2 className="font-serif text-3xl sm:text-4xl text-[#FFDF9E] mb-3 font-semibold">
            {RESTAURANT_INFO.name}
          </h2>
          <p className="text-sm sm:text-base text-[#F4E5E0] max-w-xl mx-auto mb-4">
            {RESTAURANT_INFO.footerTagline}{' '}
            <a
              href={RESTAURANT_INFO.emailHref}
              className="underline decoration-[#C9A24B]/60 underline-offset-4 hover:text-[#FFDF9E] transition-colors"
            >
              {RESTAURANT_INFO.email}
            </a>
          </p>
          <div className="flex items-center gap-4 w-full max-w-md my-2">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#C9A24B]/45" />
            <span className="w-2 h-2 rotate-45 border border-[#C9A24B]/70" aria-hidden="true" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#C9A24B]/45" />
          </div>
        </div>

        {/* 3-Column Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-[#C9A24B]/20 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-3 text-[#FFDF9E]">
              <Clock className="w-4 h-4" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                Opening Hours
              </span>
            </div>
            <p className="text-sm text-[#EEDFDA] leading-relaxed">
              {RESTAURANT_INFO.hoursMain}
              <br />
              {RESTAURANT_INFO.hoursFriday}
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-3 text-[#FFDF9E]">
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Contact</span>
            </div>
            <a
              href={RESTAURANT_INFO.phoneHref}
              className="text-base text-[#FFF8F6] hover:text-[#FFDF9E] transition-colors font-semibold tabular-nums"
            >
              {RESTAURANT_INFO.phoneDisplay}
            </a>
            <a
              href={RESTAURANT_INFO.emailHref}
              className="text-sm text-[#EEDFDA] hover:text-[#FFF8F6] transition-colors mt-1"
            >
              {RESTAURANT_INFO.email}
            </a>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-3 text-[#FFDF9E]">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Location</span>
            </div>
            <p className="text-base text-[#FFF8F6]">{RESTAURANT_INFO.fullAddress}</p>
            <a
              href={RESTAURANT_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#FFDF9E] hover:underline mt-2 inline-flex items-center gap-1 uppercase tracking-wider"
            >
              <span>Get Directions</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Bottom Copyright & Instagram Bar */}
        <div className="mt-7 pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <p className="text-xs sm:text-sm text-[#EEDFDA]/85">{RESTAURANT_INFO.copyright}</p>
          <a
            href={RESTAURANT_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FFDF9E] hover:text-[#FFF8F6] transition-colors inline-flex items-center gap-2 text-sm font-semibold"
          >
            <Instagram className="w-4 h-4" aria-hidden="true" />
            <span>{RESTAURANT_INFO.instagramHandle}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
