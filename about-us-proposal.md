# About Us Page — Two Proposals

Working doc for the `/about` page redesign. Supersedes the "About Us" bullets in `project-scope.md` where they conflict — treat this as the more current thinking. Research behind this: all 9 brochure/signage photos in `images/`, each brand's live website, and each brand's public Instagram bio + grid (Caraya Coffee, MiskiSimi, and the `@die_seele_boliviens` account, which — confirming what's already in `project-scope.md` — is now branded "BOLIVIANA" with the jaguar mascot as its avatar).

## What the research actually showed

The three brands are visually and tonally **more different from each other than the current site suggests**. Each has its own fully-formed identity, and they only unify at the "Boliviana" umbrella level:

|                   | Die Seele Boliviens (pastries)                                                                                                                                                                    | Caraya Coffee                                                                                                                                                      | MiskiSimi (wine & spirits)                                                                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Brochure palette  | Hot pink / magenta bg, cream + navy text                                                                                                                                                          | Navy blue bg, orange accents, cream                                                                                                                                | Deep purple bg, gold/yellow accents                                                                                                                             |
| Brochure mood     | Playful, hand-drawn stars, bold flat illustration                                                                                                                                                 | Andean village at dusk, sun/moon motif, illustrated                                                                                                                | Botanical line art (leaves), elegant, wine-label feel                                                                                                           |
| Real Instagram    | Now merged into `@die_seele_boliviens` = "BOLIVIANA" account, jaguar avatar, candid café photos + hand-lettered promo graphics                                                                    | `@caraya_coffee`, candid founder/farm photography, warm and personal ("Come by and sip @die_seele_boliviens" in their own bio)                                     | `@miskisimi_imports`, dark editorial infographic carousels (sky-gradient, bold sans headlines, maps) — noticeably more "premium import brand," less illustrated |
| Real website tone | [dieseeleboliviens.com](https://dieseeleboliviens.com/about-us/) — founder-driven ("founded by Ann and Sergio"), site itself is mid-rebuild (matches the "under renovation" note already on file) | [caraya-coffee.com](https://www.caraya-coffee.com/?language=en) — direct-trade story, founder Ann-Kathrin, "from farm to cup," produced in small batches in Berlin | [miskisimi.com](https://miskisimi.com/en) — editorial/curator tone, press logos (Condé Nast, Forbes, NYT), high-altitude terroir story                          |

Two things fell out of this that matter for the page:

1. **The shared thread is real, not just marketing copy.** All three sit at 1,600–3,000m altitude sourcing, all three trade directly with Bolivian producers/family wineries, and Caraya's own Instagram bio already points people to the pastry counter. "One roof, three direct-trade stories" is an honest hook, not a stretch.
2. **The brands don't want to look identical.** Flattening them into one shared visual language on `/about` would undersell what's actually distinctive about each (Caraya's warmth, MiskiSimi's polish, Die Seele Boliviens' playfulness).

That tension is exactly what the two proposals below resolve differently.

---

## Proposal A — "Three Rooms Under One Roof" (separate & bold)

### Display / separation

One shared intro block (the Boliviana story — why three brands, one café, the "one bite, one sip, one story" line), followed by **three full-width, visually distinct sections**, one per brand, in a fixed order that mirrors the brochures and the physical space (food → coffee → wine, i.e. Die Seele Boliviens → Caraya → MiskiSimi). Each section is self-contained:

- Brand name + a one-line role ("Handmade Bolivian pastries," "Bolivian specialty coffee," "Bolivian wine & spirits")
- A short story paragraph (sourced from the real About-page content above, not invented)
- 2–3 concrete authenticity details (direct-trade, altitude, family-run, etc.)
- A "Visit @handle" / external site link, exactly like the brochure's closer page already does

This is the same content shape `project-scope.md` already sketches ("Short story for each partner... each with a 'learn more' link") — the difference here is fully committing to each brand keeping **its own established color identity from the physical brochures**, not a shared neutral treatment.

### Styling

- Each section's background switches to that brand's actual brochure color: Die Seele Boliviens = `boliviana-pink`, Caraya = `boliviana-navy` (new use of an existing token as a section bg, not just text), MiskiSimi = `boliviana-purple`. Text flips to cream/white per section for contrast, same way the homepage hero already does on pink.
- Reuse the brochures' own graphic motifs as small decorative SVG accents per section — the star burst for Die Seele Boliviens, a sun/hill silhouette for Caraya, a thin leaf/botanical line for MiskiSimi — echoing what's already printed and on the wall, not inventing a new motif.
- Section transitions use the Andean textile stripe (visible in `table-sign-self-service.jpeg`) as a thin divider band between sections, tying back to the real fabric in the café.
- Headings in `font-script` (Caveat) for each brand name, matching the hand-lettered promo style seen on the live Instagram (`September Combo` post) and the homepage tagline.

**Feel:** walking through three distinct market stalls that happen to share a doorway. Bigger visual swing, most faithful to the physical brochures and current brand equity.

**Status: built twice, then set aside again in favor of B.** A real, working option if B ever reads as too plain once more of the site is filled in. Ask Claude to rebuild `src/components/AboutBrands.tsx` in this shape (full-bleed sections, `about.brands.<id>.points`) if it's wanted again.

---

## Proposal B — "One Café, Three Chapters" (unified & editorial)

### Display / separation

No hard color-block separation. Instead, the three brands are told as **three short chapters in one continuous narrative scroll**, framed around the tagline itself: "One bite" (Die Seele Boliviens) → "One sip" (Caraya) → "One story" (MiskiSimi, since wine/Singani is the toast-and-tell-stories part of the visit) — reinforcing a phrase that's already on the wall, on the brochure, and in `messages/*.json`, instead of introducing new section labels.

Each chapter is a compact row (icon + brand name + 1–2 sentences + link), not a full-bleed section — visually lighter-weight, closer to how the brands already talk about each other organically (Caraya's own bio promoting the pastry counter). Ends with a single combined CTA: follow all three / visit the café.

### Styling

- Stays inside the site's existing cream/pink/navy token set throughout — no new brand-colored backgrounds. Each brand gets a small accent (an icon tinted in its brochure color, or a colored underline under its name) rather than owning a full section.
- Leans on **real photography** instead of illustration: the candid founder/café photos already public on Instagram (with permission) rather than reproducing brochure illustrations, giving the page a warmer, "come visit us" feel versus a "read our menu" feel.
- Uses the aguayo textile stripe once, as a single unifying background thread running behind all three chapters (rather than as a divider between them) — visually saying "one fabric, three threads" instead of "three separate rooms."

**Feel:** an editorial magazine spread about one café that happens to be three people's work. Lower visual risk, easier to keep consistent with the rest of the site's current restrained styling, but spends less of the brochures' existing visual equity.

**Status: current pick, live on `/about`.** Built, dropped once for A, then brought back after A read as too big a visual swing for a first launch. Real content: `src/lib/brands.ts` (facts + external links) and `src/components/AboutBrands.tsx` (rendering, compact chapter rows bracketed by short `.textile-stripe` accents), copy under `about.brands.<id>` in `messages/*.json` (`chapterLabel`/`name`/`blurb`/`cta`).

---

## Proposal C — "One Table, Three Crafts" (card grid)

### Display / separation

A middle path between A's full-bleed panels and B's plain rows: one shared intro, then a **grid of three brand cards** on the page's normal cream background (`sm:grid-cols-3`, stacking to one column on mobile) — closer to a menu-card or product-card layout than either a "microsite per brand" (A) or a "text list" (B). Each card is a self-contained unit: a colored icon badge, brand name (script), role, a short story sentence, three tag pills, and a solid CTA button.

### Styling

- Cards sit on plain white (`bg-white`) against the page's cream background, with a soft shadow (`shadow-md`) — visual separation comes from the card boundary itself, not a full-color background.
- Each brand keeps its own accent color, but **contained**, not full-bleed: a rounded square icon badge in solid brand color (star/sun/moon, same icon set as A), tag pills in a tinted 10%-opacity version of the brand color, and a solid-color CTA button. This is a deliberately smaller "dose" of each brand's color than Proposal A, while still being more colorful than B's plain underlined text.
- Tags are short and punchy ("Handmade daily," "Direct trade," "High altitude") rather than full sentences — closer to how the physical brochures show quick facts (allergen icons, one-line callouts) than a paragraph.
- No textile-stripe motif here; the card grid itself (three equal tiles, side by side) is the structural echo of "three crafts, one table," so a decorative divider felt redundant.

**Feel:** browsing a small stand of three product cards at a market table — approachable and a little playful, without either fully theming a whole page section per brand or flattening everything to plain text.

**Status: built, then set aside in favor of A** — a real, working alternative if A ever reads as too visually loud for the rest of the site. Code was replaced, not deleted from history; ask Claude to rebuild `src/components/AboutBrands.tsx` in this shape (card grid, `about.brands.<id>.tags`) if it's wanted again.

---

## Recommendation

All three have now been built and compared live rather than picked from mockups alone. **B is the current live choice** — the calmer, safer direction after trying A's full commitment to each brand's own color identity and finding it too big a swing for a first launch. A and C remain documented above as real, working alternatives (not just sketches) if B ever reads as too plain once more of the site is filled in — C in particular is worth revisiting since its card format could later extend to menu items or gallery entries.

## Open items before implementation

- Confirm which real photos we have usage rights to (own café photos vs. reposting from each brand's Instagram) if Proposal B is chosen.
- The current brochure scans in `images/` are print-resolution marketing assets (menu pricing, etc.) — not directly embeddable; whichever proposal is chosen, we'd need to extract clean web assets from them (same approach as the jaguar favicon), not use the scans as-is.
- Real founder names (Ann & Sergio; Ann-Kathrin) surfaced above are sourced from each brand's own public website — confirm with the café before publishing personal names on the site.
