# Tech Stack

## Framework: Next.js

**Decision:** Next.js (React), deployed on Vercel.

**Reasoning:**

- Existing experience — prior projects already published on Vercel, so deployment/workflow is familiar.
- Site will start mostly static (landing, about, menu, contact, gallery, events) but should stay open to more interactivity and backend needs later (e.g. events management, contact forms, possibly online ordering down the line). Next.js supports both static pages and API/server functionality without switching frameworks.
- Easy preview deployments for testing before going live (Vercel preview URLs per branch/PR).

**Alternatives considered:**

- _Astro_ — arguably even better suited for a mostly-static, content-heavy, multilingual site (ships less JS by default), but less familiar than Next.js and would mean less reuse of existing Vercel/Next experience. Worth keeping in mind only if the site stays fully static long-term.
- _Plain Vite + React_ — lighter weight, but would require bolting on routing, i18n, and any future backend manually. Next.js gives that structure out of the box.

Given the existing Vercel/Next.js familiarity and the likely need for some backend logic later (events updates, contact/forms, maybe future online ordering), **Next.js is a solid choice** — no need to switch.

## Styling: Tailwind CSS

**Decision:** Tailwind CSS (Tailwind Plus/UI subscription already owned), paired with Next.js.

**Reasoning:**

- Already have a paid Tailwind Plus subscription — access to prebuilt components/templates speeds up building out pages.
- Pairs natively with Next.js, no extra setup friction.

## Package Manager: pnpm

**Decision:** pnpm.

## Project Initialized

Scaffolded with `create-next-app` (latest): TypeScript, Tailwind CSS, ESLint, App Router, `src/` directory, `@/*` import alias — then switched from npm to pnpm.

## Formatter: Prettier

**Decision:** Prettier, with `prettier-plugin-tailwindcss` for automatic Tailwind class sorting.

**Reasoning:**

- De facto standard for Next.js/Tailwind projects, minimal config needed.
- First-party Tailwind class-sorting plugin keeps class lists consistent without manual effort.
- Chose over Biome — Biome is faster and combines linting+formatting, but its Tailwind/Next ecosystem support is younger; not worth the tradeoff at this project's scale.

Config: `.prettierrc.json`, `.prettierignore`. Scripts: `pnpm format` (write), `pnpm format:check` (CI-style check).

## To Be Decided

- i18n library/approach for German, Spanish, English
- CMS or content-management approach for menu items, events, and daily availability updates
- Hosting/domain setup details
- Image/gallery handling (static assets vs. CMS vs. Instagram embed)
