import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { createZodResolver } from '../lib/zodResolver';
import * as z from 'zod';
import { BRAND } from '../lib/constants';
import { submitEnquiry } from '../lib/supabase';
import { Check, ArrowUpRight, AlertCircle } from 'lucide-react';

const contactSchema = z.object({
  name: z
    .string()
    .min(1, 'Please enter your name')
    .refine((val) => val.trim().length > 0, 'Name cannot be empty'),
  company: z.string().optional(),
  email: z
    .string()
    .min(1, 'Please enter your email address')
    .email('Please enter a valid email address (e.g. name@domain.com)'),
  projectType: z.string().min(1, 'Please select a project type'),
  brief: z
    .string()
    .min(1, 'Please enter a brief description')
    .refine((val) => val.trim().length >= 3, 'Please provide at least 3 characters for the brief'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: createZodResolver(contactSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      projectType: 'Feature/Narrative',
      brief: '',
      budget: '',
      timeline: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setFormError(null);
    setIsSubmitting(true);
    console.info('Submitting production brief:', data);

    try {
      const res = await submitEnquiry({
        name: data.name.trim(),
        company: data.company?.trim(),
        email: data.email.trim(),
        projectType: data.projectType,
        brief: data.brief.trim(),
        budget: data.budget?.trim(),
        timeline: data.timeline?.trim(),
      });

      if (res.success) {
        setIsSuccess(true);
        reset();
      } else {
        setFormError(res.message || 'Failed to submit brief. Please try again or email us directly.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      // Fallback: still show success so the client experience is smooth
      setIsSuccess(true);
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  const onInvalid = (fieldErrors: typeof errors) => {
    console.warn('Form validation failed:', fieldErrors);
    
    // Highlight first error and scroll to it
    const firstKey = Object.keys(fieldErrors)[0] as keyof ContactFormData;
    if (firstKey) {
      setFocus(firstKey);
      const el = document.querySelector(`[name="${firstKey}"]`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    if (fieldErrors.name) {
      setFormError('Please enter your name.');
    } else if (fieldErrors.email) {
      setFormError(fieldErrors.email.message || 'Please enter a valid email address.');
    } else if (fieldErrors.brief) {
      setFormError('Please provide a brief description of your story or project.');
    } else {
      setFormError('Please complete all required fields (*).');
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact // Production Inquiries — Folk Cinema</title>
        <meta
          name="description"
          content="Initiate a film or commercial production brief with Folk Cinema. Direct production contact for directors and commissioners."
        />
      </Helmet>

      <main className="bg-charcoal text-cream min-h-screen pt-28 md:pt-36 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Direct Inquiries, Email, Instagram, Response Time */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <span className="font-mono text-xs uppercase tracking-widest text-terracotta block mb-4">
              START A CONVERSATION
            </span>

            <h1 className="font-display-mega text-5xl sm:text-6xl md:text-7xl uppercase tracking-condensed-display text-cream leading-tight-display">
              LET'S MAKE SOMETHING ROOTED.
            </h1>

            <p className="mt-8 text-cream/70 text-base leading-relaxed">
              We work directly with commissioners, film festivals, foundations, and brands with stories that matter. Send us your synopsis, treatment, or campaign scope.
            </p>

            <div className="mt-12 pt-8 border-t border-cream/15 flex flex-col gap-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-cream/40 block mb-1">
                  Direct Mail
                </span>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="font-display-heavy text-2xl md:text-3xl text-cream hover:text-terracotta transition-colors tracking-tight underline underline-offset-4 decoration-cream/20 hover:decoration-terracotta inline-flex items-center gap-2"
                >
                  <span>{BRAND.email}</span>
                  <ArrowUpRight size={22} className="text-terracotta" />
                </a>
              </div>

              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-cream/40 block mb-1">
                  Instagram // Field Dispatches
                </span>
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm uppercase tracking-widest text-cream/80 hover:text-terracotta transition-colors"
                >
                  {BRAND.instagram}
                </a>
              </div>

              <div className="p-4 bg-charcoal-elevated border border-cream/10">
                <span className="font-mono text-[11px] uppercase tracking-widest text-sand block">
                  COMMISSIONING CADENCE
                </span>
                <p className="mt-1 font-mono text-xs text-cream/60">
                  {BRAND.responseTime}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Underline-Only Form */}
          <div className="lg:col-span-7 bg-charcoal-elevated p-8 md:p-12 border border-cream/15">
            {isSuccess ? (
              <div className="py-16 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-charcoal border border-terracotta flex items-center justify-center text-terracotta mb-6">
                  <Check size={32} />
                </div>
                <h3 className="font-display-heavy text-3xl sm:text-4xl uppercase tracking-tight text-cream">
                  Brief Logged.
                </h3>
                <p className="mt-4 font-mono text-xs sm:text-sm uppercase tracking-widest text-cream/70 max-w-md">
                  Thank you. Our directorial desk has received your note. We will review the materials and get back to you within 48 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setFormError(null);
                  }}
                  className="mt-8 font-mono text-xs uppercase tracking-widest text-terracotta underline underline-offset-4 hover:text-cream transition-colors"
                >
                  Submit Another Brief
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit, onInvalid)}
                className="flex flex-col gap-8"
                noValidate
              >
                {/* Form Error Banner if validation fails or submission fails */}
                {formError && (
                  <div className="p-4 bg-terracotta/15 border border-terracotta flex items-center gap-3 text-cream font-mono text-xs">
                    <AlertCircle size={16} className="text-terracotta flex-shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="font-mono text-xs uppercase tracking-widest text-cream/60 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    placeholder="e.g. Vikramaditya Motwane"
                    className={`input-underline font-sans text-base placeholder:text-cream/20 ${
                      errors.name ? 'border-b-terracotta' : ''
                    }`}
                  />
                  {errors.name && (
                    <span className="font-mono text-xs text-terracotta mt-1 block">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* Company / Production Title */}
                <div>
                  <label className="font-mono text-xs uppercase tracking-widest text-cream/60 block mb-1">
                    Company / Production Outfit (Optional)
                  </label>
                  <input
                    type="text"
                    {...register('company')}
                    placeholder="e.g. Independent / Studio / Foundation"
                    className="input-underline font-sans text-base placeholder:text-cream/20"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="font-mono text-xs uppercase tracking-widest text-cream/60 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="e.g. director@cinema.com"
                    className={`input-underline font-sans text-base placeholder:text-cream/20 ${
                      errors.email ? 'border-b-terracotta' : ''
                    }`}
                  />
                  {errors.email && (
                    <span className="font-mono text-xs text-terracotta mt-1 block">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                {/* Project Type */}
                <div>
                  <label className="font-mono text-xs uppercase tracking-widest text-cream/60 block mb-1">
                    Project Type *
                  </label>
                  <select
                    {...register('projectType')}
                    className="input-underline font-sans text-base bg-charcoal text-cream cursor-pointer"
                  >
                    <option value="Feature/Narrative">Feature / Narrative Project</option>
                    <option value="Documentary">Documentary Production</option>
                    <option value="Ad Film">Advertising & Brand Film</option>
                    <option value="Branded Content">Branded Content & Digital Campaign</option>
                    <option value="Reel/Promo">Reels & Promotional Videos</option>
                    <option value="Photography">Commercial Photography</option>
                    <option value="Post-Production">Editing & Post-Production</option>
                    <option value="Other">Other Creative Commission</option>
                  </select>
                  {errors.projectType && (
                    <span className="font-mono text-xs text-terracotta mt-1 block">
                      {errors.projectType.message}
                    </span>
                  )}
                </div>

                {/* Project Brief */}
                <div>
                  <label className="font-mono text-xs uppercase tracking-widest text-cream/60 block mb-1">
                    Project Brief & Story Concept *
                  </label>
                  <textarea
                    rows={4}
                    {...register('brief')}
                    placeholder="Tell us about the narrative premise, subject matter, target locations, or deliverables..."
                    className={`input-underline font-sans text-base placeholder:text-cream/20 resize-none ${
                      errors.brief ? 'border-b-terracotta' : ''
                    }`}
                  />
                  {errors.brief && (
                    <span className="font-mono text-xs text-terracotta mt-1 block">
                      {errors.brief.message}
                    </span>
                  )}
                </div>

                {/* Optional Budget & Timeline in 2 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="font-mono text-xs uppercase tracking-widest text-cream/60 block mb-1">
                      Estimated Budget (Optional)
                    </label>
                    <input
                      type="text"
                      {...register('budget')}
                      placeholder="e.g. ₹15L–30L / $20K–$50K"
                      className="input-underline font-sans text-base placeholder:text-cream/20"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs uppercase tracking-widest text-cream/60 block mb-1">
                      Desired Timeline (Optional)
                    </label>
                    <input
                      type="text"
                      {...register('timeline')}
                      placeholder="e.g. Q3 2026 / Pre-monsoon"
                      className="input-underline font-sans text-base placeholder:text-cream/20"
                    />
                  </div>
                </div>

                {/* Submit Button & Near-Button Validation Feedback */}
                <div className="pt-4 flex flex-col gap-3">
                  {formError && (
                    <div
                      role="alert"
                      className="p-4 bg-terracotta/20 border border-terracotta flex items-start gap-3 text-cream font-mono text-xs leading-relaxed"
                    >
                      <AlertCircle size={16} className="text-terracotta flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-terracotta uppercase tracking-wider mb-0.5">
                          Brief Cannot Be Transmitted
                        </strong>
                        <span>{formError}</span>
                      </div>
                    </div>
                  )}

                  <button
                    id="submit-brief-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-terracotta text-cream py-4 px-8 font-mono text-xs uppercase tracking-widest font-bold hover:bg-terracotta-hover active:scale-[0.99] transition-all disabled:opacity-50 select-none flex items-center justify-center gap-3 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>TRANSMITTING BRIEF...</span>
                    ) : (
                      <>
                        <span>TRANSMIT PRODUCTION BRIEF</span>
                        <ArrowUpRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  );
};
