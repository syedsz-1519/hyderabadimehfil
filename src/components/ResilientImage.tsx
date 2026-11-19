import { useState } from 'react';
import { Utensils } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
  fallbackLabel?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  eager = false,
  fallbackLabel = 'Hyderabadi Mehfil',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#27222C] via-[#1D1921] to-[#141217] text-[#ECC55F] p-6 text-center select-none ${className}`}
      >
        <div className="w-12 h-12 rounded-full border border-[#D4AF37]/50 bg-[#18151B]/70 flex items-center justify-center mb-2">
          <Utensils className="w-5 h-5 text-[#F0C75E]" aria-hidden="true" />
        </div>
        <span className="font-serif text-sm font-semibold tracking-wide text-[#F7F1E3]">
          {fallbackLabel}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
