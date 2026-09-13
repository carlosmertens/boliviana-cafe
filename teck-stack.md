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

**Remembering a visitor's language choice:**

- First-time visitors (no cookie yet) always get German — we deliberately ignore the browser's `Accept-Language` header rather than guess, since this is a specific Berlin café, not a general audience site. Set via `localeDetection: false` in `routing.ts`.
- Once a visitor picks a language via the switcher, next-intl automatically writes a `NEXT_LOCALE` cookie (no custom code needed for this part — it's built in and independent of the `localeDetection` flag). `src/proxy.ts` reads that cookie on later unprefixed visits (e.g. `/`) and redirects there instead of to the default locale.
- Chose a cookie over `localStorage` for two reasons: (1) cookies are readable during server-side routing, before any page renders, so the right language shows immediately with no flash — `localStorage` can only be read after client JS runs, causing a visible flicker to the wrong language first; (2) GDPR — a language-preference cookie holding no personal data, used only to serve the site in the visitor's own chosen language, falls under the "strictly necessary" exemption in ePrivacy Directive Art. 5(3), so it doesn't need a consent banner (unlike analytics/ad cookies, which would if added later).
- Verified via `curl` with different `Accept-Language`/`Cookie` headers: fresh visitor → always `/de`; visitor with `NEXT_LOCALE=en` → redirected to `/en` (path preserved, e.g. `/en/about`); visiting `/en` directly sets the cookie via `Set-Cookie`.

## Accessibility & SEO

**Decision:** Treat these as first-class requirements, not an afterthought — baked into shared components/layout rather than bolted on per-page.

**What's in place:**

- **Skip-to-content link** — visually hidden, appears on first `Tab` press, jumps keyboard users past the nav to `<main id="main-content">`.
- **`aria-current="page"`** on the active nav link (desktop and mobile), so screen readers get the "current page" signal, not just a visual underline.
- **One consistent focus ring color** (pink) across every interactive element — see the rule documented in `globals.css`.
- **Contrast-checked palette usage**: text on top of a brand color is picked to clear WCAG AA (4.5:1 for normal text, 3:1 for large text/non-text UI) — e.g. muted nav-link text uses `navy/70` not `navy/60` (4.36:1, a hair under AA), hero body text is full-opacity white on pink (4.51:1) rather than a translucent cream. Re-check contrast whenever a new color/opacity combo is introduced, don't assume a brand color "just works" as text.
- **Per-page metadata** (`src/lib/seo.ts` → `buildMetadata`): every route sets its own `<title>`/description instead of inheriting one generic layout title — duplicate titles across pages hurts SEO.
- **`hreflang` alternates + canonical URL** on every page, for all 3 locales — without this Google can treat `/de`, `/en`, `/es` as duplicate content instead of translations of each other.
- **OpenGraph + Twitter card metadata** per page (for link previews when shared).
- **`sitemap.xml` / `robots.txt`** (`src/app/sitemap.ts`, `src/app/robots.ts`) — auto-generated from the same locale/route list.
- **JSON-LD structured data** (`CafeOrCoffeeShop`, `src/components/CafeJsonLd.tsx`) — only real facts (name, address); never invent phone numbers/hours we don't have yet.
- **`NEXT_PUBLIC_SITE_URL`** env var (`src/lib/site.ts`) drives metadataBase/canonical/sitemap URLs — set this in Vercel once there's a real domain, defaults to `http://localhost:3000` for local dev.

**Deliberately NOT done:** making static text (headings, paragraphs) keyboard-focusable — only interactive elements (links, buttons, form controls) should ever receive focus; adding `tabindex` to plain text is an anti-pattern that makes keyboard navigation worse, not more accessible.

**Still to do:** `alt` text policy once real photos exist for menu/gallery; re-run a contrast check if the color palette changes; Lighthouse/axe pass once there's more real content to test against.

## To Be Decided

- CMS or content-management approach for menu items, events, and daily availability updates
- Hosting/domain setup details
- Image/gallery handling (static assets vs. CMS vs. Instagram embed)
