import { useState } from 'react';
import { Menu, X, Phone, Instagram } from 'lucide-react';
import { PageRoute, RESTAURANT_INFO } from '../data/restaurantData';
import { ResilientImage } from './ResilientImage';

interface HeaderProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute, sectionId?: string) => void;
}

const NAV_ITEMS: Array<{ id: PageRoute; label: string }> = [
  { id: 'home', label: 'HOME' },
  { id: 'menu', label: 'MENU' },
  { id: 'contact', label: 'CONTACT US' },
];

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageRoute, sectionId?: string) => {
    setMobileMenuOpen(false);
    onNavigate(page, sectionId);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#18151B]/95 backdrop-blur-md border-b border-[#D4AF37]/35 shadow-[0_4px_24px_rgba(10,8,12,0.45)]">
      <div className="h-16 md:h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand Emblem & Wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0C75E] rounded-lg cursor-pointer"
        >
          <ResilientImage
            src={RESTAURANT_INFO.logoUrl}
            alt="Hyderabadi Mehfil Emblem Logo"
            eager
            fallbackLabel="HM"
            className="h-10 w-10 md:h-11 md:w-11 rounded-full object-cover shrink-0 shadow-sm border border-[#D4AF37]/65 bg-[#18151B]"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-serif text-sm sm:text-base md:text-lg font-semibold tracking-wider text-[#F7F1E3] leading-tight truncate">
              HYDERABADI MEHFIL
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.16em] text-[#ECC55F] leading-tight truncate">
              {RESTAURANT_INFO.tagline}
            </span>
          </div>
        </button>

        {/* Desktop Primary Navigation */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-semibold uppercase tracking-[0.08em] transition-colors pb-1 border-b-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F0C75E] ${
                  isActive
                    ? 'text-[#ECC55F] border-[#F0C75E]'
                    : 'text-[#D8CFC4] border-transparent hover:text-[#F7F1E3]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href={RESTAURANT_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram profile"
            className="text-[#ECC55F] hover:text-[#F7F1E3] transition-colors p-2 rounded-full hover:bg-white/10 border border-[#D4AF37]/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0C75E]"
          >
            <Instagram className="w-[18px] h-[18px]" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => handleNavClick('menu')}
            className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#C99B35] via-[#F0C75E] to-[#D4A63B] text-[#1D1810] text-xs font-bold uppercase rounded-lg shadow-md hover:brightness-110 active:scale-[0.98] transition-all tracking-wider cursor-pointer border border-[#FCE59C]/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7F1E3] whitespace-nowrap"
          >
            Menu
          </button>

          <a
            href={RESTAURANT_INFO.phoneHref}
            aria-label="Call Restaurant"
            className="md:hidden text-[#ECC55F] hover:text-[#F7F1E3] p-2 rounded-full hover:bg-white/10 border border-[#D4AF37]/35"
          >
            <Phone className="w-[18px] h-[18px]" aria-hidden="true" />
          </a>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden w-9 h-9 rounded-lg bg-[#27222C] text-[#ECC55F] flex items-center justify-center border border-[#D4AF37]/40 active:bg-[#322B39] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0C75E]"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#211D25] border-t border-[#D4AF37]/30 px-5 py-4 space-y-2 shadow-xl">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left font-semibold text-sm uppercase tracking-wider py-2.5 px-2 rounded-lg transition-colors border-b border-white/10 last:border-b-0 ${
                  isActive ? 'text-[#ECC55F] bg-[#2D2733]' : 'text-[#F7F1E3] hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
