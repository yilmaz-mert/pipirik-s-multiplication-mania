import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import InfoBox from '../components/InfoBox';
import YellowBlob from '../components/YellowBlob';
import { STAR_MENU_ITEMS } from '../constants';
import foxImage from '../assets/foxy.png';

// Desktop star grid — absolute positions relative to the outer card (0,0).
// Coordinates: (Figma page coord) − (card's Figma page coord: 260, 184).
// Sizes and text font-sizes match the 3 Figma star variants.
const DESKTOP_STARS = [
  { id: 2, label: "2'ler", size: 194, x: 156, y: 183, textSize: 32 },
  { id: 3, label: "3'ler", size: 159, x: 380, y: 190, textSize: 24 },
  { id: 4, label: "4'ler", size: 192, x: 572, y: 183, textSize: 32 },
  { id: 5, label: "5'ler", size: 159, x: 260, y: 349, textSize: 24 },
  { id: 6, label: "6'lar", size: 159, x: 501, y: 349, textSize: 24 },
  { id: 7, label: "7'ler", size: 194, x: 156, y: 489, textSize: 32 },
  { id: 8, label: "8'ler", size: 159, x: 380, y: 489, textSize: 24 },
  { id: 9, label: "9'lar", size: 192, x: 572, y: 489, textSize: 32 },
];

// Card entrance drives staggered star pop-ins via variants cascade
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: 'easeOut',
      staggerChildren: 0.06,
      delayChildren: 0.25,
    },
  },
};

const starVariants = {
  hidden: { opacity: 0, scale: 0, rotate: -30 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 280, damping: 12 },
  },
};

