import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import InfoBox from '../components/InfoBox';
import SelectionMenu from '../components/SelectionMenu';
import YellowBlob from '../components/YellowBlob';
import { SELECTIVE_MENU_ITEMS } from '../constants';
import foxImage from '../assets/foxy.png';

// Desktop button grid — first 3 rows (numbers 2–9).
// Widths are taken directly from Figma node measurements so the buttons
// auto-size to their text the same way the design does.
const DESKTOP_NUMBER_ROWS = [
  [
    { id: 2, label: 'İKİLER',  w: 192 },
    { id: 3, label: 'ÜÇLER',   w: 147 },
    { id: 4, label: 'DÖRTLER', w: 228 },
  ],
  [
    { id: 5, label: 'BEŞLER',  w: 139 },
    { id: 6, label: 'ALTILAR', w: 233 },
    { id: 7, label: 'YEDİLER', w: 196 },
  ],
  [
    { id: 8, label: 'SEKİZLER', w: 254 },
    { id: 9, label: 'DOKUZLAR', w: 334 },
  ],
];

export default function SelectiveTestPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);

  const toggleSelection = (id) => {
    if (id === 'mix') {
      setSelected(selected.includes('mix') ? [] : ['mix']);
      return;
    }
    let next = selected.filter((s) => s !== 'mix');
    next = next.includes(id) ? next.filter((s) => s !== id) : [...next, id];
    setSelected(next);
  };

  const handleStart = () => {
    if (selected.length === 0) {
      alert('Lütfen en az bir seçenek belirleyin!');
      return;
    }
    navigate('/secimli-oyun', { state: { selected } });
  };

  return (
    <>
      {/* ── Mobile layout (hidden on lg+) ── */}
      <div className="lg:hidden w-full h-full relative flex flex-col items-center overflow-x-hidden overflow-y-auto pb-10">
        <div className="relative z-20 w-[92%] max-w-90 flex flex-col items-center mt-2">
          <InfoBox className="w-full max-w-80.5 min-h-17 mb-6 shadow-md">
            Hangi sayıların çarpımını istiyorsun?
          </InfoBox>

          <div className="relative w-[85%] max-w-74.25 mb-6 flex flex-col items-center">
            <SelectionMenu
              items={SELECTIVE_MENU_ITEMS}
              selected={selected}
              onSelect={toggleSelection}
              variant="toggle"
              className="w-full aspect-297/359 p-2 bg-tema-kutu rounded-[9px] shadow-md overflow-hidden"
            />
          </div>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            onClick={handleStart}
            className="w-[min(34vw,135px)] aspect-127/44 flex justify-center items-center bg-tema-buton2 rounded-[10px] shadow-md transition-transform active:scale-95"
          >
            <span className="font-outfit font-black text-[min(6.4vw,24px)] tracking-wider text-tema-enak">
              BAŞLA
            </span>
          </motion.button>
        </div>
      </div>

      {/* ── Desktop layout (hidden below lg) ── */}
      <div className="hidden lg:flex lg:w-full lg:min-h-[calc(100vh-100px)] lg:items-center lg:justify-center">

        {/*
          Anchor wrapper — all decorative and card children use absolute
          positioning relative to this box.
          920×714px matches the Figma outer-card dimensions.
        */}
        <div className="lg:relative lg:w-[920px] lg:h-[714px]">

          {/* Yellow blob — same offsets used on HomePage & EzberKartlariPage */}
          <YellowBlob className="lg:-left-[106px] lg:-top-[26px]" />

          {/* Floating fox mascot.
              Offset = (Figma page coord) − (card's Figma page coord):
              page(72,348) − card(260,184) → (-188, 164) */}
          <motion.img
            src={foxImage}
            alt=""
            aria-hidden="true"
            animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-[328px] h-[328px] -left-[188px] top-[164px] z-30
                       pointer-events-none object-contain drop-shadow-lg will-change-transform"
          />

          {/* Orange outer card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="absolute inset-0 bg-[#F8971F] rounded-[24px]
                       shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] z-10"
          >
            {/* Cream inner card — inset: top 15px, left 20px, right 21px, bottom 16px */}
            <div
              className="absolute bg-[#F5E4C3] rounded-[16px]"
              style={{ top: '15px', left: '20px', right: '21px', bottom: '16px' }}
            >

              {/* Question bar */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
                className="absolute bg-[#F8971F] rounded-[21px] flex items-center justify-center"
                style={{ left: '32px', top: '52px', width: '816px', height: '80px' }}
              >
                <p className="font-poppins font-semibold text-[32px] text-[#130d3d] text-center leading-none">
                  Hangi sayıların çarpımını istiyorsun?
                </p>
              </motion.div>

              {/* Number button rows (2–9).
                  Each row is centered, 100px tall, 17px vertical gap → 117px pitch.
                  Horizontal gap between buttons: 20px. */}
              {DESKTOP_NUMBER_ROWS.map((row, rowIdx) => (
                <div
                  key={rowIdx}
                  className="absolute flex justify-center gap-x-5"
                  style={{ left: 0, right: 0, top: `${167 + rowIdx * 117}px`, height: '100px' }}
                >
                  {row.map(({ id, label, w }) => {
                    const isSelected = selected.includes(id);
                    return (
                      <motion.button
                        key={id}
                        onClick={() => toggleSelection(id)}
                        whileHover={{ scale: 1.04, transition: { type: 'tween', ease: 'easeOut', duration: 0.15 } }}
                        whileTap={{ scale: 0.95 }}
                        className={[
                          'h-[100px] rounded-[10px] flex items-center justify-center flex-shrink-0',
                          'font-poppins font-semibold text-[32px] leading-none transition-colors',
                          'shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]',
                          isSelected
                            ? 'bg-[#F5E4C3] border-4 border-[#F8971F] text-[#F8971F]'
                            : 'bg-[#F8971F] text-[#130d3d]',
                        ].join(' ')}
                        style={{ width: `${w}px` }}
                      >
                        {label}
                      </motion.button>
                    );
                  })}
                </div>
              ))}

              {/* Bottom row: KARIŞIK 20 SORU toggle + BAŞLA button */}
              <div
                className="absolute flex justify-center gap-x-5 items-center"
                style={{ left: 0, right: 0, top: '518px', height: '100px' }}
              >
                {/* Mix mode toggle button */}
                <motion.button
                  onClick={() => toggleSelection('mix')}
                  whileHover={{ scale: 1.04, transition: { type: 'tween', ease: 'easeOut', duration: 0.15 } }}
                  whileTap={{ scale: 0.95 }}
                  className={[
                    'h-[100px] w-[329px] rounded-[10px] flex items-center justify-center flex-shrink-0',
                    'font-poppins font-semibold text-[32px] leading-none transition-colors',
                    'shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]',
                    selected.includes('mix')
                      ? 'bg-[#F5E4C3] border-4 border-[#F8971F] text-[#F8971F]'
                      : 'bg-[#F8971F] text-[#130d3d]',
                  ].join(' ')}
                >
                  KARIŞIK 20 SORU
                </motion.button>

                {/* BAŞLA button — teal with dark border, Figma BaslaButton component */}
                <motion.button
                  onClick={handleStart}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.35 }}
                  whileHover={{ scale: 1.04, transition: { type: 'tween', ease: 'easeOut', duration: 0.15 } }}
                  whileTap={{ scale: 0.96 }}
                  className="h-[100px] w-[260px] rounded-[100px] flex items-center justify-center flex-shrink-0
                             bg-[#5F9CB8] border-4 border-[#130d3d]
                             shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                >
                  <span className="font-outfit font-black text-[48px] text-[#F5E4C3] tracking-[2.4px] leading-none">
                    BAŞLA
                  </span>
                </motion.button>
              </div>

            </div>{/* /inner card */}
          </motion.div>{/* /outer card */}

          {/* Sidebar blur strip — right edge of the outer card.
              Offset from outer card: left=920px, top=57px (matches Figma). */}
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
                fontSize: '64px',
                color: 'rgba(248,151,31,0.6)',
                letterSpacing: '8.96px',
              }}
            >
              SEÇİMLİ TEST
            </span>
          </motion.div>

        </div>
      </div>
    </>
  );
}
