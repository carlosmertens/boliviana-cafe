# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Website for Boliviana, a café in Berlin uniting three Bolivian brands (Die Seele Boliviens — pastries, Caraya Coffee, Miskisimi — wines) under one roof. See `project-scope.md` for content/scope and `teck-stack.md` for tech stack decisions and their reasoning — both are living docs, check them before making stack- or content-level changes.

## Commands

This project uses **pnpm**, not npm/yarn.

```bash
pnpm dev            # dev server
pnpm build          # production build
pnpm start          # run the production build
pnpm lint           # eslint
pnpm format         # prettier --write .
pnpm format:check   # prettier --check . (no writes)
```

There is no test suite configured yet. When verifying UI changes, run `pnpm build` (catches type errors) and check visually in a browser — see the `run` skill.

## Workflow rules

- **Never commit.** After implementing a change, stop and hand it back for review — do not run `git commit` (or `git push`) unless the user explicitly asks for that specific commit in that message. This holds even if a prior message in the same session approved a commit; approval doesn't carry over to later changes.
- **Always work on a branch, never directly on `main`.** Before starting a task that will change files, create a feature branch if not already on one. PRs are opened from that branch, never from `main`.
- **Branch naming: `week-{ISO week number}/development-{n}`** (e.g. `week-38/development-1`). `{n}` starts at `1` for the first branch created that ISO week and increments by one each time a new branch is created that same week — so if a PR is opened/merged mid-week and another branch is needed that same week, it becomes `development-2`, and so on. Check existing local/remote branches for the current week (`git branch -a`) to find the next `n` rather than assuming `1`.
- **UI changes need visual sign-off before proceeding further.** After implementing a UI/visual change, stop and let the user look at it (dev server / screenshot / browser) before continuing to the next step, opening a PR, or making follow-on changes — don't chain multiple UI changes together without a checkpoint in between.
- **Accessibility and SEO are first-class, not afterthoughts.** Every UI/content change should be checked against the conventions in the Accessibility and SEO/structured data sections below (focus rings, `aria-current`, semantic HTML, alt text, metadata/hreflang, structured data) — don't ship a change that regresses either.
- **GDPR matters — this is a business operating in Germany.** Be deliberate about anything touching personal data, cookies, analytics/tracking scripts, third-party embeds (e.g. maps, fonts, forms), or contact/newsletter forms: prefer no tracking/cookies unless explicitly required, flag to the user before adding any third-party script or embed that sets cookies or contacts an external server, and never add analytics, marketing pixels, or data collection without the user's explicit go-ahead and a plan for consent (cookie banner, privacy policy update, etc.).

## Architecture

**Stack:** Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, next-intl for i18n, Headless UI + Heroicons for interactive components. Deployed on Vercel.

### Next.js 16 caveat

This Next.js version has breaking changes from training-data-era Next.js — notably `middleware.ts` is deprecated in favor of `proxy.ts` (this repo uses `src/proxy.ts`, same behavior). Consult `node_modules/next/dist/docs/` before assuming an API works the way you remember. See `AGENTS.md` (auto-managed by `next dev` — don't hand-edit its content).

### i18n (next-intl) — read this before touching routing or adding a page

- All real pages live under `src/app/[locale]/`; there is no locale-agnostic page — `src/proxy.ts` handles redirecting `/` to a locale.
- Locales: `de` (default), `en`, `es`, configured in `src/i18n/routing.ts`. Use the locale-aware `Link`/`useRouter`/`usePathname` from `src/i18n/navigation.ts` — never `next/link` or `next/navigation` directly inside locale-aware UI.
- Content lives in `messages/{de,en,es}.json`, one namespace per page/section (matches page/component names, e.g. `about`, `menu`, `hours`, `common`). Editing copy = editing these JSON files, not component code.
- **Locale persistence:** first-time visitors always get `de` — `localeDetection: false` in `routing.ts` deliberately disables Accept-Language sniffing. Returning visitors are remembered via the `NEXT_LOCALE` cookie, read manually in `src/proxy.ts` (next-intl writes this cookie automatically on locale switch; the manual read is needed because `localeDetection: false` also disables next-intl's own cookie read). Don't "simplify" this by removing the manual cookie check — it's what makes the default work.
- Each page exports its own `generateMetadata` via `buildMetadata()` (`src/lib/seo.ts`), which sets title/description/canonical/hreflang for all three locales and OpenGraph/Twitter tags. Every new page needs a corresponding message namespace with `title` + a description key, and a `generateMetadata` export — see any existing page (e.g. `src/app/[locale]/about/page.tsx`) as the template.
- Weekday names (in `OpeningHoursAccordion`) are derived from a reference Monday date via next-intl's formatter rather than hardcoded per-locale day-name strings — reuse that pattern rather than adding translation keys for day names.

### Design tokens (`src/app/globals.css`)

Brand colors/fonts/radius are Tailwind v4 `@theme` tokens (`--color-boliviana-*`, `--font-sans`/`--font-script`, `--radius-control`) — sampled from the café's real brochures/signage, not arbitrary. Use these tokens (`bg-boliviana-pink`, `rounded-control`, etc.) rather than introducing new colors or radii.

**Project rule:** every interactive element's keyboard-focus ring uses `focus-visible:outline-boliviana-pink`, everywhere — this is documented in a comment in `globals.css`. Exception: `SelectMenu`'s internal option-hover/selected highlight uses purple instead of pink (contrast reasons against pink backgrounds), and the footer's focus rings use white (pink fails contrast against the footer's purple/navy background). Any new interactive component should default to the pink rule unless there's a documented contrast reason not to.

### Reusable UI (`src/components/ui/`)

`SelectMenu.tsx` is a generic Headless UI Listbox wrapper (used by `LocaleSwitcher` and meant for other dropdown needs) — supports an optional per-option `avatar` image and a generic leading `icon`. Extend this component for new dropdowns rather than building one-off listboxes.

### SEO/structured data

`src/lib/site.ts` holds real business facts (address, phone, Google Maps URL) sourced from the café's actual Google Business listing — don't invent or guess data here (e.g. no fabricated opening hours/phone). `src/lib/hours.ts` holds the real weekly schedule as data (`weeklyHours`) plus `groupedHours()` (merges consecutive same-status days into ranges for display) and `isOpenNow()` (Europe/Berlin timezone) — both `OpeningHoursAccordion` and `CafeJsonLd`'s `openingHoursSpecification` derive from this same source of truth. `src/app/sitemap.ts` and `src/app/robots.ts` enumerate the same locale × route list — keep them in sync if routes are added/removed.

### Accessibility

Skip-to-content link, `aria-current="page"` on active nav links, and the sitewide focus-ring rule above are established conventions — see `teck-stack.md`'s "Accessibility & SEO" section for the full rationale and what's intentionally _not_ done (e.g. static text is never made keyboard-focusable).
