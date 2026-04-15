# Personal Site — Roadmap

This is the full plan coming out of the Phase 1 review. Phase 1 is shipped on
`claude/review-personal-site-d1eeN`. The remaining phases are tracked as
GitHub issues under a parent tracking issue.

---

## Phase 1 — Safety net (shipped)

Small, low-risk bug fixes and correctness wins. All merged to
`claude/review-personal-site-d1eeN` in one commit.

- [x] Body font actually applies Plus Jakarta Sans (was silently Arial because
      `body { font-family: Arial }` in globals.css overrode the loaded font)
- [x] Mobile nav "Let's talk" link respects the current path (used to link to
      `#contact` with no prefix, breaking on `/now`, `/blog`, `/services`)
- [x] `CursorSpotlight` no longer hydration-mismatches on touch devices
      (touch detection moved into `useEffect`, plus `useReducedMotion` gate)
- [x] Homepage "Currently reading" fetches from Sanity via `nowQuery`, falling
      back to static data — was hardcoded to `lib/now-data.ts`
- [x] Real SEO metadata in `app/layout.tsx` — title template, description,
      OpenGraph, Twitter card, keywords, metadataBase
- [x] Resume PDF download button gated behind `RESUME_PDF_AVAILABLE` flag
      (avoids a 404 until `/public/resume.pdf` exists)
- [x] Removed unused `Zen_Loop` font import (saves ~20KB)
- [x] Removed empty third row in the skills marquee (was rendering 56px of
      blank space)
- [x] Sanity client warns in dev when the project ID isn't configured

---

## Phase 2 — Creative refresh (blue · brown · gray)

The "make it actually pop" pass. Visual identity shift and hero rewrite.
**Requires your sign-off on palette and copy before landing.**

### 2.1 — Replace violet tertiary with warm brown

Current palette uses blue (`#60a5fa` / `#2563eb`) paired with violet
(`#a78bfa` / `#7c3aed`) as tertiary — doesn't match the stated "blue / brown /
gray" direction. Proposed tokens:

```css
/* Dark */
--background:        #0c0d10  /* warm graphite, not flat black */
--foreground:        #e9e6df  /* warm off-white */
--accent:            #6aa1ff  /* slightly desaturated blue */
--accent-foreground: #0a1428
--tertiary:          #c08a5a  /* caramel / cognac — replaces violet */

/* Light */
--background:        #f6f1e8  /* paper cream, not pure white */
--foreground:        #1c1a17  /* warm near-black */
--accent:            #2a5fbf  /* denim blue */
--tertiary:          #8b5a2b  /* walnut */
```

Propagates to:

- `ScrollProgress` gradient (currently blue → violet)
- `CursorSpotlight` radial (currently blue → violet)
- Hero heading color (currently flat `#c8916a`)
- Any `var(--tertiary)` consumer

### 2.2 — Hero becomes a real gradient

Class is `.hero-word-gradient` but it's a flat color. Make it actually a
gradient with `background-clip: text`:

```css
background-image: linear-gradient(120deg, var(--accent) 0%, var(--tertiary) 100%);
-webkit-background-clip: text;
background-clip: text;
color: transparent;
```

Blue → caramel in one line. Looks distinctive against the paper/graphite
background.

### 2.3 — Hero copy rewrite

Current: "Crafting clear, modern digital experiences" — generic, sits on
every second portfolio on the web.

Candidates (pick one or mix):

- *"Designing, building, and quietly keeping things running."*
- *"Interfaces with taste. Systems that don't fall over."*
- *"I sweat the pixels and the logs."*
- *"Half designer, half engineer, fully responsible for the bug."*

