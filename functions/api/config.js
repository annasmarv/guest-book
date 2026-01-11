/**
 * Cloudflare Pages Function to serve Supabase configuration
 * Environment variables should be set in Cloudflare Pages dashboard:
 * - SUPABASE_URL: Your Supabase project URL
 * - SUPABASE_ANON_KEY: Your Supabase anon/public key
 */
export async function onRequest(context) {
  const { env, request } = context;

  // Check if request is from a browser (Sec-Fetch-Mode: navigate)
  // If accessed directly in browser, return 404
  const secFetchMode = request.headers.get('Sec-Fetch-Mode');
  const secFetchSite = request.headers.get('Sec-Fetch-Site');

  if (secFetchMode === 'navigate' || secFetchSite === 'none') {
    return new Response('Not Found', { status: 404 });
  }

  // Get credentials from Cloudflare Pages environment variables
  // Support both SUPABASE_KEY and SUPABASE_ANON_KEY for flexibility
  const supabaseUrl = env.SUPABASE_URL;
  const supabaseKey = env.SUPABASE_ANON_KEY || env.SUPABASE_KEY;

  // Check if environment variables are configured
  if (!supabaseUrl || !supabaseKey) {
    return new Response(
      JSON.stringify({
        error: 'Supabase credentials not configured in environment variables',
        hint: 'Please set SUPABASE_URL and SUPABASE_ANON_KEY in Cloudflare Pages Settings > Environment variables. Make sure to redeploy after adding variables.',
        configured: {
          SUPABASE_URL: !!supabaseUrl,
          SUPABASE_ANON_KEY: !!(env.SUPABASE_ANON_KEY || env.SUPABASE_KEY)
        }
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  return new Response(
    JSON.stringify({
      supabaseUrl,
      supabaseKey
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'private, max-age=3600' // Cache only in user's browser for 1 hour
      }
    }
  );
}
