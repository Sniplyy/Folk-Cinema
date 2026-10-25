import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { INITIAL_PROJECTS, type ProjectItem } from '../data/projects';
import { SERVICES, type ServiceItem } from '../data/services';
import { INITIAL_SETTINGS, type SiteSettings, type EnquiryItem } from '../data/settings';
import { INITIAL_TEAM, type TeamMember } from '../data/team';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co'
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Local storage fallback helpers for zero-backend development
const STORAGE_KEYS = {
  PROJECTS: 'folk_cinema_projects',
  SERVICES: 'folk_cinema_services',
  SETTINGS: 'folk_cinema_settings',
  ENQUIRIES: 'folk_cinema_enquiries',
  TEAM: 'folk_cinema_team',
  ADMIN_SESSION: 'folk_cinema_mock_session',
};

function getLocalData<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function setLocalData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn('Failed saving to localStorage', err);
  }
}

/* ================= Data Repository API ================= */

export async function fetchProjects(): Promise<ProjectItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) {
        return data as ProjectItem[];
      }
    } catch (e) {
      console.warn('Supabase fetch failed, falling back to local seed data:', e);
    }
  }
  return getLocalData<ProjectItem[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
}

export async function fetchProjectBySlug(slug: string): Promise<ProjectItem | null> {
  const all = await fetchProjects();
  return all.find((p) => p.slug === slug) || null;
}

export async function saveProject(project: ProjectItem): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('projects').upsert([project]);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error saving project to Supabase:', e);
    }
  }
  // Local fallback
  const list = getLocalData<ProjectItem[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  const index = list.findIndex((p) => p.id === project.id);
  if (index >= 0) {
    list[index] = project;
  } else {
    list.push(project);
  }
  setLocalData(STORAGE_KEYS.PROJECTS, list);
  return true;
}

export async function deleteProject(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error deleting project from Supabase:', e);
    }
  }
  const list = getLocalData<ProjectItem[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  const updated = list.filter((p) => p.id !== id);
  setLocalData(STORAGE_KEYS.PROJECTS, updated);
  return true;
}

export async function fetchServices(): Promise<ServiceItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('number', { ascending: true });
      if (!error && data && data.length > 0) {
        return data as ServiceItem[];
      }
    } catch (e) {
      console.warn('Using local services:', e);
    }
  }
  return getLocalData<ServiceItem[]>(STORAGE_KEYS.SERVICES, SERVICES);
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('site_settings').select('*').limit(1).single();
      if (!error && data) {
        return data as SiteSettings;
      }
    } catch (e) {
      console.warn('Using local settings:', e);
    }
  }
  return getLocalData<SiteSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
}

export async function updateSiteSettings(settings: SiteSettings): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('site_settings').upsert([settings]);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error updating settings in Supabase:', e);
    }
  }
  setLocalData(STORAGE_KEYS.SETTINGS, settings);
  return true;
}

export async function submitEnquiry(
  enquiryData: Omit<EnquiryItem, 'id' | 'createdAt'>
): Promise<{ success: boolean; message?: string }> {
  const newEnquiry: EnquiryItem = {
    ...enquiryData,
    id: 'enq-' + Date.now(),
    createdAt: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('enquiries').insert([newEnquiry]);
      if (error) {
        console.warn('Supabase insert failed, saving locally:', error);
      } else {
        // Trigger edge function if present
        supabase.functions.invoke('send-enquiry', { body: newEnquiry }).catch((fnErr) => {
          console.info('Edge function notification result:', fnErr);
        });
      }
    } catch (err) {
      console.warn('Supabase enquiry error:', err);
    }
  }

  // Always keep a local copy for testing & admin display
  const enquiries = getLocalData<EnquiryItem[]>(STORAGE_KEYS.ENQUIRIES, []);
  enquiries.unshift(newEnquiry);
  setLocalData(STORAGE_KEYS.ENQUIRIES, enquiries);
  console.info('Enquiry successfully recorded:', newEnquiry);

  return { success: true };
}

export async function fetchEnquiries(): Promise<EnquiryItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('createdAt', { ascending: false });
      if (!error && data) return data as EnquiryItem[];
    } catch (e) {
      console.warn('Error fetching enquiries:', e);
    }
  }
  return getLocalData<EnquiryItem[]>(STORAGE_KEYS.ENQUIRIES, []);
}

export async function fetchTeam(): Promise<TeamMember[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('published', true);
      if (!error && data) return data as TeamMember[];
    } catch (e) {
      console.warn('Error fetching team:', e);
    }
  }
  return getLocalData<TeamMember[]>(STORAGE_KEYS.TEAM, INITIAL_TEAM).filter((m) => m.published);
}

/* ================= Auth Handling ================= */

export async function adminLogin(email: string, pass: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    return !error;
  }
  // Local test mock login (accepts demo admin credentials)
  if (email === 'admin@folkcinema.com' && pass === 'folk2026') {
    localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify({ email, authenticated: true }));
    return true;
  }
  // Also accept any password in mock dev mode if matching email
  if (email.includes('admin') || email.includes('folk')) {
    localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify({ email, authenticated: true }));
    return true;
  }
  return false;
}

export function checkAdminSession(): boolean {
  if (isSupabaseConfigured && supabase) {
    return Boolean(supabase.auth.getSession());
  }
  const session = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
  return Boolean(session);
}

export async function adminLogout(): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    await supabase.auth.signOut();
  }
  localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
}
