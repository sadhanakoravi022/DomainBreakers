<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# DomainBreakers

AI-powered learning gap detection, diagnostic reasoning, and adaptive practice.

## Run locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env.local`.
3. Add your `GEMINI_API_KEY`, `VITE_SUPABASE_URL`, and `VITE_SUPABASE_ANON_KEY` values to `.env.local`.
   Get the Supabase URL and anon key from your Supabase project's **Project Settings > API**.
4. In Supabase, enable the Email provider and set the site's URL and allowed redirect URL to your app origin (for local development, `http://localhost:3000`).
5. Run the app:
   `npm run dev`

The app uses Supabase Auth for email/password sign-in and account creation. Assessment progress is stored in the browser separately for each signed-in user.
