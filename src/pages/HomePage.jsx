import React from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { EzberSVG, SiraliSVG, MeydanSVG, TestSVG } from '../components/PuzzleIcons';
import foxImage from '../assets/foxy.png';
import PuzzleButton from '../components/PuzzleButton';

// Each puzzle button occupies a specific region of the card (Figma layout).
// position/size values are percentages of the card container.
const PUZZLE_BUTTONS = [
  {
    title: <><br />EZBER<br />KARTLARI</>,
    Icon: EzberSVG,
    style: { left: '1.68%', top: '5.08%', width: '56.04%', height: '46.50%' },
    textStyle: { width: '51%', height: '34%', left: '8.6%', top: '27%' },
    route: '/ezber',
    delay: 0.3,
  },
  {
    title: <><br />SIRALI<br />TEST</>,
    Icon: SiraliSVG,
    style: { left: '47.56%', top: '5.14%', width: '51.40%', height: '57.22%' },
    textStyle: { width: '35%', height: '28%', left: '49.6%', top: '24.2%' },
    route: '/sirali',
    delay: 0.5,
  },
  {
    title: <><br />MEYDAN<br />OKUMA</>,
    Icon: MeydanSVG,
    style: { left: '1.68%', top: '42.22%', width: '60.67%', height: '53.74%' },
    textStyle: { width: '42%', height: '30%', left: '14.4%', top: '43.3%' },
    route: '/meydan',
    delay: 0.7,
  },
  {
    title: <><br />SEÇİMLİ<br />TEST</>,
    Icon: TestSVG,
    style: { left: '44.21%', top: '32.86%', width: '55.34%', height: '64.17%' },
    textStyle: { width: '41%', height: '25%', left: '42.5%', top: '55.8%' },
    route: '/secimli',
    delay: 0.9,
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full relative flex flex-col items-center pb-10">
      <div className="relative w-[92%] mt-12 flex flex-col items-center">
        {/* Fox mascot — slides in from the left, then floats continuously */}
        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute z-20 w-[45%] aspect-square top-0 left-0 -translate-y-[60%] -translate-x-[5%] pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          >
            <img src={foxImage} alt="Fox Mascot" className="w-full h-full object-contain drop-shadow-lg" />
          </motion.div>
        </motion.div>

        {/* Main puzzle card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full aspect-356/374 bg-tema-vector shadow-md z-10 rounded-lg"
        >
          <div className="relative w-full h-full">
            {PUZZLE_BUTTONS.map(({ title, Icon, style, textStyle, route, delay }) => (
              <motion.div
                key={route}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay, type: 'spring', stiffness: 175, damping: 12 }}
                style={{ position: 'absolute', pointerEvents: 'none', ...style }}
              >
                <PuzzleButton
                  title={title}
                  Icon={Icon}
                  style={{ width: '100%', height: '100%' }}
                  textStyle={textStyle}
                  onClick={() => navigate(route)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
