import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
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
  Soup,
  IceCreamBowl,
  Wine,
  PenLine,
} from 'lucide-react';
import {
  GALLERY_ITEMS,
  PageRoute,
  POPULAR_MAIN_COURSES,
  RESTAURANT_INFO,
  TESTIMONIALS,
} from '../data/restaurantData';
import { ResilientImage } from '../components/ResilientImage';
import { ReviewModal } from '../components/ReviewModal';
import { FrequentlyAskedQuestions } from '../components/FrequentlyAskedQuestions';
import { PromoVideoSection } from '../components/PromoVideoSection';
import { type GuestReview, subscribeToReviews } from '../services/reviews';

interface HomePageProps {
  onNavigate: (page: PageRoute, sectionId?: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [liveReviews, setLiveReviews] = useState<GuestReview[]>([]);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToReviews(
      (reviews) => {
        setLiveReviews(reviews);
      },
      (errMsg) => {
        console.warn('Guest reviews subscription fallback active:', errMsg);
      }
    );
    return unsubscribe;
  }, []);

  const displayedReviews = useMemo<GuestReview[]>(() => {
    return [...liveReviews, ...TESTIMONIALS];
  }, [liveReviews]);

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
        return (
          <IceCreamBowl className="w-4 h-4 text-[#9A6B10] dark:text-[#ECC55F]" aria-hidden="true" />
        );
      case 'popular-lamb-biryani':
        return <Flame className="w-4 h-4 text-[#9A6B10] dark:text-[#ECC55F]" aria-hidden="true" />;
      case 'popular-mojito':
        return <Wine className="w-4 h-4 text-[#9A6B10] dark:text-[#ECC55F]" aria-hidden="true" />;
      default:
        return <Soup className="w-4 h-4 text-[#9A6B10] dark:text-[#ECC55F]" aria-hidden="true" />;
    }
  };

  const activeLightboxItem = lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null;

  return (
    <div className="flex flex-col w-full overflow-x-clip">
      {/* 1. BRIGHT VISIBLE HERO SECTION */}
      <section className="relative min-h-[84vh] md:min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#18151B] text-[#F7F1E3]">
        {/* Crisp high-visibility biryani backdrop */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <ResilientImage
            src={RESTAURANT_INFO.heroImageUrl}
            alt="Hyderabadi Dum Biryani served in a hammered copper handi with mirchi ka salan and raita"
            eager
            className="w-full h-full object-cover object-center opacity-90 animate-hero-zoom"
          />
        </div>

        {/* Measured charcoal scrims preserving warm golden food photography & WCAG AA contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#1A171D]/80 via-[#1A171D]/35 to-[#18151B]/25 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(24,21,27,0.46)_0%,transparent_72%)] pointer-events-none"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 lg:px-12 py-16 md:py-24 flex flex-col items-center text-center">
          {/* Grounded Ilford Location Kicker */}
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-[#ECC55F]/80" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.24em] text-[#ECC55F] drop-shadow-[0_2px_6px_rgba(0,0,0,0.75)]">
              290 Ilford Lane · London IG1 2LP
            </span>
            <span className="h-px w-8 bg-[#ECC55F]/80" />
          </div>

          {/* Primary Display Title */}
          <h1 className="font-serif text-[2.35rem] sm:text-5xl lg:text-6xl font-bold text-[#F7F1E3] tracking-tight leading-[1.12] max-w-4xl mb-5 drop-shadow-[0_4px_18px_rgba(0,0,0,0.75)]">
            Hyderabadi Mehfil Restaurant
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#F7F1E3] max-w-2xl mx-auto leading-relaxed mb-9 font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">
            Savor the taste of Hyderabad&apos;s finest biryani and dishes at our restaurant.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
            <button
              type="button"
              onClick={() => onNavigate('menu')}
              className="w-full sm:w-auto min-w-[180px] px-8 py-3.5 bg-gradient-to-r from-[#C99B35] via-[#F0C75E] to-[#D4A63B] text-[#1D1810] text-sm font-bold uppercase tracking-wider rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.45)] hover:brightness-110 active:scale-[0.98] transition-all border border-[#FCE59C]/60 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7F1E3] whitespace-nowrap"
            >
              Explore Menu
            </button>
            <button
              type="button"
              onClick={scrollToStory}
              className="w-full sm:w-auto min-w-[180px] px-8 py-3.5 bg-[#211D25]/85 hover:bg-[#2C2632] text-[#F7F1E3] text-sm font-semibold uppercase tracking-wider rounded-lg border border-[#D4AF37]/55 backdrop-blur-sm shadow-md transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0C75E] whitespace-nowrap"
            >
              Our Story
            </button>
          </div>

          {/* Subtle Scroll Cue */}
          <button
            type="button"
            onClick={scrollToStory}
            aria-label="Scroll to Our Story"
            className="mt-12 inline-flex flex-col items-center gap-1 text-[#F7F1E3]/90 hover:text-[#ECC55F] transition-colors cursor-pointer drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
              Discover Our Kitchen
            </span>
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* 2. AUTHENTIC STORY SPLIT SECTION */}
      <section
        id="our-story"
        className="relative py-16 md:py-24 bg-[#FAF5EA] dark:bg-[#1A171D] scroll-mt-20 transition-colors"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Storytelling Card */}
            <div className="lg:col-span-7">
              <div className="bg-white dark:bg-[#27222C] rounded-xl p-7 sm:p-11 shadow-sm border border-[#D4AF37]/35 dark:border-[#D4AF37]/30 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-[2px] w-8 bg-[#C99B35] dark:bg-[#D4AF37]" />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#9A6B10] dark:text-[#ECC55F]">
                    Tradition &amp; Craft
                  </span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F1A17] dark:text-[#F7F1E3] tracking-tight mb-5">
                  Authentic Hyderabadi Biryani Cuisine in Ilford
                </h2>

                <p className="font-serif text-lg text-[#9A6B10] dark:text-[#ECC55F]/90 italic mb-4 leading-relaxed">
                  &ldquo;Savor the taste of Hyderabad&apos;s finest biryani and dishes at our
                  restaurant.&rdquo;
                </p>

                <p className="text-base text-[#4E4237] dark:text-[#D8CFC4] leading-relaxed mb-8">
                  Experience the rich flavors of Hyderabad with our authentic chicken and lamb dum
                  biryani, crafted fresh every day right here on Ilford Lane, London.
                </p>

                {/* Culinary Craft Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 p-5 rounded-lg bg-[#F2E9D6] dark:bg-[#1D1921] border border-[#D4AF37]/30 dark:border-[#D4AF37]/25">
                  <div className="flex flex-col">
                    <ChefHat
                      className="w-5 h-5 text-[#9A6B10] dark:text-[#ECC55F] mb-2"
                      aria-hidden="true"
                    />
                    <span className="font-serif text-base font-bold text-[#1F1A17] dark:text-[#F7F1E3]">
                      Dum Pukht
                    </span>
                    <span className="text-xs text-[#6B5B4E] dark:text-[#B4A89B] mt-0.5">
                      Sealed slow handi cooking
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <Flame
                      className="w-5 h-5 text-[#9A6B10] dark:text-[#ECC55F] mb-2"
                      aria-hidden="true"
                    />
                    <span className="font-serif text-base font-bold text-[#1F1A17] dark:text-[#F7F1E3]">
                      Whole Spices
                    </span>
                    <span className="text-xs text-[#6B5B4E] dark:text-[#B4A89B] mt-0.5">
                      Saffron, cardamom &amp; mace
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <Utensils
                      className="w-5 h-5 text-[#9A6B10] dark:text-[#ECC55F] mb-2"
                      aria-hidden="true"
                    />
                    <span className="font-serif text-base font-bold text-[#1F1A17] dark:text-[#F7F1E3]">
                      Mandi &amp; Grills
                    </span>
                    <span className="text-xs text-[#6B5B4E] dark:text-[#B4A89B] mt-0.5">
                      Traditional feast platters
                    </span>
                  </div>
                </div>

                {/* Kitchen Attribution Row */}
                <div className="mt-7 pt-5 border-t border-[#D4AF37]/25 dark:border-[#D4AF37]/20 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <ResilientImage
                      src={RESTAURANT_INFO.logoUrl}
                      alt="Hyderabadi Mehfil Emblem"
                      fallbackLabel="HM"
                      className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]/60 bg-[#18151B] shrink-0"
                    />
                    <div>
                      <span className="block text-xs font-bold text-[#1F1A17] dark:text-[#F7F1E3]">
                        Hyderabadi Mehfil Kitchen
                      </span>
                      <span className="block text-xs text-[#6B5B4E] dark:text-[#B4A89B]">
                        290 Ilford Lane · Freshly Prepared Daily
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('menu')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#9A6B10] hover:text-[#1F1A17] dark:text-[#ECC55F] dark:hover:text-[#F7F1E3] transition-colors cursor-pointer"
                  >
                    <span>View Full Menu</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Feature Dish Card */}
            <div className="lg:col-span-5">
              <div className="relative group rounded-xl overflow-hidden shadow-lg bg-white dark:bg-[#27222C] border border-[#D4AF37]/35">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <ResilientImage
                    src={RESTAURANT_INFO.storyImageUrl}
                    alt="Dough-sealed hammered copper biryani handi steaming on our Ilford London kitchen pass under warm brass pendant lights"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-6 bg-white dark:bg-[#27222C] border-t border-[#D4AF37]/25 dark:border-[#D4AF37]/20">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#9A6B10] dark:text-[#ECC55F] mb-1">
                    290 Ilford Lane Kitchen
                  </span>
                  <h3 className="font-serif text-2xl font-semibold text-[#1F1A17] dark:text-[#F7F1E3]">
                    Dough-Sealed Dum Pukht
                  </h3>
                  <p className="text-sm text-[#4E4237] dark:text-[#D8CFC4] mt-1.5 leading-relaxed">
                    Every handi is freshly prepared in our London kitchen and sealed slow so saffron,
                    green cardamom, and tender cuts lock in their true aroma.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROMOTIONAL FILM SHOWCASE */}
      <PromoVideoSection onNavigate={onNavigate} />

      {/* 4. POPULAR MAIN COURSE */}
      <section
        id="popular-dishes"
        className="py-16 md:py-24 bg-[#FAF5EA] dark:bg-[#1A171D] border-y border-[#D4AF37]/25 dark:border-[#D4AF37]/20 scroll-mt-20 transition-colors"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2.5 mb-2.5">
                <Utensils
                  className="w-5 h-5 text-[#9A6B10] dark:text-[#ECC55F]"
                  aria-hidden="true"
                />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#9A6B10] dark:text-[#ECC55F]">
                  Kitchen Favorites
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1F1A17] dark:text-[#F7F1E3] tracking-tight mb-3">
                Popular Main Course
              </h2>
              <p className="text-base sm:text-lg text-[#4E4237] dark:text-[#D8CFC4] leading-relaxed">
                We serve comfort on a plate. Our menu is filled with classic, wholesome dishes made
                with love. It&apos;s the kind of food that brings people together and makes you want
                to come back for more.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('menu')}
              className="self-start lg:self-end inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#C99B35] via-[#F0C75E] to-[#D4A63B] text-[#1D1810] text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg shadow-md border border-[#FCE59C]/50 hover:brightness-110 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A6B10] dark:focus-visible:outline-[#F7F1E3] whitespace-nowrap"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-4 h-4 text-[#1D1810]" aria-hidden="true" />
            </button>
          </div>

          {/* 4 Editorial Dish Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {POPULAR_MAIN_COURSES.map((dish, idx) => (
              <motion.article
                key={dish.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                onClick={() => onNavigate('menu', dish.menuSection)}
                className="group bg-white dark:bg-[#27222C] rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-[#D4AF37]/30 dark:border-[#D4AF37]/25 hover:border-[#D4AF37]/80 dark:hover:border-[#D4AF37]/70 transition-[box-shadow,border-color] duration-300 flex flex-col cursor-pointer"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#F2E9D6] dark:bg-[#1D1921]">
                  <ResilientImage
                    src={dish.imageUrl}
                    alt={dish.alt}
                    fallbackLabel={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-[#9A6B10] dark:text-[#ECC55F] mb-1">
                      {dish.tag}
                    </span>
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <h3 className="font-serif text-xl font-semibold text-[#1F1A17] group-hover:text-[#9A6B10] dark:text-[#F7F1E3] dark:group-hover:text-[#ECC55F] transition-colors leading-snug">
                        {dish.name}
                      </h3>
                      <div className="shrink-0 text-right">
                        <span className="font-serif font-bold text-lg text-[#9A6B10] dark:text-[#ECC55F] tabular-nums">
                          {dish.price}
                        </span>
                        {dish.priceNote && (
                          <span className="block text-[10px] font-semibold text-[#6B5B4E] dark:text-[#B4A89B] uppercase tracking-wide">
                            {dish.priceNote}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-[#4E4237] dark:text-[#D8CFC4] leading-relaxed mb-4">
                      {dish.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#D4AF37]/25 dark:border-[#D4AF37]/20 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#9A6B10] dark:text-[#ECC55F]">
                      {dish.footerLabel}
                    </span>
                    {renderDishIcon(dish.id)}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GALLERY SECTION WITH LIGHTBOX */}
      <section id="gallery" className="py-16 md:py-24 bg-[#211D25] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-2 text-[#ECC55F]">
              <span className="h-px w-8 bg-[#D4AF37]" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.22em]">
                From Our Kitchen
              </span>
              <span className="h-px w-8 bg-[#D4AF37]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F7F1E3] tracking-tight">
              GALLERY
            </h2>
            <p className="text-sm sm:text-base text-[#D8CFC4] max-w-xl mt-3">
              A closer look at our dum biryani handis, charcoal grills, whole spices, and dining
              room on Ilford Lane.
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
                } group relative overflow-hidden rounded-xl shadow-sm hover:shadow-xl h-64 sm:h-76 border border-[#D4AF37]/30 hover:border-[#D4AF37] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0C75E]`}
              >
                <ResilientImage
                  src={item.imageUrl}
                  alt={item.alt}
                  fallbackLabel={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141217]/85 via-[#141217]/20 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5 sm:p-6">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#ECC55F] block mb-0.5">
                      {item.eyebrow}
                    </span>
                    <span className="font-serif text-lg sm:text-xl font-semibold text-[#F7F1E3]">
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
          className="fixed inset-0 z-50 bg-[#141217]/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="relative max-w-4xl w-full bg-[#211D25] rounded-xl overflow-hidden shadow-2xl border border-[#D4AF37]/50 flex flex-col">
            <div className="flex items-center justify-between gap-4 px-5 py-3.5 bg-[#18151B] text-[#F7F1E3] border-b border-[#D4AF37]/30">
              <span
                id="lightbox-caption"
                className="font-serif text-base sm:text-lg text-[#ECC55F] truncate"
              >
                {activeLightboxItem.caption}
              </span>
              <button
                type="button"
                aria-label="Close Lightbox"
                onClick={() => setLightboxIndex(null)}
                className="p-1.5 rounded-full hover:bg-white/10 text-[#F7F1E3] cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative h-[55vh] sm:h-[65vh] w-full bg-[#141217] flex items-center justify-center overflow-hidden">
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
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#18151B]/85 hover:bg-[#2C2632] text-[#ECC55F] border border-[#D4AF37]/45 flex items-center justify-center cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                aria-label="Next photo"
                onClick={() => setLightboxIndex((lightboxIndex + 1) % GALLERY_ITEMS.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#18151B]/85 hover:bg-[#2C2632] text-[#ECC55F] border border-[#D4AF37]/45 flex items-center justify-center cursor-pointer transition-colors"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. TESTIMONIALS SECTION WITH WRITE A REVIEW */}
      <section
        id="testimonials"
        className="py-16 md:py-24 bg-[#FAF5EA] dark:bg-[#1A171D] relative overflow-hidden border-t border-[#D4AF37]/25 dark:border-[#D4AF37]/20 scroll-mt-20 transition-colors"
      >
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-[#9A6B10] dark:text-[#ECC55F] block mb-2">
                Diner Feedback
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1F1A17] dark:text-[#F7F1E3] tracking-tight">
                Guest Reflections
              </h2>
              <p className="text-sm sm:text-base text-[#4E4237] dark:text-[#D8CFC4] mt-2 max-w-xl">
                Read what our neighbors and guests say about their meal—or share your own visit.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setReviewModalOpen(true)}
              className="self-start md:self-end inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-[#F2E9D6] dark:bg-[#27222C] dark:hover:bg-[#322B39] text-[#1F1A17] dark:text-[#F7F1E3] text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg shadow-sm border border-[#D4AF37]/45 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A6B10] dark:focus-visible:outline-[#F0C75E] whitespace-nowrap"
            >
              <PenLine className="w-4 h-4 text-[#9A6B10] dark:text-[#ECC55F]" aria-hidden="true" />
              <span>Write a Review</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {displayedReviews.map((review, idx) => (
              <motion.article
                key={review.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: Math.min(idx, 3) * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="bg-white dark:bg-[#27222C] p-7 sm:p-9 rounded-xl shadow-sm hover:shadow-md relative flex flex-col justify-between border border-[#D4AF37]/30 dark:border-[#D4AF37]/25 transition-shadow"
              >
                <span
                  aria-hidden="true"
                  className="font-serif text-6xl text-[#D4AF37]/25 dark:text-[#D4AF37]/20 leading-none absolute top-5 right-7 select-none"
                >
                  &ldquo;
                </span>

                <div>
                  {/* Star Rating */}
                  <div
                    className="flex items-center gap-1 mb-5"
                    aria-label={`${review.stars} out of 5 stars`}
                  >
                    {[1, 2, 3, 4, 5].map((starIndex) => (
                      <Star
                        key={starIndex}
                        className={`w-4 h-4 ${
                          starIndex <= review.stars
                            ? 'text-[#C99B35] fill-[#C99B35] dark:text-[#F0C75E] dark:fill-[#F0C75E]'
                            : 'text-[#D4AF37]/30'
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <p className="text-base sm:text-lg text-[#4E4237] dark:text-[#D8CFC4] leading-relaxed mb-7 italic">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>

                {/* Guest Identity */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-[#D4AF37]/25 dark:border-[#D4AF37]/20">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#C99B35] to-[#F0C75E] text-[#1D1810] flex items-center justify-center font-serif font-bold text-lg shadow-sm border border-[#FCE59C]/50 shrink-0">
                    {review.initial}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-base font-bold text-[#1F1A17] dark:text-[#F7F1E3] truncate">
                      {review.name}
                    </h3>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#9A6B10] dark:text-[#ECC55F] block truncate">
                      {review.subtitle}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FREQUENTLY ASKED QUESTIONS */}
      <FrequentlyAskedQuestions onNavigate={onNavigate} />

      {/* 7. ILFORD VISIT CALLOUT STRIP */}
      <section className="py-12 md:py-16 bg-[#FAF5EA] dark:bg-[#211D25] border-t border-[#D4AF37]/25 dark:border-[#D4AF37]/20 transition-colors">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-12">
          <div className="bg-white dark:bg-[#27222C] rounded-xl p-6 sm:p-8 border border-[#D4AF37]/35 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="hidden sm:flex w-12 h-12 rounded-full bg-[#FAF5EA] dark:bg-[#18151B] border border-[#D4AF37]/45 text-[#9A6B10] dark:text-[#ECC55F] items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#9A6B10] dark:text-[#ECC55F] block mb-0.5">
                  Visit Our Restaurant
                </span>
                <p className="font-serif text-lg sm:text-xl font-semibold text-[#1F1A17] dark:text-[#F7F1E3]">
                  {RESTAURANT_INFO.fullAddress}
                </p>
                <p className="text-xs sm:text-sm text-[#4E4237] dark:text-[#D8CFC4]">
                  {RESTAURANT_INFO.hoursMain} · {RESTAURANT_INFO.hoursFriday}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={RESTAURANT_INFO.phoneHref}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FAF5EA] hover:bg-[#F2E9D6] dark:bg-[#18151B] dark:hover:bg-[#322B39] text-[#1F1A17] dark:text-[#F7F1E3] border border-[#D4AF37]/40 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 text-[#9A6B10] dark:text-[#ECC55F]" aria-hidden="true" />
                <span>Call {RESTAURANT_INFO.phoneDisplay}</span>
              </a>
              <a
                href={RESTAURANT_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-[#C99B35] via-[#F0C75E] to-[#D4A63B] text-[#1D1810] text-xs font-bold uppercase tracking-wider rounded-lg hover:brightness-110 transition-all whitespace-nowrap"
              >
                <span>Get Directions</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <ReviewModal isOpen={reviewModalOpen} onClose={() => setReviewModalOpen(false)} />
    </div>
  );
}
