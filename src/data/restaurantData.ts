export type PageRoute = 'home' | 'menu' | 'contact';

export type DietaryFilter = 'all' | 'halal' | 'veg' | 'spicy';

export interface SpecialItem {
  id: string;
  dayLabel: string;
  scheduleTag: string;
  name: string;
  price: string;
  description: string;
  imageUrl?: string;
  dietary: Array<Exclude<DietaryFilter, 'all'>>;
}

export interface SimpleDishItem {
  id: string;
  name: string;
  price: string;
  portion?: string;
  badge?: string;
  description: string;
  isVeg?: boolean;
  imageUrl?: string;
  dietary: Array<Exclude<DietaryFilter, 'all'>>;
}

export interface TandoorItem {
  id: string;
  name: string;
  price?: string;
  portion?: string;
  badge?: string;
  description: string;
  isVeg?: boolean;
  imageUrl?: string;
  selectablePortions?: Array<{ label: string; price: string }>;
  dietary: Array<Exclude<DietaryFilter, 'all'>>;
}

export interface PlatterItem {
  id: string;
  tag: string;
  name: string;
  price: string;
  description: string;
  imageUrl?: string;
  contents: string[];
  dietary: Array<Exclude<DietaryFilter, 'all'>>;
}

export interface BiryaniItem {
  id: string;
  tag: string;
  name: string;
  description: string;
  accompaniment: string;
  imageUrl?: string;
  sizes: Array<{
    key: 'regular' | 'large' | 'family';
    label: string;
    serves: string;
    price: string;
  }>;
  dietary: Array<Exclude<DietaryFilter, 'all'>>;
}

export interface MandiItem {
  id: string;
  tag: string;
  name: string;
  description: string;
  imageUrl?: string;
  tiers: Array<{ label: string; price: string; highlight?: boolean }>;
  dietary: Array<Exclude<DietaryFilter, 'all'>>;
}

export interface ExtraItem {
  id: string;
  name: string;
  price: string;
  dietary: Array<Exclude<DietaryFilter, 'all'>>;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  actionLabel?: string;
  actionRoute?: PageRoute;
  actionSection?: string;
}

export const RESTAURANT_INFO = {
  name: 'Hyderabadi Mehfil',
  fullTitle: 'Hyderabadi Mehfil Restaurant',
  tagline: 'Authentic Hyderabadi Kitchen · Ilford',
  footerTagline: 'Authentic Hyderabadi biryani and delicious dishes.',
  addressLine1: '290 Ilford Lane',
  addressLine2: 'Ilford, IG1 2LP',
  fullAddress: '290 Ilford Lane, Ilford, IG1 2LP',
  phoneDisplay: '+44 20 8637 3224',
  phoneHref: 'tel:+442086373224',
  email: 'info@hyderabadimehfil.com',
  emailHref: 'mailto:info@hyderabadimehfil.com',
  instagramUrl: 'https://www.instagram.com/hyderabadi.mehfil',
  instagramHandle: 'hyderabadi.mehfil',
  mapsUrl: 'https://maps.google.com/?q=290+Ilford+Lane,+Ilford,+IG1+2LP',
  mapsEmbedUrl: 'https://www.google.com/maps?q=290+Ilford+Lane,+Ilford,+IG1+2LP&output=embed',
  hoursMain: 'Every day except Friday: 12 Noon – 11 PM',
  hoursFriday: 'Friday: 2 PM – 11 PM',
  copyright: '© 2026 Hyderabadi Mehfil. All rights reserved.',
  logoUrl: '/assets/aistudio/image_f2d48441.png',
  heroImageUrl: '/src/assets/images/hero_biryani_feast_1795095626213.jpg',
  storyImageUrl: '/src/assets/images/story_uk_kitchen_1795101289775.jpg',
  menuHeroImageUrl: '/src/assets/images/hero_menu_feast_1795100676516.jpg',
  contactHeroImageUrl: '/src/assets/images/hero_contact_evening_1795100675568.jpg',
  promoVideoUrl: '/assets/aistudio/gemini_generated_video_10edc445_28f4bd91.mp4',
};

export const CONTACT_VIGNETTES = [
  {
    title: 'Hyderabadi Dum Biryani',
    imageUrl: '/src/assets/images/vignette_biryani_pour_1795100675797.jpg',
    alt: 'Brass serving spoon lifting steaming saffron-layered Hyderabadi dum biryani from a hammered copper pot.',
  },
  {
    title: 'Charcoal Grills & Kebabs',
    imageUrl: '/src/assets/images/vignette_charcoal_grill_1795100676715.jpg',
    alt: 'Sizzling charcoal-grilled lamb chops and seekh kebabs on cast iron platter with fresh mint chutney.',
  },
  {
    title: 'Warm Ilford Dining Room',
    imageUrl: '/src/assets/images/vignette_dining_table_1795100698093.jpg',
    alt: 'Warm corner booth table inside Hyderabadi Mehfil lit by glowing brass lanterns.',
  },
];