export default function SiraliTestPage() {
  const navigate = useNavigate();

  const handleStarClick = (id) => {
    navigate('/sirali-oyun', { state: { selected: [id] } });
  };

  return (
    <>
      {/* ── Mobile layout (hidden on lg+) ── */}
      <div className="lg:hidden w-full h-full relative flex flex-col items-center overflow-x-hidden overflow-y-auto pb-10 pt-12 px-4">
        <InfoBox className="w-full max-w-71.75 min-h-17.25 mb-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          Hangi sayının <br /> çarpımını istiyorsun?
        </InfoBox>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="w-full max-w-74.25 min-h-64.75 bg-tema-kutu rounded-[9px] relative p-5 drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
        >
          <div className="flex flex-wrap justify-center gap-x-2 gap-y-4 w-full h-full content-center">
            {STAR_MENU_ITEMS.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.3 + index * 0.08,
                  type: 'spring',
                  stiffness: 280,
                  damping: 12,
                }}
                onClick={() => handleStarClick(item.id)}
                className="relative w-19.75 h-19 flex items-center justify-center active:scale-90 hover:scale-110 group"
              >
                <svg
                  className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                  viewBox="0 0 79 76"
                  fill="#F5E4C3"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M33.7128 3.61297C35.8017 -1.20431 42.6333 -1.2043 44.7223 3.61298L51.3861 18.9804C52.2555 20.9853 54.1462 22.359 56.3217 22.5663L72.9962 24.1552C78.2232 24.6533 80.3343 31.1505 76.3983 34.6258L63.8423 45.7123C62.2041 47.1587 61.4819 49.3814 61.9571 51.5144L65.5986 67.8639C66.7402 72.989 61.2133 77.0045 56.6918 74.335L42.2679 65.8194C40.3861 64.7085 38.049 64.7085 36.1672 65.8194L21.7433 74.3351C17.2217 77.0045 11.6949 72.989 12.8364 67.8638L16.478 51.5144C16.9531 49.3814 16.2309 47.1587 14.5928 45.7123L2.03673 34.6258C-1.89926 31.1505 0.211823 24.6533 5.43884 24.1552L22.1134 22.5663C24.2888 22.359 26.1796 20.9853 27.049 18.9804L33.7128 3.61297Z" />
                </svg>
                <span className="relative z-10 font-outfit font-bold text-[14px] text-tema-yazi mt-1 drop-shadow-[0_1px_1px_rgba(19,13,61,0.2)]">
                  {item.label}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Desktop layout (hidden below lg) ── */}
      <div className="hidden lg:flex lg:w-full lg:min-h-[calc(100vh-100px)] lg:items-center lg:justify-center">

        {/*
          Anchor wrapper — 920×714px matches the Figma outer card.
          All decorative and content children are absolutely positioned here.
        */}
        <div className="lg:relative lg:w-[920px] lg:h-[714px]">

          {/* Yellow blob — identical offsets to HomePage & EzberKartlariPage */}
          <YellowBlob className="lg:-left-[106px] lg:-top-[26px]" />

          {/* Fox mascot — (page 72,348) − (card 260,184) → offset (-188, 164) */}
          <motion.img
            src={foxImage}
            alt=""
            aria-hidden="true"
            animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-[328px] h-[328px] -left-[188px] top-[164px] z-30
                       pointer-events-none object-contain drop-shadow-lg will-change-transform"
          />

          {/* Orange outer card — triggers staggered star animations via variants */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="absolute inset-0 bg-[#F8971F] rounded-[24px]
                       shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] z-10"
          >

            {/* Cream question bar — inset 20/21px horizontally, 57px from card top */}
            <div
              className="absolute bg-[#F5E4C3] rounded-[16px] flex items-center justify-center"
              style={{ left: '20px', right: '21px', top: '57px', height: '99px' }}
            >
              <p className="font-poppins font-semibold text-[32px] text-[#130d3d] text-center leading-none">
                Hangi sayının çarpımını istiyorsun?
              </p>
            </div>

            {/* Star buttons — each absolutely placed per Figma coordinates */}
            {DESKTOP_STARS.map(({ id, label, size, x, y, textSize }, index) => (
              <motion.button
                key={id}
                variants={starVariants}
                custom={index}
                onClick={() => handleStarClick(id)}
                whileHover={{
                  scale: 1.1,
                  transition: { type: 'tween', ease: 'easeOut', duration: 0.15 },
                }}
                whileTap={{ scale: 0.9 }}
                className="absolute flex items-center justify-center will-change-transform group"
                style={{ left: `${x}px`, top: `${y}px`, width: `${size}px`, height: `${size}px` }}
              >
                <svg
                  className="absolute inset-0 w-full h-full drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]
                             transition-all duration-200 group-hover:drop-shadow-[0_0_14px_rgba(255,255,255,0.65)]"
                  viewBox="0 0 79 76"
                  fill="#F5E4C3"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M33.7128 3.61297C35.8017 -1.20431 42.6333 -1.2043 44.7223 3.61298L51.3861 18.9804C52.2555 20.9853 54.1462 22.359 56.3217 22.5663L72.9962 24.1552C78.2232 24.6533 80.3343 31.1505 76.3983 34.6258L63.8423 45.7123C62.2041 47.1587 61.4819 49.3814 61.9571 51.5144L65.5986 67.8639C66.7402 72.989 61.2133 77.0045 56.6918 74.335L42.2679 65.8194C40.3861 64.7085 38.049 64.7085 36.1672 65.8194L21.7433 74.3351C17.2217 77.0045 11.6949 72.989 12.8364 67.8638L16.478 51.5144C16.9531 49.3814 16.2309 47.1587 14.5928 45.7123L2.03673 34.6258C-1.89926 31.1505 0.211823 24.6533 5.43884 24.1552L22.1134 22.5663C24.2888 22.359 26.1796 20.9853 27.049 18.9804L33.7128 3.61297Z" />
                </svg>
                <span
                  className="relative z-10 font-poppins font-black text-[#130d3d] text-center
                             drop-shadow-[0_1px_1px_rgba(19,13,61,0.15)] leading-none"
                  style={{ fontSize: `${textSize}px` }}
                >
                  {label}
                </span>
              </motion.button>
            ))}

          </motion.div>{/* /outer card */}

          {/* Sidebar blur strip — right edge of card: left=920px, top=57px */}
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
              SIRALI TEST
            </span>
          </motion.div>

        </div>
      </div>
    </>
  );
}
