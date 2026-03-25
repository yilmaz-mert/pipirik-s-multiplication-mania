# Ezber Kartlari Desktop Design

## Overview

Add desktop layout to the Ezber Kartlari (Flashcards) page, following the Figma desktop designs. This is the first desktop implementation and introduces the shared `DesktopGameLayout` wrapper component that all other desktop pages will reuse.

**Approach:** Mobile-first. Existing mobile code stays untouched. Desktop layout activates at the `lg:` Tailwind breakpoint.

## Figma Reference

- File: `mat desktop v1.0 (Mert Copy)`
- Screens: `flashcards/2` through `flashcards/9` in the "Ezber Kartlari Akisi" section
- File key: `JBGsGBbRRclbpDlt98361h`

## Architecture

### New Component: `DesktopGameLayout`

Reusable wrapper for ALL desktop game screens. Renders only at `lg:` breakpoint. This component does NOT render WaveHeader or YellowBlob — those are already handled by `Layout.jsx` and are desktop-responsive.

**Structure:**
```
<div> (relative container, centered, positioned below existing WaveHeader)
  <div> (OuterCard - orange, rounded, centered)
    <div> (InnerCard - cream, rounded)
      {children}
    </div>
  </div>
  <Mascot /> (absolute positioned, overlapping left edge of OuterCard)
  <Sidebar title={sidebarTitle} /> (absolute right edge, rotated text + blur panel)
</div>
```

**Important:** `WaveHeader` and `YellowBlob` are already rendered by `Layout.jsx` for all pages. `DesktopGameLayout` sits INSIDE the existing Layout and only adds the OuterCard/InnerCard/Mascot/Sidebar chrome.

**Props:**
- `sidebarTitle: string` — rotated text displayed in the sidebar ("EZBER KARTLARI", "SECIMLI TEST", etc.)
- `children: ReactNode` — page-specific content rendered inside InnerCard

**Styling:**
- OuterCard: `bg-tema-kutu`, `rounded-3xl`, `p-5`, `max-w-[920px] w-full`, centered with `mx-auto`. Uses `max-w` + `w-full` instead of fixed width to avoid overflow at viewport widths between 1024-980px.
- InnerCard: `bg-tema-enak`, `rounded-2xl`, `overflow-hidden`, full width of OuterCard minus padding
- Sidebar: absolute right edge of the container, `backdrop-blur-sm`, `bg-[rgba(250,236,162,0.25)]`, `rounded-r-2xl`. Text rotated via `-rotate-90` with `origin-center` and explicit width/height to prevent bounding box issues. Font: Outfit ExtraBold, ~48px, `text-tema-kutu/60` (60% opacity).
- Mascot: absolute positioned, left edge overlapping OuterCard by ~192px, `w-[328px] h-[328px]`, `pointer-events-none`. Uses existing `foxy.png` asset from `src/assets/foxy.png`.

### New Component: `FlashcardDesktopContent`

Desktop-only content for the Ezber Kartlari page.

**Structure:**
```
<div> (flex row, full height of InnerCard)
  <MultiplicationTable selectedTable={selected} />
  <TabButtonList selected={selected} onSelect={handleSelect} />
</div>
```

**Props:**
- `selected: number` — currently selected table (2-9)
- `onSelect: (table: number) => void` — callback when a tab is clicked

**MultiplicationTable:**
- 5-column CSS grid: `num1 | x | num2 | = | result`
- Grid columns: `grid-template-columns: 2rem 1.5rem 2rem 1.5rem 3rem` (adjust as needed for font size)
- `num1` column: right-aligned (the selected table number, repeated)
- `x` column: center-aligned, fixed width
- `num2` column: right-aligned (multiplier 2-9)
- `=` column: center-aligned, fixed width
- `result` column: right-aligned (product)
- Rows alternate background: orange (`tema-kutu`) / cream (`tema-enak`)
- 8 rows per table (Nx2 through Nx9, matching Figma design which shows 2-9 multipliers)
- Font: Poppins Bold, ~32px, color `tema-yazi`, tracking `tracking-wide`
- First row: `rounded-t-2xl`, last row: `rounded-b-2xl`