export const POPULAR_MAIN_COURSES = [
  {
    id: 'popular-lamb-mandi',
    name: 'Lamb Mandi',
    price: '£11.99',
    priceNote: 'Regular',
    tag: 'Signature Dish',
    footerLabel: 'House Favorite',
    menuSection: 'mandi',
    description:
      'Tender lamb slow-cooked with fragrant Arabic spices and served over flavorful rice, an authentic traditional feast.',
    imageUrl: '/src/assets/images/dish_lamb_mandi_1795095626325.jpg',
    alt: 'Authentic Lamb Mandi plate with spiced basmati rice and toasted almonds.',
  },
  {
    id: 'popular-dessert',
    name: 'Dessert',
    price: '£5.50',
    tag: 'Sweet Ending',
    footerLabel: 'Freshly Prepared',
    menuSection: 'lassi',
    description:
      'Creamy, smooth custard served with a medley of fresh, juicy fruits, a delightful and refreshing finish.',
    imageUrl: '/src/assets/images/dish_fruit_custard_1795095626978.jpg',
    alt: 'Creamy fruit custard dessert bowl garnished with fresh mango, strawberries, pomegranate, and pistachios.',
  },
  {
    id: 'popular-lamb-biryani',
    name: 'Mehfil-e-Lamb Biryani',
    price: '£7.99',
    priceNote: 'Regular',
    tag: 'Dum Pukht',
    footerLabel: 'Traditional Handi Dum',
    menuSection: 'biryani',
    description:
      'A classic Hyderabadi delicacy of aromatic basmati rice layered with succulent lamb and whole spices, cooked to perfection.',
    imageUrl: '/src/assets/images/dish_lamb_biryani_1795095626494.jpg',
    alt: 'Mehfil-e-Lamb Biryani cooked Dum Pukht style in a hammered copper handi.',
  },
  {
    id: 'popular-mojito',
    name: 'Mojito',
    price: '£4.95',
    tag: 'Beverage',
    footerLabel: 'Chilled & Crisp',
    menuSection: 'lassi',
    description:
      'A refreshing blend of mint leaves, lime, sugar, soda and crushed ice. Cool, zesty and thirst-quenching.',
    imageUrl: '/src/assets/images/dish_mint_mojito_1795095626276.jpg',
    alt: 'Tall chilled glass of handcrafted mint lime mojito over crushed ice.',
  },
];

export const GALLERY_ITEMS = [
  {
    id: 'gallery-handi',
    spanWide: true,
    eyebrow: 'The Royal Spread',
    title: 'Hyderabadi Dastarkhwan Feast',
    caption: 'Royal Biryani, Charcoal Kebabs, Salan & Fresh Naan Served Together',
    imageUrl: '/src/assets/images/gallery_bismillah_feast_1795100676747.jpg',
    alt: 'Grand table spread at Hyderabadi Mehfil with copper biryani pot, charcoal kebabs, naan, and mango lassi.',
  },
  {
    id: 'gallery-tandoor',
    spanWide: false,
    eyebrow: 'Charcoal Sigdi',
    title: 'Live Ember Skewers & Grills',
    caption: 'Marinated Lamb & Chicken Tikka Skewers Charred Over Live Charcoal',
    imageUrl: '/src/assets/images/gallery_tandoor_fire_1795100674296.jpg',
    alt: 'Marinated tandoori lamb and chicken tikka skewers roasting over glowing red charcoal embers.',
  },
  {
    id: 'gallery-chai-dessert',
    spanWide: false,
    eyebrow: 'Sweet & Spiced',
    title: 'Fruit Custard & Masala Chai',
    caption: 'Chilled Fruit Custard & Steaming Irani-Style Chai',
    imageUrl: '/src/assets/images/gallery_chai_dessert_1795100675633.jpg',
    alt: 'Hammered brass bowl of fruit custard with pistachios and pomegranate beside two glasses of masala chai.',
  },
  {
    id: 'gallery-spices',
    spanWide: false,
    eyebrow: 'Whole Spices',
    title: 'Saffron, Cardamom & Star Anise',
    caption: 'Fresh Whole Spices Ground Daily in Our Kitchen',
    imageUrl: '/src/assets/images/gallery_spices_table_1795095832652.jpg',
    alt: 'Whole green cardamom pods, saffron threads, cinnamon bark, star anise and cloves in brass bowls.',
  },
  {
    id: 'gallery-interior',
    spanWide: false,
    eyebrow: '290 Ilford Lane',
    title: 'The Mehfil Dining Room',
    caption: 'Warm Evening Dining at Hyderabadi Mehfil Ilford',
    imageUrl: '/src/assets/images/gallery_dining_room_1795095833708.jpg',
    alt: 'Warm dining room interior at Hyderabadi Mehfil on Ilford Lane with diners.',
  },
];

