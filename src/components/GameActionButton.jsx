import { motion } from 'framer-motion';

const bodyVariants = {
  normal: { y: 0 },
  pressed: { y: 6, transition: { type: 'spring', stiffness: 400, damping: 20 } },
};

/**
 * GameActionButton — reusable 3D press button with a depth shadow layer.
 * Pressing animates the body down 6px to land on the shadow, simulating a physical press.
 */
export default function GameActionButton({ onClick, label = 'BAŞLA' }) {
  return (
    <motion.div
      className="relative w-[min(65vw,260px)] aspect-[260/106] cursor-pointer select-none"
      onClick={onClick}
      initial="normal"
      whileTap="pressed"
    >
      {/* Depth shadow layer — sits 6px below, always stationary */}
      <div className="absolute inset-x-0 top-[6px] bottom-0 bg-[#130D3D] rounded-[100px]" />
      {/* Button body — slides down 6px on press */}
      <motion.div
        variants={bodyVariants}
        className="absolute inset-x-0 top-0 bottom-[6px] bg-[#5F9CB8] border-4 border-[#130D3D] rounded-[100px] flex items-center justify-center will-change-transform"
      >
        <span className="font-outfit font-black text-[min(12vw,48px)] text-[#F5E4C3] tracking-[0.05em] leading-none">
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
}
