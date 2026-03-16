import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

/**
 * FlipNumber — animates digit changes with a 3D flip effect.
 * Each unique `value` triggers a spring-based flip-in transition.
 */
export default function FlipNumber({ value }) {
  return (
    <div className="relative flex items-center justify-center w-full h-full perspective-[1000px]">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={value}
          initial={{ rotateX: -90, y: '-50%', opacity: 0 }}
          animate={{ rotateX: 0, y: '0%', opacity: 1 }}
          exit={{ rotateX: 90, y: '50%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 150, damping: 15, duration: 0.4 }}
          style={{ transformOrigin: 'center center' }}
          className="absolute flex items-center justify-center w-full h-full"
        >
          {value}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
