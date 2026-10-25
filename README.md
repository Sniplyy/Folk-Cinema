# Folk Cinema — Independent Film Studio

> "Rooted in culture. Made for the world."  
> Domain: [folkcinema.com](https://folkcinema.com) | Instagram: [@folkcinema_films](https://instagram.com/folkcinema_films)

A complete, production-ready website for **Folk Cinema**, an independent film production company specializing in original cinema, documentaries, Indian cultural traditions, ad films, and branded content.

---

## 1. Quickstart (Zero Configuration Required)

The site is built to run immediately with rich local seed data—no Supabase account or API keys required.

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Compile production bundle (0 TypeScript errors)
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 2. Art Direction & Design Tokens

- **Canvas:** Charcoal (`#141210`) as the dominant dark cinema-hall backdrop.
- **Surface & Elevation:** `#1C1917` and `#231F1C`.
- **Type:** Cream (`#F1E9DA`).
- **Single Hot Accent:** Terracotta (`#D4552B`) used exclusively for CTAs, active filter underlines, hover states, the cursor, and at most one key word per page.
- **Metadata:** Sand (`#D9C9A8`) and Olive (`#6B6B3A`).
- **Typography:**
  - Display: `Archivo` condensed heavy uppercase with tight leading (`0.82–0.86`).
  - Body: `Instrument Sans`.
  - Metadata: `JetBrains Mono` uppercase wide-tracking.
  - Devanagari Graphic Mark: `फोक सिनेमा` (Tiro Devanagari Hindi / Archivo).
- **Radii:** Strict `0px` border-radius across all components (no rounded cards or pills).
- **Uniform Film Grade:** Utility class `.film-grade` applies a unified warm, low-key, desaturated cinema filter across all mixed stills and footage.

---

## 3. How to Swap Media

All project video loops, showreel links, gallery stills, and background posters are centralized in one file:

```
src/data/media.ts
```

To update any video or image:
1. Open [`src/data/media.ts`](file:///src/data/media.ts).
2. Replace the URLs with your hosted video files (`.mp4`, `.webm`), YouTube/Vimeo embeds, or high-resolution stills.
3. All media automatically inherits the `.film-grade` treatment and responsive aspect ratio handling through `<MediaSlot />`.

---

## 4. Backend & Supabase Setup (Optional)

When no Supabase environment variables are present, the site operates in local fallback mode with full mock persistence via `localStorage`.

To connect your live Supabase project:

1. Create a new project in [Supabase](https://supabase.com).
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Fill in your credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
4. In the Supabase SQL Editor, run the initialization migration located at:
   ```
   supabase/migrations/20261021000000_init_folkcinema.sql
   ```
   This script configures:
   - `projects` table (with slug, runtime, credits JSONB, gallery arrays)
   - `services` table
   - `team_members` table
   - `enquiries` table (with public INSERT-only RLS)
   - `site_settings` table
   - `media` storage bucket with public read access

---

## 5. Studio Admin Console

The `/admin` route is a dedicated, unlinked management console:
- **URL:** [http://localhost:5173/admin](http://localhost:5173/admin)
- **Dev Mode Demo Login:**
  - **Email:** `admin@folkcinema.com`
  - **Password:** `folk2026`
- **Features:**
  - Add, edit, and delete film projects.
  - Toggle project display in the Home horizontal film strip.
  - View and review incoming commissioner creative briefs submitted through `/contact`.
  - Update studio settings (inquiry email, Instagram link, showreel video URL, studio locations).

---

## 6. Production Deployment

The project builds standard static assets ready for deployment on any static host:

```bash
npm run build
```

Output is emitted to the `/dist` directory.

### Vercel / Netlify
Set the build command to `npm run build` and output directory to `dist`. Ensure Single Page Application (SPA) rewrites redirect all routes to `/index.html`.
