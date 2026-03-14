import React, { useMemo, memo } from 'react';

const FeedbackSummary = memo(({ successRate = 0 }) => {
  // Profesyonel Dokunuş: useMemo kullanarak hesaplamaları sadece successRate değiştiğinde yaparız.
  const feedback = useMemo(() => {
    if (successRate >= 80) {
      return {
        text: "Çok İyi Bir İş Çıkardın!",
        numberColor: "#51AE00" // Yeşil
      };
    } else if (successRate >= 60) {
      return {
        text: "İyi deneme, biraz daha çalış!",
        numberColor: "#F8971F" // Turuncu
      };
    } else {
      return {
        text: "Tekrar denemek ister misin?",
        numberColor: "#A50000" // Kırmızı
      };
    }
  }, [successRate]);

  return (
    <div className="flex flex-col items-center space-y-[2vh] shrink-0">
      
      {/* GERİ BİLDİRİM METNİ */}
      <p 
        className="font-poppins font-bold leading-tight text-center" 
        style={{ fontSize: 'min(4.5vw, 18px)', color: '#130D3D' }}
        aria-live="polite" // Ekran okuyucular için dinamik metin uyarısı
      >
        {feedback.text}
      </p>
      
      {/* BAŞARI ORANI KUTUSU */}
      <div 
        className="flex items-center justify-center gap-[min(1.5vw,6px)] shadow-sm"
        role="meter"
        aria-valuenow={successRate}
        aria-valuemin="0"
        aria-valuemax="100"
        style={{ 
          width: 'min(36vw, 140px)', 
          aspectRatio: '140 / 40', 
          borderRadius: '100px',
          background: 'var(--Tema-Mat-ak-yaz-rengi, #FEF1D9)' 
        }}
      >
        <span 
          className="font-poppins font-extrabold leading-none text-center" 
          style={{ fontSize: 'min(5.5vw, 22px)', color: feedback.numberColor }}
        >
          %{successRate}
        </span>
        <span 
          className="font-poppins font-semibold leading-none text-center uppercase" 
          style={{ fontSize: 'min(3.5vw, 14px)', color: '#130D3D' }}
        >
          BAŞARI
        </span>
      </div>
    </div>
  );
});

FeedbackSummary.displayName = 'FeedbackSummary';

export default FeedbackSummary;