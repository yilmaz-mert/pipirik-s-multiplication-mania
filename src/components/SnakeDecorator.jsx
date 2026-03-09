import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

export default function SnakeDecorator({ selectedNumber }) {
  // YOLUN YÖNÜ DEĞİŞTİRİLDİ: 
  // Artık yukarıda soldan sağa akıyor, böylece üst kısım DÜZ görünecek.
  const ROPE_PATH = "M356.503 212.664C385.805 244.783 477.003 285.664 403.503 331.664C379.029 346.981 364.647 347.375 353.003 346.164C329.678 343.739 320.356 325.157 284.003 339.164C229.503 360.164 212.553 377.803 180.503 385.664C154.003 392.164 143.503 392.035 133.003 389.164C109.836 382.831 61.3029 352.164 28.5029 262.164C13.6933 221.528 1.17543 200.374 1.00314 180.164C0.698449 144.424 22.4473 123.881 38.5029 105.664C64.5029 76.1641 244.003 -34.8359 266.003 12.6641C288.003 60.1641 330.503 184.164 356.503 212.664Z";

  const svgVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.15, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3, delay: 0.6 } } 
  };

  const textVariants = {
    hidden: { startOffset: "100%" }, // Terse döndüğü için offset yönünü de çevirdim
    visible: { 
      startOffset: "0%", 
      transition: { duration: 0.9, ease: "easeOut" } 
    },
    exit: { 
      startOffset: "-100%", 
      transition: { duration: 0.9, ease: "easeIn" } 
    }
  };

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {selectedNumber && (
          <motion.svg
            key={selectedNumber}
            viewBox="-50 -80 600 550"
            style={{
              position: 'absolute',
              width: '160%', 
              height: 'auto',
              top: '-10%', 
              left: '-8%',
            }}
            variants={svgVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-tema-yazi"
          >
            <defs>
              <path id="ropePath" d={ROPE_PATH} />
            </defs>
            <text 
              // 'font-bold' kaldırıldı, sadece normal font kullanılıyor.
              className="font-poppins font-bold uppercase text-[20px]" 
              fill="currentColor"
            >
              <motion.textPath href="#ropePath" variants={textVariants} >
                {Array(180).fill(selectedNumber).join('   ')}
              </motion.textPath>
            </text>
          </motion.svg>
        )}
      </AnimatePresence>
    </div>
  );
}