export const TESTIMONIALS = [
  {
    id: 'asim',
    name: 'Asim',
    initial: 'A',
    subtitle: 'Verified Diner · Ilford',
    stars: 4,
    quote:
      "Mehfil truly brought the taste of home to my table. The biryani reminded me of family feasts back in Hyderabad, and the kebabs melted in my mouth. It's an experience I'll keep coming back for.",
  },
  {
    id: 'rafay',
    name: 'Rafay',
    initial: 'R',
    subtitle: 'Verified Diner · London',
    stars: 4,
    quote:
      'The staff explained the dishes so kindly, and every recommendation was spot on. Warm service, authentic flavors and a cozy ambiance.',
  },
];

export const MENU_CATEGORIES = [
  { id: 'specials', label: 'Daily & Weekend Special' },
  { id: 'starters', label: 'Starters' },
  { id: 'tandoor', label: 'Tandoor' },
  { id: 'platters', label: 'Platters' },
  { id: 'biryani', label: 'Hyderabadi Dum Biryani' },
  { id: 'lamb', label: 'Mehfil-e-Lamb' },
  { id: 'murgh', label: 'Mehfil-e-Murgh' },
  { id: 'mandi', label: 'Mehfil-e-Mandi' },
  { id: 'veg', label: 'Veg Items' },
  { id: 'roti', label: 'Mehfil-e-Roti' },
  { id: 'extras', label: "Extra's" },
  { id: 'lassi', label: 'Mehfil-e-Lassi' },
];

export const DAILY_WEEKEND_SPECIALS: SpecialItem[] = [
  {
    id: 'special-dalcha-khichdi',
    dayLabel: 'DAILY',
    scheduleTag: 'Available All Week',
    name: 'Dalcha, Khichdi, Kheema',
    price: '6.99',
    description: 'A traditional Hyderabadi comfort meal. Rich, hearty and full of flavor.',
    imageUrl: '/src/assets/images/dish_dalcha_khichdi_1795095811627.jpg',
    dietary: ['halal'],
  },
  {
    id: 'special-friday-trio',
    dayLabel: 'FRIDAY',
    scheduleTag: 'Jummah Service',
    name: 'Dalcha, Suka Salan, Bagara Rice',
    price: '6.99',
    description:
      'A rich and comforting trio of traditional flavors: hearty dalcha, aromatic bagara rice and perfectly spiced mutton fry.',
    imageUrl: '/src/assets/images/dish_dalcha_bagara_1795100675311.jpg',
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'special-haleem',
    dayLabel: 'FRIDAY, SATURDAY & SUNDAY',
    scheduleTag: 'Slow Simmered',
    name: 'Haleem',
    price: '7.99',
    description:
      'A slow-cooked delicacy made with wheat, lentils and tender meat. Rich, creamy and packed with aromatic spices for a hearty flavor.',
    imageUrl: '/src/assets/images/dish_haleem_1795095811109.jpg',
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'special-maragh',
    dayLabel: 'SATURDAY & SUNDAY',
    scheduleTag: 'Saturday Special',
    name: 'Maragh (Saturday)',
    price: '6.99',
    description:
      'Slow-cooked trotters curry with traditional spices and herbs. Nutritious, hearty and full-bodied in flavor.',
    imageUrl: '/src/assets/images/dish_maragh_paya_1795095833127.jpg',
    dietary: ['halal'],
  },
  {
    id: 'special-lamb-brain',
    dayLabel: 'SATURDAY & SUNDAY',
    scheduleTag: 'Sunday Delicacy',
    name: 'Lamb Brain (Sunday)',
    price: '7.99',
    description:
      'Delicately cooked lamb brain with a soft, creamy texture, gently spiced and sautéed to perfection. A rich, indulgent delicacy with deep, savory flavors.',
    imageUrl: '/src/assets/images/dish_lamb_brain_masala_1795100675713.jpg',
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'special-paya',
    dayLabel: 'SATURDAY & SUNDAY',
    scheduleTag: 'Sunday Special',
    name: 'Paya (Sunday)',
    price: '8.99',
    description: 'Rich, spiced mutton soup simmered to perfection. Warm, flavorful and full of aromatic notes.',
    imageUrl: '/src/assets/images/dish_paya_soup_1795100676112.jpg',
    dietary: ['halal', 'spicy'],
  },
];

