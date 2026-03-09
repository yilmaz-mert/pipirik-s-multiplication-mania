import React from 'react';
import { useSearchParams } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import SnakeDecorator from "../components/SnakeDecorator";

export default function EzberKartlariPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedNumber = searchParams.get('sayi');
  const isDropdownOpen = !selectedNumber;

  const numbers = [
    { val: 2, label: 'İKİLER' }, { val: 3, label: 'ÜÇLER' },
    { val: 4, label: 'DÖRTLER' }, { val: 5, label: 'BEŞLER' },
    { val: 6, label: 'ALTILAR' }, { val: 7, label: 'YEDİLER' },
    { val: 8, label: 'SEKİZLER' }, { val: 9, label: 'DOKUZLAR' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 } 
    },
    exit: { opacity: 0, x: -20 }
  };

  const itemVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center bg-tema-arka-plan overflow-hidden">
      
      {/* 1. YILAN KATMANI */}
      <SnakeDecorator selectedNumber={selectedNumber} />

      <div className="relative z-10 w-full flex flex-col items-center" style={{ paddingTop: '15%' }}>
        <AnimatePresence mode="wait">
          {isDropdownOpen ? (
            <motion.div 
              key="list"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-[80%] flex flex-col shadow-2xl rounded-[9px]" 
              style={{ gap: '0.8vh', height: '40vh' }}
            >
              {numbers.map((num, idx) => (
                <motion.button
                  key={num.val}
                  variants={itemVariants}
                  onClick={() => setSearchParams({ sayi: num.val })}
                  className={`w-full bg-tema-kutu text-tema-yazi font-poppins font-bold uppercase text-[5.4vw] min-[512px]:text-[24px] leading-none text-center shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] active:scale-95 flex items-center justify-center h-[5vh]
                    ${idx === 0 ? 'rounded-t-[9px]' : ''}
                    ${idx === numbers.length - 1 ? 'rounded-b-[9px]' : ''}
                  `}
                >
                  {num.label}
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="table"
              variants={containerVariants}
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
                    variants={itemVariants}
                    className={`w-full flex items-center justify-center font-poppins font-bold text-[6.5vw] min-[512px]:text-[24px]
                      ${isOrange ? 'bg-tema-kutu' : 'bg-tema-enak'}`}
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
  );
}