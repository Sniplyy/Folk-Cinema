import { MEDIA } from './media';
import type { CategoryType } from '../lib/constants';

export interface ProjectCredit {
  role: string;
  name: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: CategoryType;
  year: number;
  featured: boolean;
  sort_order: number;
  thumbnail: string;
  preview_url?: string;
  video_url?: string;
  client?: string;
  runtime?: string;
  role?: string;
  tagline?: string;
  description: string;
  synopsis: string;
  credits: ProjectCredit[];
  gallery: readonly string[] | string[];
  aspectRatio?: '16/9' | '9/16' | '4/5' | '2.39/1';
}

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    slug: 'the-clay-road',
    title: 'The Clay Road',
    category: 'Films',
    year: 2025,
    featured: true,
    sort_order: 1,
    thumbnail: MEDIA.projects.clayRoad.poster,
    preview_url: MEDIA.projects.clayRoad.videoSrc,
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-potter-working-the-clay-on-the-wheel-42861-large.mp4',
    runtime: '28 min',
    role: 'Production House & Direction',
    tagline: 'An earthen chronicle of lineage, fire, and quiet resistance.',
    description: 'A 28-minute original narrative short set across the riverbank kilns of Gorakhpur, tracking three generations of terracotta artisans negotiating industrial decline and ancestral memory.',
    synopsis: 'Shot entirely on location in eastern Uttar Pradesh over three weeks using natural dawn and kiln light. The Clay Road follows Harishankar, an elderly potter who refuses to switch to synthetic clay casting. When his grandson returns from Lucknow with an electric mould, the kiln becomes an arena of generational debate—not through dialogue, but through the cadence of mud, wheel, and charcoal smoke.',
    credits: [
      { role: 'Written & Directed By', name: 'Shailesh Kumar' },
      { role: 'Cinematography', name: 'Aditya Sen' },
      { role: 'Sound Recordist & Design', name: 'Raman Nambiar' },
      { role: 'Editor', name: 'Devika Sharma' },
      { role: 'Colorist', name: 'Sameer Pathak' },
      { role: 'Location', name: 'Gorakhpur, Uttar Pradesh' },
    ],
    gallery: MEDIA.projects.clayRoad.gallery,
    aspectRatio: '2.39/1',
  },
  {
    id: 'proj-2',
    slug: 'they-dance-in-red',
    title: 'They Dance In Red',
    category: 'Documentaries',
    year: 2025,
    featured: true,
    sort_order: 2,
    thumbnail: MEDIA.projects.theyDanceInRed.poster,
    preview_url: MEDIA.projects.theyDanceInRed.videoSrc,
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-folk-dancer-moving-in-the-dark-43399-large.mp4',
    runtime: '42 min',
    role: 'Co-Production & Cinematography',
    tagline: 'The nocturnal spirit rituals of northern Malabar.',
    description: 'An immersive documentary on Theyyam practitioners in North Kerala, documenting the physical and spiritual transformation of shrine performers between sunset and morning mist.',
    synopsis: 'Without voiceover commentary or ethnographic condescension, Theyyam is witnessed from within the preparation shrine. The camera captures the slow application of natural vermilion powders, the construction of coconut-frond headgear, and the midnight trance when mortal performers embody forest deities.',
    credits: [
      { role: 'Director', name: 'K. S. Narayanan' },
      { role: 'Cinematography', name: 'Shailesh Kumar' },
      { role: 'Location Sound', name: 'Anish Varma' },
      { role: 'Folk Lore Consultant', name: 'Dr. Radhakrishnan' },
      { role: 'Location', name: 'Kannur, Kerala' },
    ],
    gallery: MEDIA.projects.theyDanceInRed.gallery,
    aspectRatio: '16/9',
  },
  {
    id: 'proj-3',
    slug: 'monsoon-loom',
    title: 'Monsoon Loom',
    category: 'Branded Content',
    year: 2024,
    featured: true,
    sort_order: 3,
    thumbnail: MEDIA.projects.monsoonLoom.poster,
    preview_url: MEDIA.projects.monsoonLoom.videoSrc,
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-weaving-threads-on-a-wooden-loom-41440-large.mp4',
    client: 'Raw Mango Textile Archive',
    runtime: '4 min 10 sec',
    role: 'Concept & Production',
    tagline: 'When moisture in the air sets the tension of the silk.',
    description: 'A tactile visual study examining the micro-climate required for hand-spun Chanderi silk during central Indian monsoon downpours.',
    synopsis: 'Commissioned as a short-form heritage document, Monsoon Loom focuses on the acoustic interplay between rainwater falling on tiled roofs and the rhythmic clatter of pit-looms in Madhya Pradesh. We avoided romanticized folklore to deliver a raw, sensory study of craft discipline.',
    credits: [
      { role: 'Director & Camera', name: 'Shailesh Kumar' },
      { role: 'Sound Design', name: 'Raman Nambiar' },
      { role: 'Weaving Master', name: 'Chhotelal Ansari' },
      { role: 'Post-Production', name: 'Folk Cinema Studio' },
    ],
    gallery: MEDIA.projects.monsoonLoom.gallery,
    aspectRatio: '16/9',
  },
  {
    id: 'proj-4',
    slug: 'echoes-of-kutch',
    title: 'Echoes of Kutch',
    category: 'Documentaries',
    year: 2024,
    featured: true,
    sort_order: 4,
    thumbnail: MEDIA.projects.echoesOfKutch.poster,
    runtime: '19 min',
    role: 'Production & Edit',
    tagline: 'Soundscapes of the salt flats under the winter solstice.',
    description: 'A non-narrative audio-visual essay recording the migration routes of pastoral Maldhari communities across the Great Rann of Kutch.',
    synopsis: 'A minimalist film that relies on silence, desert wind, copper bell harmonics, and high-contrast night horizons. Recorded over six nights on the Indo-Pak border marshes.',
    credits: [
      { role: 'Director', name: 'Arjun Rathore' },
      { role: 'Field Recording', name: 'Praveen Joshi' },
      { role: 'Color Grading', name: 'Sameer Pathak' },
    ],
    gallery: MEDIA.projects.echoesOfKutch.gallery,
    aspectRatio: '2.39/1',
  },
  {
    id: 'proj-5',
    slug: 'night-boatmen',
    title: 'Night Boatmen',
    category: 'Films',
    year: 2024,
    featured: false,
    sort_order: 5,
    thumbnail: MEDIA.projects.nightBoatmen.poster,
    runtime: '14 min',
    role: 'Direction & Post',
    tagline: 'Rowing through the reflections of Manikarnika.',
    description: 'A short visual narrative captured on 16mm film during the 3 AM quiet hours along the river Ganga.',
    synopsis: 'A nocturnal meditation on the wooden rowboats carrying timber across the river in Varanasi. The light from distant pyres and early temple bells creates a surreal chiaroscuro across the water.',
    credits: [
      { role: 'Director', name: 'Shailesh Kumar' },
      { role: 'Camera Operator', name: 'Birender Singh' },
      { role: 'Negative Processing', name: 'Prasad Film Lab' },
    ],
    gallery: MEDIA.projects.nightBoatmen.gallery,
    aspectRatio: '16/9',
  },
  {
    id: 'proj-6',
    slug: 'brass-and-flame',
    title: 'Brass and Flame',
    category: 'Ad Films',
    year: 2024,
    featured: false,
    sort_order: 6,
    thumbnail: MEDIA.projects.brassAndFlame.poster,
    client: 'Dhokra Artisan Guild',
    runtime: '90 sec',
    role: 'Complete Production',
    tagline: 'Lost-wax casting recorded at 1200 degrees.',
    description: 'A high-impact commercial film spotlighting the lost-wax casting technique of Bastar brass metalsmiths.',
    synopsis: 'Structured with percussive folk beats and macro lenses capturing molten metal poured into baked mud husks. Created for a cultural campaign celebrating 4,000 years of unbroken metallurgy.',
    credits: [
      { role: 'Director', name: 'Shailesh Kumar' },
      { role: 'Cinematography', name: 'Tapan Das' },
      { role: 'Music & Percussion', name: 'Bastar Tribal Collective' },
    ],
    gallery: MEDIA.projects.brassAndFlame.gallery,
    aspectRatio: '16/9',
  },
  {
    id: 'proj-7',
    slug: 'desert-flute-study',
    title: 'Desert Flute Study',
    category: 'Reels',
    year: 2025,
    featured: false,
    sort_order: 7,
    thumbnail: MEDIA.projects.desertFluteReel.poster,
    runtime: '45 sec',
    role: 'Direction',
    tagline: 'Vertical cinema from the Thar dunes.',
    description: 'A 9:16 cinematic study capturing double-flute (Algoza) breath techniques against wind shadows in Jaisalmer.',
    synopsis: 'Designed specifically for mobile viewports without sacrificing 24fps cinema grading and spatial mono audio.',
    credits: [
      { role: 'Camera & Sound', name: 'Shailesh Kumar' },
      { role: 'Musician', name: 'Ghazi Khan Barna' },
    ],
    gallery: MEDIA.projects.desertFluteReel.gallery,
    aspectRatio: '9/16',
  },
  {
    id: 'proj-8',
    slug: 'shadows-of-the-loom',
    title: 'Shadows of the Loom',
    category: 'Photography',
    year: 2024,
    featured: false,
    sort_order: 8,
    thumbnail: MEDIA.projects.weavingShadowsReel.poster,
    runtime: 'Medium Format Series',
    role: 'Principal Stills Photography',
    tagline: 'Gelatin silver portraits of master craftsmen.',
    description: 'A 12-plate medium format portrait series examining the hands, eyes, and tools of master silk weavers in Varanasi.',
    synopsis: 'Exhibited in quiet galleries, this series utilizes singular natural skylights to trace fifty years of tactile knowledge etched into the hands of Varanasi artisans.',
    credits: [
      { role: 'Photographer', name: 'Shailesh Kumar' },
      { role: 'Print Master', name: 'Studio One Monochrome' },
    ],
    gallery: MEDIA.projects.weavingShadowsReel.gallery,
    aspectRatio: '4/5',
  },
];
