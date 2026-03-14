import React, { memo } from 'react';

const ActionButtons = memo(({ onRetry, onMainMenu }) => {
  return (
    <div className="flex flex-col items-center w-full gap-[1.5vh] mt-auto pb-[4vh] space-y-[1.5vh] shrink-0">
      
      {/* TEKRAR DENE BUTONU */}
      <button
        onClick={onRetry}
        className="w-[min(53vw,199px)] aspect-199/44 flex items-center justify-center bg-tema-kutu rounded-[10px] shadow-md active:scale-95 transition-transform"
        aria-label="Oyunu Tekrar Başlat"
      >
        <span className="font-poppins font-extrabold text-[min(6vw,24px)] text-tema-enak uppercase tracking-wider">
          Tekrar Dene
        </span>
      </button>

      {/* ANA MENÜ BUTONU */}
      <button
        onClick={onMainMenu}
        className="w-[min(40vw,150px)] aspect-150/44 flex items-center justify-center bg-tema-buton2 rounded-[10px] shadow-md active:scale-95 transition-transform"
        aria-label="Ana Menüye Dön"
      >
        <span className="font-poppins font-extrabold text-[min(6vw,24px)] text-tema-enak uppercase">
          Ana Menü
        </span>
      </button>
    </div>
  );
});

ActionButtons.displayName = 'ActionButtons';

export default ActionButtons;