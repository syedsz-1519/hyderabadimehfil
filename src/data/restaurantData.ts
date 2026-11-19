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

export const RESTAURANT_INFO = {
  name: 'Hyderabadi Mehfil',
  fullTitle: 'Hyderabadi Mehfil Restaurant',
  tagline: 'Royal Cuisine of the Nizams',
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
  hoursMain: 'Every day except Friday: 12 Noon – 11 PM',
  hoursFriday: 'Friday: 2 PM – 11 PM',
  copyright: '© 2026 Hyderabadi Mehfil. All rights reserved.',
  logoUrl: '/assets/aistudio/WhatsApp_Image_2026-11-19_at_5.06.25_PM_ea53848c.jpeg',
  heroImageUrl:
    'https://lh3.googleusercontent.com/aida/ALJJyrCCfN1ldIZ1mCW5ZUbTgo4oYAjkpXN_hag_Vdj09M2Ww-uj9oXNWCFzFdrJ6rQHIycgrcPXW6gpS_yy_yCBxfXAjsP0blza2ozhbPUFGbEBLXInnz9oOgUxrizS6ySmTJg3DJMifH0WkAvK1lM6KkW0zFCNOzB9SLb19biVHegc6dQ0oKzkNhfHxOpYVd-43nMmobft3D2oXthh4mgxMYqWjKukZUVXdIYE9WiMAuT7wQ',
  mapImageUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBIRdEW-0KxARDpQLcmKX7QaCAbL_hhytTtSKj4o4w_l_50s_BWgqs2x_ui9cKLUtOghZ1MN2sVqS0BlAy8NifZrLjAt7xZRQTI-DOX0MjBpH_NUMOyFYbDJLanpg6ECP7-pkMzacC5h0CStFVr_BYj3HbZzay-AGtF8akgIn2VoCxSbr9larTAyMJTZYs7aKxwqjsP5Ud2hhAnqJG1eRfqfDcirzOQeeKRb7N2P6Xu',
};

export const CONTACT_VIGNETTES = [
  {
    title: 'Royal Dum Biryani',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBN-55X-c-sy8S0jBJJmPFMkA5Y8n8zsDytM-RC1tlgEaL7NZORMbmjIGEoNLwkvDoH00gnxt41M2gelZHrlu90rShTJRh0yaMikxDBproytiZtO0hFg1u8wXvmY8XI_FBCAmRFS6S4SutYZVtDw-E-9-DZZUbc78z_Og7JKq0-I5hpvXpfSlXgdcWrwfCKALQLsK9qJCS6G9i1yTcMUAXjMnSVIA42T7kr5kTrJs1m',
    alt: 'Authentic steaming Hyderabadi Dum Biryani served in a hammered antique copper handi.',
  },
  {
    title: 'Charcoal Grills & Salan',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB1IGNpRFlIvrcXhS0Ie3JxMEw_MgdYdoDwIvDNrNW4wlXLURKnAgBEDr7pCfsdyEHuuxGPc0s5N5Wc9ekkpTVLLIRONYmgcJV4HOn5Q5VF7vlbSSv_HfX3BRI4G2Du3DtFQIU4euDMmXy3leKD6CkzckkQAaCEGXsezE1xsiyUMOpKpsUevUkifRC5fKQC4aPGNLpekJZ9cjjtxnDAkOTkOsEPGXA0chgLO-zN17vz',
    alt: 'Grilled lamb chops, seekh kebabs on skewers, mirchi ka salan, and creamy raita bowls.',
  },
  {
    title: 'Nizami Banquet Warmth',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCL2C-nC5H7TIdeq9ufyQgvpXvzG22PIpHunbAcd8kpzrg0uTNbW8Kw1CFAuCEON4u2Qt-iJrwPNeEZv3bTahmUZacp1_ked4Ve6CmAZPKFjn3seef01vf02-TP2Hk3xvoDha1c5s85Q2ZIo9RS9BWgtWyg7gomqxyOVeNwQ79l0bqKsynYeP__JoljMidQievtvugiysfsnw_1CtzjIKFLE2DoP0ww5MtnC-9lUzZY',
    alt: 'Intimate royal dining table setup at Hyderabadi Mehfil Ilford with warm golden lighting.',
  },
];

