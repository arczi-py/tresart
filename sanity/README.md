# TRES ART Sanity Studio

Sanity Studio for the TRES ART landing page. This Studio manages only the content shape currently supported by the Nuxt mapper.

## Setup

Create `.env` from `.env.example`:

```bash
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

Then run:

```bash
npm install
npm run dev
```

Studio runs locally at `http://localhost:3333`.

## Documents

- `Ustawienia strony` is a singleton for logo, contact, address and social links.
- Landing page content is split by language and section:
  - `Landing page PL`
  - `Landing page EN`
  - `Landing page DE`

Each language group contains section singletons such as `SEO`, `Hero`, `Realizacje`, `Proces` and `Kontakt`.

This structure is intentional: Sanity publishes whole documents, so splitting content into section documents lets the client publish only one part of the page instead of the whole landing page.

Keep layout-related fields such as `layoutClass`, `type`, and `icon` within the configured options. They are intentionally constrained so content editing does not break the landing page layout.
