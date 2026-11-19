import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ChevronDown, HelpCircle, Phone } from 'lucide-react';
import { FAQ_ITEMS, PageRoute, RESTAURANT_INFO } from '../data/restaurantData';

interface FrequentlyAskedQuestionsProps {
  onNavigate: (page: PageRoute, sectionId?: string) => void;
}

export function FrequentlyAskedQuestions({ onNavigate }: FrequentlyAskedQuestionsProps) {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-16 md:py-24 bg-[#1A171D] border-t border-[#D4AF37]/20 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Intro Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 text-[#ECC55F] mb-2">
              <HelpCircle className="w-4 h-4" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em]">
                Helpful Details
              </span>
            </div>
            <h2
              id="faq-heading"
              className="font-serif text-3xl sm:text-4xl font-semibold text-[#F7F1E3] tracking-tight mb-4"
            >
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-[#D8CFC4] leading-relaxed mb-6">
              Everything you need to know before visiting us on Ilford Lane—from dietary care and
              Halal standards to parking, takeaway pre-orders, and family group tables.
            </p>

            <div className="p-5 rounded-xl bg-[#27222C] border border-[#D4AF37]/30">
              <span className="block text-xs font-bold uppercase tracking-wider text-[#F7F1E3] mb-1">
                Still have a question?
              </span>
              <p className="text-xs sm:text-sm text-[#D8CFC4] leading-relaxed mb-4">
                Speak directly with our team for allergen specifics, large party seating, or
                collection timing.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={RESTAURANT_INFO.phoneHref}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F7F1E3] hover:text-[#ECC55F] transition-colors whitespace-nowrap"
                >
                  <Phone className="w-3.5 h-3.5 text-[#ECC55F]" aria-hidden="true" />
                  <span>{RESTAURANT_INFO.phoneDisplay}</span>
                </a>
                <span className="text-[#D4AF37]/60" aria-hidden="true">
                  ·
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#ECC55F] hover:text-[#F7F1E3] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>Message Us</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Expandable Accordion List */}
          <div className="lg:col-span-8 space-y-3.5">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openId === item.id;
              const numberLabel = String(idx + 1).padStart(2, '0');
              const buttonId = `${item.id}-trigger`;
              const panelId = `${item.id}-panel`;

              return (
                <div
                  key={item.id}
                  className={`rounded-xl border transition-colors bg-[#27222C] ${
                    isOpen
                      ? 'border-[#D4AF37] shadow-sm'
                      : 'border-[#D4AF37]/25 hover:border-[#D4AF37]/60'
                  }`}
                >
                  <h3 className="m-0">
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleItem(item.id)}
                      className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0C75E] rounded-xl"
                    >
                      <span className="flex items-baseline gap-3.5 min-w-0">
                        <span className="text-xs font-bold tracking-wider text-[#ECC55F] tabular-nums shrink-0">
                          {numberLabel}
                        </span>
                        <span className="font-serif text-lg sm:text-xl font-semibold text-[#F7F1E3] leading-snug">
                          {item.question}
                        </span>
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#ECC55F] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 pt-0 pl-12 sm:pl-14 border-t border-[#D4AF37]/20">
                          <p className="text-sm sm:text-base text-[#D8CFC4] leading-relaxed pt-3.5">
                            {item.answer}
                          </p>
                          {item.actionLabel && item.actionRoute && (
                            <button
                              type="button"
                              onClick={() => onNavigate(item.actionRoute!, item.actionSection)}
                              className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#ECC55F] hover:text-[#F7F1E3] transition-colors cursor-pointer"
                            >
                              <span>{item.actionLabel}</span>
                              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
