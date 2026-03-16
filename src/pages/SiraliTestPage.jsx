import React from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import InfoBox from '../components/InfoBox';
import { STAR_MENU_ITEMS } from '../constants';

export default function SiraliTestPage() {
  const navigate = useNavigate();

  const handleStarClick = (id) => {
    navigate('/sirali-oyun', { state: { selected: [id] } });
  };

  return (
    <div className="w-full h-full relative flex flex-col items-center overflow-x-hidden overflow-y-auto pb-10 pt-12 px-4">
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
  );
}
