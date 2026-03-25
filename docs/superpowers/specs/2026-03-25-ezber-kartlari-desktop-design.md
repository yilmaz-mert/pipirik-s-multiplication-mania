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

Reusable wrapper for ALL desktop game screens. Renders only at `lg:` breakpoint.

**Structure:**
```
<div> (full viewport, grid-paper background)
  <WaveHeader /> (already exists, already responsive)
  <YellowBlob /> (already exists, hidden on mobile, shown on desktop)
  <div> (OuterCard - orange, rounded, centered)
    <div> (InnerCard - cream, rounded)
      {children}
    </div>
    <Mascot /> (absolute positioned, overlapping left edge)
  </div>
  <Sidebar title={sidebarTitle} /> (right edge, rotated text + blur panel)
</div>
```

**Props:**
- `sidebarTitle: string` — rotated text displayed in the sidebar ("EZBER KARTLARI", "SECIMLI TEST", etc.)
- `children: ReactNode` — page-specific content rendered inside InnerCard

**Styling:**
- OuterCard: `bg-tema-kutu`, `rounded-3xl`, `p-5`, fixed width ~920px, centered
- InnerCard: `bg-tema-enak`, `rounded-2xl`, `overflow-hidden`, full width of OuterCard minus padding
- Sidebar: absolute right edge, `backdrop-blur`, rotated text with `writing-mode` or `-rotate-90`
- Mascot: absolute positioned, overlapping left edge of OuterCard, ~328px, pointer-events-none

### New Component: `FlashcardDesktopContent`

Desktop-only content for the Ezber Kartlari page.

**Structure:**
```
<div> (flex row, full height of InnerCard)
  <MultiplicationTable selectedTable={selected} />
  <TabButtonList selected={selected} onSelect={setSelected} />
</div>
```

**MultiplicationTable:**
- 5-column CSS grid: `num1 | x | num2 | = | result`
- Each column has fixed width for vertical alignment
- `num1` column: right-aligned
- `x` column: center-aligned, fixed width
- `num2` column: right-aligned
- `=` column: center-aligned, fixed width
- `result` column: right-aligned
- Rows alternate background: orange (`tema-kutu`) / cream (`tema-enak`)
- 8 rows per table (2xN through 9xN where N is the selected table)
- Font: Poppins Bold, ~32px, color `tema-yazi`
- Rounded corners on first and last rows to match card shape

**TabButtonList:**
- Vertical list of 8 buttons: IKILER through DOKUZLAR
- Active tab: amber background (`tema-secili`), border on left/top/bottom
- Inactive tabs: light background (`tema-enak`), subtle border
- Buttons are right-aligned, slightly overlapping or adjacent to the table
- Clicking a tab updates `selected` state (no route change)

### Modified File: `EzberKartlariPage.jsx`

- Add `selected` state (already exists for mobile dropdown)
- At `lg:` breakpoint, render `DesktopGameLayout` with `FlashcardDesktopContent` inside
- Mobile layout remains completely unchanged (hidden at `lg:`)
- Pattern: `<div className="lg:hidden">{mobile}</div><div className="hidden lg:block">{desktop}</div>`

### Modified File: `Layout.jsx`

- Minimal changes if needed for desktop full-width support (already has `lg:relative lg:max-w-none`)

## Behavior

- Page loads with "IKILER" (2s table) selected by default
- Clicking a tab instantly switches the table content (no animation needed, just state change)
- Mobile dropdown and desktop tabs share the same `selected` state
- No route changes, no navigation — purely client-side state

## Vertical Alignment Detail

The multiplication table MUST use a grid layout where each column (num1, operator, num2, equals, result) is a fixed-width column. This ensures that:
- All `x` symbols align vertically
- All `=` symbols align vertically
- Single-digit results (4, 6, 8) align with double-digit results (10, 12, 18)

Implementation approach: CSS Grid with `grid-template-columns` using fixed widths, with text alignment per column.

## Design Tokens (from existing codebase)

- `--color-tema-kutu`: #F8971F (orange - OuterCard, table row alt)
- `--color-tema-enak`: #F5E4C3 (cream - InnerCard, table row alt, inactive tab)
- `--color-tema-secili`: #F9C261 (amber - active tab)
- `--color-tema-yazi`: #130D3D (dark text)
- `--color-tema-acik-yazi`: #FEF1D9 (light text - header)
- `--color-tema-buton2`: #5F9CB8 (blue - not used here)
- Font families: Outfit (headers), Poppins (body/labels)

## Files Summary

| Action | File |
|--------|------|
| Create | `src/components/DesktopGameLayout.jsx` |
| Create | `src/components/FlashcardDesktopContent.jsx` |
| Modify | `src/pages/EzberKartlariPage.jsx` |
| Modify (if needed) | `src/components/Layout.jsx` |

## Out of Scope

- Auto Layout fixes in Figma
- Other desktop pages (will follow same pattern with DesktopGameLayout)
- Mobile changes
- Animations on tab switch (keep it simple, state change only)