export const POPULAR_MAIN_COURSES = [
  {
    id: 'popular-lamb-mandi',
    name: 'Lamb Mandi',
    price: '£11.99',
    priceNote: 'Regular',
    tag: 'Royal Feast',
    footerLabel: "Chef's Signature",
    menuSection: 'mandi',
    description:
      'Tender lamb slow-cooked with fragrant Arabic spices and served over flavorful rice, an authentic traditional feast.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDNrkaqjE6LMh3nICzVigh92UDNHROEzQMPCkd4pBYnotG2GOuKsWZtgJ5l0lFENiRgyt4E_36YnYaxDjLvKPTZHmmNhsO4fNMCol4bzb82YTtgPSHG-dobe9xB_XE2aOSDZXHCC3ijJznwfShOL53nyBIuphRtpHlUgXafqV3YuGfGv9H3mQnQjQuHtjuXQ1fVHcCFUlloYe2TWhx8exGqvm5ZeJCYdpTezznw78t-',
    alt: 'Authentic Lamb Mandi plate with spiced basmati rice and roasted almonds.',
  },
  {
    id: 'popular-dessert',
    name: 'Dessert',
    price: '£5.50',
    tag: 'Sweet Ending',
    footerLabel: 'House Specialty',
    menuSection: 'lassi',
    description:
      'Creamy, smooth custard served with a medley of fresh, juicy fruits, a delightful and refreshing finish.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA9hgM_Oqi5-G7WqPXTG0V3yyRrhGPH1gfcoN7iXK_1ivjCJXlYfqcwYHEnyYUsNqxu3vFclCA1BVcyte034lRvrJwgp86LAsGTTNL4ZsmIU1RkIDEtMBKnthWrbDaldMLUm2zazG9zDaa9UJTJRzUy1cx-r-TztYwGgHjTNKux8nlktZohjjxrd88YE51Diky8sgyNINNKBqt-WBRtgu6vJ6-IAh8kK3Pg_n1BMWBZ',
    alt: 'Creamy saffron fruit custard dessert bowl garnished with fresh fruits and berries.',
  },
  {
    id: 'popular-lamb-biryani',
    name: 'Mehfil-e-Lamb Biryani',
    price: '£7.99',
    priceNote: 'Regular',
    tag: 'Dum Pukht',
    footerLabel: 'Authentic Nizam Dum',
    menuSection: 'biryani',
    description:
      'A royal Hyderabadi delicacy of aromatic basmati rice layered with succulent lamb and rich spices, cooked to perfection.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDDcVEKDl4rhtQuYuaNmpZCsU0ceQm9FAGgyFzS6GihP3-YUrCgAPhMcVDT35zfHvR6fO_KbTL49ekxKEDWD7nWkenstEUC9HbGeRDL29TJPBL9pTndSjB_i85M4-Nj4uuUiftcV4xGBdOPSYUUWn7-MZ_9Oe0KBu3gPVtE2LGzZ_oMOcILNdoqryC85w7BEy6z8SUYFo7wgc_bqhKJmCWsDZOjksr9_javRFskokig',
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
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuChhDI3xd7n9KO2ccuINpixsolRlDQi1Y66kuugPObBp5aAtizH2WJmFgpVLGUmzFvlJwvwXVq-62Ob2_v6zeHZhpq7hR7blvSC-lCFdSp5hs9ErQvx5BDhGvdIozcc4Q5yvkkUk8AGO6NYQgkslBduUiBCmcke2IiL2AhU-6lo-9UmaA2QGx6NOUw26uB9mypkuR1gGt5aSQfAYCWLchrPI65IFd23Po0Wy9fiUOpQ',
    alt: 'Tall chilled glass tumbler of handcrafted mint lime mojito over crushed ice.',
  },
];

