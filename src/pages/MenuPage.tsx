import { useEffect, useRef, useState } from 'react';
import {
  UtensilsCrossed,
  ShieldCheck,
  Flame,
  Users,
  CalendarClock,
  ChevronDown,
  CheckCircle2,
  Check,
  Leaf,
  ListFilter,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { ResilientImage } from '../components/ResilientImage';
import {
  BIRYANI_ITEMS,
  DAILY_WEEKEND_SPECIALS,
  DietaryFilter,
  EXTRAS_ITEMS,
  LAMB_CURRIES,
  LASSI_ITEMS,
  MANDI_ITEMS,
  MENU_CATEGORIES,
  MURGH_CURRIES,
  PLATTER_ITEMS,
  RESTAURANT_INFO,
  ROTI_ITEMS,
  STARTERS_ITEMS,
  TANDOOR_ITEMS,
  VEG_ITEMS,
} from '../data/restaurantData';

interface MenuPageProps {
  initialSectionRequest?: { id: string; nonce: number };
}

const DIETARY_OPTIONS: Array<{ id: DietaryFilter; label: string }> = [
  { id: 'all', label: 'All Dishes' },
  { id: 'halal', label: '100% Halal' },
  { id: 'veg', label: 'Pure Veg' },
  { id: 'spicy', label: 'Spicy & Specialties' },
];

export function MenuPage({ initialSectionRequest }: MenuPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>(
    initialSectionRequest?.id || MENU_CATEGORIES[0].id
  );
  const [mobileSectionDropdownOpen, setMobileSectionDropdownOpen] = useState(false);
  const [dietaryFilter, setDietaryFilter] = useState<DietaryFilter>('all');
  const [tandooriPortion, setTandooriPortion] = useState<'Half' | 'Full'>('Half');
  const [biryaniSizes, setBiryaniSizes] = useState<Record<string, 'regular' | 'large' | 'family'>>({
    'biryani-lamb': 'regular',
    'biryani-chicken': 'regular',
  });
  const [expandedPlatters, setExpandedPlatters] = useState<Record<string, boolean>>({
    'platter-mini': false,
    'platter-mix': false,
  });
  const [lightboxDish, setLightboxDish] = useState<{ name: string; imageUrl: string } | null>(null);

  const navContainerRef = useRef<HTMLElement>(null);
  const manualLockUntilRef = useRef<number>(0);

  useEffect(() => {
    if (!lightboxDish) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxDish(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxDish]);

  useEffect(() => {
    if (!mobileSectionDropdownOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileSectionDropdownOpen(false);
    };
    const handlePointerDown = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setMobileSectionDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [mobileSectionDropdownOpen]);

  useEffect(() => {
    if (initialSectionRequest?.id) {
      setActiveCategory(initialSectionRequest.id);
      setMobileSectionDropdownOpen(false);
      manualLockUntilRef.current = Date.now() + 1100;
      const timer = window.setTimeout(() => {
        document.getElementById(initialSectionRequest.id)?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
      return () => window.clearTimeout(timer);
    }
  }, [initialSectionRequest]);

  useEffect(() => {
    const sectionIds = MENU_CATEGORIES.map((c) => c.id);
    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < manualLockUntilRef.current) return;
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target?.id) {
          setActiveCategory(visible.target.id);
        }
      },
      { rootMargin: '-180px 0px -60% 0px', threshold: 0.05 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [dietaryFilter]);

  const matchesFilter = (dietary: Array<Exclude<DietaryFilter, 'all'>>) => {
    if (dietaryFilter === 'all') return true;
    return dietary.includes(dietaryFilter);
  };

  const specials = DAILY_WEEKEND_SPECIALS.filter((item) => matchesFilter(item.dietary));
  const starters = STARTERS_ITEMS.filter((item) => matchesFilter(item.dietary));
  const tandoor = TANDOOR_ITEMS.filter((item) => matchesFilter(item.dietary));
  const platters = PLATTER_ITEMS.filter((item) => matchesFilter(item.dietary));
  const biryanis = BIRYANI_ITEMS.filter((item) => matchesFilter(item.dietary));
  const lambCurries = LAMB_CURRIES.filter((item) => matchesFilter(item.dietary));
  const murghCurries = MURGH_CURRIES.filter((item) => matchesFilter(item.dietary));
  const mandis = MANDI_ITEMS.filter((item) => matchesFilter(item.dietary));
  const vegItems = VEG_ITEMS.filter((item) => matchesFilter(item.dietary));
  const rotiItems = ROTI_ITEMS.filter((item) => matchesFilter(item.dietary));
  const extrasItems = EXTRAS_ITEMS.filter((item) => matchesFilter(item.dietary));
  const lassiItems = LASSI_ITEMS.filter((item) => matchesFilter(item.dietary));

  const sectionCounts: Record<string, number> = {
    specials: specials.length,
    starters: starters.length,
    tandoor: tandoor.length,
    platters: platters.length,
    biryani: biryanis.length,
    lamb: lambCurries.length,
    murgh: murghCurries.length,
    mandi: mandis.length,
    veg: vegItems.length,
    roti: rotiItems.length,
    extras: extrasItems.length,
    lassi: lassiItems.length,
  };

  const scrollToSection = (id: string) => {
    setActiveCategory(id);
    setMobileSectionDropdownOpen(false);
    manualLockUntilRef.current = Date.now() + 1200;
    const count = sectionCounts[id] ?? 0;
    if (count === 0 && dietaryFilter !== 'all') {
      setDietaryFilter('all');
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const togglePlatter = (id: string) => {
    setExpandedPlatters((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const activeCategoryMeta =
    MENU_CATEGORIES.find((cat) => cat.id === activeCategory) || MENU_CATEGORIES[0];

  const renderPrice = (price: string, large = false) => (
    <span
      className={`font-serif font-bold text-[#9A6B10] dark:text-[#ECC55F] tabular-nums tracking-tight shrink-0 ${
        large ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
      }`}
    >
      <span className="text-xs font-semibold text-[#B5851E] dark:text-[#D4AF37] mr-0.5">£</span>
      {price}
    </span>
  );

  const renderDishCardImage = (imageUrl: string | undefined, name: string) => {
    if (!imageUrl) return null;
    return (
      <button
        type="button"
        onClick={() => setLightboxDish({ name, imageUrl })}
        aria-label={`View photo of ${name}`}
        className="group/img relative w-full aspect-[4/3] overflow-hidden bg-[#F2E9D6] dark:bg-[#1D1921] block cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A6B10] dark:focus-visible:outline-[#F0C75E]"
      >
        <ResilientImage
          src={imageUrl}
          alt={name}
          fallbackLabel={name}
          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 ease-out"
        />
      </button>
    );
  };

  const renderListDishThumb = (imageUrl: string | undefined, name: string) => {
    if (!imageUrl) return null;
    return (
      <button
        type="button"
        onClick={() => setLightboxDish({ name, imageUrl })}
        aria-label={`View photo of ${name}`}
        className="group/img relative w-28 sm:w-32 aspect-[4/3] rounded-lg overflow-hidden border border-[#D4AF37]/30 bg-[#F2E9D6] dark:bg-[#1D1921] shrink-0 cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A6B10] dark:focus-visible:outline-[#F0C75E]"
      >
        <ResilientImage
          src={imageUrl}
          alt={name}
          fallbackLabel={name}
          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 ease-out"
        />
      </button>
    );
  };

  return (
    <div className="flex flex-col w-full bg-gradient-to-b from-[#FAF5EA] via-[#F7F0E0] to-[#FAF5EA] dark:from-[#1A171D] dark:via-[#1E1A22] dark:to-[#1A171D] transition-colors">
      {/* 1. MENU HEADER BANNER */}
      <section className="relative w-full bg-[#18151B] text-[#F7F1E3] overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <ResilientImage
            src={RESTAURANT_INFO.menuHeroImageUrl}
            alt="Hyderabadi Mehfil feast spread of copper biryani handis, charcoal kebabs, curries, and garlic naan"
            eager
            className="w-full h-full object-cover object-center opacity-85"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#1A171D]/88 via-[#1A171D]/45 to-[#18151B]/35 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(24,21,27,0.46)_0%,transparent_72%)] pointer-events-none"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 lg:px-12 text-center">
          <div className="inline-flex items-center gap-2 text-[#ECC55F] text-xs font-bold uppercase tracking-[0.22em] mb-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.75)]">
            <UtensilsCrossed className="w-3.5 h-3.5 text-[#F0C75E]" aria-hidden="true" />
            <span>Chef Selection</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F1E3] mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.75)]">
            MENU
          </h1>

          <div className="flex items-center justify-center gap-4 max-w-xs mx-auto my-3">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#ECC55F]/75" />
            <Flame className="w-4 h-4 text-[#F0C75E]" aria-hidden="true" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#ECC55F]/75" />
          </div>

          <p className="text-base sm:text-lg text-[#F7F1E3] max-w-2xl mx-auto mt-3 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">
            Experience the rich flavors of Hyderabad with our authentic chicken and lamb dum
            biryani, served fresh at 290 Ilford Lane.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-7 text-xs sm:text-sm font-semibold text-[#ECC55F] drop-shadow-[0_2px_6px_rgba(0,0,0,0.75)]">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#F0C75E]" aria-hidden="true" />
              <span>100% Halal</span>
            </span>
            <span className="text-[#D4AF37]/60">•</span>
            <span className="inline-flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-[#F0C75E]" aria-hidden="true" />
              <span>Authentic Dum Pukht</span>
            </span>
            <span className="text-[#D4AF37]/60">•</span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#F0C75E]" aria-hidden="true" />
              <span>Feast Platters Available</span>
            </span>
          </div>
        </div>
      </section>

      {/* 2. STICKY CATEGORY NAVIGATION: DROPDOWN ON MOBILE, WRAPPED PILLS ON DESKTOP */}
      <nav
        ref={navContainerRef}
        aria-label="Menu Categories"
        className="sticky top-16 md:top-20 z-30 bg-[#18151B]/95 backdrop-blur-md border-b border-[#D4AF37]/30 shadow-xs"
      >
        {/* Mobile Section Dropdown Bar */}
        <div className="lg:hidden px-4 py-2.5">
          <button
            type="button"
            aria-expanded={mobileSectionDropdownOpen}
            aria-haspopup="listbox"
            onClick={() => setMobileSectionDropdownOpen((prev) => !prev)}
            className="w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-[#27222C] border border-[#D4AF37]/45 text-left shadow-sm active:bg-[#2E2834] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0C75E]"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C99B35] to-[#F0C75E] text-[#1D1810] flex items-center justify-center shrink-0">
                <ListFilter className="w-4 h-4" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#ECC55F] leading-tight">
                  Menu Sections ({MENU_CATEGORIES.length})
                </span>
                <span className="block text-sm font-serif font-semibold text-[#F7F1E3] truncate leading-snug">
                  {activeCategoryMeta.label}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D8CFC4] bg-[#18151B] border border-[#D4AF37]/30 px-2.5 py-1 rounded-md">
                Select
              </span>
              <ChevronDown
                className={`w-4 h-4 text-[#ECC55F] transition-transform duration-200 ${
                  mobileSectionDropdownOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </div>
          </button>

          {mobileSectionDropdownOpen && (
            <div
              role="listbox"
              aria-label="Select menu section"
              className="mt-2 rounded-xl bg-[#211D25] border border-[#D4AF37]/40 shadow-2xl max-h-[65vh] overflow-y-auto p-2 grid grid-cols-2 gap-1.5"
            >
              {MENU_CATEGORIES.map((category) => {
                const isActive = activeCategory === category.id;
                const count = sectionCounts[category.id] ?? 0;
                return (
                  <button
                    key={category.id}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => scrollToSection(category.id)}
                    className={`w-full flex items-center justify-between gap-1.5 px-2.5 py-2.5 rounded-lg text-left transition-colors border cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#C99B35] via-[#F0C75E] to-[#D4A63B] text-[#1D1810] border-[#FCE59C]/60 font-bold'
                        : 'bg-[#27222C]/85 hover:bg-[#322B39] text-[#F7F1E3] border-[#D4AF37]/20 font-medium'
                    }`}
                  >
                    <span className="text-[11px] uppercase tracking-wide leading-tight truncate">
                      {category.label}
                    </span>
                    <div className="flex items-center gap-1 shrink-0">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded tabular-nums ${
                          isActive
                            ? 'bg-[#1D1810]/15 text-[#1D1810]'
                            : count === 0
                            ? 'bg-[#18151B] text-[#B4A89B]'
                            : 'bg-[#18151B] text-[#ECC55F]'
                        }`}
                      >
                        {count > 0 ? count : 'All'}
                      </span>
                      {isActive && <Check className="w-3 h-3 shrink-0" aria-hidden="true" />}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Desktop Wrapped Category Bar */}
        <div className="hidden lg:block max-w-7xl mx-auto px-12">
          <div className="flex flex-wrap justify-center gap-2 py-2.5 text-nowrap">
            {MENU_CATEGORIES.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => scrollToSection(category.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0C75E] whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-[#C99B35] via-[#F0C75E] to-[#D4A63B] text-[#1D1810] border-[#FCE59C]/60 shadow-sm'
                      : 'bg-[#27222C] text-[#D8CFC4] border-[#D4AF37]/25 hover:bg-[#322B39] hover:text-[#F7F1E3]'
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* 3. DIETARY FILTER CONTROLS */}
      <div className="w-full bg-[#F2E9D6] dark:bg-[#211D25] border-b border-[#D4AF37]/30 dark:border-[#D4AF37]/25 py-3 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal
              className="w-4 h-4 text-[#9A6B10] dark:text-[#ECC55F]"
              aria-hidden="true"
            />
            <span className="text-xs font-bold uppercase tracking-wider text-[#1F1A17] dark:text-[#F7F1E3]">
              Dietary Filter:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {DIETARY_OPTIONS.map((option) => {
              const isSelected = dietaryFilter === option.id;
              const isVegOption = option.id === 'veg';
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setDietaryFilter(option.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A6B10] dark:focus-visible:outline-[#F0C75E] whitespace-nowrap ${
                    isSelected
                      ? isVegOption
                        ? 'bg-[#166534] text-[#F0FDF4] border-[#15803D]/70 dark:border-[#4ADE80]/60 shadow-xs'
                        : 'bg-gradient-to-r from-[#C99B35] via-[#F0C75E] to-[#D4A63B] text-[#1D1810] border-[#FCE59C]/60 shadow-xs'
                      : isVegOption
                      ? 'bg-white dark:bg-[#27222C] text-[#15803D] dark:text-[#4ADE80] border-[#15803D]/35 dark:border-[#4ADE80]/35 hover:bg-[#166534]/10 dark:hover:bg-[#166534]/25'
                      : 'bg-white dark:bg-[#27222C] text-[#4E4237] dark:text-[#D8CFC4] border-[#D4AF37]/35 dark:border-[#D4AF37]/30 hover:border-[#D4AF37] hover:text-[#1F1A17] dark:hover:text-[#F7F1E3]'
                  }`}
                >
                  {isVegOption && <Leaf className="w-3.5 h-3.5" aria-hidden="true" />}
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. MENU SECTIONS */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 py-12 md:py-16 space-y-16 md:space-y-20">
        {/* SECTION 1: DAILY & WEEKEND SPECIAL */}
        {specials.length > 0 && (
          <section id="specials" className="scroll-mt-36">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#9A6B10] dark:text-[#ECC55F]">
                  Kitchen Schedule
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F1A17] dark:text-[#F7F1E3] mt-1">
                  DAILY &amp; WEEKEND SPECIAL
                </h2>
                <p className="text-sm sm:text-base text-[#4E4237] dark:text-[#D8CFC4] mt-1">
                  Slow-cooked handis and heritage recipes prepared on scheduled days of the week.
                </p>
              </div>
              <span className="self-start md:self-auto inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#9A6B10] dark:text-[#ECC55F]">
                <CalendarClock
                  className="w-4 h-4 text-[#9A6B10] dark:text-[#ECC55F]"
                  aria-hidden="true"
                />
                <span>Day-Wise Schedule</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specials.map((item) => (
                <article
                  key={item.id}
                  className="bg-white dark:bg-[#27222C] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between border border-[#D4AF37]/30 dark:border-[#D4AF37]/25 hover:border-[#D4AF37]/80 dark:hover:border-[#D4AF37]/65"
                >
                  <div>
                    {renderDishCardImage(item.imageUrl, item.name)}
                    <div className="p-6">
                      <div className="flex items-baseline justify-between gap-2 mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#9A6B10] dark:text-[#ECC55F]">
                          {item.dayLabel}
                        </span>
                        {renderPrice(item.price, true)}
                      </div>
                      <h3 className="font-serif text-xl font-semibold text-[#1F1A17] dark:text-[#F7F1E3] mb-2">
                        {item.name}
                      </h3>
                      <p className="text-sm text-[#4E4237] dark:text-[#D8CFC4] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 py-3.5 border-t border-[#D4AF37]/25 dark:border-[#D4AF37]/20 flex items-center justify-between bg-[#FAF5EA] dark:bg-[#211D25]">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B5B4E] dark:text-[#B4A89B]">
                      {item.scheduleTag}
                    </span>
                    <Flame className="w-4 h-4 text-[#9A6B10] dark:text-[#ECC55F]" aria-hidden="true" />
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 2: STARTERS */}
        {starters.length > 0 && (
          <section id="starters" className="scroll-mt-36">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-[#9A6B10] dark:text-[#ECC55F]">
                Appetizers &amp; Quick Bites
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F1A17] dark:text-[#F7F1E3] mt-1">
                STARTERS
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {starters.map((item) => (
                <article
                  key={item.id}
                  className={`bg-white dark:bg-[#27222C] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between border ${
                    item.isVeg
                      ? 'border-[#15803D]/35 dark:border-[#4ADE80]/35 hover:border-[#15803D]/70 dark:hover:border-[#4ADE80]/65'
                      : 'border-[#D4AF37]/30 dark:border-[#D4AF37]/25 hover:border-[#D4AF37]/80 dark:hover:border-[#D4AF37]/65'
                  }`}
                >
                  <div>
                    {renderDishCardImage(item.imageUrl, item.name)}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          {item.isVeg && (
                            <span
                              title="Vegetarian"
                              className="w-2.5 h-2.5 rounded-full bg-[#15803D] dark:bg-[#4ADE80] inline-block shrink-0"
                            />
                          )}
                          <h3 className="font-serif text-xl font-semibold text-[#1F1A17] dark:text-[#F7F1E3]">
                            {item.name}
                          </h3>
                        </div>
                        {renderPrice(item.price)}
                      </div>
                      {item.portion && (
                        <span
                          className={`block text-[11px] font-bold uppercase tracking-wider mb-2.5 ${
                            item.isVeg
                              ? 'text-[#15803D] dark:text-[#4ADE80]'
                              : 'text-[#9A6B10] dark:text-[#ECC55F]'
                          }`}
                        >
                          {item.isVeg ? `Vegetarian · ${item.portion}` : item.portion}
                        </span>
                      )}
                      <p className="text-sm text-[#4E4237] dark:text-[#D8CFC4] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 3: TANDOOR */}
        {tandoor.length > 0 && (
          <section id="tandoor" className="scroll-mt-36">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-[#9A6B10] dark:text-[#ECC55F]">
                Clay Oven Specialties
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F1A17] dark:text-[#F7F1E3] mt-1">
                TANDOOR
              </h2>
              <p className="text-sm sm:text-base text-[#4E4237] dark:text-[#D8CFC4] mt-1">
                Charcoal grilled with house-ground marinades and aromatic oils.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tandoor.map((item) => {
                const activeTandoorOption = item.selectablePortions?.find(
                  (p) => p.label === tandooriPortion
                );
                const displayedPrice = activeTandoorOption
                  ? activeTandoorOption.price
                  : item.price || '';

                return (
                  <article
                    key={item.id}
                    className={`bg-white dark:bg-[#27222C] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between border ${
                      item.isVeg
                        ? 'border-[#15803D]/35 dark:border-[#4ADE80]/35 hover:border-[#15803D]/70 dark:hover:border-[#4ADE80]/65'
                        : 'border-[#D4AF37]/30 dark:border-[#D4AF37]/25 hover:border-[#D4AF37]/80 dark:hover:border-[#D4AF37]/65'
                    }`}
                  >
                    <div>
                      {renderDishCardImage(item.imageUrl, item.name)}
                      <div className="p-5">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          {item.badge ? (
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#9A6B10] dark:text-[#ECC55F]">
                              {item.badge}
                            </span>
                          ) : item.portion ? (
                            <span
                              className={`text-[11px] font-bold uppercase tracking-wider ${
                                item.isVeg
                                  ? 'text-[#15803D] dark:text-[#4ADE80]'
                                  : 'text-[#9A6B10] dark:text-[#ECC55F]'
                              }`}
                            >
                              {item.isVeg ? `Veg · ${item.portion}` : item.portion}
                            </span>
                          ) : (
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#9A6B10] dark:text-[#ECC55F]">
                              Tandoor
                            </span>
                          )}
                          {renderPrice(displayedPrice)}
                        </div>

                        <h3 className="font-serif text-lg font-semibold text-[#1F1A17] dark:text-[#F7F1E3] mb-1.5">
                          {item.name}
                        </h3>
                        <p className="text-sm text-[#4E4237] dark:text-[#D8CFC4] leading-relaxed">
                          {item.description}
                        </p>

                        {item.selectablePortions && (
                          <div className="mt-4 inline-flex gap-1 bg-[#F2E9D6] dark:bg-[#1B181F] rounded-lg p-1 border border-[#D4AF37]/35 dark:border-[#D4AF37]/30">
                            {item.selectablePortions.map((opt) => {
                              const selected = tandooriPortion === opt.label;
                              return (
                                <button
                                  key={opt.label}
                                  type="button"
                                  onClick={() =>
                                    setTandooriPortion(opt.label as 'Half' | 'Full')
                                  }
                                  className={`px-3 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                                    selected
                                      ? 'bg-gradient-to-r from-[#C99B35] to-[#F0C75E] text-[#1D1810]'
                                      : 'text-[#4E4237] hover:text-[#1F1A17] dark:text-[#D8CFC4] dark:hover:text-[#F7F1E3]'
                                  }`}
                                >
                                  {opt.label}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* SECTION 4: PLATTERS (Expandable) */}
        {platters.length > 0 && (
          <section id="platters" className="scroll-mt-36">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-[#9A6B10] dark:text-[#ECC55F]">
                Sharing Feasts
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F1A17] dark:text-[#F7F1E3] mt-1">
                PLATTERS
              </h2>
              <p className="text-sm sm:text-base text-[#4E4237] dark:text-[#D8CFC4] mt-1">
                Crafted for solo tasting or sharing at the table.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {platters.map((platter) => {
                const isExpanded = !!expandedPlatters[platter.id];
                return (
                  <article
                    key={platter.id}
                    className="bg-white dark:bg-[#27222C] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow border border-[#D4AF37]/30 flex flex-col"
                  >
                    {renderDishCardImage(platter.imageUrl, platter.name)}

                    <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <span className="block text-[11px] font-bold uppercase tracking-wider text-[#9A6B10] dark:text-[#ECC55F]">
                              {platter.tag}
                            </span>
                            <h3 className="font-serif text-2xl font-semibold text-[#1F1A17] dark:text-[#F7F1E3] mt-1">
                              {platter.name}
                            </h3>
                          </div>
                          {renderPrice(platter.price, true)}
                        </div>

                        <p className="text-sm sm:text-base text-[#4E4237] dark:text-[#D8CFC4] mb-4">
                          {platter.description}
                        </p>
                      </div>

                      <div>
                        <button
                          type="button"
                          aria-expanded={isExpanded}
                          onClick={() => togglePlatter(platter.id)}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#9A6B10] hover:text-[#1F1A17] dark:text-[#ECC55F] dark:hover:text-[#F7F1E3] transition-colors py-1.5 cursor-pointer"
                        >
                          <span>
                            {isExpanded ? 'Hide Platter Contents' : 'Explore Platter Contents'}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                            aria-hidden="true"
                          />
                        </button>

                        {isExpanded && (
                          <ul className="mt-4 pt-4 border-t border-[#D4AF37]/25 dark:border-[#D4AF37]/20 space-y-2">
                            {platter.contents.map((line) => (
                              <li
                                key={line}
                                className="flex items-center gap-2.5 text-sm text-[#1F1A17] dark:text-[#F7F1E3]"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C99B35] dark:bg-[#F0C75E] shrink-0" />
                                <span>{line}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* SECTION 5: HYDERABADI DUM BIRYANI */}
        {biryanis.length > 0 && (
          <section id="biryani" className="scroll-mt-36">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-[#9A6B10] dark:text-[#ECC55F]">
                Signature Handi Biryanis
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F1A17] dark:text-[#F7F1E3] mt-1">
                HYDERABADI DUM BIRYANI
              </h2>
              <p className="text-sm sm:text-base text-[#4E4237] dark:text-[#D8CFC4] mt-1">
                Slow-cooked in sealed handis with long-grain basmati, saffron, and whole spices.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {biryanis.map((biryani) => {
                const selectedSizeKey = biryaniSizes[biryani.id] || 'regular';
                const selectedSize =
                  biryani.sizes.find((s) => s.key === selectedSizeKey) || biryani.sizes[0];

                return (
                  <article
                    key={biryani.id}
                    className="bg-white dark:bg-[#27222C] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between border-2 border-[#D4AF37]/45 dark:border-[#D4AF37]/40 hover:border-[#D4AF37] transition-colors"
                  >
                    <div>
                      {renderDishCardImage(biryani.imageUrl, biryani.name)}

                      <div className="p-6 sm:p-7">
                        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#9A6B10] dark:text-[#ECC55F]">
                            {biryani.tag}
                          </span>
                          <div className="text-right">
                            {renderPrice(selectedSize.price, true)}
                            <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#6B5B4E] dark:text-[#B4A89B]">
                              {selectedSize.label} portion
                            </span>
                          </div>
                        </div>

                        <h3 className="font-serif text-2xl font-bold text-[#1F1A17] dark:text-[#F7F1E3] mb-2">
                          {biryani.name}
                        </h3>
                        <p className="text-sm sm:text-base text-[#4E4237] dark:text-[#D8CFC4] leading-relaxed mb-6">
                          {biryani.description}
                        </p>

                        {/* Selectable Portion Size Controls */}
                        <div className="bg-[#F2E9D6] dark:bg-[#1D1921] p-4 rounded-xl mb-5 border border-[#D4AF37]/30 dark:border-[#D4AF37]/25">
                          <span className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5B4E] dark:text-[#B4A89B] mb-2.5">
                            Select Portion Size:
                          </span>
                          <div className="grid grid-cols-3 gap-2">
                            {biryani.sizes.map((size) => {
                              const active = selectedSizeKey === size.key;
                              return (
                                <button
                                  key={size.key}
                                  type="button"
                                  aria-pressed={active}
                                  onClick={() =>
                                    setBiryaniSizes((prev) => ({
                                      ...prev,
                                      [biryani.id]: size.key,
                                    }))
                                  }
                                  className={`py-2.5 px-2 sm:px-3 text-center rounded-xl text-xs sm:text-sm font-bold transition-all border cursor-pointer ${
                                    active
                                      ? 'bg-gradient-to-r from-[#C99B35] via-[#F0C75E] to-[#D4A63B] text-[#1D1810] border-[#FCE59C]/60 shadow-sm'
                                      : 'bg-white dark:bg-[#27222C] text-[#4E4237] dark:text-[#D8CFC4] border-[#D4AF37]/25 dark:border-[#D4AF37]/20 hover:bg-[#FAF5EA] dark:hover:bg-[#322B39] hover:text-[#1F1A17] dark:hover:text-[#F7F1E3]'
                                  }`}
                                >
                                  <span className="block">{size.label}</span>
                                  <span className="block text-[11px] font-normal opacity-90">
                                    {size.serves}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-[#D4AF37]/25 dark:border-[#D4AF37]/20 flex items-center gap-2 text-xs sm:text-sm text-[#4E4237] dark:text-[#D8CFC4]">
                          <CheckCircle2
                            className="w-4 h-4 text-[#9A6B10] dark:text-[#ECC55F] shrink-0"
                            aria-hidden="true"
                          />
                          <span>{biryani.accompaniment}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* SECTIONS 6 & 7: MEHFIL-E-LAMB & MEHFIL-E-MURGH */}
        {(lambCurries.length > 0 || murghCurries.length > 0) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
            {lambCurries.length > 0 && (
              <section id="lamb" className="scroll-mt-36">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#9A6B10] dark:text-[#ECC55F]">
                    Rich Gravies
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F1A17] dark:text-[#F7F1E3] mt-1">
                    MEHFIL-E-LAMB
                  </h2>
                  <p className="text-sm sm:text-base text-[#4E4237] dark:text-[#D8CFC4] mt-1">
                    Tender Scottish lamb braised in traditional copper degchi sauces.
                  </p>
                </div>

                <div className="space-y-4">
                  {lambCurries.map((dish) => (
                    <article
                      key={dish.id}
                      className="bg-white dark:bg-[#27222C] p-5 rounded-xl shadow-xs flex items-center justify-between gap-4 border border-[#D4AF37]/30 dark:border-[#D4AF37]/25 hover:border-[#D4AF37]/80 dark:hover:border-[#D4AF37]/65 transition-colors"
                    >
                      <div className="flex items-center gap-4 min-w-0 flex-1">
                        {renderListDishThumb(dish.imageUrl, dish.name)}
                        <div className="min-w-0">
                          <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#1F1A17] dark:text-[#F7F1E3]">
                            {dish.name}
                          </h3>
                          <p className="text-sm text-[#4E4237] dark:text-[#D8CFC4] mt-1">
                            {dish.description}
                          </p>
                        </div>
                      </div>
                      {renderPrice(dish.price)}
                    </article>
                  ))}
                </div>
              </section>
            )}

            {murghCurries.length > 0 && (
              <section id="murgh" className="scroll-mt-36">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#9A6B10] dark:text-[#ECC55F]">
                    Chicken Specialties
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F1A17] dark:text-[#F7F1E3] mt-1">
                    MEHFIL-E-MURGH
                  </h2>
                  <p className="text-sm sm:text-base text-[#4E4237] dark:text-[#D8CFC4] mt-1">
                    Signature poultry creations stewed in fragrant gravies.
                  </p>
                </div>

                <div className="space-y-4">
                  {murghCurries.map((dish) => (
                    <article
                      key={dish.id}
                      className="bg-white dark:bg-[#27222C] p-5 rounded-xl shadow-xs flex items-center justify-between gap-4 border border-[#D4AF37]/30 dark:border-[#D4AF37]/25 hover:border-[#D4AF37]/80 dark:hover:border-[#D4AF37]/65 transition-colors"
                    >
                      <div className="flex items-center gap-4 min-w-0 flex-1">
                        {renderListDishThumb(dish.imageUrl, dish.name)}
                        <div className="min-w-0">
                          {dish.badge && (
                            <span className="block text-[10px] uppercase font-bold tracking-wider text-[#9A6B10] dark:text-[#ECC55F] mb-0.5">
                              {dish.badge}
                            </span>
                          )}
                          <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#1F1A17] dark:text-[#F7F1E3]">
                            {dish.name}
                          </h3>
                          <p className="text-sm text-[#4E4237] dark:text-[#D8CFC4] mt-1">
                            {dish.description}
                          </p>
                        </div>
                      </div>
                      {renderPrice(dish.price)}
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* SECTION 8: MEHFIL-E-MANDI */}
        {mandis.length > 0 && (
          <section id="mandi" className="scroll-mt-36">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-[#9A6B10] dark:text-[#ECC55F]">
                Arabian-Hyderabadi Fusion
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F1A17] dark:text-[#F7F1E3] mt-1">
                MEHFIL-E-MANDI
              </h2>
              <p className="text-sm sm:text-base text-[#4E4237] dark:text-[#D8CFC4] mt-1">
                Succulent roasted meats served over spiced long mandi rice, served in traditional
                communal platters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mandis.map((mandi) => (
                <article
                  key={mandi.id}
                  className="bg-white dark:bg-[#27222C] rounded-xl overflow-hidden shadow-xs flex flex-col justify-between border border-[#D4AF37]/30 dark:border-[#D4AF37]/25 hover:border-[#D4AF37]/80 dark:hover:border-[#D4AF37]/65 transition-colors"
                >
                  <div>
                    {renderDishCardImage(mandi.imageUrl, mandi.name)}
                    <div className="p-6">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-[#9A6B10] dark:text-[#ECC55F]">
                        {mandi.tag}
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-[#1F1A17] dark:text-[#F7F1E3] mt-1.5 mb-2">
                        {mandi.name}
                      </h3>
                      <p className="text-sm text-[#4E4237] dark:text-[#D8CFC4] leading-relaxed">
                        {mandi.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <div className="bg-[#F2E9D6] dark:bg-[#1D1921] p-3.5 rounded-xl space-y-2 border border-[#D4AF37]/30 dark:border-[#D4AF37]/25">
                      {mandi.tiers.map((tier, index) => (
                        <div
                          key={tier.label}
                          className={`flex items-center justify-between text-sm ${
                            index === mandi.tiers.length - 1 && mandi.tiers.length > 1
                              ? 'pt-1.5 border-t border-[#D4AF37]/25 dark:border-[#D4AF37]/20'
                              : ''
                          }`}
                        >
                          <span
                            className={
                              tier.highlight
                                ? 'text-[#1F1A17] dark:text-[#F7F1E3] font-bold'
                                : 'text-[#4E4237] dark:text-[#D8CFC4] font-medium'
                            }
                          >
                            {tier.label}:
                          </span>
                          <span
                            className={`font-bold tabular-nums ${
                              tier.highlight
                                ? 'text-[#9A6B10] dark:text-[#F0C75E] text-base'
                                : 'text-[#9A6B10] dark:text-[#ECC55F]'
                            }`}
                          >
                            <span className="text-xs text-[#B5851E] dark:text-[#D4AF37] mr-0.5">
                              £
                            </span>
                            {tier.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 9: VEG ITEMS */}
        {vegItems.length > 0 && (
          <section id="veg" className="scroll-mt-36">
            <div className="flex items-center gap-3 mb-7">
              <span className="w-6 h-6 rounded-full bg-[#166534]/15 dark:bg-[#166534] border border-[#15803D]/40 dark:border-[#4ADE80]/50 flex items-center justify-center shadow-xs">
                <Leaf className="w-3.5 h-3.5 text-[#15803D] dark:text-[#4ADE80]" aria-hidden="true" />
              </span>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#15803D] dark:text-[#4ADE80] block">
                  Vegetarian Delights
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F1A17] dark:text-[#F7F1E3]">
                  VEG ITEMS
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vegItems.map((item) => (
                <article
                  key={item.id}
                  className="bg-white dark:bg-[#27222C] rounded-xl overflow-hidden shadow-xs flex flex-col justify-between border border-[#15803D]/30 dark:border-[#4ADE80]/30 hover:border-[#15803D]/70 dark:hover:border-[#4ADE80]/65 transition-colors"
                >
                  <div>
                    {renderDishCardImage(item.imageUrl, item.name)}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-serif text-xl font-semibold text-[#1F1A17] dark:text-[#F7F1E3]">
                          {item.name}
                        </h3>
                        {renderPrice(item.price)}
                      </div>
                      <p className="text-sm text-[#4E4237] dark:text-[#D8CFC4] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 10: MEHFIL-E-ROTI */}
        {rotiItems.length > 0 && (
          <section id="roti" className="scroll-mt-36">
            <div className="mb-7">
              <span className="text-xs font-bold uppercase tracking-widest text-[#9A6B10] dark:text-[#ECC55F]">
                From the Tandoori Pit
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F1A17] dark:text-[#F7F1E3] mt-1">
                MEHFIL-E-ROTI
              </h2>
              <p className="text-sm sm:text-base text-[#4E4237] dark:text-[#D8CFC4] mt-1">
                Freshly baked in our clay tandoor and brushed with melted butter.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {rotiItems.map((item) => (
                <article
                  key={item.id}
                  className="bg-white dark:bg-[#27222C] rounded-xl overflow-hidden shadow-xs text-center border border-[#D4AF37]/30 dark:border-[#D4AF37]/25 hover:border-[#D4AF37]/80 dark:hover:border-[#D4AF37]/65 transition-colors flex flex-col justify-between"
                >
                  <div>
                    {renderDishCardImage(item.imageUrl, item.name)}
                    <div className="p-4">
                      <div className="mb-1.5">{renderPrice(item.price)}</div>
                      <h3 className="font-serif text-base font-bold text-[#1F1A17] dark:text-[#F7F1E3] mb-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#4E4237] dark:text-[#D8CFC4] leading-snug">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* SECTIONS 11 & 12: EXTRAS & MEHFIL-E-LASSI */}
        {(extrasItems.length > 0 || lassiItems.length > 0) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
            {extrasItems.length > 0 && (
              <section id="extras" className="scroll-mt-36">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#9A6B10] dark:text-[#ECC55F]">
                    Accompaniments &amp; Portions
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F1A17] dark:text-[#F7F1E3] mt-1">
                    EXTRA&apos;S
                  </h2>
                </div>

                <div className="bg-white dark:bg-[#27222C] rounded-2xl p-6 shadow-xs border border-[#D4AF37]/30 divide-y divide-[#D4AF37]/20 dark:divide-[#D4AF37]/15">
                  {extrasItems.map((extra) => (
                    <div
                      key={extra.id}
                      className="flex items-center justify-between py-3 first:pt-1 last:pb-1"
                    >
                      <span className="text-base font-semibold text-[#1F1A17] dark:text-[#F7F1E3]">
                        {extra.name}
                      </span>
                      {renderPrice(extra.price)}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {lassiItems.length > 0 && (
              <section id="lassi" className="scroll-mt-36">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#9A6B10] dark:text-[#ECC55F]">
                    Chilled Yogurt Drinks
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F1A17] dark:text-[#F7F1E3] mt-1">
                    MEHFIL-E-LASSI
                  </h2>
                </div>

                <div className="space-y-4">
                  {lassiItems.map((lassi) => (
                    <article
                      key={lassi.id}
                      className={`p-5 rounded-xl shadow-xs flex items-center justify-between gap-4 border transition-colors ${
                        lassi.badge
                          ? 'bg-gradient-to-r from-[#FBF6EA] to-[#F3E8CE] dark:from-[#27222C] dark:to-[#2F2835] border-[#D4AF37]/50'
                          : 'bg-white dark:bg-[#27222C] border-[#D4AF37]/30 dark:border-[#D4AF37]/25 hover:border-[#D4AF37]/80 dark:hover:border-[#D4AF37]/65'
                      }`}
                    >
                      <div className="flex items-center gap-4 min-w-0 flex-1">
                        {renderListDishThumb(lassi.imageUrl, lassi.name)}
                        <div className="min-w-0">
                          {lassi.badge && (
                            <span className="block text-[10px] text-[#9A6B10] dark:text-[#ECC55F] uppercase font-bold tracking-wider mb-1">
                              {lassi.badge}
                            </span>
                          )}
                          <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#1F1A17] dark:text-[#F7F1E3]">
                            {lassi.name}
                          </h3>
                          <p className="text-sm text-[#4E4237] dark:text-[#D8CFC4] mt-0.5">
                            {lassi.description}
                          </p>
                        </div>
                      </div>
                      {renderPrice(lassi.price, Boolean(lassi.badge))}
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>

      {/* Dish Photo Lightbox */}
      {lightboxDish && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="menu-lightbox-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxDish(null);
          }}
          className="fixed inset-0 z-50 bg-[#141217]/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="relative max-w-2xl w-full bg-[#211D25] rounded-xl overflow-hidden shadow-2xl border border-[#D4AF37]/50">
            <div className="flex items-center justify-between gap-4 px-5 py-3.5 bg-[#18151B] text-[#F7F1E3] border-b border-[#D4AF37]/30">
              <span
                id="menu-lightbox-title"
                className="font-serif text-base sm:text-lg text-[#ECC55F] truncate"
              >
                {lightboxDish.name}
              </span>
              <button
                type="button"
                aria-label="Close photo preview"
                onClick={() => setLightboxDish(null)}
                className="p-1.5 rounded-full hover:bg-white/10 text-[#F7F1E3] cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="bg-[#141217] flex items-center justify-center max-h-[70vh] overflow-hidden">
              <ResilientImage
                src={lightboxDish.imageUrl}
                alt={lightboxDish.name}
                eager
                fallbackLabel={lightboxDish.name}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
