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
      {/* 1. BRIGHT VISIBLE HERO SECTION */}
      <section className="relative min-h-[84vh] md:min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#261410] text-[#FFF8F6]">
        {/* Crisp high-visibility biryani backdrop */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <ResilientImage
            src={RESTAURANT_INFO.heroImageUrl}
            alt="Hyderabadi Dum Biryani served in a hammered copper handi with mirchi ka salan and raita"
            eager
            className="w-full h-full object-cover object-center opacity-90 animate-hero-zoom"
          />
        </div>

        {/* Light directional scrims preserving bright food photography & WCAG AA typography contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#1B1411]/72 via-[#1B1411]/30 to-[#1B1411]/18 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(27,20,17,0.44)_0%,transparent_72%)] pointer-events-none"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 lg:px-12 py-16 md:py-24 flex flex-col items-center text-center">
          {/* Grounded Ilford Location Kicker */}
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-[#FFDF9E]/80" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.24em] text-[#FFDF9E] drop-shadow-[0_2px_6px_rgba(0,0,0,0.65)]">
              290 Ilford Lane · London IG1 2LP
            </span>
            <span className="h-px w-8 bg-[#FFDF9E]/80" />
          </div>

          {/* Primary Display Title */}
          <h1 className="font-serif text-[2.35rem] sm:text-5xl lg:text-6xl font-bold text-[#FFF8F6] tracking-tight leading-[1.12] max-w-4xl mb-5 drop-shadow-[0_4px_18px_rgba(0,0,0,0.75)]">
            Hyderabadi Mehfil Restaurant
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#FFF8F6] max-w-2xl mx-auto leading-relaxed mb-9 font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">
            Savor the taste of Hyderabad&apos;s finest biryani and dishes at our restaurant.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
            <button
              type="button"
              onClick={() => onNavigate('menu')}
              className="w-full sm:w-auto min-w-[180px] px-8 py-3.5 bg-gradient-to-r from-[#C9A24B] via-[#E8A317] to-[#C9A24B] text-[#241600] text-sm font-bold uppercase tracking-wider rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:brightness-110 active:scale-[0.98] transition-all border border-[#FFDF9E]/60 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFF8F6] whitespace-nowrap"
            >
              Explore Menu
            </button>
            <button
              type="button"
              onClick={scrollToStory}
              className="w-full sm:w-auto min-w-[180px] px-8 py-3.5 bg-[#3A000D]/85 hover:bg-[#3A000D] text-[#FFF8F6] text-sm font-semibold uppercase tracking-wider rounded-lg border border-[#FFDF9E]/45 backdrop-blur-sm shadow-md transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8A317] whitespace-nowrap"
            >
              Our Story
            </button>
          </div>

          {/* Subtle Scroll Cue */}
          <button
            type="button"
            onClick={scrollToStory}
            aria-label="Scroll to Our Story"
            className="mt-12 inline-flex flex-col items-center gap-1 text-[#FFF8F6]/90 hover:text-[#FFDF9E] transition-colors cursor-pointer drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
              Discover Our Kitchen
            </span>
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* 2. AUTHENTIC STORY SPLIT SECTION */}
      <section id="our-story" className="relative py-16 md:py-24 bg-[#FFF8F6] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Storytelling Card */}
            <div className="lg:col-span-7">
              <div className="bg-[#FFF1EC] rounded-xl p-7 sm:p-11 shadow-sm border border-[#C9A24B]/30 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-[2px] w-8 bg-[#795902]" />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#795902]">
                    Tradition &amp; Craft
                  </span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#3A000D] tracking-tight mb-5">
                  Authentic Hyderabadi Biryani Cuisine in Ilford
                </h2>

                <p className="font-serif text-lg text-[#554243] italic mb-4 leading-relaxed">
                  &ldquo;Savor the taste of Hyderabad&apos;s finest biryani and dishes at our
                  restaurant.&rdquo;
                </p>

                <p className="text-base text-[#554243] leading-relaxed mb-8">
                  Experience the rich flavors of Hyderabad with our authentic chicken and lamb dum
                  biryani, crafted fresh every day right here on Ilford Lane, London.
                </p>

                {/* Culinary Craft Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 p-5 rounded-lg bg-[#FFF8F6] border border-[#C9A24B]/25">
                  <div className="flex flex-col">
                    <ChefHat className="w-5 h-5 text-[#795902] mb-2" aria-hidden="true" />
                    <span className="font-serif text-base font-bold text-[#3A000D]">Dum Pukht</span>
                    <span className="text-xs text-[#554243] mt-0.5">Sealed slow handi cooking</span>
                  </div>
                  <div className="flex flex-col">
                    <Flame className="w-5 h-5 text-[#795902] mb-2" aria-hidden="true" />
                    <span className="font-serif text-base font-bold text-[#3A000D]">Whole Spices</span>
                    <span className="text-xs text-[#554243] mt-0.5">Saffron, cardamom &amp; mace</span>
                  </div>
                  <div className="flex flex-col">
                    <Utensils className="w-5 h-5 text-[#795902] mb-2" aria-hidden="true" />
                    <span className="font-serif text-base font-bold text-[#3A000D]">Mandi &amp; Grills</span>
                    <span className="text-xs text-[#554243] mt-0.5">Traditional feast platters</span>
                  </div>
                </div>

                {/* Kitchen Attribution Row */}
                <div className="mt-7 pt-5 border-t border-[#C9A24B]/25 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <ResilientImage
                      src={RESTAURANT_INFO.logoUrl}
                      alt="Hyderabadi Mehfil Emblem"
                      fallbackLabel="HM"
                      className="w-10 h-10 rounded-full object-cover border border-[#C9A24B]/50 bg-[#1B1411] shrink-0"
                    />
                    <div>
                      <span className="block text-xs font-bold text-[#3A000D]">
                        Hyderabadi Mehfil Kitchen
                      </span>
                      <span className="block text-xs text-[#554243]">
                        290 Ilford Lane · Freshly Prepared Daily
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('menu')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#795902] hover:text-[#3A000D] transition-colors cursor-pointer"
                  >
                    <span>View Full Menu</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Feature Dish Card */}
            <div className="lg:col-span-5">
              <div className="relative group rounded-xl overflow-hidden shadow-lg bg-[#FFFFFF] border border-[#C9A24B]/35">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <ResilientImage
                    src={POPULAR_MAIN_COURSES[0].imageUrl}
                    alt="Slow-roasted Lamb Mandi platter at Hyderabadi Mehfil"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-6 bg-[#FFFFFF] border-t border-[#EEDFDA]">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#795902] mb-1">
                    House Signature
                  </span>
                  <h3 className="font-serif text-2xl font-semibold text-[#3A000D]">
                    Slow-Roasted Lamb Mandi
                  </h3>
                  <p className="text-sm text-[#554243] mt-1.5 leading-relaxed">
                    Tender braised lamb shank served over fragrant saffron long-grain basmati rice,
                    toasted almonds, and house chutney.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. POPULAR MAIN COURSE */}
      <section className="py-16 md:py-24 bg-[#FAEBE5] border-y border-[#C9A24B]/20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2.5 mb-2.5">
                <Utensils className="w-5 h-5 text-[#795902]" aria-hidden="true" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#795902]">
                  Kitchen Favorites
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
              className="self-start lg:self-end inline-flex items-center gap-2 px-6 py-3.5 bg-[#5A0F1F] hover:bg-[#3A000D] text-[#FFF8F6] text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg shadow-md border border-[#C9A24B]/40 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3A000D] whitespace-nowrap"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-4 h-4 text-[#FFDF9E]" aria-hidden="true" />
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
                className="group bg-[#FFFFFF] rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-[#C9A24B]/30 hover:border-[#C9A24B] transition-[box-shadow,border-color] duration-300 flex flex-col cursor-pointer"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#F4E5E0]">
                  <ResilientImage
                    src={dish.imageUrl}
                    alt={dish.alt}
                    fallbackLabel={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-[#795902] mb-1">
                      {dish.tag}
                    </span>
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <h3 className="font-serif text-xl font-semibold text-[#3A000D] group-hover:text-[#5A0F1F] leading-snug">
                        {dish.name}
                      </h3>
                      <div className="shrink-0 text-right">
                        <span className="font-serif font-bold text-lg text-[#3A000D] tabular-nums">
                          {dish.price}
                        </span>
                        {dish.priceNote && (
                          <span className="block text-[10px] font-semibold text-[#554243] uppercase tracking-wide">
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
              </motion.article>
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
                From Our Kitchen
              </span>
              <span className="h-px w-8 bg-[#795902]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#3A000D] tracking-tight">
              GALLERY
            </h2>
            <p className="text-sm sm:text-base text-[#554243] max-w-xl mt-3">
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
                } group relative overflow-hidden rounded-xl shadow-sm hover:shadow-xl h-64 sm:h-76 border border-[#C9A24B]/30 hover:border-[#C9A24B] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A0F1F]`}
              >
                <ResilientImage
                  src={item.imageUrl}
                  alt={item.alt}
                  fallbackLabel={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B1411]/80 via-[#1B1411]/20 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5 sm:p-6">
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
              <span
                id="lightbox-caption"
                className="font-serif text-base sm:text-lg text-[#FFDF9E] truncate"
              >
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

      {/* 5. TESTIMONIALS SECTION WITH WRITE A REVIEW */}
      <section className="py-16 md:py-24 bg-[#F4E5E0] relative overflow-hidden border-t border-[#C9A24B]/20">
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-[#795902] block mb-2">
                Diner Feedback
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#3A000D] tracking-tight">
                Guest Reflections
              </h2>
              <p className="text-sm sm:text-base text-[#554243] mt-2 max-w-xl">
                Read what our neighbors and guests say about their meal—or share your own visit.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setReviewModalOpen(true)}
              className="self-start md:self-end inline-flex items-center gap-2 px-6 py-3 bg-[#5A0F1F] hover:bg-[#3A000D] text-[#FFF8F6] text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg shadow-sm border border-[#C9A24B]/45 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3A000D] whitespace-nowrap"
            >
              <PenLine className="w-4 h-4 text-[#FFDF9E]" aria-hidden="true" />
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
                className="bg-[#FFFFFF] p-7 sm:p-9 rounded-xl shadow-sm hover:shadow-md relative flex flex-col justify-between border border-[#C9A24B]/30 transition-shadow"
              >
                <span
                  aria-hidden="true"
                  className="font-serif text-6xl text-[#C9A24B]/25 leading-none absolute top-5 right-7 select-none"
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

                {/* Guest Identity */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-[#EEDFDA]">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#C9A24B] to-[#E8A317] text-[#241600] flex items-center justify-center font-serif font-bold text-lg shadow-sm border border-[#FFDF9E]/60 shrink-0">
                    {review.initial}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-base font-bold text-[#3A000D] truncate">
                      {review.name}
                    </h3>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#795902] block truncate">
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
      <section className="py-12 md:py-16 bg-[#F4E5E0] border-t border-[#C9A24B]/20">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-12">
          <div className="bg-[#FFF8F6] rounded-xl p-6 sm:p-8 border border-[#C9A24B]/35 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
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
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#5A0F1F] hover:bg-[#3A000D] text-[#FFF8F6] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 text-[#FFDF9E]" aria-hidden="true" />
                <span>Call {RESTAURANT_INFO.phoneDisplay}</span>
              </a>
              <a
                href={RESTAURANT_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-[#C9A24B] to-[#E8A317] text-[#241600] text-xs font-bold uppercase tracking-wider rounded-lg hover:brightness-105 transition-all whitespace-nowrap"
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
