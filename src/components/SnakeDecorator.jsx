import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

export default function SnakeDecorator({ selectedNumber }) {
  /**
   * KUSURSUZ İP ROTASI (Düğümlü Halat)
   * Sağ alt (450,350) noktasından başlar, ekranın soluna doğru kavis çizer, 
   * sağ üste doğru yönelir ve görünmeyen sağ kısımda (550) birleşir.
   */
  const ROPE_PATH = "M 450, 350 C 250, 350 150, 300 80, 250 C 10, 200 10, 100 150, 80 C 290, 60 350, 150 450, 100 C 550, 50 550, 350 450, 350 Z";

  // Ana SVG Kapsayıcısı Varyantı: Çıkış anında metnin kayboluşunu izlemek için ufak bir gecikme (delay) eklendi
  const svgVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.15, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.3, delay: 0.7 } } 
  };

  // Metin (Yılan) Akış Varyantı: startOffset kullanılarak metnin ip üzerindeki konumu itiliyor
  const textVariants = {
    hidden: { startOffset: "-100%" }, // Ekranın gerisinde bekler
    visible: { 
      startOffset: "0%", 
      transition: { duration: 0.9, ease: "easeOut" } // Hızlıca kayarak yerini alır
    },
    exit: { 
      startOffset: "100%", 
      transition: { duration: 0.9, ease: "easeIn" } // Hızlanarak geldiği yöne doğru terk eder
    }
  };

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
      <AnimatePresence>
        {selectedNumber && (
          <motion.svg
            key={selectedNumber}
            viewBox="0 0 450 450"
            className="absolute w-[120vw] min-[512px]:w-150 h-auto opacity-[0.15] text-tema-yazi"
            variants={svgVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <defs>
              <path id="ropePath" d={ROPE_PATH} />
            </defs>
            <text 
              className="font-poppins font-bold uppercase text-[28px]" 
              fill="currentColor"
            >
              {/* motion.textPath ile SVG'nin kendi akış özelliğini animasyona bağlıyoruz */}
              <motion.textPath 
                href="#ropePath"
                variants={textVariants}
              >
                {/* İpin tüm yüzeyini dolduracak kadar rakam eklendi */}
                {Array(60).fill(selectedNumber).join('      ')}
              </motion.textPath>
            </text>
          </motion.svg>
        )}
      </AnimatePresence>
    </div>
  );
}