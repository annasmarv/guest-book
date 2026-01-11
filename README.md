# Guest Book - SMK Negeri 7 Kendal

Digital guest book system for SMK Negeri 7 Kendal.

## Environment Variables

This application uses Cloudflare Pages environment variables for Supabase configuration.

### Setup on Cloudflare Pages

1. Go to your Cloudflare Pages project dashboard
2. Navigate to **Settings** > **Environment variables**
3. Add the following environment variables:

| Variable Name | Description |
|--------------|-------------|
| `SUPABASE_URL` | Your Supabase project URL (e.g., `https://xxxxx.supabase.co`) |
| `SUPABASE_ANON_KEY` | Your Supabase anon/public key |

4. **Important**: Make sure to select both **Production** and **Preview** environments when adding variables
5. **Redeploy** your project after adding the environment variables (push a new commit or trigger a manual deploy)

### Troubleshooting

If you see the error "Supabase credentials not configured":
- Check that both `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set
- Ensure variables are added to the correct environment (Production/Preview)
- Redeploy after adding the variables

### Local Development

For local development with Wrangler, create a `.dev.vars` file in the project root:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

Then run:
```bash
npx wrangler pages dev .
```
