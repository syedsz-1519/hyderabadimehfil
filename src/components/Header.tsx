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
    <header className="fixed top-0 left-0 w-full z-50 bg-[#5A0F1F]/95 backdrop-blur-md border-b border-[#C9A24B]/35 shadow-[0_4px_24px_rgba(27,20,17,0.25)]">
      <div className="h-16 md:h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand Emblem & Wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8A317] rounded-lg cursor-pointer"
        >
          <ResilientImage
            src={RESTAURANT_INFO.logoUrl}
            alt="Hyderabadi Mehfil Emblem Logo"
            eager
            fallbackLabel="HM"
            className="h-10 w-10 md:h-11 md:w-11 rounded-full object-cover shrink-0 shadow-sm border border-[#C9A24B]/50 bg-[#1B1411]"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-serif text-sm sm:text-base md:text-lg font-semibold tracking-wider text-[#FFDADC] leading-tight truncate">
              HYDERABADI MEHFIL
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.16em] text-[#FFDF9E] leading-tight truncate">
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
                className={`text-sm font-semibold uppercase tracking-[0.08em] transition-colors pb-1 border-b-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8A317] ${
                  isActive
                    ? 'text-[#FFDF9E] border-[#E8A317]'
                    : 'text-[#EEDFDA] border-transparent hover:text-[#FFF8F6]'
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
            className="text-[#FFDF9E] hover:text-[#FFF8F6] transition-colors p-2 rounded-full hover:bg-white/10 border border-[#C9A24B]/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8A317]"
          >
            <Instagram className="w-[18px] h-[18px]" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => handleNavClick('menu')}
            className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#C9A24B] to-[#E8A317] text-[#241600] text-xs font-bold uppercase rounded-lg shadow-md hover:brightness-110 active:scale-[0.98] transition-all tracking-wider cursor-pointer border border-[#FFDF9E]/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFF8F6] whitespace-nowrap"
          >
            Menu
          </button>

          <a
            href={RESTAURANT_INFO.phoneHref}
            aria-label="Call Restaurant"
            className="md:hidden text-[#FFDF9E] hover:text-[#FFF8F6] p-2 rounded-full hover:bg-white/10 border border-[#C9A24B]/30"
          >
            <Phone className="w-[18px] h-[18px]" aria-hidden="true" />
          </a>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden w-9 h-9 rounded-lg bg-white/10 text-[#FFDF9E] flex items-center justify-center border border-[#C9A24B]/35 active:bg-white/20 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8A317]"
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
        <div className="md:hidden bg-[#3A000D] border-t border-[#C9A24B]/30 px-5 py-4 space-y-2 shadow-xl">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left font-semibold text-sm uppercase tracking-wider py-2.5 px-2 rounded-lg transition-colors border-b border-white/10 last:border-b-0 ${
                  isActive ? 'text-[#FFDF9E] bg-white/5' : 'text-[#FFF8F6] hover:bg-white/5'
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
