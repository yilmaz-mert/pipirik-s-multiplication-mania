import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/useGameStore';
import foxyHint from '../assets/foxy_hint.png';
import foxImage from '../assets/foxy.png';
import { History, Ban, X, ZoomIn, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RecordsTable from '../components/RecordsTable';
import YellowBlob from '../components/YellowBlob';
import GameActionButton from '../components/GameActionButton';

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
          <GameActionButton onClick={() => navigate('/meydan-oyun')} />

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
              className="absolute bg-[#F5E4C3] rounded-[9px] border-4 border-[#F8971F] shadow-[0px_2px_12px_rgba(0,0,0,0.1)] z-10"
              style={{ left: '77px', top: '55px', width: '335px', height: '604px' }}
            >
              {/* Pin — anchored to the top-right corner of the hints card */}
              <div className="absolute -top-[26px] -right-[26px] w-[52px] h-[52px] rounded-full bg-[#F8971F] flex items-center justify-center z-20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_162_411)">
                    <path d="M1.49999 24.0084C1.69714 24.0088 1.89241 23.9702 2.07452 23.8946C2.25664 23.8191 2.42198 23.7082 2.56099 23.5684L8.51099 17.6144L9.23899 18.3674C10.2062 19.3828 11.5371 19.9727 12.939 20.0074C13.4216 20.0083 13.9008 19.9268 14.356 19.7664C15.063 19.517 15.684 19.0706 16.1457 18.4799C16.6075 17.8892 16.8907 17.1788 16.962 16.4324C17.0662 15.4476 16.994 14.452 16.749 13.4924L16.707 13.2924L20.095 9.90544L20.547 10.3584C20.8796 10.7079 21.3248 10.9287 21.8043 10.9821C22.2837 11.0356 22.7666 10.9181 23.168 10.6504C23.403 10.4825 23.5988 10.2655 23.7416 10.0144C23.8844 9.76324 23.9709 9.48407 23.995 9.1962C24.0192 8.90833 23.9805 8.61865 23.8815 8.34725C23.7826 8.07584 23.6258 7.8292 23.422 7.62444L16.455 0.641439C16.1224 0.292012 15.6772 0.0711438 15.1977 0.0177295C14.7183 -0.0356849 14.2353 0.0817802 13.834 0.349439C13.5989 0.517368 13.4032 0.734414 13.2604 0.985526C13.1176 1.23664 13.0311 1.51581 13.0069 1.80368C12.9828 2.09155 13.0215 2.38123 13.1205 2.65263C13.2194 2.92404 13.3762 3.17067 13.58 3.37544L14.1 3.90044L10.72 7.28144C9.73898 7.02437 8.71946 6.94745 7.71099 7.05444C6.93265 7.13448 6.19348 7.43557 5.58073 7.92215C4.96799 8.40873 4.50728 9.06048 4.25299 9.80044C3.97869 10.5543 3.92491 11.3707 4.09795 12.1541C4.27098 12.9374 4.66366 13.6552 5.22999 14.2234L6.42999 15.4594L0.438986 21.4484C0.229413 21.6583 0.0867439 21.9255 0.0290071 22.2164C-0.0287297 22.5073 0.00105733 22.8088 0.114604 23.0827C0.228151 23.3567 0.420361 23.5909 0.666945 23.7556C0.913529 23.9204 1.20342 24.0084 1.49999 24.0084ZM7.08099 10.8004C7.14751 10.5959 7.2719 10.4151 7.43909 10.2799C7.60628 10.1446 7.8091 10.0608 8.02299 10.0384C8.67836 9.96984 9.34075 10.0207 9.97799 10.1884L10.807 10.3994C11.0591 10.4637 11.3236 10.4612 11.5745 10.3923C11.8254 10.3234 12.054 10.1904 12.238 10.0064L16.22 6.02244L17.974 7.78244L14.01 11.7474C13.8337 11.9238 13.7042 12.1414 13.6331 12.3804C13.562 12.6194 13.5517 12.8724 13.603 13.1164L13.828 14.1794C13.9938 14.8126 14.0439 15.4705 13.976 16.1214C13.9665 16.3048 13.9017 16.481 13.7902 16.6268C13.6786 16.7727 13.5255 16.8813 13.351 16.9384C12.9919 17.0229 12.6163 17.0043 12.2673 16.8849C11.9183 16.7655 11.6101 16.5501 11.378 16.2634L7.36999 12.1184C7.20098 11.9493 7.08396 11.7353 7.03274 11.5017C6.98153 11.2681 6.99827 11.0248 7.08099 10.8004Z" fill="#130D3D"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_162_411">
                      <rect width="24" height="24" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="w-full h-full p-[22px] flex flex-col gap-[10px] overflow-y-auto">
                <p className="font-poppins font-semibold text-[14px] leading-[21px] text-center text-[#130D3D]">
                  Hızın ve dikkatin test ediliyor! En kısa sürede bitirip zirveye yerleşebilir misin? İşte kurallar:
                </p>

                <div className="flex flex-col space-y-6 font-poppins font-semibold text-[14px] leading-[21px] text-center text-[#130D3D]">
                  <p>
                    <span className="inline-flex align-middle mr-1 translate-y-[-1px]"><History size={14} strokeWidth={3} /></span>
                    <span className="italic font-extrabold">Süre İleri Akar:&nbsp; </span>
                    Oyun başladığı an süre işlemeye başlar. Hedefin, tüm soruları en kısa sürede tamamlamak!
                  </p>
                  <p>
                    <span className="inline-flex align-middle mr-1 translate-y-[-1px]"><Ban size={14} strokeWidth={3} /></span>
                    <span className="italic font-extrabold">Hata Sınırı ve Ceza:&nbsp; </span>
                    Her 3 yanlışta bir bitirme sürene ceza puanı (ek süre) eklenir. Dikkatli ol, yanlışlar seni yavaşlatır!
                  </p>
                  <p>
                    <span className="inline-flex align-middle mr-1 translate-y-[-1px]"><X size={14} strokeWidth={3} /></span>
                    <span className="italic font-extrabold">Pas Geçmek Yok:&nbsp; </span>
                    İlerlemek için her soruya bir yanıt vermelisin; stratejini iyi kur!
                  </p>
                  <p>
                    <span className="inline-flex align-middle mr-1 translate-y-[-1px]"><ZoomIn size={14} strokeWidth={3} /></span>
                    <span className="italic font-extrabold">Hata Takibi:&nbsp; </span>
                    Yaptığın tüm yanlışları ekranın bir köşesinden anlık olarak takip edebilirsin.
                  </p>
                  <p>
                    <span className="inline-flex align-middle mr-1 translate-y-[-1px]"><Rocket size={14} strokeWidth={3} /></span>
                    <span className="italic font-extrabold">En İyilerin Arasına Gir:&nbsp; </span>
                    En az süre ve en az yanlışla bitirdiğin skorlar "Rekorlar" kısmında ölümsüzleşir!
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

            {/* BAŞLA button */}
            <motion.div
              variants={panelVariants}
              className="absolute z-10"
              style={{ left: '606px', top: '552px' }}
            >
              <GameActionButton onClick={() => navigate('/meydan-oyun')} />
            </motion.div>

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