export const STARTERS_ITEMS: SimpleDishItem[] = [
  {
    id: 'starter-chicken-65',
    name: 'Chicken 65',
    price: '7.99',
    portion: 'Regular',
    description:
      'A spicy, deep-fried South Indian chicken starter bursting with bold flavors. Marinated in aromatic spices, crispy outside and juicy inside.',
    imageUrl: '/src/assets/images/dish_chicken_65_1795100675368.jpg',
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'starter-chicken-chilli',
    name: 'Chicken Chilli',
    price: '7.99',
    portion: 'Regular',
    description:
      'A popular Indo-Chinese dish of tender chicken tossed in spicy, tangy sauces, stir-fried with peppers, onions and chilies for a zesty kick.',
    imageUrl: '/src/assets/images/dish_chicken_chilli_1795100676140.jpg',
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'starter-tawala-gosh',
    name: 'Tawala Gosh',
    price: '9.99',
    portion: 'Regular',
    description:
      'Tender pieces of meat seared on a hot tawa with bold Hyderabadi spices. Smoky, juicy and full of flavor.',
    imageUrl: '/src/assets/images/dish_tawala_gosht_1795100676555.jpg',
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'starter-chicken-lollipop',
    name: 'Chicken Lollipop',
    price: '8.99',
    portion: 'Regular',
    description:
      'Frenched chicken wings, deep-fried to golden perfection and coated in a signature spicy glaze. Crispy on the outside, succulent and juicy within.',
    imageUrl: '/src/assets/images/dish_chicken_lollipop_1795100697791.jpg',
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'starter-chilli-paneer',
    name: 'Chilli Paneer',
    price: '7.99',
    portion: 'Regular',
    isVeg: true,
    description:
      'Golden-fried paneer cubes coated in a flavorful chili garlic sauce. Soft, creamy interiors with a bold outer kick.',
    imageUrl: '/src/assets/images/dish_chilli_paneer_1795100698491.jpg',
    dietary: ['veg', 'spicy'],
  },
];

export const TANDOOR_ITEMS: TandoorItem[] = [
  {
    id: 'tandoor-mix-chicken-tikka',
    name: 'Mix Chicken Tikka (6 pcs)',
    price: '7.99',
    portion: '6 pcs',
    description: 'Assorted tikka pieces grilled to smoky perfection.',
    imageUrl: '/src/assets/images/dish_chicken_tikka_1795095810760.jpg',
    dietary: ['halal'],
  },
  {
    id: 'tandoor-tandoori-chicken',
    name: 'Tandoori Chicken',
    description: 'Juicy marinated chicken roasted in a clay oven.',
    imageUrl: '/src/assets/images/dish_tandoori_chicken_whole_1795100705561.jpg',
    selectablePortions: [
      { label: 'Half', price: '9.99' },
      { label: 'Full', price: '19.99' },
    ],
    dietary: ['halal'],
  },
  {
    id: 'tandoor-tangdi-kebab',
    name: 'Tangdi Kebab (Spl.) (2 pcs)',
    price: '9.99',
    portion: '2 pcs',
    description: 'Spicy grilled chicken drumsticks with bold flavors.',
    imageUrl: '/src/assets/images/dish_tangdi_kebab_1795100704572.jpg',
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'tandoor-pathar-ka-gosht',
    name: 'Pathar ka Gosht',
    price: '14.99',
    badge: 'House Classic',
    description: 'Tender lamb pieces, pan-seared and spiced to perfection, with rich, aromatic flavors.',
    imageUrl: '/src/assets/images/dish_pathar_gosht_1795095811292.jpg',
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'tandoor-chicken-sheekh',
    name: 'Chicken Sheekh Kebab (4 pcs)',
    price: '7.99',
    portion: '4 pcs',
    description: 'Minced chicken skewers, tender and aromatic.',
    imageUrl: '/src/assets/images/dish_chicken_seekh_1795100705696.jpg',
    dietary: ['halal'],
  },
  {
    id: 'tandoor-lamb-sheekh',
    name: 'Lamb Sheekh Kebab (4 pcs)',
    price: '9.99',
    portion: '4 pcs',
    description: 'Spicy minced lamb kebabs grilled over charcoal.',
    imageUrl: '/src/assets/images/dish_seekh_kebabs_1795095810646.jpg',
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'tandoor-malai-paneer',
    name: 'Malai Paneer Tikka Kebab (6 pcs)',
    price: '8.99',
    portion: '6 pcs',
    isVeg: true,
    description: 'Succulent paneer marinated in creamy malai and mild spices, grilled until smoky and tender.',
    imageUrl: '/src/assets/images/dish_malai_paneer_tikka_1795100704164.jpg',
    dietary: ['veg'],
  },
  {
    id: 'tandoor-lamb-chops',
    name: 'Lamb Chops (5 pcs)',
    price: '11.99',
    portion: '5 pcs',
    description: 'Succulent lamb chops marinated and grilled for a smoky taste.',
    imageUrl: '/src/assets/images/dish_lamb_chops_1795095811536.jpg',
    dietary: ['halal'],
  },
];

