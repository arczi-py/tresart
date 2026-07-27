# TRES ART Nuxt Landing

Nuxt 4 website prepared for a Sanity CMS connection. The landing page renders from local fallback data in `app/data` unless public Sanity environment variables point to a configured dataset.

Active routes:

- `/`
- `/mozliwosci`
- `/realizacje`
- `/proces`
- `/dla-tworcow`
- `/kontakt`

`/materialy` is intentionally hidden and redirects to `/`, matching the archived static version.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Sanity

Copy `.env.example` to `.env` when the Sanity project exists:

```bash
NUXT_PUBLIC_SANITY_PROJECT_ID=
NUXT_PUBLIC_SANITY_DATASET=production
NUXT_PUBLIC_SANITY_API_VERSION=2026-07-15
NUXT_PUBLIC_SANITY_USE_CDN=false
```

These variables are public because the landing page only reads published public content. Do not put write tokens in `NUXT_PUBLIC_*`.

Use `NUXT_PUBLIC_SANITY_USE_CDN=false` while editing and testing content. This reads from the live Sanity API, so published changes are visible after a normal browser refresh without restarting the Nuxt dev server. In production, the app defaults to Sanity CDN when this variable is not set.

Preview flow for a client:

1. The client edits and publishes a section in Sanity Studio.
2. Open the Nuxt page with `?preview=sanity`, for example `http://localhost:3000/?preview=sanity` or `http://localhost:3000/realizacje?preview=sanity`.
3. In preview mode, Nuxt bypasses the CDN and refreshes published Sanity content every 10 seconds.

This preview mode reads published content only and is marked `noindex,nofollow`. Draft preview for unpublished changes should be added later with a server-side Sanity token and a protected preview route.

Data flow:

1. Each page calls `initializeLandingPage()` before render.
2. Nuxt tries to read Sanity through the public query API.
3. If Sanity is not configured or returns an error, `useLandingPage()` keeps using local fallback data.
4. Sanity content is mapped back to the existing component shape, so layout classes and designed section structure remain controlled by the codebase.

Subpages use published Sanity documents when available and retain local fallback data in `app/data/subpages.ts`. In Studio open `Podstrony PL`, then open and publish each page once to create its editable document with the current content.

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Handoff

Project handoff notes, Sanity editing workflow, preview mode and launch checklist are documented in [`docs/project-handoff.md`](docs/project-handoff.md).
