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
import YellowBlob from '../components/YellowBlob';

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

      {/* Desktop layout — flex-centered, responsive. All decoratives anchored to the relative wrapper. */}
      <div className="hidden lg:flex lg:w-full lg:min-h-[calc(100vh-100px)] lg:items-center lg:justify-center">

        {/* Relative wrapper — sized to the card (879×683). Fox, blob, and sidebar are positioned
            relative to this wrapper so they move together as one unit on any screen size.
            Offsets computed as: (Figma page coord − 100px header) − (card's page coord).
            Card page coords: left≈280px@1440, top=112px. */}
        <div className="lg:relative lg:w-[879px] lg:h-[683px]">

          {/* Decorative background blob — uses YellowBlob component, identical offset to HomePage.
              Both pages share Figma blob origin (158, 158). Offset matches HomePage's lg:-left-[106px]
              lg:-top-[26px] so the blob appears in the same visual relationship to the card on both pages. */}
          <YellowBlob className="lg:-left-[106px] lg:-top-[26px]" />

          {/* Mascot fox — Figma node 4012:133 */}
          {/* Outer motion.div handles entry (slide from left); inner motion.img handles continuous float */}
          {/* Offset from wrapper: left=72−280=−208, top=248−112=136 */}
          <motion.div
            className="absolute pointer-events-none z-10"
            style={{ left: '-208px', top: '136px', width: '328px', height: '328px' }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          >
            <motion.img
              src={foxImage}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-contain will-change-transform"
              animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            />
          </motion.div>

          {/* InnerCard shell — Figma node 4012:132 */}
          {/* The wrapper IS the card: left=0, top=0, 879×683 with 24px orange border */}
          <motion.div
            className="absolute inset-0"
            aria-hidden="true"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            style={{
              border: '24px solid #F8971F',
              borderRadius: '16px',
              backgroundColor: '#F5E4C3',
            }}
          />

          {/* Sidebar — flush with card right edge (left=879px), text centered within panel */}
          {/* SidebarBlur (node 4012:138) + SidebarTitle (node 4012:139) merged into one element */}
          {/* top=67px (179−112), height=548px — nearly vertically symmetric within the 683px wrapper */}
          <motion.div
            className="absolute backdrop-blur-[2px] z-10 flex items-center justify-center"
            aria-hidden="true"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
            style={{
              left: '879px',
              top: '67px',
              width: '100px',
              height: '548px',
              backgroundColor: 'rgba(250,236,162,0.25)',
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
              EZBER KARTLARI
            </span>
          </motion.div>

          {/* Interactive flashcard content — fills the wrapper (879×683) */}
          <FlashcardDesktopContent
            selected={selectedNumber ? parseInt(selectedNumber) : 2}
            onSelect={(n) => setSearchParams({ sayi: n })}
          />

        </div>{/* end relative wrapper */}
      </div>
    </>
  );
}