export const GALLERY_ITEMS = [
  {
    id: 'gallery-handi',
    spanWide: true,
    eyebrow: 'Handi Dum Pukht',
    title: 'Hyderabadi Mehfil Copper Handi Banquet',
    caption: 'Royal Nizam Dum Biryani Banquet Feast',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDDcVEKDl4rhtQuYuaNmpZCsU0ceQm9FAGgyFzS6GihP3-YUrCgAPhMcVDT35zfHvR6fO_KbTL49ekxKEDWD7nWkenstEUC9HbGeRDL29TJPBL9pTndSjB_i85M4-Nj4uuUiftcV4xGBdOPSYUUWn7-MZ_9Oe0KBu3gPVtE2LGzZ_oMOcILNdoqryC85w7BEy6z8SUYFo7wgc_bqhKJmCWsDZOjksr9_javRFskokig',
    alt: 'Royal Nizam Dum Biryani Banquet Feast in copper handi with seekh kebabs and lamb chops.',
  },
  {
    id: 'gallery-mandi',
    spanWide: false,
    eyebrow: 'Arabian Heritage',
    title: 'Traditional Lamb Mandi Feast',
    caption: 'Slow-Braised Tender Lamb Shank Mandi Platter',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDNrkaqjE6LMh3nICzVigh92UDNHROEzQMPCkd4pBYnotG2GOuKsWZtgJ5l0lFENiRgyt4E_36YnYaxDjLvKPTZHmmNhsO4fNMCol4bzb82YTtgPSHG-dobe9xB_XE2aOSDZXHCC3ijJznwfShOL53nyBIuphRtpHlUgXafqV3YuGfGv9H3mQnQjQuHtjuXQ1fVHcCFUlloYe2TWhx8exGqvm5ZeJCYdpTezznw78t-',
    alt: 'Slow-braised tender lamb shank mandi platter on spiced saffron basmati rice.',
  },
  {
    id: 'gallery-kebabs',
    spanWide: false,
    eyebrow: 'Tandoor & Sigdi',
    title: 'Charcoal Smoked Kebabs',
    caption: 'Succulent Chargrilled Lamb Chops & Seekh Kebabs',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDrPqclMgYRukZWUgjB1vdB-7XEY7z4Mw5PQz8Ye5TpS4c5aIgP2OzYKcwjKw8YmBiwhLKvyzdr5GWTOuFTEauRlmVWsQGqWCjYUlpZiT6wZ1RcO2VfzshSng9BDYSRJPFp1r7KwD6nE0UOjGBiHMd4-DsGhLxHwSL5X_T-aLT06KU9xh1JT1sBVQ4vvNi_iDJ7Zh3G2jX2EGovdDdx8wblORaEzQ1n8E4yeU_ErYWg',
    alt: 'Flame-kissed Hyderabadi spiced lamb chops and seekh kebabs on cast iron tawa platter.',
  },
  {
    id: 'gallery-spices',
    spanWide: false,
    eyebrow: 'Royal Secret Spice Blend',
    title: 'Pure Saffron & Hand-Pounded Spices',
    caption: 'Sensory Traditional Spices, Saffron & Star Anise',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC6kGEsja53cI9WYVZPWydjrcnagWjVoLLOAfQjN7BRqAb1P1pub7wzN-k6qKeB2LqFxFWtg3Xtp5FUom6mLkAC-c_lylTx2YinRvl9FQptBxhWPH0-huoqdkeA_dRCAemeQK3zwJa2k24xAmMeY_oKmHa2FvvFahHy4sHZflljrCFwGUiL4YQJ2s16Op5Q9tkCYgyZqbK3wiuR4dJMBPOgDAH16_-PF-xY9wf4o-eV',
    alt: 'Whole green cardamom pods, saffron threads, cinnamon bark, star anise and cloves on slate.',
  },
  {
    id: 'gallery-interior',
    spanWide: false,
    eyebrow: 'Dastarkhwan Hospitality',
    title: 'The Mehfil Dining Experience',
    caption: 'Warm Dining Ambiance at Hyderabadi Mehfil Ilford',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCte44rAYFCY2a7ujKu7kdVlOW6VoaYQ4AdCKR3djII7q3xPU5ODnL7TE-U8h1IUA7e4PInxiT8M72GK3rxbv_TuWikSsKsm6IzKi-X0KXKjaBHxIyJVDX-EHVRe_IUNtp4VpZWB-U1h1Q165ATPZZpmQYqdZYBAZRFe-o-2yMh38wsyPAxwVi40jG3Qt4S3mX2ymBqDQqLDIH-6CKyGoQGSJHyDqcYUjNpszDlN5ch',
    alt: 'Warm brass-lit dining room interior at Hyderabadi Mehfil on Ilford Lane with diners.',
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
    imageUrl: '/assets/dishes/daily.jpg',
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
    imageUrl: '/assets/dishes/dalcha.jpg',
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
    imageUrl: '/assets/dishes/haleem.jpg',
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
    imageUrl: '/assets/dishes/maragh.jpg',
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
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'special-paya',
    dayLabel: 'SATURDAY & SUNDAY',
    scheduleTag: 'Sunday Special',
    name: 'Paya (Sunday)',
    price: '8.99',
    description: 'Rich, spiced mutton soup simmered to perfection. Warm, flavorful and full of aromatic notes.',
    imageUrl: '/assets/dishes/paya.jpg',
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
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'starter-chicken-chilli',
    name: 'Chicken Chilli',
    price: '7.99',
    portion: 'Regular',
    description:
      'A popular Indo-Chinese dish of tender chicken tossed in spicy, tangy sauces, stir-fried with peppers, onions and chilies for a zesty kick.',
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'starter-tawala-gosh',
    name: 'Tawala Gosh',
    price: '9.99',
    portion: 'Regular',
    description:
      'Tender pieces of meat seared on a hot tawa with bold Hyderabadi spices. Smoky, juicy and full of flavor.',
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'starter-chicken-lollipop',
    name: 'Chicken Lollipop',
    price: '8.99',
    portion: 'Regular',
    description:
      'Frenched chicken wings, deep-fried to golden perfection and coated in a signature spicy glaze. Crispy on the outside, succulent and juicy within.',
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
    imageUrl: '/assets/dishes/tikka.jpg',
    dietary: ['halal'],
  },
  {
    id: 'tandoor-tandoori-chicken',
    name: 'Tandoori Chicken',
    description: 'Juicy marinated chicken roasted in a clay oven.',
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
    imageUrl: '/assets/dishes/tangdi.jpg',
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'tandoor-pathar-ka-gosht',
    name: 'Pathar ka Gosht',
    price: '14.99',
    badge: 'Royal Classic',
    description: 'Tender lamb pieces, pan-seared and spiced to perfection, with rich, aromatic flavors.',
    imageUrl: '/assets/dishes/pathar.jpg',
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'tandoor-chicken-sheekh',
    name: 'Chicken Sheekh Kebab (4 pcs)',
    price: '7.99',
    portion: '4 pcs',
    description: 'Minced chicken skewers, tender and aromatic.',
    dietary: ['halal'],
  },
  {
    id: 'tandoor-lamb-sheekh',
    name: 'Lamb Sheekh Kebab (4 pcs)',
    price: '9.99',
    portion: '4 pcs',
    description: 'Spicy minced lamb kebabs grilled over charcoal.',
    imageUrl: '/assets/dishes/sheekh.jpg',
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'tandoor-malai-paneer',
    name: 'Malai Paneer Tikka Kebab (6 pcs)',
    price: '8.99',
    portion: '6 pcs',
    isVeg: true,
    description: 'Succulent paneer marinated in creamy malai and mild spices, grilled until smoky and tender.',
    dietary: ['veg'],
  },
  {
    id: 'tandoor-lamb-chops',
    name: 'Lamb Chops (5 pcs)',
    price: '11.99',
    portion: '5 pcs',
    description: 'Succulent lamb chops marinated and grilled for a smoky taste.',
    imageUrl: '/assets/dishes/chops.jpg',
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
    imageUrl: '/assets/dishes/kebabmini.jpg',
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
    tag: 'Royal Sharing Platter',
    name: 'Mehfil-e-Kebab (Mix)',
    price: '17.99',
    description: 'A hearty platter of assorted chicken, lamb chops and kebabs to share.',
    imageUrl: '/assets/dishes/kebabmix.jpg',
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
    imageUrl: '/assets/dishes/pop_biryani.jpg',
    sizes: [
      { key: 'regular', label: 'Regular', serves: '1 Person', price: '7.99' },
      { key: 'large', label: 'Large', serves: '2-3 Persons', price: '15.99' },
      { key: 'family', label: 'Family', serves: '4-5 Persons', price: '29.99' },
    ],
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'biryani-chicken',
    tag: 'Heritage Classic',
    name: 'Mehfil-e-Chicken Biryani',
    description:
      'Classic Hyderabadi biryani with juicy chicken simmered on dum inside seasoned pots, releasing fragrant steam when unsealed.',
    accompaniment: 'Served with Mirchi Ka Salan & Raita',
    imageUrl: '/assets/dishes/chbiryani.jpg',
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
    dietary: ['halal'],
  },
  {
    id: 'achari-lamb',
    name: 'Achari Lamb',
    price: '8.99',
    description: 'Tangy lamb curry cooked with pickle-style spices.',
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'lamb-masala',
    name: 'Lamb Masala',
    price: '8.99',
    description: 'Robust lamb curry with bold masala flavors.',
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'lamb-kadai',
    name: 'Lamb Kadai',
    price: '8.99',
    description: 'Lamb cooked with peppers, onions and freshly ground kadai spices.',
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
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'achari-chicken',
    name: 'Achari Chicken',
    price: '7.99',
    description: 'Tangy chicken curry with pickle-style seasoning.',
    imageUrl: '/assets/dishes/achari.jpg',
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'butter-chicken',
    name: 'Butter Chicken',
    price: '7.99',
    description: 'Creamy tomato-based chicken curry, mildly spiced.',
    imageUrl: '/assets/dishes/butter.jpg',
    dietary: ['halal'],
  },
  {
    id: 'hariyali-chicken',
    name: 'Hariyali Chicken',
    price: '7.99',
    description: 'Chicken curry in a fresh green herb and spinach-style masala.',
    imageUrl: '/assets/dishes/hariyali.jpg',
    dietary: ['halal'],
  },
  {
    id: 'kadai-chicken',
    name: 'Kadai Chicken',
    price: '7.99',
    description: 'Spicy chicken curry with peppers and onions, finished with aromatic kadai spices.',
    dietary: ['halal', 'spicy'],
  },
];