export const PLATTER_ITEMS: PlatterItem[] = [
  {
    id: 'platter-mini',
    tag: 'Solo Feast',
    name: 'Mehfil-e-Kebab Mini',
    price: '10.99',
    description: 'A sampler of chicken tikka, malai, sheekh and lamb chop. Ideal for one.',
    imageUrl: '/src/assets/images/dish_platter_mini_1795100703860.jpg',
    contents: [
      'Zaffrani Chicken Tikka (2 pcs)',
      'Murg Malai Tikka (2 pcs)',
      'Murg Hariyali Tikka (2 pcs)',
      'Chicken Sheekh Kebab (2 pcs)',
    ],
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'platter-mix',
    tag: 'Sharing Platter',
    name: 'Mehfil-e-Kebab (Mix)',
    price: '17.99',
    description: 'A hearty platter of assorted chicken, lamb chops and kebabs to share.',
    imageUrl: '/src/assets/images/dish_kebab_platter_1795095810590.jpg',
    contents: [
      'Zafrani Chicken Tikka (3 pcs)',
      'Murg Hariyali Tikka (3 pcs)',
      'Murg Malai Tikka (3 pcs)',
      'Lamb Sheekh Kebab (2 pcs)',
      'Lamb Chops (2 pcs)',
    ],
    dietary: ['halal', 'spicy'],
  },
];

export const BIRYANI_ITEMS: BiryaniItem[] = [
  {
    id: 'biryani-lamb',
    tag: "Chef's Signature",
    name: 'Mehfil-e-Lamb Biryani',
    description: 'Tender lamb layered with aromatic dum biryani rice.',
    accompaniment: 'Served with Mirchi Ka Salan & Raita',
    imageUrl: '/src/assets/images/dish_lamb_biryani_1795095626494.jpg',
    sizes: [
      { key: 'regular', label: 'Regular', serves: '1 Person', price: '7.99' },
      { key: 'large', label: 'Large', serves: '2-3 Persons', price: '15.99' },
      { key: 'family', label: 'Family', serves: '4-5 Persons', price: '29.99' },
    ],
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'biryani-chicken',
    tag: 'House Classic',
    name: 'Mehfil-e-Chicken Biryani',
    description:
      'Classic Hyderabadi biryani with juicy chicken simmered on dum inside seasoned pots, releasing fragrant steam when unsealed.',
    accompaniment: 'Served with Mirchi Ka Salan & Raita',
    imageUrl: '/src/assets/images/dish_chicken_biryani_1795095626506.jpg',
    sizes: [
      { key: 'regular', label: 'Regular', serves: '1 Person', price: '6.99' },
      { key: 'large', label: 'Large', serves: '2-3 Persons', price: '13.99' },
      { key: 'family', label: 'Family', serves: '4-5 Persons', price: '24.99' },
    ],
    dietary: ['halal', 'spicy'],
  },
];

export const LAMB_CURRIES: SimpleDishItem[] = [
  {
    id: 'lamb-malai',
    name: 'Lamb Malai',
    price: '8.99',
    description: 'Creamy lamb curry with rich, mild flavors.',
    imageUrl: '/src/assets/images/dish_lamb_malai_1795100704466.jpg',
    dietary: ['halal'],
  },
  {
    id: 'achari-lamb',
    name: 'Achari Lamb',
    price: '8.99',
    description: 'Tangy lamb curry cooked with pickle-style spices.',
    imageUrl: '/src/assets/images/dish_achari_curry_1795095832484.jpg',
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'lamb-masala',
    name: 'Lamb Masala',
    price: '8.99',
    description: 'Robust lamb curry with bold masala flavors.',
    imageUrl: '/src/assets/images/dish_lamb_masala_1795100704378.jpg',
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'lamb-kadai',
    name: 'Lamb Kadai',
    price: '8.99',
    description: 'Lamb cooked with peppers, onions and freshly ground kadai spices.',
    imageUrl: '/src/assets/images/dish_lamb_kadai_1795100704059.jpg',
    dietary: ['halal', 'spicy'],
  },
];

