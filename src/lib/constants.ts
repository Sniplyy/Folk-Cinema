export const BRAND = {
  name: 'Folk Cinema',
  nameDevanagari: 'फोक सिनेमा',
  tagline: 'Rooted in culture. Made for the world.',
  domain: 'folkcinema.com',
  email: 'hello@folkcinema.com',
  instagram: '@folkcinema_films',
  instagramUrl: 'https://instagram.com/folkcinema_films',
  foundedYear: 2021,
  responseTime: 'We respond to serious production briefs within 48 hours.',
  focus: [
    'Original Cinema',
    'Documentaries',
    'Indian Culture & Folk Traditions',
    'Ad Films',
    'Branded Content',
  ],
} as const;

export const CATEGORIES = [
  'All',
  'Films',
  'Documentaries',
  'Ad Films',
  'Branded Content',
  'Reels',
  'Photography',
] as const;

export type CategoryType = (typeof CATEGORIES)[number];
