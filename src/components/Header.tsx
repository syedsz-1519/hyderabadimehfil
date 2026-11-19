import { useEffect, useState } from 'react';
import {
  Menu,
  X,
  Phone,
  Instagram,
  ChevronDown,
  Compass,
  UtensilsCrossed,
  Sun,
  Moon,
} from 'lucide-react';
import { MENU_CATEGORIES, PageRoute, RESTAURANT_INFO } from '../data/restaurantData';
import { type ThemeMode } from '../App';
import { ResilientImage } from './ResilientImage';

interface HeaderProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute, sectionId?: string) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

const NAV_ITEMS: Array<{ id: PageRoute; label: string }> = [
  { id: 'home', label: 'HOME' },
  { id: 'menu', label: 'MENU' },
  { id: 'contact', label: 'CONTACT US' },
];

const HOME_SECTIONS: Array<{ id: string; label: string }> = [
  { id: 'our-story', label: 'Our Story' },
  { id: 'promo-film', label: 'Kitchen Film' },
  { id: 'popular-dishes', label: 'Popular Dishes' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'testimonials', label: 'Guest Reviews' },
  { id: 'faq', label: 'FAQ' },
];

export function Header({ currentPage, onNavigate, theme, onToggleTheme }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSectionsGroup, setMobileSectionsGroup] = useState<'home' | 'menu'>(
    currentPage === 'menu' ? 'menu' : 'home'
  );

  useEffect(() => {
    setMobileSectionsGroup(currentPage === 'menu' ? 'menu' : 'home');
  }, [currentPage]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (page: PageRoute, sectionId?: string) => {
    setMobileMenuOpen(false);
    onNavigate(page, sectionId);
  };

  const isDark = theme === 'dark';

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#18151B]/95 backdrop-blur-md border-b border-[#D4AF37]/35 shadow-[0_4px_24px_rgba(10,8,12,0.45)]">
      <div className="h-16 md:h-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-12 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Emblem & Wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 sm:gap-3 text-left transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0C75E] rounded-lg cursor-pointer min-w-0 flex-1 md:flex-initial"
        >
          <ResilientImage
            src={RESTAURANT_INFO.logoUrl}
            alt="Hyderabadi Mehfil Emblem Logo"
            eager
            fallbackLabel="HM"
            className="h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded-full object-cover shrink-0 shadow-sm border border-[#D4AF37]/75 bg-[#18151B]"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-serif text-xs sm:text-base md:text-lg font-semibold tracking-wider text-[#F7F1E3] leading-tight truncate">
              HYDERABADI MEHFIL
            </span>
            <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[#ECC55F] leading-tight truncate">
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
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to Light Ivory theme' : 'Switch to Dark Charcoal theme'}
            title={isDark ? 'Switch to Light Ivory theme' : 'Switch to Dark Charcoal theme'}
            className="text-[#ECC55F] hover:text-[#F7F1E3] transition-colors p-2 rounded-full hover:bg-white/10 border border-[#D4AF37]/35 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0C75E]"
          >
            {isDark ? (
              <Sun className="w-[17px] h-[17px] sm:w-[18px] sm:h-[18px]" aria-hidden="true" />
            ) : (
              <Moon className="w-[17px] h-[17px] sm:w-[18px] sm:h-[18px]" aria-hidden="true" />
            )}
          </button>

          <a
            href={RESTAURANT_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram profile"
            className="hidden sm:inline-flex text-[#ECC55F] hover:text-[#F7F1E3] transition-colors p-2 rounded-full hover:bg-white/10 border border-[#D4AF37]/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0C75E]"
          >
            <Instagram className="w-[18px] h-[18px]" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => handleNavClick('menu')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#C99B35] via-[#F0C75E] to-[#D4A63B] text-[#1D1810] text-xs font-bold uppercase rounded-lg shadow-md hover:brightness-110 active:scale-[0.98] transition-all tracking-wider cursor-pointer border border-[#FCE59C]/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7F1E3] whitespace-nowrap"
          >
            Menu
          </button>

          <a
            href={RESTAURANT_INFO.phoneHref}
            aria-label="Call Restaurant"
            className="hidden sm:inline-flex md:hidden text-[#ECC55F] hover:text-[#F7F1E3] p-2 rounded-full hover:bg-white/10 border border-[#D4AF37]/35"
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

      {/* Mobile Dropdown Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          aria-label="Mobile Navigation"
          className="md:hidden bg-[#211D25] border-t border-[#D4AF37]/35 px-4 py-4 space-y-4 shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto"
        >
          {/* Main Pages + Theme & Instagram Row */}
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left font-semibold text-sm uppercase tracking-wider py-2.5 px-3 rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#ECC55F] bg-[#2D2733] border border-[#D4AF37]/35'
                      : 'text-[#F7F1E3] hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              type="button"
              onClick={onToggleTheme}
              className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#18151B] border border-[#D4AF37]/35 text-xs font-bold uppercase tracking-wider text-[#ECC55F] cursor-pointer"
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Light Ivory Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Dark Charcoal Mode</span>
                </>
              )}
            </button>
            <a
              href={RESTAURANT_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 py-2 px-3 rounded-lg bg-[#18151B] border border-[#D4AF37]/35 text-xs font-bold uppercase tracking-wider text-[#F7F1E3]"
            >
              <Instagram className="w-3.5 h-3.5 text-[#ECC55F]" aria-hidden="true" />
              <span>Instagram</span>
            </a>
          </div>

          {/* Direct Section Jump Selector */}
          <div className="rounded-xl bg-[#18151B] border border-[#D4AF37]/25 p-3 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setMobileSectionsGroup('home')}
                className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
                  mobileSectionsGroup === 'home'
                    ? 'bg-[#27222C] text-[#ECC55F] border-[#D4AF37]/45'
                    : 'bg-transparent text-[#B4A89B] border-transparent hover:text-[#F7F1E3]'
                }`}
              >
                <Compass className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Home Sections</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileSectionsGroup('menu')}
                className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
                  mobileSectionsGroup === 'menu'
                    ? 'bg-[#27222C] text-[#ECC55F] border-[#D4AF37]/45'
                    : 'bg-transparent text-[#B4A89B] border-transparent hover:text-[#F7F1E3]'
                }`}
              >
                <UtensilsCrossed className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Menu Sections</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${
                    mobileSectionsGroup === 'menu' ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
            </div>

            {mobileSectionsGroup === 'home' ? (
              <div className="grid grid-cols-2 gap-1.5">
                {HOME_SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => handleNavClick('home', sec.id)}
                    className="text-left px-3 py-2 rounded-lg bg-[#27222C]/70 hover:bg-[#2E2834] text-xs font-medium text-[#D8CFC4] hover:text-[#F7F1E3] border border-[#D4AF37]/20 transition-colors cursor-pointer truncate"
                  >
                    {sec.label}
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-1.5">
                {MENU_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => handleNavClick('menu', category.id)}
                    className="text-left px-3 py-2 rounded-lg bg-[#27222C]/70 hover:bg-[#2E2834] text-xs font-medium text-[#D8CFC4] hover:text-[#ECC55F] border border-[#D4AF37]/20 transition-colors cursor-pointer truncate"
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