export const MURGH_CURRIES: SimpleDishItem[] = [
  {
    id: 'dum-ka-muragh',
    name: 'Dum Ka Muragh',
    price: '7.99',
    badge: 'House Special',
    description: 'Slow-cooked creamy chicken curry with delicate spices.',
    imageUrl: '/src/assets/images/dish_dum_ka_murgh_1795100703952.jpg',
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'achari-chicken',
    name: 'Achari Chicken',
    price: '7.99',
    description: 'Tangy chicken curry with pickle-style seasoning.',
    imageUrl: '/src/assets/images/dish_achari_chicken_1795100703898.jpg',
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'butter-chicken',
    name: 'Butter Chicken',
    price: '7.99',
    description: 'Creamy tomato-based chicken curry, mildly spiced.',
    imageUrl: '/src/assets/images/dish_butter_chicken_1795095811434.jpg',
    dietary: ['halal'],
  },
  {
    id: 'hariyali-chicken',
    name: 'Hariyali Chicken',
    price: '7.99',
    description: 'Chicken curry in a fresh green herb and spinach-style masala.',
    imageUrl: '/src/assets/images/dish_hariyali_chicken_1795095832543.jpg',
    dietary: ['halal'],
  },
  {
    id: 'kadai-chicken',
    name: 'Kadai Chicken',
    price: '7.99',
    description: 'Spicy chicken curry with peppers and onions, finished with aromatic kadai spices.',
    imageUrl: '/src/assets/images/dish_kadai_chicken_1795100704468.jpg',
    dietary: ['halal', 'spicy'],
  },
];

export const MANDI_ITEMS: MandiItem[] = [
  {
    id: 'mandi-lamb',
    tag: 'Slow Pit Roast',
    name: 'Lamb Mandi',
    description: 'Slow-roasted lamb over spiced mandi rice, cooked with delicate spices.',
    imageUrl: '/src/assets/images/dish_lamb_mandi_1795095626325.jpg',
    tiers: [
      { label: 'Regular', price: '11.99' },
      { label: 'Large', price: '19.99' },
      { label: 'Family', price: '38.99', highlight: true },
    ],
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'mandi-chicken',
    tag: 'Clay Roasted',
    name: 'Chicken Mandi',
    description: 'Juicy roasted chicken with fragrant mandi rice.',
    imageUrl: '/src/assets/images/dish_chicken_mandi_1795095807847.jpg',
    tiers: [
      { label: 'Regular', price: '9.99' },
      { label: 'Large', price: '17.99' },
      { label: 'Family', price: '33.99', highlight: true },
    ],
    dietary: ['halal'],
  },
  {
    id: 'mandi-zurbiyani',
    tag: 'Special Zurbiyan',
    name: 'Mehfil-e-Spl. Zurbiyani Mandi',
    description: 'Special mandi with a Hyderabadi twist.',
    imageUrl: '/src/assets/images/dish_zurbiyani_mandi_1795100704615.jpg',
    tiers: [
      { label: 'Large', price: '22.99' },
      { label: 'Family', price: '44.99', highlight: true },
    ],
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'mandi-faham',
    tag: 'Charcoal Grilled',
    name: 'Chicken Faham Mandi',
    description: 'Smoky, charcoal-style grilled chicken served over fragrant mandi rice.',
    imageUrl: '/src/assets/images/dish_chicken_faham_mandi_1795100740509.jpg',
    tiers: [
      { label: 'Large', price: '18.99' },
      { label: 'Family', price: '33.99', highlight: true },
    ],
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'mandi-mix',
    tag: 'Sharing Feast',
    name: 'Mix Mandi',
    description: 'A generous mix of roasted meats over spiced mandi rice, finished with a Hyderabadi twist.',
    imageUrl: '/src/assets/images/dish_mix_mandi_feast_1795100740590.jpg',
    tiers: [
      { label: 'Large', price: '30.99' },
      { label: 'Family', price: '49.99', highlight: true },
    ],
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'mandi-platter',
    tag: 'Group Sharing',
    name: 'Platter Mandi',
    description: 'A sharing platter of roasted meats served over fragrant mandi rice.',
    imageUrl: '/src/assets/images/dish_platter_mandi_1795095808042.jpg',
    tiers: [{ label: 'Large', price: '27.99', highlight: true }],
    dietary: ['halal', 'spicy'],
  },
];

