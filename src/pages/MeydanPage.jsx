import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/useGameStore';
import foxyHint from '../assets/foxy_hint.png';
import { History, Ban, X, ZoomIn, Rocket } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import RecordsTable from '../components/RecordsTable';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

export default function MeydanPage() {
  const navigate = useNavigate();
  const { records } = useGameStore();
  const [isHintModalOpen, setIsHintModalOpen] = useState(false);

  return (
    <motion.div
      className="w-full h-full relative overflow-hidden flex flex-col items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Records group */}
      <motion.div variants={itemVariants} className="flex flex-col items-center w-[min(89.33%,450px)] mt-[5vh]">
        <div className="bg-tema-kutu rounded-t-[9px] flex items-center justify-center z-10 w-[33.6%] aspect-126/27 -mb-px">
          <span className="font-poppins font-black text-[min(5vw,20px)] leading-[150%] tracking-[0.21em] text-tema-yazi">
            REKOR
          </span>
        </div>
        <RecordsTable records={records} />
      </motion.div>

      {/* Action buttons */}
      <motion.div variants={itemVariants} className="flex flex-col items-center w-full mt-[min(4vh,30px)] mb-[5vh]">
        <motion.button
          onClick={() => navigate('/meydan-oyun')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-[min(54vw,220px)] aspect-202/72 flex items-center justify-center bg-tema-buton2 rounded-[30px] shadow-md transition-colors"
        >
          <span className="font-poppins font-extrabold text-[min(9.5vw,40px)] text-tema-enak uppercase tracking-wider">Başla</span>
        </motion.button>

        <motion.button
          onClick={() => setIsHintModalOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-[min(34vw,135px)] aspect-127/44 flex items-center justify-center bg-tema-kutu rounded-[10px] shadow-md transition-colors mt-[2vh]"
        >
          <span className="font-poppins font-extrabold text-[min(6vw,24px)] text-tema-enak uppercase">İpucu</span>
        </motion.button>
      </motion.div>

      {/* Hint modal */}
      <AnimatePresence>
        {isHintModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsHintModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[89.333vw] max-w-83.75 aspect-335/385 bg-tema-kutu rounded-[9px] flex items-center justify-center shadow-2xl cursor-default"
            >
              <div className="absolute -top-[16%] -left-[2%] w-[28%] z-10 drop-shadow-xl pointer-events-none">
                <img src={foxyHint} alt="Foxy" className="w-full h-auto object-contain" />
              </div>

              <div className="w-[94.02%] h-[95.06%] bg-tema-enak rounded-[9px] p-[6%] flex flex-col text-tema-yazi overflow-hidden">
                <p className="font-poppins font-medium text-[12.5px] leading-tight text-center mb-[6%] px-2">
                  Hızın ve dikkatin test ediliyor! En kısa sürede bitirip zirveye yerleşebilir misin? İşte kurallar:
                </p>

                <div className="flex-1 overflow-y-auto pr-1 space-y-[5%] scrollbar-hide text-center font-poppins text-[11px] leading-tight">
                  <p>
                    <span className="inline-flex items-center gap-1 italic font-extrabold mr-1 align-middle">
                      <History size={13} strokeWidth={3} className="translate-y-[0.5px]" /> Süre İleri Akar:
                    </span>
                    <span className="font-medium align-middle italic lg:not-italic">Oyun başladığı an süre işlemeye başlar. Hedefin, tüm soruları en kısa sürede tamamlamak!</span>
                  </p>
                  <p>
                    <span className="inline-flex items-center gap-1 italic font-extrabold mr-1 align-middle">
                      <Ban size={13} strokeWidth={3} className="translate-y-[0.5px]" /> Hata Sınırı ve Ceza:
                    </span>
                    <span className="font-medium align-middle">Her ÜÇ yanlışta bir bitirme sürene ceza puanı (ek süre) eklenir. Dikkatli ol!</span>
                  </p>
                  <p>
                    <span className="inline-flex items-center gap-1 italic font-extrabold mr-1 align-middle">
                      <X size={13} strokeWidth={3} className="translate-y-[0.5px]" /> Pas Geçmek Yok:
                    </span>
                    <span className="font-medium align-middle">İlerlemek için her soruya bir yanıt vermelisin; stratejini iyi kur!</span>
                  </p>
                  <p>
                    <span className="inline-flex items-center gap-1 italic font-extrabold mr-1 align-middle">
                      <ZoomIn size={13} strokeWidth={3} className="translate-y-[0.5px]" /> Hata Takibi:
                    </span>
                    <span className="font-medium align-middle">Yaptığın tüm yanlışları ekranın bir köşesinden anlık olarak takip edebilirsin.</span>
                  </p>
                  <p>
                    <span className="inline-flex items-center gap-1 italic font-extrabold mr-1 align-middle">
                      <Rocket size={13} strokeWidth={3} className="translate-y-[0.5px]" /> Rekorlar:
                    </span>
                    <span className="font-medium align-middle">En az süre ve en az yanlışla bitirdiğin skorlar "Rekorlar" kısmında ölümsüzleşir!</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
