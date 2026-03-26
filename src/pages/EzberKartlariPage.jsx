// src/pages/EzberKartlariPage.jsx
import React from 'react';
import { useSearchParams } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars -- ESLint false positive: motion is used as <motion.div> JSX prefix
import { motion, AnimatePresence } from 'framer-motion';
import SnakeDecorator from '../components/SnakeDecorator';
import SelectionMenu from '../components/SelectionMenu';
import { TABLE_MENU_ITEMS } from '../constants';
import FlashcardDesktopContent from '../components/FlashcardDesktopContent';
import foxImage from '../assets/foxy.png';

const tableVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  exit: { opacity: 0, x: -20 },
};

const tableRowVariants = {
  hidden: { x: 20, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

export default function EzberKartlariPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedNumber = searchParams.get('sayi');
  const isDropdownOpen = !selectedNumber;

  return (
    <>
      {/* Mobile layout (hidden on desktop) */}
      <div className="lg:hidden relative w-full h-full flex flex-col items-center bg-tema-arka-plan overflow-hidden">
        <SnakeDecorator selectedNumber={selectedNumber} />

        <div className="relative z-10 w-full flex flex-col items-center" style={{ paddingTop: '15%' }}>
          <AnimatePresence mode="wait">
            {isDropdownOpen ? (
              <SelectionMenu
                key="list"
                items={TABLE_MENU_ITEMS}
                onSelect={(id) => setSearchParams({ sayi: id })}
                variant="nav"
                className="w-[80%] shadow-2xl rounded-[9px]"
                style={{ gap: '0.8vh', height: '40vh' }}
              />
            ) : (
              <motion.div
                key="table"
                variants={tableVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-[80%] flex flex-col shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] rounded-[9px] overflow-hidden"
                style={{ height: '40vh' }}
              >
                {[...Array(10)].map((_, index) => {
                  const multiplier = index + 1;
                  const result = parseInt(selectedNumber) * multiplier;
                  const isOrange = index % 2 === 1;
                  return (
                    <motion.div
                      key={multiplier}
                      variants={tableRowVariants}
                      className={`w-full flex items-center justify-center font-poppins font-bold text-[6.5vw] min-[512px]:text-[24px] ${isOrange ? 'bg-tema-kutu' : 'bg-tema-enak'}`}
                      style={{ height: isOrange ? '4.5vh' : '3.5vh' }}
                    >
                      {selectedNumber} x {multiplier} = {result}
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Desktop layout — full screen, pixel-perfect per Figma node 4012:130 */}
      {/* Reference frame: 1440×1024px. Desktop header (WaveHeader) is 100px. */}
      {/* All top values = Figma top − 100px. Horizontal positions use Figma calc() values. */}
      <div
        className="hidden lg:block w-full relative"
        style={{ minHeight: '924px' }} // Figma: 1024px − 100px header = 924px
      >
        {/* Decorative background blob — Figma node 4012:131 (BgBlob) */}
        {/* Figma: left=158, top=158 → top=58 (−100), w=1074, h=740 */}
        <div
          className="absolute pointer-events-none"
          aria-hidden="true"
          style={{ left: '158px', top: '58px', width: '1074px', height: '740px' }}
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 1074 740"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Approximated organic blob shape matching Figma BgBlob */}
            <path
              d="M900 80 C1020 30, 1074 190, 1050 370 C1026 550, 880 710, 680 728
                 C480 746, 180 690, 70 500 C-40 310, 30 90, 210 42
                 C390 -6, 780 130, 900 80Z"
              fill="#FAECA2"
              opacity="0.55"
            />
          </svg>
        </div>

        {/* Mascot fox — Figma node 4012:133 */}
        {/* Figma: left=72, top=348 → top=248 (−100), w=328, h=328 */}
        <img
          src={foxImage}
          alt=""
          aria-hidden="true"
          className="absolute pointer-events-none object-contain z-10"
          style={{ left: '72px', top: '248px', width: '328px', height: '328px' }}
        />

        {/* InnerCard shell — Figma node 4012:132 */}
        {/* Figma: left=calc(8.33%+160px)→280px@1440, top=212 → top=112 (−100), w=879, h=683 */}
        {/* 24px border (tema-kutu #F8971F), 16px radius, cream bg (tema-enak #F5E4C3) */}
        <div
          className="absolute"
          aria-hidden="true"
          style={{
            left: 'calc(8.33% + 160px)', // Figma: calc(8.33%+160px) → 280px@1440
            top: '112px',                 // Figma: 212px − 100px header = 112px
            width: '879px',
            height: '683px',
            border: '24px solid #F8971F', // Figma: border-24 tema-kutu
            borderRadius: '16px',
            backgroundColor: '#F5E4C3',   // Figma: bg-tema-enak
          }}
        />

        {/* Sidebar blur panel — Figma node 4012:138 (SidebarBlur) */}
        {/* Figma: left=calc(83.33%−20px)→1180px@1440, top=279 → top=179 (−100), w=100, h=548 */}
        <div
          className="absolute backdrop-blur-[2px] z-10"
          aria-hidden="true"
          style={{
            left: 'calc(83.33% - 20px)', // Figma: calc(83.33%−20px) → 1180px@1440
            top: '179px',                 // Figma: 279px − 100px header = 179px
            width: '100px',
            height: '548px',              // Figma: h-[548px]
            backgroundColor: 'rgba(250,236,162,0.25)', // Figma: bg-[rgba(250,236,162,0.25)]
            borderRadius: '0 16px 16px 0', // Figma: rounded-br-[16px] rounded-tr-[16px]
          }}
        />

        {/* Sidebar title "EZBER KARTLARI" — Figma node 4012:139 */}
        {/* Figma: centered at calc(83.33%+58.5px)→1259px@1440, top=244 → top=144 (−100) */}
        {/* Container: w=141, h=611, translateX(-50%) centers it at the left point */}
        <div
          className="absolute flex items-center justify-center z-10"
          aria-hidden="true"
          style={{
            left: 'calc(83.33% + 58.5px)', // Figma center x: calc(83.33%+58.5px) → 1259px@1440
            top: '144px',                    // Figma: 244px − 100px header = 144px
            width: '141px',
            height: '611px',
            transform: 'translateX(-50%)',   // Figma: -translate-x-1/2
          }}
        >
          <span
            style={{
              display: 'block',
              transform: 'rotate(-90deg)',
              whiteSpace: 'nowrap',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: '800',               // Figma: font-extrabold Outfit ExtraBold
              fontSize: '48px',                // Figma: text-[48px]
              color: 'rgba(248,151,31,0.6)',    // Figma: text-[rgba(248,151,31,0.6)]
              letterSpacing: '6.72px',         // Figma: tracking-[6.72px]
            }}
          >
            EZBER KARTLARI
          </span>
        </div>

        {/* Interactive flashcard content: selected area bg + multiplication table + tab buttons */}
        <FlashcardDesktopContent
          selected={selectedNumber ? parseInt(selectedNumber) : 2}
          onSelect={(n) => setSearchParams({ sayi: n })}
        />
      </div>
    </>
  );
}
