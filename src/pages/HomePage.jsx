import React from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { EzberSVG, SiraliSVG, MeydanSVG, TestSVG } from '../components/PuzzleIcons';
import foxImage from '../assets/foxy.png';
import PuzzleButton from '../components/PuzzleButton';
import YellowBlob from '../components/YellowBlob';

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
    <>
      {/* ───────────── Mobile layout (hidden on lg+) ───────────── */}
      <div className="lg:hidden w-full h-full relative flex flex-col items-center pb-10">
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

      {/* ───────────── Desktop layout (hidden below lg) ───────────── */}
      <div className="hidden lg:flex lg:w-full lg:min-h-[calc(100vh-100px)] lg:items-center lg:justify-center">

        {/* Relative wrapper — card, Fox, and YellowBlob are anchored together and
            move as one unit when the flex container centers them on any screen size. */}
        <div className="lg:relative lg:w-[920px] lg:h-[657px]">

          {/* YellowBlob — offset from wrapper top-left to match original Figma position
              (blob was at page left:158/top:158; card was at left:264/top:184 → delta: -106/-26) */}
          <YellowBlob className="lg:-left-[106px] lg:-top-[26px]" />

          {/* Fox mascot — anchored to wrapper, overflows left */}
          <motion.img
            src={foxImage}
            alt="Fox Mascot"
            animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="lg:absolute lg:w-[328px] lg:h-[328px] lg:-left-[192px] lg:top-[164px] lg:z-30 pointer-events-none object-contain drop-shadow-lg"
          />

        {/* Outer Card — orange */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:w-[920px] lg:h-[657px] lg:bg-[#F8971F] lg:rounded-[24px] lg:p-[17px_21px] lg:z-10"
        >

          {/* Inner Container — cream, fills the card interior */}
          <div className="lg:w-[878px] lg:h-[623px] lg:bg-[#F5E4C3] lg:rounded-[16px] lg:flex lg:justify-center lg:items-center">
            {/* Menu list — overlapping flex row to match Figma margin: 0 -21px */}
            <div className="lg:w-[878px] lg:h-[581px] lg:flex lg:flex-row lg:flex-wrap lg:justify-center lg:items-center lg:gap-x-4">

              {/* ── Button 1: EZBER KARTLARI ── */}
              <motion.button
                onClick={() => navigate('/ezber')}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 175, damping: 12 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="lg:w-[374px] lg:h-[282px] relative z-10 cursor-pointer border-none bg-transparent p-0"
              >
                <svg
                  className="absolute inset-0 w-full h-full -z-10 drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
                  viewBox="0 0 382 290" fill="none" xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path d="M4 251.161V9C4 4.02944 8.02944 0 13 0H368.561C373.7 0 377.773 4.29445 376.994 9.37364C374.844 23.3849 369.074 45.0824 356.613 63.1008C336.871 91.6465 295.194 108.674 356.613 194.811C418.032 280.949 189.355 190.304 118.065 253.906C63.0105 303.022 21.2426 277.068 5.586 256.139C4.51424 254.706 4 252.95 4 251.161Z" fill="#F8971F"/>
                </svg>
                <span className="absolute inset-0 z-10 flex items-center justify-center lg:font-['Poppins'] lg:font-[900] lg:text-[40px] lg:leading-[60px] text-[#F5E4C3] text-center select-none whitespace-pre-line">
                  {'EZBER\nKARTLARI'}
                </span>
              </motion.button>

              {/* ── Button 2: SIRALI TEST ── */}
              <motion.button
                onClick={() => navigate('/sirali')}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 175, damping: 12 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="lg:w-[359px] lg:h-[280px] relative z-10 cursor-pointer border-none bg-transparent p-0"
              >
                <svg
                  className="absolute inset-0 w-full h-full -z-10 drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
                  viewBox="0 0 368 289" fill="none" xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path d="M354.372 0H69.7966C68.5276 0 67.2391 0.223587 66.2508 1.01948C61.4511 4.88456 55.3613 17.3011 60.3716 44.5C67.3716 82.5 14.3716 90 4.87163 132C-1.38256 159.65 27.374 172.65 47.8717 199C58.5096 212.675 60.1842 240.175 67.8716 253.5C90.3716 292.5 207.872 218.5 260.872 266.5C302.334 304.051 344.944 257.004 362.238 227.007C362.999 225.687 363.372 224.201 363.372 222.677V9C363.372 4.02944 359.342 0 354.372 0Z" fill="#F8971F"/>
                </svg>
                <span className="absolute inset-0 z-10 flex items-center justify-center lg:font-['Poppins'] lg:font-[900] lg:text-[40px] lg:leading-[60px] text-[#F5E4C3] text-center select-none whitespace-pre-line">
                  {'SIRALI\nTEST'}
                </span>
              </motion.button>

              {/* ── Button 3: MEYDAN OKUMA ── */}
              <motion.button
                onClick={() => navigate('/meydan')}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: 'spring', stiffness: 175, damping: 12 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="lg:w-[360px] lg:h-[298px] relative z-10 cursor-pointer border-none bg-transparent p-0"
              >
                <svg
                  className="absolute inset-0 w-full h-full -z-10 drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
                  viewBox="0 0 368 306" fill="none" xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path d="M4 289V59.7817V47.6933C4 41.7133 9.68427 37.5214 15.3652 39.3889C26.1486 42.9337 45.076 49.2942 75.5208 59.7817C136.539 80.8009 106.53 30.2547 181.051 6.23266C255.573 -17.7893 241.069 35.7597 316.591 30.2547C375.691 25.9467 364.633 51.6159 351.014 65.8535C350.413 66.482 349.718 66.9922 348.959 67.4171C334.382 75.5789 305.821 96.4421 299.586 119.837C291.584 149.864 299.586 151.366 350.101 211.421C390.073 258.943 334.494 288.511 300.691 297.705C299.947 297.907 299.195 298 298.424 298H13C8.02944 298 4 293.971 4 289Z" fill="#F8971F"/>
                </svg>
                <span className="absolute inset-0 z-10 flex items-center justify-center lg:font-['Poppins'] lg:font-[900] lg:text-[40px] lg:leading-[60px] text-[#F5E4C3] text-center select-none whitespace-pre-line">
                  {'MEYDAN\nOKUMA'}
                </span>
              </motion.button>

              {/* ── Button 4: SEÇİMLİ TEST ── */}
              <motion.button
                onClick={() => navigate('/secimli')}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, type: 'spring', stiffness: 175, damping: 12 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="lg:w-[370px] lg:h-[299px] relative z-10 cursor-pointer border-none bg-transparent p-0"
              >
                <svg
                  className="absolute inset-0 w-full h-full -z-10 drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
                  viewBox="0 0 378 307" fill="none" xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path d="M279.035 48.7585C297.758 64.4667 333.811 46.2401 358.582 28.7742C364.855 24.3505 374 28.685 374 36.3615V290C374 294.971 369.971 299 365 299H32.3126C23.5483 299 19.7714 287.511 26.5088 281.905C50.5983 261.863 81.5174 229.844 82.9697 194.352C85.4688 133.278 0.137763 144.964 4.13629 108.752C6.31869 88.987 53.9667 29.8283 82.9697 53.0234C109.097 73.9186 150.913 51.9175 166.077 12.006C178.98 -21.9564 250.046 24.437 279.035 48.7585Z" fill="#F8971F"/>
                </svg>
                <span className="absolute inset-0 z-10 flex items-center justify-center lg:font-['Poppins'] lg:font-[900] lg:text-[40px] lg:leading-[60px] text-[#F5E4C3] text-center select-none whitespace-pre-line">
                  {'SEÇİMLİ\nTEST'}
                </span>
              </motion.button>

            </div>
          </div>
        </motion.div>

        </div>{/* end relative wrapper */}
      </div>
    </>
  );
}
