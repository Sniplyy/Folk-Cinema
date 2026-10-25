// @ts-nocheck
// ============================================================
// Folk Cinema — Supabase Edge Function: send-enquiry
// Runtime: Deno / Supabase Edge Runtime
// Dispatches email alerts when new briefs are submitted via Resend
// ============================================================

declare const Deno: {
  env: {
    get: (key: string) => string | undefined;
  };
  serve: (handler: (req: Request) => Promise<Response> | Response) => void;
};

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const NOTIFY_EMAIL = Deno.env.get('NOTIFY_EMAIL') || 'hello@folkcinema.com';

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  try {
    const { name, company, email, projectType, brief, budget, timeline } = await req.json();

    if (!RESEND_API_KEY) {
      console.info('Mock brief logged (RESEND_API_KEY not configured in env):', {
        name,
        company,
        email,
        projectType,
      });
      return new Response(
        JSON.stringify({ message: 'Brief logged (mock notification mode active)' }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const emailContent = `
      <div style="font-family: sans-serif; max-width: 600px; color: #141210;">
        <h2 style="color: #D4552B; text-transform: uppercase;">New Production Brief Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Budget:</strong> ${budget || 'Undisclosed'}</p>
        <p><strong>Timeline:</strong> ${timeline || 'Not specified'}</p>
        <hr style="border: 1px solid #eee; margin: 20px 0;" />
        <p><strong>Brief:</strong></p>
        <blockquote style="background: #f9f9f9; padding: 15px; border-left: 4px solid #D4552B;">${brief}</blockquote>
      </div>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Folk Cinema Enquiries <notifications@folkcinema.com>',
        to: [NOTIFY_EMAIL],
        subject: `New Brief: [${projectType}] from ${name}`,
        html: emailContent,
      }),
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
