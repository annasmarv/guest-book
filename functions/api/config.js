/**
 * Cloudflare Pages Function to serve Supabase configuration
 * Environment variables should be set in Cloudflare Pages dashboard:
 * - SUPABASE_URL: Your Supabase project URL
 * - SUPABASE_KEY: Your Supabase anon/public key
 */
export async function onRequest(context) {
  const { env } = context;

  // Get credentials from Cloudflare Pages environment variables
  const supabaseUrl = env.SUPABASE_URL;
  const supabaseKey = env.SUPABASE_KEY;

  // Check if environment variables are configured
  if (!supabaseUrl || !supabaseKey) {
    return new Response(
      JSON.stringify({
        error: 'Supabase credentials not configured in environment variables'
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
