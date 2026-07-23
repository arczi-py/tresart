# TRES ART - project handoff

## Status

The landing page is implemented in Nuxt 4 / Vue 3 and reads published content from Sanity. Local fallback content remains in the codebase, so the page still renders when Sanity is unavailable.

The old static HTML files were removed from the project root. Active work now lives in:

- `nuxt/` - public website
- `sanity/` - Sanity Studio

## Active routes

- `/` - main landing page, CMS-ready
- `/mozliwosci` - capabilities subpage
- `/realizacje` - portfolio structure subpage
- `/proces` - process subpage
- `/dla-tworcow` - creators/cooperation subpage
- `/kontakt` - contact subpage
- `/materialy` - intentionally hidden, noindex redirect to `/`

Subpages are editable in Sanity under `Podstrony PL`. Each page is a separate singleton document, so publishing a change to `/realizacje` does not publish or modify `/proces`, `/kontakt` or the landing page.

On the first visit to each item in `Podstrony PL`, Studio creates a document prefilled with the current page content. Publish it once. The frontend then reads that document; until then it uses the local fallback in `app/data/subpages.ts`.

All client-facing copy on these pages is editable: SEO title and description, hero copy, buttons, section headings, card descriptions, process steps, checklists and final CTA. Hero and portfolio images have dedicated Sanity upload fields and alt-text fields. The legacy URL field is only a temporary fallback for current placeholders; upload production images to Sanity before launch.

## Local development

Use Node from the root `.nvmrc`.

```bash
nvm use
cd nuxt
npm install
npm run dev
```

Sanity Studio:

```bash
cd sanity
npm install
npm run dev
```

## Environment variables

Nuxt needs public read-only Sanity variables:

```bash
NUXT_PUBLIC_SANITY_PROJECT_ID=
NUXT_PUBLIC_SANITY_DATASET=production
NUXT_PUBLIC_SANITY_API_VERSION=2026-07-15
NUXT_PUBLIC_SANITY_USE_CDN=false
```

Use `NUXT_PUBLIC_SANITY_USE_CDN=false` while editing and testing content. In production, use CDN only after content editing is stable.

Sanity Studio needs:

```bash
SANITY_STUDIO_PROJECT_ID=
SANITY_STUDIO_DATASET=production
```

Never expose write tokens in `NUXT_PUBLIC_*`.

## Sanity editing model

The Studio is split into language groups: PL, EN, DE. Each landing page section is a separate singleton document.

For list-based sections, editors can publish one changed item without filling the full list:

- Add one item.
- Choose `Pozycja w layoucie`.
- Fill only fields that should override the default content.
- Publish.

Nuxt matches that item to the selected slot and uses fallback content for the remaining slots.

The Manifest intro is edited as one full text field: `Główny tekst manifestu`. There is no hard-coded `tresart` word in the component.

## Preview

Published-content preview:

```text
/?preview=sanity
```

This bypasses Sanity CDN and refreshes published content every 10 seconds. Draft preview for unpublished content is not implemented yet; it should use a protected server route and a server-side Sanity token.

## SEO checklist before launch

- Confirm final production domain in `app.config.ts`.
- Confirm final SEO title and description in Sanity SEO section.
- Replace placeholder social URLs in Sanity site settings with final profile URLs or leave them empty.
- Replace placeholder work/gallery images with final images and alt text.
- Confirm `robots.txt` and `sitemap.xml` use the production domain.
- Run `npm run build` in `nuxt`.
- Test contact links: phone and email.

## Deployment notes

Recommended hosting: Cloudflare Pages or Vercel.

Build command:

```bash
npm run build
```

Nuxt output directory depends on the hosting preset; for standard Nitro builds use `.output`.

Set the same Nuxt environment variables in the hosting provider. Keep Sanity Studio deployment separate unless you intentionally want to host it under the same domain.
