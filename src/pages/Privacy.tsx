import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { BRAND } from '../lib/constants';

export const Privacy: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — Folk Cinema</title>
        <meta name="description" content="Privacy Policy for Folk Cinema production company website." />
      </Helmet>

      <main className="bg-charcoal text-cream min-h-screen pt-28 md:pt-36 pb-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cream/60 hover:text-terracotta transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            <span>Return to Home</span>
          </Link>

          <div className="font-mono text-xs uppercase tracking-widest text-terracotta mb-3">
            LEGAL // TRANSPARENCY
          </div>

          <h1 className="font-display-mega text-5xl sm:text-7xl uppercase tracking-condensed-display text-cream leading-tight-display mb-12">
            PRIVACY POLICY
          </h1>

          <div className="border-t border-cream/15 pt-8 flex flex-col gap-8 text-cream/80 text-base leading-relaxed">
            <p className="font-mono text-xs text-cream/50 uppercase tracking-widest">
              EFFECTIVE DATE: OCTOBER 2026 // VERSION 1.0
            </p>

            <div>
              <h2 className="font-display-heavy text-2xl uppercase text-cream mb-3">
                1. Information We Collect
              </h2>
              <p>
                When you initiate a creative brief through our contact form, we collect the details you provide: your name, organization, email address, project type, brief description, budget range, and timeline. We collect this solely to evaluate and respond to your production enquiry.
              </p>
            </div>

            <div>
              <h2 className="font-display-heavy text-2xl uppercase text-cream mb-3">
                2. Storage & Security
              </h2>
              <p>
                Enquiry submissions are stored in an encrypted PostgreSQL database hosted via Supabase with strict Row Level Security (RLS). Only authenticated studio administrators have access to read submitted enquiries. We do not sell, rent, or trade your contact information to third parties.
              </p>
            </div>

            <div>
              <h2 className="font-display-heavy text-2xl uppercase text-cream mb-3">
                3. Cookies & Session Storage
              </h2>
              <p>
                We use minimalist browser <code className="text-terracotta font-mono">sessionStorage</code> solely to detect whether you have already seen our film-leader preloader during your current visit, ensuring repeat page loads are instant. We do not deploy invasive third-party cross-site tracking cookies.
              </p>
            </div>

            <div>
              <h2 className="font-display-heavy text-2xl uppercase text-cream mb-3">
                4. Media & External Links
              </h2>
              <p>
                Our showcase contains curated media embeds and video streams. When viewing embedded content (e.g. Vimeo, YouTube), those external services may log standard video player telemetries under their respective privacy policies.
              </p>
            </div>

            <div>
              <h2 className="font-display-heavy text-2xl uppercase text-cream mb-3">
                5. Rights & Removal
              </h2>
              <p>
                You may request deletion of any project brief or personal contact information at any time by contacting our directorial desk directly at{' '}
                <a
                  href={`mailto:${BRAND.email}`}
                  className="text-terracotta underline hover:text-cream"
                >
                  {BRAND.email}
                </a>.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
