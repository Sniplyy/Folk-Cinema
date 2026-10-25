import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  adminLogin,
  adminLogout,
  checkAdminSession,
  fetchProjects,
  saveProject,
  deleteProject,
  fetchEnquiries,
  fetchSiteSettings,
  updateSiteSettings,
  isSupabaseConfigured,
} from '../lib/supabase';
import type { ProjectItem } from '../data/projects';
import type { EnquiryItem, SiteSettings } from '../data/settings';
import { CATEGORIES } from '../lib/constants';
import { Lock, LogOut, Plus, Trash2, Edit3, Star, CheckCircle, RefreshCw } from 'lucide-react';

export const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'enquiries' | 'settings'>('projects');

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Data states
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Edit / Create Project modal
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<ProjectItem>>({});

  useEffect(() => {
    const authed = checkAdminSession();
    setIsAuthenticated(authed);
    if (authed) {
      loadData();
    }
  }, []);

  const loadData = async () => {
    const [p, e, s] = await Promise.all([
      fetchProjects(),
      fetchEnquiries(),
      fetchSiteSettings(),
    ]);
    setProjects(p);
    setEnquiries(e);
    setSettings(s);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');
    try {
      const ok = await adminLogin(email, password);
      if (ok) {
        setIsAuthenticated(true);
        loadData();
      } else {
        setLoginError('Invalid credentials. (For local preview use admin@folkcinema.com / folk2026)');
      }
    } catch {
      setLoginError('Authentication failed');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await adminLogout();
    setIsAuthenticated(false);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject.title || !editingProject.slug) return;

    const projToSave: ProjectItem = {
      id: editingProject.id || `proj-${Date.now()}`,
      slug: editingProject.slug,
      title: editingProject.title,
      category: editingProject.category || 'Films',
      year: Number(editingProject.year) || new Date().getFullYear(),
      featured: Boolean(editingProject.featured),
      sort_order: Number(editingProject.sort_order) || 99,
      thumbnail: editingProject.thumbnail || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
      preview_url: editingProject.preview_url || '',
      video_url: editingProject.video_url || '',
      client: editingProject.client || '',
      runtime: editingProject.runtime || '',
      role: editingProject.role || 'Production House',
      tagline: editingProject.tagline || '',
      description: editingProject.description || '',
      synopsis: editingProject.synopsis || editingProject.description || '',
      credits: editingProject.credits || [],
      gallery: editingProject.gallery || [editingProject.thumbnail || ''],
    };

    await saveProject(projToSave);
    setIsEditingProject(false);
    setStatusMessage('Project saved successfully.');
    setTimeout(() => setStatusMessage(null), 3000);
    loadData();
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to remove this project?')) {
      await deleteProject(id);
      loadData();
    }
  };

  const handleToggleFeatured = async (project: ProjectItem) => {
    const updated = { ...project, featured: !project.featured };
    await saveProject(updated);
    loadData();
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    await updateSiteSettings(settings);
    setStatusMessage('Settings updated successfully.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-charcoal text-cream flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-charcoal-elevated border border-cream/20 p-8 sm:p-10">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-terracotta mb-4">
            <Lock size={14} />
            <span>STUDIO ADMIN // SECURE ACCESS</span>
          </div>

          <h1 className="font-display-heavy text-4xl uppercase text-cream tracking-tight mb-2">
            Folk Cinema
          </h1>
          <p className="font-mono text-xs text-cream/50 uppercase tracking-widest mb-8">
            Database & Content Management Console
          </p>

          {loginError && (
            <div className="mb-6 p-3 bg-terracotta/20 border border-terracotta text-terracotta font-mono text-xs">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-cream/60 block mb-1">
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@folkcinema.com"
                required
                className="input-underline font-mono text-sm"
              />
            </div>

            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-cream/60 block mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="input-underline font-mono text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="mt-4 bg-terracotta text-cream py-3.5 px-6 font-mono text-xs uppercase tracking-widest font-bold hover:bg-terracotta-hover transition-colors"
            >
              {isLoggingIn ? 'AUTHENTICATING...' : 'ENTER CONSOLE'}
            </button>

            {!isSupabaseConfigured && (
              <div className="text-[11px] font-mono text-cream/40 border-t border-cream/10 pt-4">
                [Dev Mode Fallback: use <strong className="text-sand">admin@folkcinema.com</strong> / <strong className="text-sand">folk2026</strong>]
              </div>
            )}
          </form>
        </div>
      </main>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard — Folk Cinema</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="min-h-screen bg-charcoal text-cream pt-24 pb-20 px-6 md:px-12">
        {/* Top Admin Header */}
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-cream/15 pb-8 mb-10">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-terracotta mb-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-terracotta inline-block" />
              <span>CONTENT MANAGEMENT</span>
              <span className="text-cream/40">
                {isSupabaseConfigured ? '(SUPABASE CONNECTED)' : '(LOCAL FALLBACK REPO)'}
              </span>
            </div>
            <h1 className="font-display-heavy text-4xl sm:text-5xl uppercase tracking-tight text-cream">
              STUDIO DASHBOARD
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={loadData}
              className="p-3 bg-charcoal-elevated border border-cream/20 text-cream/80 hover:text-cream hover:border-terracotta transition-colors"
              title="Refresh Data"
            >
              <RefreshCw size={16} />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 bg-charcoal-elevated border border-cream/20 text-cream/80 hover:text-terracotta hover:border-terracotta transition-colors font-mono text-xs uppercase tracking-widest"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Status Toast Alert */}
        {statusMessage && (
          <div className="max-w-7xl mx-auto mb-8 p-4 bg-terracotta/20 border border-terracotta text-cream font-mono text-xs flex items-center gap-3">
            <CheckCircle size={16} className="text-terracotta" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Tab Controls */}
        <div className="max-w-7xl mx-auto flex items-center gap-6 border-b border-cream/15 pb-4 mb-8 font-mono text-xs uppercase tracking-widest">
          <button
            onClick={() => setActiveTab('projects')}
            className={`py-2 transition-colors relative ${
              activeTab === 'projects' ? 'text-terracotta font-bold' : 'text-cream/50 hover:text-cream'
            }`}
          >
            Projects Archive ({projects.length})
            {activeTab === 'projects' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`py-2 transition-colors relative ${
              activeTab === 'enquiries' ? 'text-terracotta font-bold' : 'text-cream/50 hover:text-cream'
            }`}
          >
            Enquiries Inbox ({enquiries.length})
            {activeTab === 'enquiries' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-2 transition-colors relative ${
              activeTab === 'settings' ? 'text-terracotta font-bold' : 'text-cream/50 hover:text-cream'
            }`}
          >
            Studio Settings
            {activeTab === 'settings' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta" />
            )}
          </button>
        </div>

        {/* Tab 1: Projects Management */}
        {activeTab === 'projects' && (
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-cream/50">
                Filmography & Commissions Index
              </span>
              <button
                onClick={() => {
                  setEditingProject({
                    category: 'Films',
                    year: new Date().getFullYear(),
                    featured: false,
                    sort_order: projects.length + 1,
                  });
                  setIsEditingProject(true);
                }}
                className="bg-terracotta text-cream px-4 py-2.5 font-mono text-xs uppercase tracking-widest font-semibold hover:bg-terracotta-hover transition-colors flex items-center gap-2"
              >
                <Plus size={14} />
                <span>Add Project</span>
              </button>
            </div>

            {/* Projects Table */}
            <div className="bg-charcoal-elevated border border-cream/15 overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead className="border-b border-cream/15 bg-charcoal/60 text-cream/50 uppercase tracking-widest">
                  <tr>
                    <th className="p-4">Sort</th>
                    <th className="p-4">Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Year</th>
                    <th className="p-4">Featured</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream/10">
                  {projects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-charcoal/40 transition-colors">
                      <td className="p-4 text-cream/40">#{proj.sort_order}</td>
                      <td className="p-4 font-sans font-bold text-cream text-base">
                        {proj.title}
                      </td>
                      <td className="p-4 text-cream/70 uppercase">{proj.category}</td>
                      <td className="p-4 text-cream/70">{proj.year}</td>
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleFeatured(proj)}
                          className={`p-1.5 border transition-colors ${
                            proj.featured
                              ? 'border-terracotta text-terracotta bg-terracotta/10'
                              : 'border-cream/20 text-cream/30 hover:border-cream/50'
                          }`}
                          title="Toggle Featured on Home Film Strip"
                        >
                          <Star size={14} className={proj.featured ? 'fill-current' : ''} />
                        </button>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingProject(proj);
                              setIsEditingProject(true);
                            }}
                            className="p-2 border border-cream/20 text-cream hover:border-cream transition-colors"
                            title="Edit Project"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(proj.id)}
                            className="p-2 border border-cream/20 text-cream hover:border-terracotta hover:text-terracotta transition-colors"
                            title="Delete Project"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Enquiries Management */}
        {activeTab === 'enquiries' && (
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 font-mono text-xs uppercase tracking-widest text-cream/50">
              Direct Briefs Received from Commissioners & Collaborators
            </div>

            {enquiries.length === 0 ? (
              <div className="p-12 text-center bg-charcoal-elevated border border-cream/15 font-mono text-xs uppercase text-cream/40">
                No production briefs recorded yet. Test the /contact form to generate entries.
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {enquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="p-6 bg-charcoal-elevated border border-cream/15 flex flex-col gap-4"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-cream/10 pb-4">
                      <div>
                        <span className="font-display-heavy text-2xl text-cream mr-3">
                          {enq.name}
                        </span>
                        {enq.company && (
                          <span className="font-mono text-xs text-cream/60 uppercase">
                            // {enq.company}
                          </span>
                        )}
                      </div>
                      <div className="font-mono text-xs text-terracotta uppercase">
                        [{enq.projectType}] • {new Date(enq.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="text-cream/90 text-sm leading-relaxed">
                      <strong className="font-mono text-xs uppercase text-cream/40 block mb-1">
                        Brief / Premises:
                      </strong>
                      {enq.brief}
                    </div>

                    <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-cream/10 font-mono text-xs text-cream/60 uppercase">
                      <div>
                        EMAIL: <a href={`mailto:${enq.email}`} className="text-cream hover:text-terracotta">{enq.email}</a>
                      </div>
                      {enq.budget && (
                        <div>
                          BUDGET: <span className="text-sand">{enq.budget}</span>
                        </div>
                      )}
                      {enq.timeline && (
                        <div>
                          TIMELINE: <span className="text-cream">{enq.timeline}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Studio Settings */}
        {activeTab === 'settings' && settings && (
          <div className="max-w-3xl mx-auto bg-charcoal-elevated border border-cream/15 p-8 md:p-10">
            <h2 className="font-display-heavy text-3xl uppercase text-cream mb-6">
              Global Site Settings
            </h2>
            <form onSubmit={handleSaveSettings} className="flex flex-col gap-6">
              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-cream/60 block mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  className="input-underline"
                />
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-cream/60 block mb-1">
                  Production Inquiries Email
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="input-underline"
                />
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-cream/60 block mb-1">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  value={settings.instagram}
                  onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                  className="input-underline"
                />
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-cream/60 block mb-1">
                  Showreel Video URL (MP4 / Stream)
                </label>
                <input
                  type="text"
                  value={settings.showreelUrl}
                  onChange={(e) => setSettings({ ...settings, showreelUrl: e.target.value })}
                  className="input-underline"
                />
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-cream/60 block mb-1">
                  Studio Address / Cities
                </label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="input-underline"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="bg-terracotta text-cream py-3.5 px-8 font-mono text-xs uppercase tracking-widest font-bold hover:bg-terracotta-hover transition-colors"
                >
                  SAVE SETTINGS
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Edit / Create Project Modal */}
        {isEditingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 overflow-y-auto">
            <div className="w-full max-w-2xl bg-charcoal border border-cream/20 p-8 my-8 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6 border-b border-cream/15 pb-4">
                <h3 className="font-display-heavy text-2xl uppercase text-cream">
                  {editingProject.id ? 'Edit Project' : 'New Project'}
                </h3>
                <button
                  onClick={() => setIsEditingProject(false)}
                  className="font-mono text-xs text-cream/60 hover:text-terracotta"
                >
                  [CLOSE]
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="flex flex-col gap-6">
                <div>
                  <label className="font-mono text-xs uppercase tracking-widest text-cream/60 block mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        title: e.target.value,
                        slug:
                          editingProject.slug ||
                          e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                      })
                    }
                    className="input-underline"
                  />
                </div>

                <div>
                  <label className="font-mono text-xs uppercase tracking-widest text-cream/60 block mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.slug || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    className="input-underline font-mono text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-xs uppercase tracking-widest text-cream/60 block mb-1">
                      Category
                    </label>
                    <select
                      value={editingProject.category || 'Films'}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, category: e.target.value as any })
                      }
                      className="input-underline bg-charcoal"
                    >
                      {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-mono text-xs uppercase tracking-widest text-cream/60 block mb-1">
                      Year
                    </label>
                    <input
                      type="number"
                      value={editingProject.year || 2026}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, year: Number(e.target.value) })
                      }
                      className="input-underline font-mono text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-xs uppercase tracking-widest text-cream/60 block mb-1">
                    Thumbnail Image URL *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.thumbnail || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, thumbnail: e.target.value })}
                    className="input-underline font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="font-mono text-xs uppercase tracking-widest text-cream/60 block mb-1">
                    Preview Video URL (Loop on hover / MP4)
                  </label>
                  <input
                    type="text"
                    value={editingProject.preview_url || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, preview_url: e.target.value })}
                    className="input-underline font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="font-mono text-xs uppercase tracking-widest text-cream/60 block mb-1">
                    Full Film URL (Direct video or embed)
                  </label>
                  <input
                    type="text"
                    value={editingProject.video_url || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, video_url: e.target.value })}
                    className="input-underline font-mono text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-xs uppercase tracking-widest text-cream/60 block mb-1">
                      Runtime
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 24 min"
                      value={editingProject.runtime || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, runtime: e.target.value })}
                      className="input-underline font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs uppercase tracking-widest text-cream/60 block mb-1">
                      Role
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Direction & Production"
                      value={editingProject.role || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, role: e.target.value })}
                      className="input-underline font-mono text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-xs uppercase tracking-widest text-cream/60 block mb-1">
                    Synopsis / Summary
                  </label>
                  <textarea
                    rows={4}
                    value={editingProject.synopsis || ''}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        synopsis: e.target.value,
                        description: e.target.value,
                      })
                    }
                    className="input-underline resize-none"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featuredCheckbox"
                    checked={editingProject.featured || false}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, featured: e.target.checked })
                    }
                    className="accent-terracotta w-4 h-4"
                  />
                  <label htmlFor="featuredCheckbox" className="font-mono text-xs uppercase text-cream">
                    Featured in Home Film Strip
                  </label>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t border-cream/15">
                  <button
                    type="button"
                    onClick={() => setIsEditingProject(false)}
                    className="px-6 py-3 border border-cream/20 font-mono text-xs uppercase text-cream hover:border-cream"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-terracotta text-cream px-8 py-3 font-mono text-xs uppercase tracking-widest font-bold hover:bg-terracotta-hover transition-colors"
                  >
                    Save Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </>
  );
};
