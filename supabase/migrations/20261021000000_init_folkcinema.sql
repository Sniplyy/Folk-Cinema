-- ============================================================
-- FOLK CINEMA DATABASE INITIALIZATION MIGRATION
-- Production-ready schema with RLS policies, tables, and storage
-- ============================================================

-- 1. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  year INTEGER NOT NULL,
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 99,
  thumbnail TEXT NOT NULL,
  preview_url TEXT,
  video_url TEXT,
  client TEXT,
  runtime TEXT,
  role TEXT,
  tagline TEXT,
  description TEXT NOT NULL,
  synopsis TEXT NOT NULL,
  credits JSONB DEFAULT '[]'::jsonb,
  gallery TEXT[] DEFAULT ARRAY[]::TEXT[],
  aspect_ratio TEXT DEFAULT '16/9',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Services Table
CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY,
  number TEXT NOT NULL,
  title TEXT NOT NULL,
  short_desc TEXT NOT NULL,
  description TEXT NOT NULL,
  deliverables TEXT[] DEFAULT ARRAY[]::TEXT[],
  image TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Team Members Table
CREATE TABLE IF NOT EXISTS public.team_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  image TEXT,
  published BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 99,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enquiries Table
CREATE TABLE IF NOT EXISTS public.enquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  project_type TEXT NOT NULL,
  brief TEXT NOT NULL,
  budget TEXT,
  timeline TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  name TEXT NOT NULL DEFAULT 'Folk Cinema',
  tagline TEXT NOT NULL DEFAULT 'Rooted in culture. Made for the world.',
  email TEXT NOT NULL DEFAULT 'hello@folkcinema.com',
  instagram TEXT NOT NULL DEFAULT '@folkcinema_films',
  instagram_url TEXT NOT NULL DEFAULT 'https://instagram.com/folkcinema_films',
  showreel_url TEXT NOT NULL,
  address TEXT DEFAULT 'Mumbai & Varanasi, India',
  founded_year INTEGER DEFAULT 2021,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Projects: Public read, authenticated admin write
CREATE POLICY "Public projects are viewable by everyone" 
  ON public.projects FOR SELECT USING (true);
CREATE POLICY "Admins can insert projects" 
  ON public.projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admins can update projects" 
  ON public.projects FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admins can delete projects" 
  ON public.projects FOR DELETE TO authenticated USING (true);

-- Services: Public read, authenticated admin write
CREATE POLICY "Public services are viewable by everyone" 
  ON public.services FOR SELECT USING (true);
CREATE POLICY "Admins can update services" 
  ON public.services FOR ALL TO authenticated USING (true);

-- Team Members: Public read only if published is true, admin read/write all
CREATE POLICY "Published team members are viewable" 
  ON public.team_members FOR SELECT USING (published = true OR auth.role() = 'authenticated');
CREATE POLICY "Admins can manage team" 
  ON public.team_members FOR ALL TO authenticated USING (true);

-- Enquiries: Public INSERT only; only authenticated admins can SELECT
CREATE POLICY "Public can submit enquiries" 
  ON public.enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can read enquiries" 
  ON public.enquiries FOR SELECT TO authenticated USING (true);

-- Site Settings: Public read, admin write
CREATE POLICY "Public can view settings" 
  ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can modify settings" 
  ON public.site_settings FOR ALL TO authenticated USING (true);

-- ============================================================
-- STORAGE BUCKETS (for media uploads)
-- ============================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public media access" 
  ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Admin media upload" 
  ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media');
