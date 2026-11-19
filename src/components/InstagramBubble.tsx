import { Instagram } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export function InstagramBubble() {
  return (
    <a
      href={RESTAURANT_INFO.instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Follow Hyderabadi Mehfil on Instagram"
      title={`@${RESTAURANT_INFO.instagramHandle} on Instagram`}
      className="group fixed right-4 md:right-6 bottom-[76px] md:bottom-6 z-40 w-13 h-13 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(27,20,17,0.45)] ring-2 ring-[#C9A24B]/55 transition-transform duration-300 hover:scale-110 hover:-rotate-6 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8A317]"
      style={{
        background:
          'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
      }}
    >
      <span
        aria-hidden="true"
        className="ig-bubble-ring absolute inset-0 rounded-full border-2 border-[#d6249f] pointer-events-none"
      />
      <Instagram className="w-6 h-6 md:w-7 md:h-7 text-white relative z-10 drop-shadow-xs" aria-hidden="true" />
    </a>
  );
}
