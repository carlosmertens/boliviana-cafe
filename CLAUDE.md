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
- **Prefer rebase over merge for PRs.** This is a solo-developer project — there's no other branch history to preserve, so keep `main` a clean, linear history via rebase (`gh pr merge --rebase`) rather than a merge commit, whenever the PR can rebase cleanly. Only fall back to a merge commit if there's a real conflict that makes a clean rebase impractical. Don't proactively offer to merge a PR at all — that's the user's call; when asked to merge, use rebase by default.
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

**Non-home page background:** every page except the homepage (`/`, which keeps its own bold `bg-boliviana-pink` hero) uses a shared "curvy swoop" convention on its `<main>`: `rounded-t-[3rem] sm:rounded-t-[4rem]` plus the `.hero-tint` utility class (`globals.css`) — two layered diagonal gradients (navy top-left → pink bottom-right, and pink top-right → navy bottom-left), each faded to transparent at its own midpoint rather than mixed into opaque cream. Layering them this way (as separate `background-image` gradients over a `background-color: cream` base) gives all four corners their own tint with a clear, untinted cream cross through the middle — mixing the two into opaque colors and averaging them mathematically instead would just collapse into a single left-to-right blend, which isn't what was wanted. Spans the element's full percentage-based width/height (not a fixed-height band), so it always reaches edge-to-edge regardless of page length. A soft `shadow-[0_12px_30px_-18px_rgba(28,21,82,0.3)]` on the same element is what actually makes the rounded top corner visible against the header above it — the gradient alone is too subtle at that boundary to read as a curve. See `PlaceholderMain.tsx` (Menu/Gallery/Contact), `EventsList.tsx`, and `AboutBrands.tsx` for usage.

**Project rule:** every interactive element's keyboard-focus ring uses `focus-visible:outline-boliviana-pink`, everywhere — this is documented in a comment in `globals.css`. Exception: `SelectMenu`'s internal option-hover/selected highlight uses purple instead of pink (contrast reasons against pink backgrounds), the footer's focus rings use white (pink fails contrast against the footer's purple/navy background), and `AnnouncementBanner`'s dismiss button uses purple (pink-on-yellow only measures ~3.3:1 against WCAG's 3:1 non-text minimum, purple measures ~7.3:1). Any new interactive component should default to the pink rule unless there's a documented contrast reason not to — check contrast against the actual background before deviating.

### Reusable UI (`src/components/ui/`)

`SelectMenu.tsx` is a generic Headless UI Listbox wrapper (used by `LocaleSwitcher` and meant for other dropdown needs) — supports an optional per-option `avatar` image and a generic leading `icon`. Extend this component for new dropdowns rather than building one-off listboxes.

### SEO/structured data

`src/lib/site.ts` holds real business facts (address, phone, Google Maps URL) sourced from the café's actual Google Business listing — don't invent or guess data here (e.g. no fabricated opening hours/phone). `src/lib/hours.ts` holds the real weekly schedule as data (`weeklyHours`) plus `groupedHours()` (merges consecutive same-status days into ranges for display) and `isOpenNow()` (Europe/Berlin timezone) — both `OpeningHoursAccordion` and `CafeJsonLd`'s `openingHoursSpecification` derive from this same source of truth. `src/app/sitemap.ts` and `src/app/robots.ts` enumerate the same locale × route list — keep them in sync if routes are added/removed.

### About page (partner brands)

`src/lib/brands.ts` holds the three partner brands (`partnerBrands`) as real facts: display order (food → coffee → wine, matching the physical space), which design-token color each brand's accent uses, and each brand's real external Instagram/website URLs — except Die Seele Boliviens, which has no `external` entry since its own Google/Instagram accounts were transferred to Boliviana itself (see `project-scope.md`'s "Brand Accounts" section), so its About-page chapter links to the site's own `/menu` instead. `src/components/AboutBrands.tsx` renders the shared intro plus a compact "chapter" row per brand (icon, script name underlined in that brand's color, one-line blurb, one link), bracketed by the `.textile-stripe` utility (`globals.css`) as a short accent rather than a full divider; the actual copy (chapterLabel/name/blurb/cta) lives in `messages/{de,en,es}.json` under `about.brands.<id>`. See `about-us-proposal.md` for the design rationale — this is "Proposal B," picked after building and comparing two other full-page directions (A: full-bleed color sections per brand; C: a card grid), both still described in that doc if revisited.

### Events (shared between the /events page and the announcement banner)

`src/data/events.json` (`{ events: CafeEvent[] }`) is the single editable source of truth for every café event — real facts (date/time/title/description/registration), not page copy, so it lives outside `messages/*.json` like `hours.ts`/`site.ts` do. `src/lib/events.ts` has the shared logic: `upcomingEvents()` returns events that haven't reached their `endTime` yet (Europe/Berlin), soonest first. Both consumers read from here rather than keeping their own copy: `src/components/EventsList.tsx` (the `/events` page) lists all of them; `src/components/AnnouncementBanner.tsx`, via `src/lib/announcement.ts`'s `getActiveAnnouncement()`, shows only the single soonest one. Each event needs `registrationRequired: boolean` and an optional `registrationUrl` — omit the URL when registration is required but there's no sign-up page yet (shows a plain "ask at the counter" note instead of a dead or fabricated link); a real on-page registration form is a separate, not-yet-built feature (GDPR consent + storage, see the GDPR workflow rule above). Set an event's `dismissible: false` to keep it from being closed in the banner. See `events-page-proposal.md` for the layout rationale — this is "Proposal 1"; two other directions are documented there if revisited.

### Announcement banner

`src/data/announcement.json` now holds only the banner's non-event state: `enabled` is the master on/off switch, and `info` is a fallback general notice (with its own optional `dateLabel`/`kind`/`dismissible`) shown only when no event is currently upcoming. `src/lib/announcement.ts`'s `getActiveAnnouncement()` prefers the soonest upcoming event (see above) and falls back to `info`. The banner hides itself automatically once `enabled` is false and there's no event and no `info` — no code change needed to "turn it off," just edit the JSON. Dismissing the banner is remembered per-`id` in `localStorage`, so a new event/info `id` automatically reappears for visitors who dismissed the previous one.

### Accessibility

Skip-to-content link, `aria-current="page"` on active nav links, and the sitewide focus-ring rule above are established conventions — see `teck-stack.md`'s "Accessibility & SEO" section for the full rationale and what's intentionally _not_ done (e.g. static text is never made keyboard-focusable).
