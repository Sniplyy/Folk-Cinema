export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image?: string;
  published: boolean;
}

// Built but only displayed if published entries exist
export const INITIAL_TEAM: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Shailesh Kumar',
    role: 'Founder & Director',
    bio: 'Filmmaker and documentarian documenting regional Indian folk heritage and independent cinema for over a decade.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=85',
    published: true,
  },
];
