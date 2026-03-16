import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

/**
 * InfoBox — the yellow prompt box shown above table-selection menus.
 * Fades in from below on mount. Pass `className` to adjust sizing,
 * margins, and shadow per page (e.g. SiraliTestPage vs SelectiveTestPage).
 */
export default function InfoBox({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`flex justify-center items-center bg-tema-kutu rounded-[21px] px-4 py-2 ${className}`}
    >
      <span className="font-poppins font-semibold text-[min(4.5vw,17px)] leading-tight text-tema-yazi text-center">
        {children}
      </span>
    </motion.div>
  );
}
