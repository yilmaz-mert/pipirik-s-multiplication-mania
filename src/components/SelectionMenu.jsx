import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  exit: { opacity: 0, x: -20 },
};

const itemVariants = {
  hidden: { x: 20, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

/**
 * SelectionMenu — a vertically-stacked animated button list for table selection.
 *
 * variant="nav"    → solid orange buttons that trigger navigation on click.
 *                    Used in EzberKartlariPage.
 * variant="toggle" → light/amber toggle buttons with multi-select support.
 *                    Used in SelectiveTestPage.
 *
 * Renders as a motion.div so it participates in parent AnimatePresence exit animations
 * when given a `key` prop by the parent.
 */
export default function SelectionMenu({
  items,
  selected = [],
  onSelect,
  variant = 'nav',
  className = '',
  style,
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`flex flex-col ${className}`}
      style={style}
    >
      {items.map((item, idx) => {
        const isFirst = idx === 0;
        const isLast = idx === items.length - 1;
        const isSelected = selected.includes(item.id);

        const buttonClass =
          variant === 'toggle'
            ? [
                'w-full flex-1 flex items-center justify-center',
                'font-outfit font-bold text-[min(4.8vw,18px)] text-tema-yazi transition-colors',
                isSelected ? 'bg-tema-secili' : 'bg-tema-enak',
                isFirst ? 'rounded-t-md' : '',
                isLast ? 'rounded-b-md' : 'border-b-2 border-tema-kutu',
              ].join(' ')
            : [
                'w-full bg-tema-kutu text-tema-yazi font-poppins font-bold uppercase',
                'text-[5.4vw] min-[512px]:text-[24px] leading-none text-center',
                'shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] active:scale-95',
                'flex items-center justify-center h-[5vh]',
                isFirst ? 'rounded-t-[9px]' : '',
                isLast ? 'rounded-b-[9px]' : '',
              ].join(' ');

        return (
          <motion.button
            key={item.id}
            variants={itemVariants}
            onClick={() => onSelect(item.id)}
            className={buttonClass}
          >
            {item.label}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
