/**
 * Folk Cinema — Centralized Media Registry
 *
 * To swap media:
 * 1. Replace the URLs below with your own hosted assets (Supabase Storage, CDN, Vimeo, or /public/videos/...)
 * 2. All imagery automatically receives the uniform .film-grade treatment.
 */

export interface MediaAsset {
  src: string;
  alt: string;
  videoSrc?: string; // Optional direct mp4 or webm video loop
  embedUrl?: string; // Optional YouTube or Vimeo embed
  aspectRatio?: '16/9' | '9/16' | '4/5' | '1/1' | '2.39/1';
}

export const MEDIA = {
  // Hero background reel
  hero: {
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2000&q=85', // Atmospheric cinema shadow & light
    // High-quality atmospheric looping video (Pexels cinema loop or fallback)
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-silhouette-of-a-cameraman-at-sunset-32822-large.mp4',
    alt: 'Cinematic silhouette of a film director and camera during magic hour',
  },

  // Showreel modal video
  showreel: {
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-potter-working-the-clay-on-the-wheel-42861-large.mp4',
    embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ', // Placeholder embed
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1800&q=85',
    title: 'Folk Cinema 2026 Showreel — Rooted In Culture',
  },

  // About page editorial stills
  about: {
    portrait: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=85', // Intense gaze, dramatic cinematic lighting
    landscapeParallax: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=2200&q=85', // Moody misty mountain valley
    craftDetail: 'https://images.unsplash.com/photo-1606744888344-493238955de0?auto=format&fit=crop&w=1400&q=85', // Potter / weaver artisan hands in shadow
  },

  // Project media assets
  projects: {
    clayRoad: {
      poster: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1600&q=85', // Earthen pottery & smoke
      videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-potter-working-the-clay-on-the-wheel-42861-large.mp4',
      gallery: [
        'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1600&q=85',
      ],
    },
    theyDanceInRed: {
      poster: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=85', // Ritual celebration & smoke, red tint
      videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-folk-dancer-moving-in-the-dark-43399-large.mp4',
      gallery: [
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=85',
      ],
    },
    monsoonLoom: {
      poster: 'https://images.unsplash.com/photo-1606744888344-493238955de0?auto=format&fit=crop&w=1600&q=85', // Handloom threads
      videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-weaving-threads-on-a-wooden-loom-41440-large.mp4',
      gallery: [
        'https://images.unsplash.com/photo-1606744888344-493238955de0?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1533158307587-828f0a76ef46?auto=format&fit=crop&w=1600&q=85',
      ],
    },
    echoesOfKutch: {
      poster: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=85', // White salt desert at night
      videoSrc: '',
      gallery: [
        'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=85',
      ],
    },
    nightBoatmen: {
      poster: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1600&q=85', // Silhouette river boatman Varanasi dusk
      videoSrc: '',
      gallery: [
        'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=85',
      ],
    },
    brassAndFlame: {
      poster: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1600&q=85', // Brass casting furnace sparks
      videoSrc: '',
      gallery: [
        'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1600&q=85',
      ],
    },
    desertFluteReel: {
      poster: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=85', // 9:16 portrait music
      videoSrc: '',
      gallery: ['https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=85'],
    },
    weavingShadowsReel: {
      poster: 'https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&w=1000&q=85', // 9:16 portrait textile
      videoSrc: '',
      gallery: ['https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&w=1000&q=85'],
    },
  },

  // Services backdrop stills
  services: {
    featureFilms: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=85', // Camera rig in studio shadow
    documentaries: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=85', // Field production
    advertising: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=85', // High key lighting
    brandedContent: 'https://images.unsplash.com/photo-1533158307587-828f0a76ef46?auto=format&fit=crop&w=1600&q=85', // Cultural visual
    reels: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=85', // Vertical rhythm
    photography: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1600&q=85', // Medium format portrait
    postProduction: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1600&q=85', // Dark grading suite
  },
} as const;