**Note on row count:** Figma desktop shows 8 rows (multipliers 2-9). Mobile shows 10 rows (multipliers 1-10). This is a deliberate design difference — desktop has less vertical space and the design focuses on the core multiplication facts.

**TabButtonList:**
- Vertical list of 8 buttons: IKILER through DOKUZLAR
- Active tab: amber background (`tema-secili`), `border-tema-kutu` on top and right
- Inactive tabs: light background (`tema-enak`), `border-tema-kutu` subtle border
- Rounded right corners (`rounded-r-lg`)
- Clicking a tab calls `onSelect(tableNumber)` — no route change

### Modified File: `EzberKartlariPage.jsx`

**State management:** The existing mobile code uses `useSearchParams` with `?sayi=` query parameter. For desktop, we will use the same `useSearchParams` approach so both mobile dropdown and desktop tabs stay in sync:

- Tab click calls `setSearchParams({ sayi: tableNumber })` (same as mobile dropdown)
- `selectedNumber` is derived from `searchParams.get("sayi")` (already exists)
- Default: `selectedNumber || 2` when no param is set

**Rendering pattern:**
```jsx
// Mobile (existing, unchanged)
<div className="lg:hidden">{existing mobile layout}</div>

// Desktop (new)
<div className="hidden lg:block">
  <DesktopGameLayout sidebarTitle="EZBER KARTLARI">
    <FlashcardDesktopContent
      selected={selectedNumber || 2}
      onSelect={(n) => setSearchParams({ sayi: n })}
    />
  </DesktopGameLayout>
</div>
```

### Modified File: `Layout.jsx`

- No changes expected. `Layout.jsx` already handles `WaveHeader` and `YellowBlob` responsively with `lg:` breakpoint. The `lg:max-w-none` and `lg:relative` classes already support full-width desktop content.

## Behavior

- Page loads with IKILER (2s table) selected by default (when no `?sayi=` param)
- Clicking a tab updates `?sayi=` search param, which updates both mobile and desktop views
- Table content switches instantly (no animation)
- Mobile dropdown and desktop tabs are driven by the same `useSearchParams` state

## Vertical Alignment Detail

The multiplication table MUST use a CSS Grid layout where each column (num1, x, num2, =, result) has a fixed width. This ensures:
- All `x` symbols align vertically across rows
- All `=` symbols align vertically across rows
- Single-digit results (4, 6, 8) align with double-digit results (10, 12, 18)

Implementation: `grid-template-columns` with fixed `rem` widths. All number columns use `text-right`, operator columns use `text-center`.

## Design Tokens (from existing codebase)

- `--color-tema-kutu`: #F8971F (orange - OuterCard, table row alt)
- `--color-tema-enak`: #F5E4C3 (cream - InnerCard, table row alt, inactive tab)
- `--color-tema-secili`: #F9C261 (amber - active tab)
- `--color-tema-yazi`: #130D3D (dark text)
- `--color-tema-acik-yazi`: #FEF1D9 (light text - header)
- Font families: Outfit (headers/sidebar), Poppins (body/labels/table)

## Accessibility

- TabButtonList uses `role="tablist"` on container, `role="tab"` + `aria-selected` on each button
- Active tab has `aria-selected="true"`, inactive tabs have `aria-selected="false"`
- Table content region has `role="tabpanel"` + `aria-labelledby` pointing to active tab

## Files Summary

| Action | File |
|--------|------|
| Create | `src/components/DesktopGameLayout.jsx` |
| Create | `src/components/FlashcardDesktopContent.jsx` |
| Modify | `src/pages/EzberKartlariPage.jsx` |

## Out of Scope

- Auto Layout fixes in Figma
- Other desktop pages (will follow same pattern with DesktopGameLayout)
- Mobile changes
- Animations on tab switch
- Keyboard arrow navigation between tabs (can be added later)
