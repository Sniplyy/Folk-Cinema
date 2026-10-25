export interface SiteSettings {
  name: string;
  tagline: string;
  email: string;
  instagram: string;
  instagramUrl: string;
  showreelUrl: string;
  address: string;
  foundedYear: number;
}

export const INITIAL_SETTINGS: SiteSettings = {
  name: 'Folk Cinema',
  tagline: 'Rooted in culture. Made for the world.',
  email: 'hello@folkcinema.com',
  instagram: '@folkcinema_films',
  instagramUrl: 'https://instagram.com/folkcinema_films',
  showreelUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-potter-working-the-clay-on-the-wheel-42861-large.mp4',
  address: 'Mumbai & Varanasi, India',
  foundedYear: 2021,
};

export interface EnquiryItem {
  id: string;
  name: string;
  company?: string;
  email: string;
  projectType: string;
  brief: string;
  budget?: string;
  timeline?: string;
  createdAt: string;
}
