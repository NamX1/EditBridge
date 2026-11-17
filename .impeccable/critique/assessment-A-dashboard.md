# Assessment A — "User Dashboard" section (EditBridge)

**Target:** `src/components/Sections.tsx` (the `Dashboard` function) + related CSS in `src/index.css` (`.dashboard`, `.dash-*`, `.sidebar`, `.side-link`, `.metric`, `.project-*`).
**Mode:** Operate (task completion) for the widget, embedded in a Persuade page.
**Nature:** Static preview — no data fetching, no routing, no real state. "New Project" is the only live control and it opens the global `PostProjectModal`.

## Design Specificity Verdict

Authored in copy, generic in shell. Project names ("Skincare Reel Campaign", "Customer Testimonial", "Luxury Product Showcase") and editor names (Alya Studio, Nadia Cut, Raka Motion) are tied to the Voila case study, so the content feels inhabited. But the chrome is a stock admin-dashboard template: dark top bar + left sidebar + metric cards + progress bars, with no product-specific information architecture (no inbox thread, no file review, no payment state). The sidebar's six items are the *entire* navigation of a product that doesn't exist yet. Detector-style note: the preview leans on generic SaaS signifiers rather than EditBridge's actual workflow (brief → match → review → rate).

## Holistic Design

- **Hierarchy:** Section `h2` → greeting `h3` (28px) → `h4` "Recent Projects" → rows. Readable top-down. But the top bar's "EditBridge Dashboard" `<strong>` competes with the greeting for the "title of the widget" role, and the section head `h2` ("Manage projects without losing track.") competes with the in-widget greeting. Three titles, no single owner.
- **IA:** Metrics (3) above projects (3) is sensible. Sidebar groups account-level destinations but none resolve. The dropdown "Voila Beauty Lounge" implies multi-account switching that the product never demonstrates.
- **Emotional fit:** A marketing page showing a "logged-in" dashboard is aspirational, but the widget pretends to be operable. That mismatch is the dominant feeling: it looks like an app you can use and isn't.
- **Discoverability:** The only actionable element is "New Project" (dark pill, top-right). Everything else is visually interactive (sidebar rows, account chip with chevron) but dead. Cursor is `default` on side-links, yet the active-state fill (`#f0ebff`) and chevron afford action. Hidden affordances, no feedback.
- **Composition:** Well-proportioned card (220px sidebar + content, 440px min height). Progress bars at 120px are legible. Mobile (`≤900px`) drops the sidebar entirely (`display: none`) and collapses to one column, so the preview loses its navigation with no fallback.
- **Typography:** Inherits Arial (deliberate port). Greeting at 28px inline style; metric values 28px; section h2 clamp 36–56. Scale is coherent. `12px` grey (`#bbb`) account chip and `13px` muted subtext are small but acceptable on desktop.
- **Color:** Dark top bar `#171717` with white + `#bbb` text; accent `#7c3aed` progress fills and active sidebar. Coherent with the rest of the site. No new palette introduced.
- **Accessibility:** Sidebar is `<aside aria-label="Dashboard sections (preview)">` with `<div>` items — no `role="navigation"`, no buttons, no keyboard support, no focus styles on side-links. Progress bars are `<div>`s with `aria-label` only (no `role="progressbar"`, no `aria-valuenow`). Account chip is a `<span>`, not a button. The "(preview)" in the aria-label is honest and good. No skip/heading issues beyond the section-level `h2→h3` (already flagged page-wide).
- **States:** None. No empty (zero projects), no loading, no error. The `.empty-state` CSS class exists but is unused here. A widget whose job is Operate ships with a single happy path.
- **Copy:** "Good afternoon, Voila." + "Here's what is happening with your projects." is warm and specific. "Recent Projects", "Active projects / Saved editors / Unread messages" are clear. "Brief sent" as a status is product-appropriate. Weakness: greeting is hardcoded to "afternoon" regardless of time.
- **Edge cases:** Counts are internally inconsistent — "Saved editors: 12" while the marketplace exposes only 3 editors (and there is no saved-editors view). "5 unread messages" with no messages UI anywhere. Progress percentages are static strings. No overflow handling for long project names. No empty list fallback.

## Cognitive Load Checklist

1. **One primary action per view** — Fail. "New Project" plus six dead sidebar items plus a dead account chip all read as actions.
2. **Chunk information into groups** — Pass. Metrics row and project list are distinct groups.
3. **Progressive disclosure** — Fail. All three metrics and all three projects render at once; nothing drills down.
4. **Recognition over recall** — Pass. Labels and statuses are visible; no memorization required.
5. **Limit choices** — Fail. Six sidebar destinations, none functional, add noise without value.
6. **Clear visual hierarchy** — Pass. Greeting → metrics → projects reads top-down.
7. **Immediate feedback on actions** — Fail. Only "New Project" responds; sidebar/chip give nothing.
8. **Forgiveness / undo** — N/A (static preview; nothing to undo).

## Emotional Journey (peak–end)

- **Peak:** The personalized greeting + three tidy metrics land a moment of "I'm in control of my work" — the strongest emotional beat in the section.
- **End:** The dead sidebar and account chip, plus metrics that contradict the rest of the site, leave the memory "looks like an app, isn't one." The peak is borrowed from a product that doesn't exist.

