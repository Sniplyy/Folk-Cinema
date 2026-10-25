import { MEDIA } from './media';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string; // One-line descriptor for Home page list hover
  description: string; // Two-line description
  deliverables: string[]; // "WHAT WE DELIVER" mono list
  image: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'feature-films',
    number: '01',
    title: 'Feature Films & Narrative Projects',
    shortDesc: 'Original feature-length cinema and narrative shorts rooted in cultural soil.',
    description: 'We develop and produce original narrative cinema with uncompromising visual voice. From script breakdown to theatrical finish, we operate small, disciplined crews that capture raw human performance.',
    deliverables: [
      'Original Screenplay Development',
      'Location Scouting Across Rural & Urban India',
      'Cinema Camera Packages (Arri / Red)',
      'Directorial & On-Set Production Leadership',
      'Festival Strategy & Distribution Masters',
    ],
    image: MEDIA.services.featureFilms,
  },
  {
    id: 'documentary-production',
    number: '02',
    title: 'Documentary Production',
    shortDesc: 'Deep-dive observational cinema and long-form investigative culture series.',
    description: 'Immersion without interference. We spend months inside communities, shrines, and workshops before rolling camera, building the trust required for authentic documentary cinema.',
    deliverables: [
      'Extensive Field Research & Access Negotiations',
      'Multi-Language Native Sound Recording',
      'Long-Term Observational Cinematography',
      'Archival Footage Restoration & Licensing',
      '4K HDR Broadcast Delivery Masters',
    ],
    image: MEDIA.services.documentaries,
  },
  {
    id: 'advertising-brand-films',
    number: '03',
    title: 'Advertising & Brand Films',
    shortDesc: 'Commercial films engineered with cinematic texture and cultural weight.',
    description: 'Commercials that treat the audience like cinephiles rather than consumers. We bring the discipline of independent cinema to commercial commissions, cutting through digital noise with grit and poetry.',
    deliverables: [
      'Treatment & Visual Worldbuilding',
      'Production Design & Art Direction',
      'High-Speed & Macro Cinematography',
      'Original Music Score & Foley Engineering',
      'Omnichannel Cutdowns (TVC, OTT, Web)',
    ],
    image: MEDIA.services.advertising,
  },
  {
    id: 'branded-content-digital',
    number: '04',
    title: 'Branded Content & Digital Campaigns',
    shortDesc: 'Docu-style brand explorations centered on craft, lineage, and architecture.',
    description: 'For brands with authentic stories of craft, materials, or regional origin. We avoid generic corporate manifestos, focusing instead on the hands that make and the environments that shape the work.',
    deliverables: [
      'Episodic Cultural Series Concepts',
      'Artisan & Founder In-Depth Portraits',
      'Field Expeditions & Travel Logs',
      'Multi-Platform Campaign Delivery',
    ],
    image: MEDIA.services.brandedContent,
  },
  {
    id: 'reels-promotional-videos',
    number: '05',
    title: 'Reels & Promotional Videos',
    shortDesc: 'Vertical cinema crafted with 24fps cadence and intentional frame pacing.',
    description: 'Vertical video does not mean sloppy production. We compose 9:16 frames with the same rigor as an anamorphic feature, producing high-impact vignettes that stop the scroll through sheer visual weight.',
    deliverables: [
      'Native 9:16 Cinema Composition',
      'High-Tempo Kinetic Editing & Sound Bites',
      'Color Tuned for OLED Mobile Screens',
      'Batch Content Delivery Packages',
    ],
    image: MEDIA.services.reels,
  },
  {
    id: 'commercial-photography',
    number: '06',
    title: 'Commercial Photography',
    shortDesc: 'Medium format stills for exhibitions, lookbooks, and key visual campaigns.',
    description: 'Parallel stills captured in natural light alongside our film productions. We shoot with medium format systems to deliver museum-grade resolution for outdoor print, books, and digital archives.',
    deliverables: [
      'Medium Format Digital Stills (100MP)',
      'Natural Chiaroscuro Environmental Portraits',
      'Architectural & Landscape Survey Stills',
      'High-Resolution Print Retouching',
    ],
    image: MEDIA.services.photography,
  },
  {
    id: 'editing-post-production',
    number: '07',
    title: 'Editing & Post-Production',
    shortDesc: 'Complete offline editing, bespoke acoustic sound design, and film color grading.',
    description: 'In-house post-production suites calibrated for film finish. We treat color grading as an emotional palette and sound design as fifty percent of the visual picture.',
    deliverables: [
      'Narrative & Commercial Picture Editing',
      'DaVinci Resolve 4K HDR Color Grading',
      'Spatial 5.1 / Atmos Sound Design & Mixing',
      'Subtitling & Master Archival Deliverables',
    ],
    image: MEDIA.services.postProduction,
  },
];
