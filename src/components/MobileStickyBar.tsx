import { Phone, Navigation } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export function MobileStickyBar() {
  return (
    <aside
      aria-label="Quick mobile actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1B1411]/95 backdrop-blur-md border-t border-[#C9A24B]/40 px-3 py-2.5 flex items-center justify-between gap-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.45)]"
    >
      <a
        href={RESTAURANT_INFO.phoneHref}
        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-[#5A0F1F] text-[#FFF8F6] rounded-lg text-xs font-bold border border-[#C9A24B]/35 active:scale-[0.98] transition-transform"
      >
        <Phone className="w-4 h-4 text-[#FFDF9E] shrink-0" aria-hidden="true" />
        <span>Tap to Call</span>
      </a>
      <a
        href={RESTAURANT_INFO.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-gradient-to-r from-[#C9A24B] to-[#E8A317] text-[#241600] rounded-lg text-xs font-bold uppercase active:scale-[0.98] transition-transform shadow-sm"
      >
        <Navigation className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>Directions</span>
      </a>
    </aside>
  );
}
