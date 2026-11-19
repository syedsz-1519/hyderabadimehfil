import { useEffect, useState } from 'react';
import {
  Utensils,
  Flame,
  ChefHat,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Star,
  MapPin,
  Phone,
  ArrowUpRight,
  Sparkles,
  Soup,
  IceCreamBowl,
  Wine,
} from 'lucide-react';
import {
  GALLERY_ITEMS,
  PageRoute,
  POPULAR_MAIN_COURSES,
  RESTAURANT_INFO,
  TESTIMONIALS,
} from '../data/restaurantData';
import { ResilientImage } from '../components/ResilientImage';

interface HomePageProps {
  onNavigate: (page: PageRoute, sectionId?: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex === null) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxIndex(null);
      } else if (event.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % GALLERY_ITEMS.length
        );
      } else if (event.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex]);

  const scrollToStory = () => {
    document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderDishIcon = (id: string) => {
    switch (id) {
      case 'popular-dessert':
        return <IceCreamBowl className="w-4 h-4 text-[#795902]" aria-hidden="true" />;
      case 'popular-lamb-biryani':
        return <Flame className="w-4 h-4 text-[#795902]" aria-hidden="true" />;
      case 'popular-mojito':
        return <Wine className="w-4 h-4 text-[#795902]" aria-hidden="true" />;
      default:
        return <Soup className="w-4 h-4 text-[#795902]" aria-hidden="true" />;
    }
  };

  const activeLightboxItem = lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null;

  return (
    <div className="flex flex-col w-full overflow-x-clip">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[85vh] md:min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#3A000D] text-[#FFF8F6]">
        {/* Slow-zoom atmospheric dish backdrop */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center animate-hero-zoom opacity-45 pointer-events-none"
          style={{ backgroundImage: `url("${RESTAURANT_INFO.heroImageUrl}")` }}
        />

        {/* Multi-stage scrims for crisp WCAG AA legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B1411]/95 via-[#3A000D]/80 to-[#5A0F1F]/70 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(27,20,17,0.78)_100%)] pointer-events-none" />
        <div className="absolute inset-0 jaali-lattice opacity-30 pointer-events-none" />

        {/* Ambient warm saffron steam wisps */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="steam-wisp-1 absolute -bottom-10 left-1/4 w-72 h-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(232,163,23,0.24)_0%,rgba(201,162,75,0.12)_45%,transparent_75%)] blur-2xl" />
          <div className="steam-wisp-2 absolute -bottom-12 right-1/4 w-80 h-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,223,158,0.22)_0%,rgba(201,162,75,0.1)_45%,transparent_75%)] blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 lg:px-12 py-16 md:py-24 flex flex-col items-center text-center">
          {/* Heritage Marker */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1B1411]/85 text-[#FFDF9E] border border-[#C9A24B]/45 backdrop-blur-md shadow-md mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#E8A317]" aria-hidden="true" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em]">
              ROYAL NIZAMI HERITAGE · ILFORD LANE
            </span>
          </div>

          {/* Verbatim Kicker */}
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-[#C9A24B]/80" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.28em] text-[#FFDF9E]">
              WE ARE THE BEST
            </span>
            <span className="h-px w-8 bg-[#C9A24B]/80" />
          </div>

          {/* Primary Display Title */}
          <h1 className="font-serif text-[2.35rem] sm:text-5xl lg:text-6xl font-bold text-[#FFF8F6] tracking-tight leading-[1.12] max-w-4xl mb-5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.65)]">
            Hyderabadi Mehfil Restaurant
          </h1>

          {/* Verbatim Subtitle */}
          <p className="text-base sm:text-lg text-[#F4E5E0] max-w-2xl mx-auto leading-relaxed mb-9 font-normal">
            Savor the taste of Hyderabad&apos;s finest biryani and dishes at our restaurant.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
            <button
              type="button"
              onClick={() => onNavigate('menu')}
              className="w-full sm:w-auto min-w-[180px] px-8 py-3.5 bg-gradient-to-r from-[#C9A24B] via-[#E8A317] to-[#C9A24B] text-[#241600] text-sm font-bold uppercase tracking-widest rounded-lg shadow-[0_8px_24px_rgba(232,163,23,0.3)] hover:brightness-110 active:scale-[0.98] transition-all border border-[#FFDF9E]/50 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFF8F6]"
            >
              [ MENU ]
            </button>
            <button
              type="button"
              onClick={scrollToStory}
              className="w-full sm:w-auto min-w-[180px] px-8 py-3.5 bg-[#5A0F1F]/90 hover:bg-[#5A0F1F] text-[#FFF8F6] text-sm font-semibold uppercase tracking-wider rounded-lg border border-[#C9A24B]/50 backdrop-blur-md shadow-md transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8A317]"
            >
              OUR STORY
            </button>
          </div>

          {/* Subtle Scroll Cue */}
          <button
            type="button"
            onClick={scrollToStory}
            aria-label="Scroll to Our Story"
            className="mt-12 inline-flex flex-col items-center gap-1 text-[#FFDF9E]/85 hover:text-[#FFDF9E] transition-colors cursor-pointer"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              Explore The Mehfil
            </span>
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* 2. ROYAL HERITAGE INTRO SPLIT SECTION (Warm Cream) */}
      <section id="our-story" className="relative py-16 md:py-24 bg-[#FFF8F6] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Storytelling Card */}
            <div className="lg:col-span-7">
              <div className="bg-[#FFF1EC] rounded-xl p-7 sm:p-11 shadow-sm border border-[#C9A24B]/30 relative overflow-hidden">
                <div className="absolute -right-12 -top-12 w-56 h-56 jaali-lattice opacity-60 pointer-events-none rounded-full" />

                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <span className="h-[2px] w-8 bg-[#795902]" />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#795902]">
                    Tradition Perfected
                  </span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#3A000D] tracking-tight mb-5 relative z-10">
                  Authentic Hyderabadi Biryani Cuisine in Ilford
                </h2>

                <p className="font-serif text-lg text-[#554243] italic mb-4 leading-relaxed relative z-10">
                  &ldquo;Savor the taste of Hyderabad&apos;s finest biryani and dishes at our
                  restaurant.&rdquo;
                </p>

                <p className="text-base text-[#554243] leading-relaxed mb-8 relative z-10">
                  Experience the rich flavors of Hyderabad with our authentic chicken and lamb dum
                  biryani, crafted with love and tradition right here in Ilford, England.
                </p>

                {/* Culinary Craft Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 p-5 rounded-lg bg-[#FFF8F6] border border-[#C9A24B]/25 relative z-10">
                  <div className="flex flex-col">
                    <ChefHat className="w-5 h-5 text-[#795902] mb-2" aria-hidden="true" />
                    <span className="font-serif text-base font-bold text-[#3A000D]">Dum Pukht</span>
                    <span className="text-xs text-[#554243] mt-0.5">Sealed slow clay cooking</span>
                  </div>
                  <div className="flex flex-col">
                    <Flame className="w-5 h-5 text-[#795902] mb-2" aria-hidden="true" />
                    <span className="font-serif text-base font-bold text-[#3A000D]">Pure Spices</span>
                    <span className="text-xs text-[#554243] mt-0.5">Saffron, cardamom &amp; mace</span>
                  </div>
                  <div className="flex flex-col">
                    <Utensils className="w-5 h-5 text-[#795902] mb-2" aria-hidden="true" />
                    <span className="font-serif text-base font-bold text-[#3A000D]">Royal Mandi</span>
                    <span className="text-xs text-[#554243] mt-0.5">Traditional feast platters</span>
                  </div>
                </div>

                {/* Kitchen Signature Row */}
                <div className="mt-7 pt-5 border-t border-[#C9A24B]/25 flex flex-wrap items-center justify-between gap-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#5A0F1F] text-[#FFDF9E] flex items-center justify-center font-serif font-bold text-sm border border-[#C9A24B]/50">
                      HM
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-[#3A000D]">
                        Master Nizami Ustaad
                      </span>
                      <span className="block text-xs text-[#554243]">
                        290 Ilford Lane Kitchen
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('menu')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#795902] hover:text-[#3A000D] transition-colors cursor-pointer"
                  >
                    <span>View Signature Selections</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Feature Dish Display & 150+ Taste Excellence Seal */}
            <div className="lg:col-span-5 relative pb-6 sm:pb-0">
              <div className="relative group rounded-xl overflow-hidden shadow-xl bg-[#FFFFFF] border border-[#C9A24B]/35">
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <ResilientImage
                    src={POPULAR_MAIN_COURSES[0].imageUrl}
                    alt="Hyderabadi Mehfil Royal Lamb Mandi Feast"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B1411]/90 via-[#3A000D]/25 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-[#FFF8F6]">
                  <span className="inline-block px-2.5 py-1 bg-[#FDD275] text-[#241600] text-[10px] font-bold uppercase tracking-wider rounded mb-2">
                    Signature Feasting
                  </span>
                  <h3 className="font-serif text-2xl font-semibold text-[#FFF8F6]">
                    Aromatic Spiced Mandi
                  </h3>
                  <p className="text-sm text-[#F4E5E0] mt-1">
                    Slow-braised lamb shanks on jeweled saffron long-grain basmati.
                  </p>
                </div>
              </div>

              {/* 150+ Taste Excellence Stamp Badge */}
              <div className="absolute -bottom-4 left-4 sm:-left-6 bg-[#FFF8F6] p-1.5 rounded-full shadow-xl border border-[#C9A24B]/45">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#3A000D] text-[#FFDF9E] flex items-center justify-center text-center p-2 border border-[#C9A24B]/55">
                  <svg
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full animate-spin-slow"
                    viewBox="0 0 120 120"
                  >
                    <path
                      id="excellenceTextPath"
                      d="M 60, 60 m -43, 0 a 43,43 0 1,1 86,0 a 43,43 0 1,1 -86,0"
                      fill="none"
                    />
                    <text className="fill-[#FFDF9E] text-[8.5px] font-bold uppercase tracking-[0.18em]">
                      <textPath href="#excellenceTextPath" startOffset="0%">
                        • TASTE EXCELLENCE • ROYAL MEHFIL
                      </textPath>
                    </text>
                  </svg>
                  <div className="flex flex-col items-center justify-center relative z-10">
                    <Star
                      className="w-4 h-4 text-[#E8A317] fill-[#E8A317] mb-0.5"
                      aria-hidden="true"
                    />
                    <span className="font-serif text-xl sm:text-2xl font-bold text-[#FFF8F6] leading-none">
                      150+
                    </span>
                    <span className="text-[8px] font-bold uppercase tracking-wider text-[#FFDF9E] mt-1">
                      Taste Excellence
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. POPULAR MAIN COURSE (Warm Sand Cream) */}
      <section className="py-16 md:py-24 bg-[#FAEBE5] border-y border-[#C9A24B]/20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2.5 mb-2.5">
                <Utensils className="w-5 h-5 text-[#795902]" aria-hidden="true" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#795902]">
                  Royal Dastarkhwan
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#3A000D] tracking-tight mb-3">
                Popular Main Course
              </h2>
              <p className="text-base sm:text-lg text-[#554243] leading-relaxed">
                We serve comfort on a plate. Our menu is filled with classic, wholesome dishes made
                with love. It&apos;s the kind of food that brings people together and makes you want
                to come back for more.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('menu')}
              className="self-start lg:self-end inline-flex items-center gap-2 px-6 py-3.5 bg-[#5A0F1F] hover:bg-[#3A000D] text-[#FFF8F6] text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg shadow-md border border-[#C9A24B]/40 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3A000D]"
            >
              <span>[ EXPLORE MENU ]</span>
              <ArrowRight className="w-4 h-4 text-[#FFDF9E]" aria-hidden="true" />
            </button>
          </div>

          {/* 4 Editorial Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {POPULAR_MAIN_COURSES.map((dish) => (
              <article
                key={dish.id}
                onClick={() => onNavigate('menu', dish.menuSection)}
                className="group bg-[#FFFFFF] rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-[#C9A24B]/30 hover:border-[#C9A24B] transition-all duration-300 flex flex-col hover:-translate-y-1 cursor-pointer"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4E5E0]">
                  <ResilientImage
                    src={dish.imageUrl}
                    alt={dish.alt}
                    fallbackLabel={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-[#3A000D]/90 text-[#FFDF9E] text-[10px] font-bold uppercase tracking-wider border border-[#C9A24B]/40 backdrop-blur-xs">
                    {dish.tag}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <h3 className="font-serif text-xl font-semibold text-[#3A000D] group-hover:text-[#5A0F1F] leading-snug">
                        {dish.name}
                      </h3>
                      <div className="shrink-0 text-right">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FFF1EC] border border-[#C9A24B]/45 font-bold text-sm text-[#795902] tabular-nums">
                          {dish.price}
                        </span>
                        {dish.priceNote && (
                          <span className="block text-[10px] font-semibold text-[#554243] mt-0.5 uppercase tracking-wide">
                            {dish.priceNote}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-[#554243] leading-relaxed mb-4">
                      {dish.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#EEDFDA] flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#795902]">
                      {dish.footerLabel}
                    </span>
                    {renderDishIcon(dish.id)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GALLERY SECTION WITH LIGHTBOX */}
      <section id="gallery" className="py-16 md:py-24 bg-[#FFF8F6] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-2 text-[#795902]">
              <span className="h-px w-8 bg-[#795902]" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.22em]">
                Visual Splendour
              </span>
              <span className="h-px w-8 bg-[#795902]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#3A000D] tracking-tight">
              GALLERY
            </h2>
            <p className="text-sm sm:text-base text-[#554243] max-w-xl mt-3">
              Step inside our sensory dining room and witness the heritage art of slow-cooked royal
              Hyderabadi culinary perfection.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {GALLERY_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className={`${
                  item.spanWide ? 'sm:col-span-2' : ''
                } group relative overflow-hidden rounded-xl shadow-sm hover:shadow-xl h-64 sm:h-76 border border-[#C9A24B]/30 hover:border-[#C9A24B] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A0F1F]`}
              >
                <ResilientImage
                  src={item.imageUrl}
                  alt={item.alt}
                  fallbackLabel={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B1411]/85 via-[#3A000D]/30 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5 sm:p-6">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFDF9E] block mb-0.5">
                      {item.eyebrow}
                    </span>
                    <span className="font-serif text-lg sm:text-xl font-semibold text-[#FFF8F6]">
                      {item.title}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeLightboxItem && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-caption"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setLightboxIndex(null);
            }
          }}
          className="fixed inset-0 z-50 bg-[#1B1411]/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="relative max-w-4xl w-full bg-[#FFF8F6] rounded-xl overflow-hidden shadow-2xl border border-[#C9A24B]/50 flex flex-col">
            <div className="flex items-center justify-between gap-4 px-5 py-3.5 bg-[#3A000D] text-[#FFF8F6] border-b border-[#C9A24B]/30">
              <span id="lightbox-caption" className="font-serif text-base sm:text-lg text-[#FFDF9E] truncate">
                {activeLightboxItem.caption}
              </span>
              <button
                type="button"
                aria-label="Close Lightbox"
                onClick={() => setLightboxIndex(null)}
                className="p-1.5 rounded-full hover:bg-white/10 text-[#FFF8F6] cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative h-[55vh] sm:h-[65vh] w-full bg-[#1B1411] flex items-center justify-center overflow-hidden">
              <ResilientImage
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.alt}
                eager
                fallbackLabel={activeLightboxItem.title}
                className="max-h-full max-w-full object-contain"
              />

              <button
                type="button"
                aria-label="Previous photo"
                onClick={() =>
                  setLightboxIndex(
                    (lightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
                  )
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1B1411]/80 hover:bg-[#5A0F1F] text-[#FFDF9E] border border-[#C9A24B]/40 flex items-center justify-center cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                aria-label="Next photo"
                onClick={() => setLightboxIndex((lightboxIndex + 1) % GALLERY_ITEMS.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1B1411]/80 hover:bg-[#5A0F1F] text-[#FFDF9E] border border-[#C9A24B]/40 flex items-center justify-center cursor-pointer transition-colors"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. TESTIMONIALS SECTION */}
      <section className="py-16 md:py-24 bg-[#F4E5E0] relative overflow-hidden border-t border-[#C9A24B]/20">
        <div className="absolute inset-0 jaali-lattice opacity-35 pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-12">
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-[#795902] mb-2">
              Praise &amp; Recognition
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#3A000D] tracking-tight mb-3">
              Guest Reflections
            </h2>
            <div className="flex items-center gap-3">
              <span className="h-px w-12 bg-[#C9A24B]" />
              <Star className="w-4 h-4 text-[#E8A317] fill-[#E8A317]" aria-hidden="true" />
              <span className="h-px w-12 bg-[#C9A24B]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {TESTIMONIALS.map((review) => (
              <article
                key={review.id}
                className="bg-[#FFFFFF] p-7 sm:p-9 rounded-xl shadow-sm hover:shadow-md relative flex flex-col justify-between border border-[#C9A24B]/30 transition-shadow"
              >
                <span
                  aria-hidden="true"
                  className="font-serif text-6xl text-[#C9A24B]/25 leading-none absolute top-5 right-7 select-none"
                >
                  &ldquo;
                </span>

                <div>
                  {/* 4 out of 5 Star Rating */}
                  <div
                    className="flex items-center gap-1 mb-5"
                    aria-label={`${review.stars} out of 5 stars`}
                  >
                    {[1, 2, 3, 4, 5].map((starIndex) => (
                      <Star
                        key={starIndex}
                        className={`w-4 h-4 ${
                          starIndex <= review.stars
                            ? 'text-[#E8A317] fill-[#E8A317]'
                            : 'text-[#C9A24B]/45'
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <p className="text-base sm:text-lg text-[#554243] leading-relaxed mb-7 italic">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>

                {/* Gold-Circle Initial Guest Identity */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-[#EEDFDA]">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#C9A24B] to-[#E8A317] text-[#241600] flex items-center justify-center font-serif font-bold text-lg shadow-sm border border-[#FFDF9E]/60 shrink-0">
                    {review.initial}
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-[#3A000D]">{review.name}</h3>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#795902]">
                      {review.subtitle}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Ilford Visit Callout Strip */}
          <div className="mt-12 bg-[#FFF8F6] rounded-xl p-6 sm:p-8 border border-[#C9A24B]/35 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="hidden sm:flex w-12 h-12 rounded-full bg-[#5A0F1F] text-[#FFDF9E] items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#795902] block mb-0.5">
                  Visit Our Restaurant
                </span>
                <p className="font-serif text-lg sm:text-xl font-semibold text-[#3A000D]">
                  {RESTAURANT_INFO.fullAddress}
                </p>
                <p className="text-xs sm:text-sm text-[#554243]">
                  {RESTAURANT_INFO.hoursMain} · {RESTAURANT_INFO.hoursFriday}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={RESTAURANT_INFO.phoneHref}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#5A0F1F] hover:bg-[#3A000D] text-[#FFF8F6] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#FFDF9E]" aria-hidden="true" />
                <span>Call {RESTAURANT_INFO.phoneDisplay}</span>
              </a>
              <a
                href={RESTAURANT_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-[#C9A24B] to-[#E8A317] text-[#241600] text-xs font-bold uppercase tracking-wider rounded-lg hover:brightness-105 transition-all"
              >
                <span>Get Directions</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
