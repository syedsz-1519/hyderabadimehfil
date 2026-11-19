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
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#3A000D] via-[#5A0F1F] to-[#1B1411] text-[#FFDF9E] p-6 text-center select-none ${className}`}
      >
        <div className="w-12 h-12 rounded-full border border-[#C9A24B]/50 bg-[#1B1411]/50 flex items-center justify-center mb-2">
          <Utensils className="w-5 h-5 text-[#E8A317]" aria-hidden="true" />
        </div>
        <span className="font-serif text-sm font-semibold tracking-wide text-[#FFF8F6]">
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
