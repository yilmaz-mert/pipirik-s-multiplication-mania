import React, { memo } from 'react';
import { ChevronRight } from 'lucide-react';

const MeydanActionButtons = memo(({ onNext, onMainMenu }) => {
  return (
    <div className="flex flex-col items-center w-full gap-[1.5vh] mt-auto pb-[4vh] space-y-[1.5vh] shrink-0">
      
      {/* İLERİ (REKORLAR) BUTONU */}
      <button
        onClick={onNext}
        className="flex items-center justify-center shadow-md active:scale-95 transition-transform"
        style={{ 
          width: '48px', 
          height: '48px', 
          borderRadius: '10px', 
          background: '#F8971F',
          border: 'none',
          cursor: 'pointer'
        }}
        aria-label="Rekorlar Sayfasına Git"
      >
        <ChevronRight 
          size={32} 
          strokeWidth={4} 
          style={{ color: '#130D3D' }} // Okun rengi
        />
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

MeydanActionButtons.displayName = 'MeydanActionButtons';

export default MeydanActionButtons;