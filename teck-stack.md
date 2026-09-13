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

## i18n: next-intl

**Decision:** [`next-intl`](https://next-intl.dev), with locale-prefixed routing (`/de`, `/en`, `/es`) and one JSON message file per locale.

**Reasoning:**

- Translations render server-side (SSR/static) — no flash of untranslated content, good for SEO on a local-search-dependent café site.
- Type-safe translation keys, official Next.js App Router support, actively maintained.
- Editing text just means editing a JSON file per language (`messages/de.json`, `messages/en.json`, `messages/es.json`) — no touching component code for copy changes. Fine to keep this git-based for now; can swap the message source for a CMS later (e.g. Sanity) without changing the routing/rendering setup.

**How it's wired:**

- `src/i18n/routing.ts` — defines locales (`de`, `en`, `es`) and default locale (`de`).
- `src/i18n/navigation.ts` — locale-aware `Link`/`useRouter`/`usePathname`.
- `src/i18n/request.ts` — resolves messages per request; registered in `next.config.ts` via `createNextIntlPlugin`.
- `src/proxy.ts` — locale detection/redirect (Next.js 16 renamed `middleware.ts` → `proxy.ts`; functionally the same).
- All routes live under `src/app/[locale]/`.
- `messages/{de,en,es}.json` — the actual text content, organized by page/section namespace.

Note: this Next.js version (16) deprecated `middleware.js` in favor of `proxy.js` — same behavior, new file name/export. Worth remembering since most i18n tutorials online still reference the old convention.

## To Be Decided

- CMS or content-management approach for menu items, events, and daily availability updates
- Hosting/domain setup details
- Image/gallery handling (static assets vs. CMS vs. Instagram embed)
