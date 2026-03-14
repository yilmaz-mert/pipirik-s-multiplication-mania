import React, { memo } from 'react';

// memo: Props değişmediği sürece bileşeni re-render etmez (Performans)
const ResultStats = memo(({ correct = 0, wrong = 0 }) => {
  return (
    <section 
      className="w-full flex justify-center gap-[min(4vw,16px)] -mt-[1vh] shrink-0"
      aria-label="Oyun İstatistikleri"
    >
      {/* DOĞRU KUTUSU */}
      <div 
        className="flex items-center justify-center gap-[min(2vw,8px)] rounded-[20px] shadow-sm"
        role="status"
        aria-label={`${correct} doğru cevap`}
        style={{ 
          width: 'min(30.4vw, 114px)',
          aspectRatio: '114 / 26.72', 
          backgroundColor: 'var(--Tema-Mat-true, #51AE00)' 
        }}
      >
        <span className="font-poppins font-extrabold leading-[100%] text-center" style={{ fontSize: 'min(6.9vw, 26px)', color: '#FEF1D9' }}>
          {correct}
        </span>
        <span className="font-poppins font-extrabold leading-[100%] text-center uppercase" style={{ fontSize: 'min(3.7vw, 14px)', color: '#FEF1D9' }}>
          DOĞRU
        </span>
      </div>

      {/* YANLIŞ KUTUSU */}
      <div 
        className="flex items-center justify-center gap-[min(2vw,8px)] rounded-[20px] shadow-sm"
        role="status"
        aria-label={`${wrong} yanlış cevap`}
        style={{ 
          width: 'min(30.4vw, 114px)', 
          aspectRatio: '114 / 26.72', 
          backgroundColor: 'var(--Tema-Mat-false, #A50000)' 
        }}
      >
        <span className="font-poppins font-extrabold leading-[100%] text-center" style={{ fontSize: 'min(6.9vw, 26px)', color: '#FEF1D9' }}>
          {wrong}
        </span>
        <span className="font-poppins font-extrabold leading-[100%] text-center uppercase" style={{ fontSize: 'min(3.7vw, 14px)', color: '#FEF1D9' }}>
          YANLIŞ
        </span>
      </div>
    </section>
  );
});

// Geliştirme aşamasında debug kolaylığı sağlar
ResultStats.displayName = 'ResultStats';

export default ResultStats;