## Nielsen Heuristics (0–4)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 1 | Aside says "(preview)" but sidebar/chip give no status; no loading/empty/error states. |
| 2 | Match System / Real World | 3 | Domain language good; "Good afternoon, Voila." personalizes; dropdown implies account switcher. |
| 3 | User Control and Freedom | 1 | Only exit is closing the modal; no way to "use" the dashboard; dead nav. |
| 4 | Consistency and Standards | 2 | "12 saved editors" vs 3 marketplace editors; sidebar looks standard but isn't interactive. |
| 5 | Error Prevention | 2 | Static, nothing to mis-enter; but misleading affordances invite fruitless clicks. |
| 6 | Recognition Rather Than Recall | 3 | Labels, statuses, percentages all visible. |
| 7 | Flexibility and Efficiency | n/a | Persuade embed; accelerators not applicable. |
| 8 | Aesthetic and Minimalist Design | 3 | Clean, restrained; noise from dead nav rows. |
| 9 | Error Recovery | 1 | No error states; dead controls fail silently. |
| 10 | Help and Documentation | n/a | Persuade embed; Steps section is the onboarding. |
| **Total** | | **16/32** | **~50% (Fair)** |

## Strengths

1. **Visual coherence with the site.** Same tokens (radii 24, pill buttons, `#7c3aed` accent, `#595959` muted) make the preview read as one product, not a bolted-on screenshot.
2. **Honest preview signaling.** Section copy says "Preview of the client dashboard you get after signing in" and the aside is `aria-label`ed "(preview)" — expectations are set in text, which is rare for this pattern.
3. **Scannable status.** Progress bars with percentages + `aria-label` make project state readable at a glance; "Brief sent / In progress / Review" is a sensible status vocabulary.

## Priority Issues

- **[P0] Preview impersonates a product and hijacks conversion.** `Sections.tsx:164` — the only live control inside a fake dashboard is "New Project", which opens the real submission modal. A visitor who thinks they're exploring a dashboard is suddenly in a conversion flow with no context. Fix: either make the whole widget visibly non-interactive (overlay "Preview" badge, `pointer-events: none` on rows, no live button) or replace "New Project" with a "See how it works" link that scrolls to Steps. ($impeccable clarify / harden)
- **[P1] Dead controls styled as interactive.** `Sections.tsx:141-147` (sidebar `<div>`s) and `:135-137` (account chip `<span>` + chevron). No `role`, no keyboard, no feedback. Fix: convert to `<button disabled>` or remove affordances (no chevron, no hover fill, `cursor: default` already set but visually misleading). Add `aria-disabled` and a "Preview" tooltip. ($impeccable harden)
- **[P1] No empty/loading/error states.** `Sections.tsx:178-192`. The `.empty-state` CSS exists but is unused. A dashboard with zero projects shows nothing. Fix: render an empty state ("No projects yet — create your first request") and a skeleton for loading, at least in markup. ($impeccable harden)
- **[P2] Credibility-breaking count mismatch.** `Sections.tsx:109-113` — "Saved editors: 12" vs 3 editors in `src/data/editors.ts`; "5 unread messages" with no messages UI. Fix: align counts to real data (3 saved, 0 messages) or remove those metrics from the preview. ($impeccable clarify)
- **[P2] Hardcoded time-of-day greeting.** `Sections.tsx:161` — "Good afternoon" regardless of actual time. Fix: compute from `new Date().getHours()` or drop the time word ("Hello, Voila."). ($impeccable clarify)
- **[P3] Mobile drops the sidebar with no fallback.** `index.css:962-967` — `.sidebar { display: none; }` below 900px. Fix: show a compact horizontal tab row or collapse into a "Preview" label so mobile visitors still see the IA. ($impeccable adapt)

## Persona Red Flags

- **Alex (skeptical founder, desktop):** "12 saved editors" against a marketplace of 3; "5 unread messages" with no inbox. Reads as a mockup, undermines the "this is a real product" pitch the page is making. Also asks: is the dashboard even reachable after sign-up?
- **Sam (task-focused, keyboard user):** Clicks sidebar items and the account chip — nothing happens, no focus, no feedback. Tries "New Project", lands in a modal with no breadcrumb back to the dashboard. Feels broken, not preview.
- **Casey (mobile, low-vision):** Below 900px the sidebar vanishes entirely; the 12px `#bbb` account chip and 13px muted subtext are small; no states to recover from. The preview becomes a stack of cards with no navigation context.

## Minor Observations

- Progress bars are `<div>`s with `aria-label` only; add `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` for AT users.
- Top bar "EditBridge Dashboard" `<strong>` duplicates the section identity; consider demoting to a small label.
- No "View all projects" / "Open inbox" affordance to imply depth beyond the three rows.
- Metric values are strings with no units or trend; fine for a preview but no delta context.
- `cursor: default` on `.side-link` is set (`index.css:725`) but the active fill + chevron still signal interactivity.
- Empty-state CSS (`.empty-state`, `index.css:903-918`) is defined but unused by this section.

## Provocative Questions

1. If the dashboard is only a preview, should "New Project" open the real modal at all — or should the widget be fully inert with a single "Try it" link?
2. Would a static screenshot with hotspot tooltips communicate the same value without pretending to be an operable app?
3. Should the preview's metrics be derived from the actual `editors.ts` data so the numbers never contradict the marketplace above it?
4. Is "Good afternoon, Voila." doing personalization work, or just naming a fictional client the visitor already met in the case study — and does that confuse "is this my dashboard?"?