/**
 * SEO Component
 * 
 * Dynamically manages meta tags, Open Graph, Twitter Card, and canonical URLs
 * using react-helmet-async for per-route/view SEO optimization.
 */

import { Helmet } from 'react-helmet-async';

interface SEOProps {
  /** Page title (shows in browser tab and search results) */
  title: string;
  /** Meta description (shows in search results) */
  description: string;
  /** Optional: Canonical URL (prevents duplicate content issues) */
  canonical?: string;
  /** Optional: Open Graph image URL */
  ogImage?: string;
  /** Optional: Open Graph image alt text */
  ogImageAlt?: string;
  /** Optional: Twitter handle (without @) */
  twitterHandle?: string;
  /** Optional: Keywords for SEO */
  keywords?: string;
  /** Optional: Author name */
  author?: string;
  /** Optional: Robots meta directive */
  robots?: string;
  /** Optional: Page type for Open Graph */
  ogType?: 'website' | 'article' | 'business.business' | 'place' | string;
}

export function SEO({
  title,
  description,
  canonical,
  ogImage,
  ogImageAlt,
  twitterHandle,
  keywords,
  author = 'Hyderabadi Mehfil Restaurant',
  robots = 'index, follow',
  ogType = 'website',
}: SEOProps) {
  // Ensure title doesn't duplicate site name if it already contains it
  const fullTitle = title.includes('Hyderabadi Mehfil') ? title : `${title} | Hyderabadi Mehfil`;

  // Determine canonical URL - use current location or provided canonical
  const canonicalUrl = canonical || (typeof window !== 'undefined' ? window.location.href : '');

  // Open Graph image defaults to restaurant logo
  const ogImageUrl = ogImage || 'https://www.hyderabadimehfil.co.uk/assets/aistudio/image_f2d48441.png';
  const ogImageAltText = ogImageAlt || 'Hyderabadi Mehfil Restaurant';

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}
      <meta name="robots" content={robots} />

      {/* Canonical URL - prevents duplicate content issues */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph Tags (Facebook, LinkedIn, etc.) */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:alt" content={ogImageAltText} />
      <meta property="og:site_name" content="Hyderabadi Mehfil" />

      {/* Twitter Card Tags (X, formerly Twitter) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta name="twitter:image:alt" content={ogImageAltText} />
      {twitterHandle && <meta name="twitter:creator" content={`@${twitterHandle}`} />}
      {canonicalUrl && <meta name="twitter:url" content={canonicalUrl} />}

      {/* Viewport for mobile (usually in HTML, but included here for completeness) */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
}

/**
 * Pre-configured SEO presets for common pages
 */
export const seoPresets = {
  home: {
    title: 'Hyderabadi Mehfil | Authentic Dum Biryani, Halal Mandi & Tandoor in Ilford, London',
    description:
      'Savor authentic 100% Halal Hyderabadi Dum Biryani, slow-roasted Lamb Mandi & charcoal Tandoor grills at Hyderabadi Mehfil, 290 Ilford Lane, Ilford, London IG1 2LP.',
    keywords:
      'Hyderabadi Mehfil, Dum Biryani, Halal Mandi, Tandoor, Indian Restaurant, Ilford, London',
    ogType: 'business.business' as const,
  },

  menu: {
    title: 'Menu | Hyderabadi Mehfil',
    description:
      'Explore our full menu of authentic Hyderabadi Dum Biryani, Halal Mandi, Tandoor Grills, and vegetarian dishes. 100% Halal certified. Free delivery over £25.',
    keywords:
      'Hyderabadi menu, Biryani, Mandi, Tandoor, Indian restaurant menu, Halal food London',
    ogType: 'website' as const,
  },

  contact: {
    title: 'Contact Us | Hyderabadi Mehfil',
    description:
      'Get in touch with Hyderabadi Mehfil. Visit us at 290 Ilford Lane, Ilford, London IG1 2LP. Call +44 20 8637 3224 or fill out our contact form.',
    keywords: 'Contact Hyderabadi Mehfil, Ilford restaurant, reservations, enquiries',
    ogType: 'business.business' as const,
  },
};
