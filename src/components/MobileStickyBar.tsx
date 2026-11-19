import { Phone, Navigation } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export function MobileStickyBar() {
  return (
    <aside
      aria-label="Quick mobile actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF5EA]/95 dark:bg-[#18151B]/95 backdrop-blur-md border-t border-[#D4AF37]/45 px-3 py-2.5 flex items-center justify-between gap-2.5 shadow-[0_-4px_20px_rgba(10,8,12,0.18)] dark:shadow-[0_-4px_20px_rgba(10,8,12,0.5)]"
    >
      <a
        href={RESTAURANT_INFO.phoneHref}
        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-white dark:bg-[#27222C] text-[#1F1A17] dark:text-[#F7F1E3] rounded-lg text-xs font-bold border border-[#D4AF37]/45 active:scale-[0.98] transition-transform"
      >
        <Phone className="w-4 h-4 text-[#9A6B10] dark:text-[#ECC55F] shrink-0" aria-hidden="true" />
        <span>Tap to Call</span>
      </a>
      <a
        href={RESTAURANT_INFO.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-gradient-to-r from-[#C99B35] via-[#F0C75E] to-[#D4A63B] text-[#1D1810] rounded-lg text-xs font-bold uppercase active:scale-[0.98] transition-transform shadow-sm"
      >
        <Navigation className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>Directions</span>
      </a>
    </aside>
  );
}