Also unify role taxonomy between the badge ("UI/UX • Frontend • Software
Engineer") and About ("UX Engineer · Frontend Developer · Software Engineer")
— pick one.

### 2.4 — Hero word-stagger polish

- Fix trailing-margin bug: `mr-[0.25em]` on every word adds an extra gap after
  "clear," on `sm:inline` layout — drop margin on the last word per line
- `wordVariants` ignores `useReducedMotion()` — add `reduce`-aware fallback
  (`initial: { opacity: 1 }`)
- Swap `whileInView` → `initial="hidden" animate="show"` on the hero (it's
  above the fold; `whileInView` can fail on deep-linked hash jumps)

### 2.5 — Light-mode paper background

Replace pure white `#ffffff` with `#f6f1e8` (cream paper). Plays much better
with brown and reduces eye strain.

---

## Phase 3 — Performance & motion discipline

Animation is beautiful, but some parts are heavier than they need to be.

### 3.1 — `BackgroundDots` overhaul

140 `motion.div` elements with infinite keyframe animations plus a global
`pointermove` parallax spring. Fix:

- Cap dot count by viewport (`~40` mobile, `~80` tablet, `~140` desktop)
- Pause when `document.hidden` (battery)
- Option A: port to a single `<canvas>` with `requestAnimationFrame`
- Option B: keep DOM but use CSS `@keyframes` instead of framer-motion
  (animation runs off the main thread)
- Gate parallax on pointer fine (`(pointer: fine)`) — don't track touch

### 3.2 — `useReducedMotion` audit

Components missing the check:

- `Hero` (word stagger, fadeInUp)
- `CurrentlyReading` / `ReadingSection` (progress bar animation)
- `ListeningSection`, `PlayingSection` (stagger containers)
- `ScrollProgress` (spring)
- `TiltCard` (rotation)
- `Section` (fadeInUp on every section)

Add a shared `useGentleMotion()` helper that returns `reduce ? null : variants`.

### 3.3 — `MagneticButton` / `TiltCard` touch gate

Both attach `mousemove` listeners that fire `getBoundingClientRect()`. They're
dead code on touch. Detect pointer-fine in `useEffect` and early-return the
wrapper to a plain div.

### 3.4 — `overflow-x` cleanup

`html` has `overflow-x: clip` (correct) AND `body` has `overflow-x: hidden`
(redundant, can turn body into the scroll root). Drop the body one.

### 3.5 — `ScrollProgress` render budget

Currently subscribes to `scrollYProgress` and re-renders via framer-motion.
Wrap in `useTransform` so the spring drives `transform` directly, zero React
re-renders.

---

## Phase 4 — `/now` CMS polish

/now works end-to-end with Sanity + static fallback, but the CMS surface can
be tighter.

### 4.1 — Singleton enforcement

`nowQuery` does `*[_type == "siteNow"][0]` — anyone using Studio could create
N docs. Configure the `sanity.config.ts` structure to show Now as a single
document only (not a list).

### 4.2 — Stable keys for array items

React keys use `book.title` / `artist.name` / `game.title` which can collide.
Pull Sanity's `_key` into the GROQ query and key on that.

### 4.3 — Artist image / color schema field

`ARTIST_COLORS` is hardcoded to three names; any new artist shows the default
accent. Add an optional `image` (or `color` hex) field to the `artist` schema
and use it in `ListeningSection`.

### 4.4 — Draft mode / preview

`useCdn: true` is fine for production but blocks previewing unpublished
edits. Add Next.js draft mode handlers + a second Sanity client with
`useCdn: false` and `token` for editors.

### 4.5 — Updated-at ambient display

`updatedAt` is computed but only shown in the eyebrow. Show
"Updated 3 weeks ago" per section (e.g. `formatDistanceToNow`). Also: the
fallback hardcodes "March 2026" — drop the hardcode, omit the date when
absent.

---

## Phase 5 — Quirky / personality

Small, delightful details that make the site feel lived-in. None of these
are required; all are restrained-flavor.

### 5.1 — Time-aware greeting

Badge swaps based on visitor's local time: *"Good evening from Texas 🌙"* /
*"11:42pm CT"*. Pure client-side, no API.

### 5.2 — SVG signature draw-on-load

Replace the `clip-path: circle` reveal in `SignatureLogo` with an SVG
`stroke-dasharray` animation on an actual handwritten signature. Reads as
"this is a real person's site" instantly.

### 5.3 — Console easter egg

```js
console.log(
  "%chey 👋",
  "color:#6aa1ff;font:600 24px ui-sans-serif;"
);
console.log(
  "Poking around? Drop me a line: danny.amzq@gmail.com",
  "color:#c08a5a"
);
```

### 5.4 — Tab-blur title

When `visibilitychange` fires with hidden: `document.title = "👋 come back"`.
Restore on focus.

### 5.5 — Keyboard shortcuts

- `?` opens a tiny shortcut cheatsheet overlay
- `t` toggles theme
- `g h` → home, `g n` → /now, `g w` → #work, `g c` → #contact (vim-style)

### 5.6 — Cursor force-field in `BackgroundDots`

Dots within cursor radius push away. One extra `Math.hypot` per dot, huge
payoff. Pairs naturally with Phase 3.1 if we port to canvas.

### 5.7 — Polaroid headshot

Apply `TiltCard` to the About headshot with a slight default rotation
(`rotate(-2deg)`) and paper-tape corners via `::before` / `::after`. Warm,
tactile.

### 5.8 — Now-playing widget

Last.fm or Apple Music MusicKit → real "currently listening" on `/now`.
Replaces the static color-circle artists. ~30 lines with Last.fm.

### 5.9 — Drag-to-pin skill chips

Click a skill chip to "pin" it — pinned chips slide to the front and get a
ring. Tiny toy that invites hovering.

### 5.10 — `/colophon` page

Tools, fonts, hosting, principles, bundle size. Deep-cut for curious
visitors.

### 5.11 — Footer receipts

"Built with Next 15 · X KB JS · Lighthouse 99/100 · last deploy 2 days ago"
using build-time env vars. Engineers love receipts.

---

## Phase 6 — SEO, accessibility, analytics

### 6.1 — OG image

`app/layout.tsx` declares `openGraph` but no `images`. Add an `opengraph-image.tsx`
route (Next.js file convention) to auto-generate per-page OG cards, or ship a
static `/og-image.png`.

### 6.2 — Focus-visible audit

Magnetic button wrappers swallow focus visuals because the ring lives on the
inner `<a>`. Ensure all focusable elements keep a visible outline under
`:focus-visible`, including mobile menu items.

### 6.3 — Mobile menu body scroll lock + overlay

Currently: menu opens, page scrolls underneath. Add `overflow: hidden` to
body while open and a translucent backdrop.

### 6.4 — Analytics (optional)

Vercel Web Analytics is cookie-free and one import. Turn on if you want to
know whether `/now` actually gets visits.

### 6.5 — Pre-existing lint error

`components/ThemeToggle.tsx:43` has an empty `catch {}` block. One-line fix
(`catch { /* ignore */ }`), unblocks `npm run lint` going clean.

---

## Phase 7 — Nice-to-haves / deferred

- Tag filtering on `/work` and `/blog` via clickable pills
- `useReducedData` detection — skip `BackgroundDots`, `CursorSpotlight`,
  magnetic buttons on slow/saving connections
- Pause pulse animation on the "Available for work" dot after a few seconds
- Delete `tailwind.config.ts` (Tailwind v4 mostly handles config in CSS)
- Shared `getCurrentBook()` helper so all Sanity-consuming places go through
  one function
- View Transition animations between routes (/ → /now, etc.)
- Dark-mode-aware favicon
- `components/LogoCarousel.tsx` pause-on-hover accessibility (respect
  `prefers-reduced-motion`)