export const VEG_ITEMS: SimpleDishItem[] = [
  {
    id: 'veg-gobi-65',
    name: 'Gobi 65',
    price: '7.99',
    isVeg: true,
    description:
      'Crispy fried cauliflower tossed in bold South Indian spices for a fiery, addictive bite. Crunchy outside with a soft, flavorful center.',
    imageUrl: '/src/assets/images/dish_gobi_65_1795100741224.jpg',
    dietary: ['veg', 'spicy'],
  },
  {
    id: 'veg-chilli-paneer',
    name: 'Chilli Paneer',
    price: '7.99',
    isVeg: true,
    description:
      'Soft paneer cubes stir-fried in a tangy, spicy Indo-Chinese sauce. Loaded with capsicum, onions and rich umami flavors.',
    imageUrl: '/src/assets/images/dish_veg_chilli_paneer_plate_1795100740415.jpg',
    dietary: ['veg', 'spicy'],
  },
  {
    id: 'veg-mix-curry',
    name: 'Mix Veg Curry',
    price: '7.99',
    isVeg: true,
    imageUrl: '/src/assets/images/dish_veg_curry_1795095833021.jpg',
    description:
      'A hearty blend of fresh vegetables cooked in a rich, aromatic gravy. Balanced spices create a comforting and wholesome dish.',
    dietary: ['veg'],
  },
  {
    id: 'veg-paneer-curry',
    name: 'Paneer Curry',
    price: '7.99',
    isVeg: true,
    imageUrl: '/src/assets/images/dish_paneer_makhani_1795100740229.jpg',
    description:
      'Soft paneer simmered in a creamy, spiced tomato-based gravy. A classic favorite with rich texture and deep flavors.',
    dietary: ['veg'],
  },
  {
    id: 'veg-malai-paneer-tikka',
    name: 'Malai Paneer Tikka (6 pcs)',
    price: '8.99',
    portion: '6 pcs',
    isVeg: true,
    imageUrl: '/src/assets/images/dish_veg_paneer_skewers_1795100740443.jpg',
    description:
      'Succulent paneer marinated in creamy malai and mild spices, grilled to perfection. Smoky, juicy and melt-in-the-mouth.',
    dietary: ['veg'],
  },
  {
    id: 'veg-biryani',
    name: 'Veg Biryani',
    price: '5.99',
    isVeg: true,
    imageUrl: '/src/assets/images/dish_veg_biryani_1795100740346.jpg',
    description:
      'Fragrant basmati rice layered with spiced vegetables and herbs. Slow-cooked for a rich aroma and authentic biryani taste.',
    dietary: ['veg'],
  },
];

export const ROTI_ITEMS: SimpleDishItem[] = [
  {
    id: 'roti-plain-naan',
    name: 'Plain Naan',
    price: '1.49',
    isVeg: true,
    imageUrl: '/src/assets/images/dish_plain_naan_1795100740363.jpg',
    description: 'Soft, fluffy Indian bread.',
    dietary: ['veg'],
  },
  {
    id: 'roti-butter-naan',
    name: 'Butter Naan',
    price: '1.49',
    isVeg: true,
    imageUrl: '/src/assets/images/dish_tandoori_naan_1795095832682.jpg',
    description: 'Classic naan brushed with butter.',
    dietary: ['veg'],
  },
  {
    id: 'roti-garlic-naan',
    name: 'Garlic Naan',
    price: '2.99',
    isVeg: true,
    imageUrl: '/src/assets/images/dish_garlic_naan_1795100740336.jpg',
    description: 'Garlic-infused naan for extra flavor.',
    dietary: ['veg'],
  },
  {
    id: 'roti-paratha',
    name: 'Paratha',
    price: '3.49',
    isVeg: true,
    imageUrl: '/src/assets/images/dish_lachha_paratha_1795100740717.jpg',
    description: 'Rustic, layered paratha, flaky outside & soft inside.',
    dietary: ['veg'],
  },
  {
    id: 'roti-tandoori-roti',
    name: 'Tandoori Roti',
    price: '2.49',
    isVeg: true,
    imageUrl: '/src/assets/images/dish_tandoori_roti_1795100740462.jpg',
    description: 'Whole wheat flatbread from the tandoor.',
    dietary: ['veg'],
  },
  {
    id: 'roti-kulcha',
    name: 'Kulcha',
    price: '2.99',
    isVeg: true,
    imageUrl: '/src/assets/images/dish_kulcha_bread_1795100740840.jpg',
    description: 'Soft, fluffy bread baked in a tandoor.',
    dietary: ['veg'],
  },
];

export const EXTRAS_ITEMS: ExtraItem[] = [
  { id: 'extra-biryani-rice', name: 'Biryani Rice', price: '3.99', dietary: ['veg'] },
  { id: 'extra-mandi-rice', name: 'Mandi Rice', price: '4.99', dietary: ['veg'] },
  { id: 'extra-plain-rice', name: 'Plain Rice', price: '3.99', dietary: ['veg'] },
  { id: 'extra-mayo', name: 'Mayo', price: '0.99', dietary: ['veg'] },
  { id: 'extra-raita', name: 'Raita', price: '0.99', dietary: ['veg'] },
  { id: 'extra-green-salad', name: 'Green Salad', price: '0.99', dietary: ['veg'] },
  { id: 'extra-mandi-chutnay', name: 'Mandi Chutnay', price: '0.99', dietary: ['veg', 'spicy'] },
];