export const MANDI_ITEMS: MandiItem[] = [
  {
    id: 'mandi-lamb',
    tag: 'Slow Pit Roast',
    name: 'Lamb Mandi',
    description: 'Slow-roasted lamb over spiced mandi rice, cooked with delicate spices.',
    imageUrl: '/assets/dishes/pop_mandi.jpg',
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
    imageUrl: '/assets/dishes/mandichk.jpg',
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
    imageUrl: '/assets/dishes/mandichk.jpg',
    tiers: [
      { label: 'Large', price: '18.99' },
      { label: 'Family', price: '33.99', highlight: true },
    ],
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'mandi-mix',
    tag: 'Royal Feast',
    name: 'Mix Mandi',
    description: 'A generous mix of roasted meats over spiced mandi rice, finished with a Hyderabadi twist.',
    tiers: [
      { label: 'Large', price: '30.99' },
      { label: 'Family', price: '49.99', highlight: true },
    ],
    dietary: ['halal', 'spicy'],
  },
  {
    id: 'mandi-platter',
    tag: 'Banquet Sharing',
    name: 'Platter Mandi',
    description: 'A sharing platter of roasted meats served over fragrant mandi rice.',
    imageUrl: '/assets/dishes/mandiplat.jpg',
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
    dietary: ['veg', 'spicy'],
  },
  {
    id: 'veg-chilli-paneer',
    name: 'Chilli Paneer',
    price: '7.99',
    isVeg: true,
    description:
      'Soft paneer cubes stir-fried in a tangy, spicy Indo-Chinese sauce. Loaded with capsicum, onions and rich umami flavors.',
    dietary: ['veg', 'spicy'],
  },
  {
    id: 'veg-mix-curry',
    name: 'Mix Veg Curry',
    price: '7.99',
    isVeg: true,
    imageUrl: '/assets/dishes/veg.jpg',
    description:
      'A hearty blend of fresh vegetables cooked in a rich, aromatic gravy. Balanced spices create a comforting and wholesome dish.',
    dietary: ['veg'],
  },
  {
    id: 'veg-paneer-curry',
    name: 'Paneer Curry',
    price: '7.99',
    isVeg: true,
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
    description:
      'Succulent paneer marinated in creamy malai and mild spices, grilled to perfection. Smoky, juicy and melt-in-the-mouth.',
    dietary: ['veg'],
  },
  {
    id: 'veg-biryani',
    name: 'Veg Biryani',
    price: '5.99',
    isVeg: true,
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
    description: 'Soft, fluffy Indian bread.',
    dietary: ['veg'],
  },
  {
    id: 'roti-butter-naan',
    name: 'Butter Naan',
    price: '1.49',
    isVeg: true,
    description: 'Classic naan brushed with butter.',
    dietary: ['veg'],
  },
  {
    id: 'roti-garlic-naan',
    name: 'Garlic Naan',
    price: '2.99',
    isVeg: true,
    description: 'Garlic-infused naan for extra flavor.',
    dietary: ['veg'],
  },
  {
    id: 'roti-paratha',
    name: 'Paratha',
    price: '3.49',
    isVeg: true,
    description: 'Rustic, layered paratha, flaky outside & soft inside.',
    dietary: ['veg'],
  },
  {
    id: 'roti-tandoori-roti',
    name: 'Tandoori Roti',
    price: '2.49',
    isVeg: true,
    imageUrl: '/assets/dishes/naan.jpg',
    description: 'Whole wheat flatbread from the tandoor.',
    dietary: ['veg'],
  },
  {
    id: 'roti-kulcha',
    name: 'Kulcha',
    price: '2.99',
    isVeg: true,
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
    description: 'Smooth, mango-flavored yogurt drink.',
    dietary: ['veg'],
  },
  {
    id: 'lassi-sweet',
    name: 'Sweet Lassi',
    price: '2.99',
    isVeg: true,
    description: 'Refreshing sweet yogurt drink.',
    dietary: ['veg'],
  },
  {
    id: 'lassi-salt',
    name: 'Salt Lassi',
    price: '2.99',
    isVeg: true,
    description: 'Smooth, lightly salted yogurt drink.',
    dietary: ['veg'],
  },
  {
    id: 'lassi-jug',
    name: 'Lassi Jug',
    price: '11.99',
    badge: 'Table Sharing',
    isVeg: true,
    description: 'A large serving of chilled lassi for the table.',
    dietary: ['veg'],
  },
];
