# Sanity Content Model

This document maps the current Nuxt landing page data to the first Sanity schema pass.

## Documents

### `siteSettings`

Single document for global, rarely changing data.

Fields:
- `brandName`: string
- `logo`: image
- `phone`: string
- `phoneHref`: string
- `email`: string
- `emailHref`: string
- `address`: object
- `socialLinks`: array of `socialLink`

Current source:
- `app/app.config.ts`

### Landing page sections

Landing content is split into section-level singleton documents per language. This keeps the panel readable and lets the client publish only a small part of the page, for example only `Hero PL` or only `Realizacje DE`.

Document groups in Studio:
- `Landing page PL`
- `Landing page EN`
- `Landing page DE`

Each group contains:
- `SEO`
- `Hero`
- `Dla kogo`
- `Możliwości`
- `Manifest`
- `Realizacje`
- `Pliki`
- `Proces`
- `Współpraca`
- `Kontakt`

Current sources:
- `app/data/landingContent.ts`
- `app/data/landingTranslations.ts`

## Objects

Text fields are language-specific because each section document belongs to one language. The frontend query infers the language from document IDs such as `landing-hero-pl`.

### `socialLink`

Fields:
- `label`: string
- `href`: url
- `icon`: string

### `sectionIntro`

Fields:
- `eyebrow`: string, optional
- `heading`: string
- `description`: text, optional

Used by:
- `audienceSection`
- `foundrySection`
- `workSection`
- `processSection`
- `collaboration`
- `contact`

### `audienceItem`

Fields:
- `number`: string
- `title`: string
- `description`: text

Current source:
- `audienceItems`

### `manifestStat`

Fields:
- `label`: string
- `value`: string

Current source:
- `manifestStats`

### `manifestCard`

Fields:
- `variant`: string, options: `primary`, `compact`
- `styleKey`: string
- `label`: string
- `description`: text, optional

Current source:
- `manifestCards`

### `foundryCard`

Fields:
- `type`: string, options: `scale`, `materials`, `texture`, `finish`
- `number`: string
- `label`: string
- `metric`: string, optional
- `unit`: string, optional
- `title`: string
- `description`: text
- `swatches`: array of color/string, optional
- `tag`: string, optional

Current source:
- `foundryCards`

### `workItem`

Fields:
- `number`: string
- `layoutClass`: string
- `seed`: number
- `image`: image
- `imageAlt`: string
- `category`: string
- `title`: string
- `author`: string

Current source:
- `workItems`

Mapper note:
- `layoutClass` is intentionally controlled. Keep values aligned with the existing layout classes: `g-a`, `g-b`, `g-c`, `g-d`, `g-e`.

### `fileType`

Fields:
- `label`: string
- `extension`: string
- `description`: text

Current source:
- `fileTypes`

### `checklistItem`

Fields:
- `label`: string
- `description`: text

Current source:
- `fileChecklist`

### `processStep`

Fields:
- `number`: string
- `icon`: string, options: `cluster`, `layers`, `sphere`, `orbit`
- `title`: string
- `tag`: string

Current source:
- `processSteps`

### `collabBenefit`

Fields:
- `text`: string

Current source:
- `collabBenefits`

## Implementation Order

1. Done: create local fallback data in `app/data`.
2. Done: create `useLandingPage()` as the single composable entry point for landing data.
3. Done: add public Sanity runtime configuration and environment variables.
4. Done: add the initial landing page GROQ query and fetch helper.
5. Done: extend `useLandingPage()` so it fetches Sanity and falls back to local data.
6. Done: add the Sanity-to-local mapper for current component structures.
7. Done: create Sanity Studio scaffold and schemas in `/sanity`.
8. Done: split landing page CMS editing into section-level singleton documents per language.
9. Replace remote image URLs with Sanity image assets for `workItems`.
