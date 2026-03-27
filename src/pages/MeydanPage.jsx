import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/useGameStore';
import foxyHint from '../assets/foxy_hint.png';
import foxImage from '../assets/foxy.png';
import { History, Ban, X, ZoomIn, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RecordsTable from '../components/RecordsTable';
import YellowBlob from '../components/YellowBlob';

// Mobile: stagger container → children slide in from below
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

// Desktop: card entrance triggers staggered panel reveals
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut', staggerChildren: 0.1, delayChildren: 0.2 },
  },
};
const panelVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 250, damping: 22 } },
};

const RANK_LABELS = ['1.SIRA', '2.SIRA', '3.SIRA'];

export default function MeydanPage() {
  const navigate = useNavigate();
  const { records } = useGameStore();
  const [isHintModalOpen, setIsHintModalOpen] = useState(false);

  return (
    <>
      {/* ── Mobile layout (hidden on lg+) ── */}
      <motion.div
        className="lg:hidden w-full h-full relative overflow-hidden flex flex-col items-center"
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

      {/* ── Desktop layout (hidden below lg) ── */}
      <div className="hidden lg:flex lg:w-full lg:min-h-[calc(100vh-100px)] lg:items-center lg:justify-center">

        {/*
          Anchor wrapper — 920×714px matches the Figma outer card.
          All absolute children are positioned relative to this.
        */}
        <div className="lg:relative lg:w-[920px] lg:h-[714px]">

          {/* Yellow blob — identical offsets to all other pages */}
          <YellowBlob className="lg:-left-[106px] lg:-top-[26px]" />

          {/* Fox mascot — (page 72,348) − (card 260,184) → (-188, 164) */}
          <motion.img
            src={foxImage}
            alt=""
            aria-hidden="true"
            animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-[328px] h-[328px] -left-[188px] top-[164px] z-30
                       pointer-events-none object-contain drop-shadow-lg will-change-transform"
          />

          {/* Orange outer card — stagger children on entrance */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="absolute inset-0 bg-[#F8971F] rounded-[24px]
                       shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] z-10"
          >

            {/* Cream inner card — unified background for all content panels */}
            <div
              className="absolute bg-[#F5E4C3] rounded-[16px]"
              style={{ top: '15px', left: '20px', right: '21px', bottom: '16px' }}
            />

            {/*
              LEFT panel — hint rules displayed inline on desktop.
              Positioned at (77, 55) from outer card = (57, 40) within inner card.
              Same cream color as inner card; drop-shadow provides visual separation.
            */}
            <motion.div
              variants={panelVariants}
              className="absolute bg-[#F5E4C3] rounded-[12px] shadow-[0px_2px_12px_rgba(0,0,0,0.1)] z-10"
              style={{ left: '77px', top: '55px', width: '335px', height: '604px' }}
            >
              <div className="w-full h-full p-[22px] flex flex-col gap-[10px] overflow-y-auto">
                <p className="font-poppins font-semibold text-[13.5px] text-[#130d3d] text-center leading-snug">
                  Hızın ve dikkatin test ediliyor! En kısa sürede bitirip zirveye yerleşebilir misin? İşte kurallar:
                </p>

                <div className="flex flex-col gap-[10px] font-poppins text-[13px] text-[#130d3d] leading-snug">
                  <p>
                    <span className="inline-flex items-center gap-1 italic font-extrabold align-middle">
                      <History size={12} strokeWidth={3} />
                      {' Süre İleri Akar: '}
                    </span>
                    <span className="align-middle">Oyun başladığı an süre işlemeye başlar. Hedefin, tüm soruları en kısa sürede tamamlamak!</span>
                  </p>
                  <p>
                    <span className="inline-flex items-center gap-1 italic font-extrabold align-middle">
                      <Ban size={12} strokeWidth={3} />
                      {' Hata Sınırı ve Ceza: '}
                    </span>
                    <span className="align-middle">Her 3 yanlışta bir bitirme sürene ceza puanı (ek süre) eklenir. Dikkatli ol, yanlışlar seni yavaşlatır!</span>
                  </p>
                  <p>
                    <span className="inline-flex items-center gap-1 italic font-extrabold align-middle">
                      <X size={12} strokeWidth={3} />
                      {' Pas Geçmek Yok: '}
                    </span>
                    <span className="align-middle">İlerlemek için her soruya bir yanıt vermelisin; stratejini iyi kur!</span>
                  </p>
                  <p>
                    <span className="inline-flex items-center gap-1 italic font-extrabold align-middle">
                      <ZoomIn size={12} strokeWidth={3} />
                      {' Hata Takibi: '}
                    </span>
                    <span className="align-middle">Yaptığın tüm yanlışları ekranın bir köşesinden anlık olarak takip edebilirsin.</span>
                  </p>
                  <p>
                    <span className="inline-flex items-center gap-1 italic font-extrabold align-middle">
                      <Rocket size={12} strokeWidth={3} />
                      {' En İyilerin Arasına Gir: '}
                    </span>
                    <span className="align-middle">En az süre ve en az yanlışla bitirdiğin skorlar "Rekorlar" kısmında ölümsüzleşir!</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/*
              RIGHT panel — "REKOR" header tab.
              Centered above the records box (records box left=450, width=416 → center=658).
              Tab: left=580, width=156 → center=658 ✓
            */}
            <motion.div
              variants={panelVariants}
              className="absolute bg-[#F8971F] rounded-tl-[9px] rounded-tr-[9px]
                         flex items-center justify-center z-10"
              style={{ left: '580px', top: '57px', width: '156px', height: '55px' }}
            >
              <span className="font-poppins font-black text-[24px] text-[#130d3d] tracking-[5.04px]">
                REKOR
              </span>
            </motion.div>

            {/*
              RIGHT panel — Records leaderboard.
              Positions from Figma (all relative to outer card):
              left=450, top=102, w=416, h=409.
              Columns: SÜRE(120px) | gap(14px) | DOĞRU(129px) | gap(14px) | YANLIŞ(119px)
              with 10px padding on each side → total: 10+120+14+129+14+119+10 = 416px ✓
            */}
            <motion.div
              variants={panelVariants}
              className="absolute bg-[#F8971F] rounded-[9px]
                         shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] z-10"
              style={{ left: '450px', top: '102px', width: '416px', height: '409px' }}
            >
              {/* Column headers */}
              <div
                className="flex items-end pb-[6px]"
                style={{ height: '86px', paddingLeft: '10px', paddingRight: '10px' }}
              >
                <div className="font-poppins font-bold text-[24px] text-[#130d3d] text-center tracking-[2.4px]"
                     style={{ width: '120px' }}>SÜRE</div>
                <div style={{ width: '14px' }} />
                <div className="font-poppins font-bold text-[24px] text-[#130d3d] text-center tracking-[2.4px]"
                     style={{ width: '129px' }}>DOĞRU</div>
                <div style={{ width: '14px' }} />
                <div className="font-poppins font-bold text-[24px] text-[#130d3d] text-center tracking-[2.4px]"
                     style={{ width: '119px' }}>YANLIŞ</div>
              </div>

              {/* Data rows — alternating cream / yellow / cream */}
              {[0, 1, 2].map((idx) => {
                const record = records[idx];
                const rowBg = idx === 1 ? '#F9C261' : '#F5E4C3';
                return (
                  <div
                    key={idx}
                    className={`flex items-center
                      ${idx === 0 ? 'rounded-t-[9px]' : ''}
                      ${idx === 2 ? 'rounded-b-[9px]' : ''}`}
                    style={{ height: '101px', backgroundColor: rowBg, paddingLeft: '10px', paddingRight: '10px' }}
                  >
                    {/* SÜRE — elapsed time */}
                    <div className="flex items-center justify-center font-poppins font-medium text-[20px] text-[#130d3d]"
                         style={{ width: '120px' }}>
                      {record
                        ? record.time
                        : <span className="opacity-20 font-extrabold text-[24px]">-</span>}
                    </div>
                    <div style={{ width: '14px' }} />
                    {/* DOĞRU — rank label above, correct count below */}
                    <div className="flex flex-col items-center justify-center gap-[2px]"
                         style={{ width: '129px' }}>
                      <span className="font-poppins font-bold text-[18px] text-[#130d3d] tracking-[1px] leading-none">
                        {RANK_LABELS[idx]}
                      </span>
                      <span className={`font-poppins font-extrabold text-[24px] text-[#130d3d] leading-none ${!record ? 'opacity-20' : ''}`}>
                        {record ? record.correct : '-'}
                      </span>
                    </div>
                    <div style={{ width: '14px' }} />
                    {/* YANLIŞ — wrong count */}
                    <div className={`flex items-center justify-center font-poppins font-extrabold text-[20px] text-[#130d3d] ${!record ? 'opacity-20' : ''}`}
                         style={{ width: '119px' }}>
                      {record ? record.wrong : '-'}
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* BAŞLA button — same teal pill design as other pages */}
            <motion.button
              variants={panelVariants}
              onClick={() => navigate('/meydan-oyun')}
              whileHover={{ scale: 1.04, transition: { type: 'tween', ease: 'easeOut', duration: 0.15 } }}
              whileTap={{ scale: 0.96 }}
              className="absolute h-[100px] w-[260px] rounded-[100px] flex items-center justify-center
                         bg-[#5F9CB8] border-4 border-[#130d3d]
                         shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]
                         z-10 will-change-transform"
              style={{ left: '606px', top: '552px' }}
            >
              <span className="font-outfit font-black text-[48px] text-[#F5E4C3] tracking-[2.4px] leading-none">
                BAŞLA
              </span>
            </motion.button>

          </motion.div>{/* /outer card */}

          {/*
            Sidebar blur strip — right edge of the outer card.
            Font size reduced to 48px (vs 64px on other pages) since "MEYDAN OKUMA" is longer.
            Offset: left=920px, top=57px — same formula as other pages.
          */}
          <motion.div
            className="absolute backdrop-blur-[2px] bg-[rgba(250,236,162,0.25)] z-20
                       flex items-center justify-center"
            aria-hidden="true"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
            style={{
              left: '920px',
              top: '57px',
              width: '100px',
              height: '548px',
              borderRadius: '0 16px 16px 0',
            }}
          >
            <span
              style={{
                display: 'block',
                transform: 'rotate(-90deg)',
                whiteSpace: 'nowrap',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: '800',
                fontSize: '48px',
                color: 'rgba(248,151,31,0.6)',
                letterSpacing: '6.72px',
              }}
            >
              MEYDAN OKUMA
            </span>
          </motion.div>

        </div>
      </div>
    </>
  );
}
