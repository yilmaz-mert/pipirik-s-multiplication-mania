import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

/**
 * GameHeaderStats — injects progress information into the WaveHeader via a React portal.
 *
 * mode="progress"  → renders a progress bar into `wave-header-portal-target`.
 *                    Used by SiraliGamePage and SelectiveGamePage.
 * mode="counter"   → renders a stacked X / Y counter into `wave-header-counter-target`.
 *                    Used by MeydanGamePage.
 */
export default function GameHeaderStats({ mode = 'progress', currentIndex, total }) {
  const [portalTarget, setPortalTarget] = useState(null);

  useEffect(() => {
    const targetId =
      mode === 'counter' ? 'wave-header-counter-target' : 'wave-header-portal-target';
    const el = document.getElementById(targetId);
    // Defer so the WaveHeader DOM node is guaranteed to exist
    if (el) Promise.resolve().then(() => setPortalTarget(el));
  }, [mode]);

  if (!portalTarget) return null;

  const progressPercentage = ((currentIndex + 1) / total) * 100;

  const content =
    mode === 'counter' ? (
      <div
        className="relative w-full h-full font-poppins font-extrabold -translate-y-4"
        style={{ color: '#F5E4C3' }}
      >
        <span
          className="absolute text-[15px] leading-5.5 text-center"
          style={{ left: '5%', top: '14.28%', width: '23px' }}
        >
          {currentIndex + 1}
        </span>
        <span
          className="absolute text-[32px] leading-12 text-center"
          style={{ left: '40%', top: '0%', width: '7px' }}
        >
          /
        </span>
        <span
          className="absolute text-[15px] leading-5.5 text-center"
          style={{ left: '55%', top: '54.76%', width: '28px' }}
        >
          {total}
        </span>
      </div>
    ) : (
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-[89.33%] max-w-83.75 flex flex-col"
      >
        <div className="flex justify-end w-full -mb-2 -translate-y-4">
          <span className="text-tema-enak font-poppins font-extrabold text-[13px] leading-none">
            {currentIndex + 1} / {total}
          </span>
        </div>
        <div className="w-full h-2.5 bg-tema-enak rounded-full shadow-inner">
          <div
            className="h-full bg-tema-kutu rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </motion.div>
    );

  return createPortal(content, portalTarget);
}