export const LASSI_ITEMS: SimpleDishItem[] = [
  {
    id: 'lassi-mango',
    name: 'Mango Lassi',
    price: '2.99',
    isVeg: true,
    imageUrl: '/src/assets/images/dish_mango_lassi_1795100740370.jpg',
    description: 'Smooth, mango-flavored yogurt drink.',
    dietary: ['veg'],
  },
  {
    id: 'lassi-sweet',
    name: 'Sweet Lassi',
    price: '2.99',
    isVeg: true,
    imageUrl: '/src/assets/images/dish_sweet_lassi_1795100740391.jpg',
    description: 'Refreshing sweet yogurt drink.',
    dietary: ['veg'],
  },
  {
    id: 'lassi-salt',
    name: 'Salt Lassi',
    price: '2.99',
    isVeg: true,
    imageUrl: '/src/assets/images/dish_salt_lassi_1795100741594.jpg',
    description: 'Smooth, lightly salted yogurt drink.',
    dietary: ['veg'],
  },
  {
    id: 'lassi-jug',
    name: 'Lassi Jug',
    price: '11.99',
    badge: 'Table Sharing',
    isVeg: true,
    imageUrl: '/src/assets/images/dish_lassi_jug_1795100741753.jpg',
    description: 'A large serving of chilled lassi for the table.',
    dietary: ['veg'],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-dietary',
    question: 'Do you cater for dietary restrictions, vegetarians, and food allergies?',
    answer:
      'Yes. We offer dedicated vegetarian dishes including Veg Biryani, Chilli Paneer, Gobi 65, Mix Veg Curry, Paneer Curry, and Malai Paneer Tikka, alongside freshly baked breads and yogurt lassi. If you or anyone in your party has allergies such as nuts, dairy, or gluten, please inform our staff before ordering so our kitchen can advise on ingredients and preparation.',
    actionLabel: 'Browse Vegetarian Menu',
    actionRoute: 'menu',
    actionSection: 'veg',
  },
  {
    id: 'faq-parking',
    question: 'Where can I park near 290 Ilford Lane?',
    answer:
      'Pay-and-display street parking bays are available along Ilford Lane and nearby residential side streets outside peak restriction hours, with public car parks a short walk away in Ilford town centre. We are also easily reached on foot from Ilford Station (Elizabeth line) and local bus routes stopping right along Ilford Lane.',
  },
  {
    id: 'faq-groups',
    question: 'Do you take large group bookings and family reservations?',
    answer:
      'Yes, families and large groups are always welcome at Hyderabadi Mehfil. For parties of 6 or more—or weekend evening tables—we recommend calling +44 20 8637 3224 or sending a message in advance so we can arrange comfortable seating and prepare sharing platters fresh for your arrival.',
    actionLabel: 'Request a Group Booking',
    actionRoute: 'contact',
  },
  {
    id: 'faq-halal-spice',
    question: 'Is all meat 100% Halal, and can spice levels be adjusted?',
    answer:
      'All poultry and lamb served at Hyderabadi Mehfil are 100% Halal-certified and sourced fresh daily. While traditional Hyderabadi Dum Biryani and curries carry authentic spice warmth, milder options such as Butter Chicken, Lamb Malai, and Malai Paneer Tikka are available, and our kitchen can tailor heat levels on cooked-to-order curries upon request.',
    actionLabel: 'Explore All Dishes',
    actionRoute: 'menu',
  },
  {
    id: 'faq-takeaway-hours',
    question: 'Can I pre-order takeaway for collection, and what are your Friday hours?',
    answer:
      'Yes, you can call +44 20 8637 3224 ahead to place a fresh takeaway order for convenient collection at 290 Ilford Lane. We are open 12 Noon to 11 PM every day except Friday; on Fridays we open from 2 PM to 11 PM following Jummah prayers.',
  },
  {
    id: 'faq-platters',
    question: 'Do you offer family sharing pots and platters for private gatherings?',
    answer:
      'We serve generous Family-size Lamb and Chicken Dum Biryani portions (serving 4–5 guests), communal Mandi sharing platters such as Platter Mandi and Mix Mandi, and assorted Kebab Platters ideal for home gatherings and celebrations. For larger custom event trays, get in touch with our kitchen team ahead of your event date.',
    actionLabel: 'View Biryanis & Platters',
    actionRoute: 'menu',
    actionSection: 'platters',
  },
];
