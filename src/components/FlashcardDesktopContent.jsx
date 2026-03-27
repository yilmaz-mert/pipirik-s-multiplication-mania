// src/components/FlashcardDesktopContent.jsx
import React from 'react';
// eslint-disable-next-line no-unused-vars -- ESLint false positive: motion is used as <motion.div> JSX prefix
import { motion } from 'framer-motion';
import { TABLE_MENU_ITEMS } from '../constants';

// Multipliers shown in the table (Figma frame: rows 2–9)
const MULTIPLIERS = [2, 3, 4, 5, 6, 7, 8, 9];

// Pixel measurements from Figma node 4012:170 (TableCardBg): 314×502.889px
// Row 1 (cream header): 72.881px (node 4012:172); rows 2–8 split the remainder evenly
const ROW_FIRST_HEIGHT = 72.881;
const ROW_REST_HEIGHT = (502.889 - 72.881) / 7; // ≈ 61.43px

// Pixel measurements from Figma nodes 4012:142/4012:155–165 (tabs)
// Each tab: 230.703×75.211px; list starts at 41px (Figma 253px − 100px header − 112px card top)
const TAB_HEIGHT = 75.211;
const TAB_TOP_START = 41;

// CSS variable references for theme colors
const C = {
  orange: 'var(--color-tema-kutu)',    // #F8971F
  cream:  'var(--color-tema-enak)',    // #F5E4C3 (outer card bg)
  acik:   'var(--color-tema-acik)',    // #FEF1D9 (inactive tabs, table cream rows)
  secili: 'var(--color-tema-secili)', // #F9C261 (active tab, selected area bg)
  yazi:   'var(--color-tema-yazi)',    // #130D3D (text)
};

function MultiplicationTableCard({ selected }) {
  return (
    // Figma node 4012:170 — left=168px (calc(25%+88px)≈448@1440 − 280 card left), top=90px (202−112)
    <motion.div
      id="flashcard-tabpanel"
      role="tabpanel"
      aria-label={`${selected}'ler çarpım tablosu`}
      className="absolute overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.35, ease: 'easeOut' }}
      style={{
        left: '168px',
        top: '90px',
        width: '314px',
        height: '502.889px',
        backgroundColor: C.orange,
        borderRadius: '16px',
        border: `1px solid ${C.orange}`,
      }}
    >
      {MULTIPLIERS.map((m, i) => {
        const result = selected * m;
        const isCream = i % 2 === 0; // even rows cream, odd rows show orange card bg
        const rowHeight = i === 0 ? ROW_FIRST_HEIGHT : ROW_REST_HEIGHT;

        return (
          <div
            key={m}
            style={{
              width: '100%',
              height: `${rowHeight}px`,
              backgroundColor: isCream ? C.acik : C.orange,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '700',
              fontSize: '32px',
              color: C.yazi,
              border: isCream ? `1px solid ${C.orange}` : 'none',
              // First cream row gets rounded corners matching the 16px card radius
              borderRadius: i === 0 ? '14px 14px 0 0' : '0',
            }}
          >
            {selected}x{m}={result}
          </div>
        );
      })}
    </motion.div>
  );
}

function TabList({ selected, onSelect }) {
  return (
    <>
      {TABLE_MENU_ITEMS.map(({ id, label }, i) => {
        const isActive = id === selected;
        const tabTop = TAB_TOP_START + i * TAB_HEIGHT;

        return (
          <motion.button
            key={id}
            id={`tab-${id}`}
            role="tab"
            aria-selected={isActive}
            aria-controls="flashcard-tabpanel"
            onClick={() => onSelect(id)}
            // Staggered entry: each tab slides in from the right with a 50ms delay between items
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.05, ease: 'easeOut' }}
            // Hover: card lifts forward (scale) with deepening shadow; tap gives tactile feedback
            whileHover={{ scale: 1.02, boxShadow: '0 4px 16px rgba(0,0,0,0.14)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              position: 'absolute',
              // Figma node 4012:142 — left=552.66px (calc(58.33%−7.34px)≈832.6@1440 − 280 card left)
              left: '552.66px',
              top: `${tabTop}px`,
              width: '230.703px',
              height: `${TAB_HEIGHT}px`,
              backgroundColor: isActive ? C.secili : C.acik,
              // Active tab: no left border (merges visually with the selected-area background)
              // Inactive tab: full 4-side border
              borderTop: `1px solid ${C.orange}`,
              borderRight: `1px solid ${C.orange}`,
              borderBottom: `1px solid ${C.orange}`,
              borderLeft: isActive ? 'none' : `1px solid ${C.orange}`,
              borderRadius: '0 8px 8px 0', // Figma: rounded-br-[8px] rounded-tr-[8px]
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '700',
              fontSize: '32px',
              color: C.yazi,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              // Background color transition handled via CSS; transforms handled by Framer Motion
              transition: 'background-color 0.15s ease',
            }}
          >
            {label}
          </motion.button>
        );
      })}
    </>
  );
}

export default function FlashcardDesktopContent({ selected, onSelect }) {
  return (
    // Outer container fills the page coordinate space; role is NOT tablist here
    // because the tabpanel must be a sibling of the tablist, not nested inside it (WAI-ARIA)
    <div className="absolute inset-0">

      {/* Selected area background — Figma node 4012:154 */}
      {/* left=97px (calc(16.67%+137px)≈377@1440 − 280 card left), top=41px (153−112) */}
      <motion.div
        className="absolute"
        aria-hidden="true"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25, ease: 'easeOut' }}
        style={{
          left: '97px',
          top: '41px',
          width: '456px',
          height: '602px',
          backgroundColor: C.secili,
          borderRadius: '8px 0 0 8px',
          borderTop: `1px solid ${C.orange}`,
          borderLeft: `1px solid ${C.orange}`,
          borderBottom: `1px solid ${C.orange}`,
        }}
      />

      {/* Tabpanel (multiplication table) must be outside the tablist per WAI-ARIA */}
      <MultiplicationTableCard selected={selected} />

      {/* Tablist wraps only the tab buttons — tabpanel must not be a DOM child of tablist */}
      <div role="tablist" aria-orientation="vertical">
        <TabList selected={selected} onSelect={onSelect} />
      </div>
    </div>
  );
}
