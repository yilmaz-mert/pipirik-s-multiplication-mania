import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function MeydanResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { time = 0, correct = 0, wrong = 0 } = location.state || {};

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 pb-20">
      <h1 className="text-[32px] font-extrabold font-poppins text-tema-yazi mb-8 text-center">
        SONUÇ
      </h1>

      <div className="bg-tema-kutu w-full max-w-83.75 p-8 rounded-[20px] shadow-sm mb-10 flex flex-col items-center gap-6">
        
        <div className="flex flex-col items-center">
          <span className="text-lg font-poppins text-tema-yazi mb-1">Tamamlama Süren</span>
          <span className="text-[40px] font-extrabold font-poppins text-tema-buton2 tracking-widest">
            {formatTime(time)}
          </span>
        </div>

        <div className="w-full flex justify-between px-4 mt-4">
          <div className="flex flex-col items-center">
            <span className="text-[24px] font-extrabold font-poppins text-[#155724]">{correct}</span>
            <span className="text-sm font-poppins text-tema-yazi">Doğru</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[24px] font-extrabold font-poppins text-[#721C24]">{wrong}</span>
            <span className="text-sm font-poppins text-tema-yazi">Yanlış</span>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-4">
        <button
          onClick={() => navigate('/meydan-oyun')}
          className="w-[80%] max-w-75 h-14 bg-tema-buton2 text-tema-yazi font-poppins font-extrabold text-[20px] rounded-[15px] shadow-sm active:scale-95 transition-all"
        >
          Tekrar Oyna
        </button>
        <button
          onClick={() => navigate('/')}
          className="w-[80%] max-w-75 h-14 bg-tema-kutu text-tema-yazi font-poppins font-extrabold text-[20px] rounded-[15px] shadow-sm active:scale-95 transition-all"
        >
          Ana Menü
        </button>
      </div>
    </div>
  );
}