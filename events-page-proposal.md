# Events Page — Three Proposals

Working doc for the `/events` page, currently a "coming soon" placeholder. Mirrors `about-us-proposal.md`'s approach: real facts first, then a few genuinely different layout directions to compare live rather than pick from a mockup.

## What the research actually showed

- **`images/wall-sign-upcoming-event.jpeg`** (the café's own handwritten chalkboard) lists three real events, each circled by date: `9.9 (Mi) 12–18hs Coffee cupping + surprise origin`, `20.9 (So) 10–13hs Barista course`, `25.9 (Fr) 17–22hs Día de Santa Cruz + spring party`. Sept 9 has already passed relative to today (2026-09-14), so it's a pattern reference, not something to list as upcoming.
- **The barista course registration page** ([caraya-coffee.com/baristakurs-level-0-119.html](https://www.caraya-coffee.com/baristakurs-level-0-119.html)) confirms this is a real, externally-hosted sign-up: Level 0–1 beginner workshop, 3 hours, small groups of 4–6, hosted at Boliviana itself, next dates Sept 20 / Oct 18 / Nov 15, 2026 — i.e. it recurs monthly, not a one-off.
- `project-scope.md`'s existing "Upcoming Events" section already anticipates this: events are "currently handwritten on the café window/chalkboard" and should be "easy for the team to update as new events come up" — same team-editable-data-file bar as `announcement.json` and `hours.ts`.

That last point matters structurally: **the banner (`src/data/announcement.json`) and this page would otherwise maintain two separate event lists that can drift out of sync.** See "Data model" below before any of the three proposals gets implemented.

## Data model (shared across all three proposals)

Regardless of which layout wins, every event needs the same fields — this isn't a proposal choice, it's the foundation the three layouts render:

```ts
interface CafeEvent {
  id: string;
  date: string; // YYYY-MM-DD, Europe/Berlin
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  title: Record<Locale, string>;
  description: Record<Locale, string>; // required on every event, per your ask
  registrationRequired: boolean;
  registrationUrl?: string; // only meaningful when registrationRequired is true
}
```

Three registration states this needs to render clearly and differently, in every proposal:

1. **Has a real registration link** — e.g. the barista course. Shows as a solid, clickable "Register →" CTA to the external page.
2. **Registration required, no link yet** — e.g. an in-house coffee/wine tasting before it has its own sign-up page or form. Shows as a non-clickable "Registration required" note rather than a dead or fabricated link — building a real on-page registration form (collecting names/emails) is a separate, bigger feature (GDPR consent, storage, who receives submissions) and out of scope here; flagged in "Open items" below.
3. **No registration needed** — e.g. Día de Santa Cruz + Spring Party, or a Bolivia independence anniversary celebration. Shown de-emphasized (plain text, not a button) since it's the "just show up" default.

### Sample content used to mock up all three proposals below

Grounded in what's confirmed real; the two marked TBD are placeholders for illustration, not commitments:

| Event                                                                     | Date       | Time        | Registration                                                                                                           | Description                                                                                                                                         |
| ------------------------------------------------------------------------- | ---------- | ----------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Barista Course                                                            | 2026-09-20 | 10:00–13:00 | **Link**: [caraya-coffee.com/baristakurs-level-0-119.html](https://www.caraya-coffee.com/baristakurs-level-0-119.html) | Level 0–1 beginner workshop — espresso basics, milk steaming, and machine care in small groups of 4–6, hosted right here at Boliviana.              |
| Día de Santa Cruz + Spring Party                                          | 2026-09-25 | 17:00–22:00 | **None**                                                                                                               | Celebrating Santa Cruz's founding day with live music and a special Bolivian dish: sonso, baked cassava and cheese from Bolivia's eastern lowlands. |
| Wine Tasting: High-Altitude Reds _(illustrative — not a confirmed date)_  | TBD        | TBD         | **Required, no link yet**                                                                                              | A guided tasting of MiskiSimi's Andean reds with notes on how altitude shapes the wine.                                                             |
| Bolivia Independence Day _(illustrative — date to confirm with the café)_ | TBD        | TBD         | **None**                                                                                                               | A café-wide celebration of Bolivia's independence — expect Bolivian music and a festive menu.                                                       |

---

## Proposal 1 — "Chalkboard List" (literal, text-forward)

### Display

A single vertical list, ordered chronologically, closely mirroring the physical chalkboard's own format: a circled date badge on the left (hand-drawn-feeling, echoing the real "20.9" circles), then time · title · description on the right, with the registration CTA or "no registration needed" note below the description.

### Styling

- Date badge: a small circle (`rounded-control` already gives us the soft-corner language, but a true circle here — `rounded-full` — matches the chalkboard's actual hand-drawn ovals) in `font-script`, e.g. "20" over "SEP" stacked, outlined in `boliviana-navy`.
- Plain cream background throughout, divided by thin `border-boliviana-navy/10` rules between entries (same divider language as `AboutBrands`' current chapter rows) — deliberately restrained, since the chalkboard itself is monochrome chalk-on-glass.
- Registration CTA: solid pink button when a link exists; small navy/60 text ("Registration required — ask at the counter") when required but linkless; nothing but the description when not needed.

**Feel:** the closest digital translation of the actual window sign. Lowest visual risk, fastest to build, but the least visually distinctive of the three — closest in spirit to the About page's "chapters" direction.

**Status: current pick, live on `/events`.** Also folded in the "Data model" consolidation above: `src/data/events.json` is now the single source of truth for both the events page (`src/lib/events.ts`) and the announcement banner (`src/lib/announcement.ts` now reads `upcomingEvents()` from it instead of keeping its own copy). Real content: the two confirmed events from the table above (barista course, Día de Santa Cruz + Spring Party) — the two TBD/illustrative rows were not added as real data.

---

## Proposal 2 — "Month Card Grid" (calendar-tile cards)

### Display

A responsive grid of self-contained event cards (`sm:grid-cols-2` or `-3` depending on count), each a calendar-tile: a bold two-line date block (month abbreviation over day number, like a torn calendar page) at the top, then title, time range, description, and CTA — same card language as the About page's Proposal C (white card, soft shadow, `rounded-control`), so the pattern feels reused rather than invented twice.

### Styling

- Date tile uses a brand-neutral navy/cream treatment (not per-brand colors like About's cards, since events aren't owned by one brand) — big `font-sans` bold day number, small uppercase month.
- Registration state as a small pill in the card's footer: solid pink "Register →" button, outlined "Registration required" pill, or a plain cream "No registration needed" tag — three consistently-styled but visually distinct footer states.
- Optional icon per event type (coffee cup for cuppings/barista courses, a wine glass for tastings, a star for cultural celebrations) reusing the icon language already established on the About page (Heroicons outline).

**Feel:** browsing a small stack of event flyers pinned to a board — the most visually rich and "ready to be shared as an Instagram-friendly grid" of the three.

---

## Proposal 3 — "Vertical Timeline" (chronological rail)

### Display

A single vertical line running down the page (a `border-l` rail), with a dot marker at each event's date, connected to a content block to its right: date/time, title, description, registration CTA. Emphasizes "what's coming up next" as a narrative flow rather than a flat list or grid — the most explicitly "upcoming" framing of the three.

### Styling

- Rail in `boliviana-navy/20`, dot markers filled solid in `boliviana-pink` for the soonest event and outlined for the rest, drawing the eye to what's happening next (subtly reusing the same "closest thing wins" logic already built into the announcement banner's `getActiveAnnouncement`).
- Registration CTA sits inline next to the title rather than at the bottom of a block, since blocks here are more compact and left-aligned.
- Past events (if ever shown, e.g. an "our events so far" archive) would naturally fade to a muted gray further down the rail — a extensibility path this layout offers more naturally than 1 or 2.

**Feel:** a calendar sidebar or "what's on" ticker — good at conveying momentum and recency, slightly more custom CSS than the other two (the connecting rail), but no new dependencies needed.

---

## Recommendation

Originally leaned Proposal 2 (Month Card Grid) for scanability, but **Proposal 1 was the one requested and built.** It reuses a pattern the site already has (About's chapter rows) rather than introducing a new visual system, and is the lowest-risk translation of the real chalkboard. Proposals 2 and 3 remain documented above as real alternatives if the list ever feels too plain once there are more events on it — 2 in particular is worth a second look once the event count grows past a handful.

## Open items before implementation

- ~~**Consolidate with the announcement banner's data.**~~ **Done** as part of implementing Proposal 1: `src/data/events.json` is now the single source of truth (the richer schema above), and `src/lib/announcement.ts`'s `getActiveAnnouncement()` reads the soonest one from `src/lib/events.ts`'s `upcomingEvents()` instead of keeping its own copy.
- **Registration forms (state 2 above) are a separate feature**, not a styling choice: collecting a name/email on our own site means picking somewhere to store it, deciding who gets notified, and a GDPR-compliant consent flow (see `CLAUDE.md`'s GDPR workflow rule). Until that's designed, in-house events either point to an externally-hosted sign-up (like Caraya's own barista course page) or just say "ask at the counter."
- **Confirm real dates** for the Bolivia independence anniversary and the wine-tasting example above before they go live — both are placeholders used only to demonstrate the "no registration" and "registration required, no link yet" states.
- Icon choice per event type (Proposal 2) needs a small icon-per-category convention decided (coffee cupping vs. barista course vs. cultural event vs. wine tasting) — not blocking, but worth a quick decision alongside implementation.
