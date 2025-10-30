# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Quick Start

Get up and running in under 2 minutes:

1. **Clone and install:**
   ```bash
   git clone <repo>
   cd convex-sveltekit-boilerplate-v2
   pnpm install
   ```

2. **Set up Convex (Terminal 1):**
   ```bash
   pnpm convex dev
   ```
   Follow prompts to create a Convex account and deployment. Keep this running.

3. **Configure environment (Terminal 2):**
   
   **Mac/Linux:**
   ```bash
   pnpm setup:convex
   ```
   
   **Windows (PowerShell):**
   ```powershell
   ./scripts/setup-convex-env.ps1
   ```
   
   This automatically sets `SITE_URL` and generates `BETTER_AUTH_SECRET` in your Convex environment.
   
   **Note:** The `.env.local` file will be auto-populated with `PUBLIC_CONVEX_URL` from step 2.

4. **Start the dev server (same Terminal 2):**
   ```bash
   pnpm dev
   ```

5. **Open http://localhost:5173** 🎉

That's it! The app is ready with full authentication.

## Optional Integrations

All external services are optional. The app works with just Convex.
To enable additional features, add the relevant API keys to `.env.local`:

- **Analytics**: Add `PUBLIC_POSTHOG_API_KEY` from [PostHog](https://posthog.com)
- **Email**: Add `RESEND_API_KEY` from [Resend](https://resend.com) for password reset emails
- **Social Login**: Add OAuth credentials (`GOOGLE_CLIENT_ID`, `GITHUB_CLIENT_ID`, etc.)
- **Billing**: Add `POLAR_ACCESS_TOKEN`, `POLAR_WEBHOOK_SECRET`, and optionally `POLAR_SERVER=sandbox` from [Polar.sh](https://polar.sh)
  - Polar.sh is a Merchant of Record with built-in global tax compliance
  - The integration automatically handles customer creation, subscription management, and webhooks
  - Use [sandbox.polar.sh](https://sandbox.polar.sh) for testing without processing real payments

See `.env.local` for detailed setup instructions for each service.

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Troubleshooting

### "Auth not working after signup/login"
- Make sure you set `SITE_URL` in Convex dashboard
- Make sure `BETTER_AUTH_SECRET` is set
- Check that `PUBLIC_CONVEX_SITE_URL` ends with `.convex.site` (not `localhost`)

### "Environment variable not found"
- Run `pnpm convex dev` first to auto-populate Convex variables
- Check `.env.local` exists and has correct values

### "Session doesn't persist"
- Clear browser cookies and try again
- Check browser console for errors
