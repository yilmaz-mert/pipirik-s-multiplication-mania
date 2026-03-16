import React from 'react';
import { useSearchParams } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import SnakeDecorator from '../components/SnakeDecorator';
import SelectionMenu from '../components/SelectionMenu';
import { TABLE_MENU_ITEMS } from '../constants';

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
    <div className="relative w-full h-full flex flex-col items-center bg-tema-arka-plan overflow-hidden">
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
  );
}
