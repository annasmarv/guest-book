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

#### Setup Local Development Environment

1. **Prerequisites**: Make sure you have Node.js installed

2. **Install dependencies**:
```bash
npm install
# or if you haven't initialized npm yet
npm init -y
npm install wrangler --save-dev
```

3. **Create `.dev.vars` file** in the project root:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

Replace the values with your actual Supabase credentials.

4. **Run local development server**:
```bash
npx wrangler pages dev .
```

The application will be available at `http://localhost:8788`

---

### Deploying to Cloudflare Pages with Wrangler

#### First Time Setup

1. **Install Wrangler globally** (optional but recommended):
```bash
npm install -g wrangler
```

2. **Login to Cloudflare**:
```bash
wrangler login
```

This will open a browser window to authenticate with your Cloudflare account.

3. **Create a Cloudflare Pages project** (if not already created):
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to **Pages**
   - Click **Create a project**
   - Connect your Git repository or use manual deployment

#### Deploy with Wrangler

After initial setup, you can deploy using:

```bash
wrangler pages deploy
```

Or use the simpler command:
```bash
wrangler pages publish
```

#### Setting Environment Variables on Cloudflare Pages

1. Go to your Cloudflare Pages project dashboard
2. Navigate to **Settings** > **Environment variables**
3. Add the following for **Production** environment:
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_ANON_KEY`: Your Supabase anon/public key

4. Add the same variables for **Preview** environment (for testing deployments)

5. **Redeploy** your project after adding variables (push a new commit)

#### wrangler.toml Configuration (Optional)

For better control, you can create a `wrangler.toml` file in the root:

```toml
name = "guest-book"
type = "javascript"
compatibility_date = "2024-01-15"

[env.production]
routes = [
  { pattern = "example.com/*", zone_name = "example.com" }
]

[env.preview]
```

Then deploy with:
```bash
wrangler pages deploy --env production
```
