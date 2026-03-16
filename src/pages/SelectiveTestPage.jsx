import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import InfoBox from '../components/InfoBox';
import SelectionMenu from '../components/SelectionMenu';
import { SELECTIVE_MENU_ITEMS } from '../constants';

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
    <div className="w-full h-full relative flex flex-col items-center overflow-x-hidden overflow-y-auto pb-10">
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
  );
}
