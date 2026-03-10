import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/useGameStore';

export default function MeydanResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const hasSaved = useRef(false);
  const { time = 0, correct = 0, wrong = 0 } = location.state || {};
  const { records, addRecord } = useGameStore();
  const formatTime = (seconds) => {
    if (typeof seconds === 'string') return seconds;
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const currentTimeStr = formatTime(time);

  useEffect(() => {
    if (!hasSaved.current && (correct > 0 || wrong > 0)) {
      addRecord({
        time: currentTimeStr,
        timeSeconds: time,
        correct: correct,
        wrong: wrong
      });
      hasSaved.current = true;
    }
  }, [addRecord, correct, wrong, time, currentTimeStr]);
  

  const rankIndex = records.findIndex(
    (r) => r.time === currentTimeStr && r.correct === correct && r.wrong === wrong
  );
  
  const displayRecords = records.slice(0, 3);
  const isTopThree = rankIndex !== -1 && rankIndex < 3;
  const showExtraRow = !isTopThree;
  const headerTextStyle = "text-center font-poppins font-black text-[min(4vw,16px)] text-tema-yazi uppercase leading-[150%] tracking-[0.15em]";
  const rowTextStyle = "text-center font-poppins font-extrabold text-[min(5vw,20px)] text-tema-yazi uppercase leading-[150%] tracking-[0.05em]";

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col items-center">
      
      {/* --- REKOR GRUBU (BAŞLIK + KUTU) --- */}
      <div className="flex flex-col items-center w-[min(89.33%,450px)] mt-[5vh]">
        
        {/* SONUÇ Başlık Sekmesi */}
        <div 
          className="bg-tema-kutu rounded-t-[9px] flex items-center justify-center z-10 w-[33.6%] aspect-126/27 -mb-px"
        >
          <span className="font-poppins font-black text-[min(4.5vw,20px)] leading-[150%] tracking-[0.21em] text-tema-yazi">
            SONUÇ
          </span>
        </div>

        {/* REKOR Gövde */}
        <div 
          className={`w-full bg-tema-kutu rounded-[9px] flex flex-col items-center pt-[2.4%] px-[2.4%] pb-[3%] shadow-sm transition-all duration-300 ${
            showExtraRow ? 'h-auto' : 'aspect-335/224'
          }`}
        >
          
          {/* SÜRE-DOĞRU-YANLIŞ */}
          <div className={`flex w-full items-center rounded-t-[9px] gap-[5.01%] ${showExtraRow ? 'h-[min(11vw,44px)]' : 'h-[17.13%]'}`}>
            <div className={`flex-1 h-full flex items-center justify-center bg-tema-secili/20 rounded-t-[9px] ${headerTextStyle}`}>
                Süre
            </div>
            <div className={`flex-1 h-full flex items-center justify-center bg-tema-secili/20 rounded-t-[9px] ${headerTextStyle}`}>
                Doğru
            </div>
            <div className={`flex-1 h-full flex items-center justify-center bg-tema-secili/20 rounded-t-[9px] ${headerTextStyle}`}>
                Yanlış
            </div>
          </div>

          {/* Veri Satırları Alanı */}
          <div className="flex flex-col w-full flex-1 rounded-b-[9px] rounded-t-[9px] overflow-hidden shadow-inner">
            {[0, 1, 2].map((idx) => {
              const record = displayRecords[idx];
              const rowBg = idx % 2 === 0 ? '#F5E4C3' : '#F9C261';
              const bubbleBg = idx % 2 === 0 ? '#F9C261' : '#F5E4C3';
              const isCurrentResult = record && record.time === currentTimeStr && record.correct === correct && record.wrong === wrong;

              return (
                <div 
                  key={idx} 
                  className={`grid grid-cols-3 w-full items-center border-b border-black/5 last:border-0 py-[0.5vh] ${
                    showExtraRow ? 'h-auto' : 'flex-1'
                  }`}
                  style={{ backgroundColor: rowBg }}
                >
                  {record ? (
                    <>
                      {/* 1. SÜTUN: SÜRE */}
                      <div className="flex flex-col justify-center items-center h-full">
                        {/* DÜZELTME: h-[min(3vw,12px)] olan yer SIRA yazısıyla aynı boyuta (18px) çekildi */}
                        <div className="h-[min(4.5vw,18px)] mb-3" /> 
                        {isCurrentResult ? (
                          <div className="w-[min(19.5vw,73px)] aspect-73/36 rounded-2xl flex items-center justify-center shadow-sm" style={{ backgroundColor: bubbleBg }}>
                            <span className="font-poppins font-medium text-[min(4vw,18px)] text-tema-yazi uppercase">{record.time}</span>
                          </div>
                        ) : (
                          <span className="text-center font-poppins font-medium text-[min(5vw,20px)] text-tema-yazi uppercase leading-[150%] tracking-[0.05em]">{record.time}</span>
                        )}
                      </div>

                      {/* 2. SÜTUN: DOĞRU (SIRA YAZISI BURADA) */}
                      <div className="flex flex-col justify-center items-center h-full">
                        <span className="font-poppins font-bold text-[min(5vw,20px)] text-tema-yazi uppercase mb-3 leading-none">
                          {idx + 1}.SIRA
                        </span>
                        {isCurrentResult ? (
                          <div className="w-[min(19.5vw,73px)] aspect-73/36 rounded-2xl flex items-center justify-center shadow-sm" style={{ backgroundColor: bubbleBg }}>
                            <span className={rowTextStyle}>{record.correct}</span>
                          </div>
                        ) : (
                          <span className={rowTextStyle}>{record.correct}</span>
                        )}
                      </div>

                      {/* 3. SÜTUN: YANLIŞ */}
                      <div className="flex flex-col justify-center items-center h-full">
                        {/* DÜZELTME: h-[min(3vw,12px)] olan yer SIRA yazısıyla aynı boyuta (18px) çekildi */}
                        <div className="h-[min(4.5vw,18px)] mb-3" />
                        {isCurrentResult ? (
                          <div className="w-[min(19.5vw,73px)] aspect-73/36 rounded-2xl flex items-center justify-center shadow-sm" style={{ backgroundColor: bubbleBg }}>
                            <span className={rowTextStyle}>{record.wrong}</span>
                          </div>
                        ) : (
                          <span className={rowTextStyle}>{record.wrong}</span>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <span className={`${rowTextStyle} opacity-20`}>-</span>
                      <span className={`${rowTextStyle} opacity-20`}>-</span>
                      <span className={`${rowTextStyle} opacity-20`}>-</span>
                    </>
                  )}
                </div>
              );
            })}
            {/* LİSTEYE GİREMEDİĞİNDE GÖZÜKEN ÖZEL SATIR */}
            {showExtraRow && (
              <div 
                className="grid grid-cols-3 w-full items-center py-[1.0vh]" // İstediğin padding (py) burada eklendi
                style={{ backgroundColor: '#F9C261' }}
              >
                {/* SÜRE KUTUSU */}
                <div className="flex flex-col justify-center items-center h-full">
                  <div className="h-[min(3vw,12px)] mb-5" /> {/* Hizalama Spacers */}
                  <div className="w-[min(19.5vw,73px)] aspect-73/36 bg-tema-enak rounded-2xl flex items-center justify-center">
                    <span className="font-poppins font-medium text-[min(4vw,18px)] text-tema-yazi uppercase">
                      {currentTimeStr}
                    </span>
                  </div>
                </div>

                {/* DOĞRU KUTUSU */}
                <div className="flex flex-col justify-center items-center h-full">
                  {/* rankIndex + 1 ile gerçek sıralamanı (örn: 5.SIRA) yazdırıyoruz */}
                  <span className="font-poppins font-bold text-[min(5vw,20px)] text-tema-yazi uppercase mb-3 leading-none">
                    {rankIndex + 1}.SIRA
                  </span>
                  <div className="w-[min(19.5vw,73px)] aspect-73/36 bg-tema-enak rounded-2xl flex items-center justify-center">
                    <span className="font-poppins font-extrabold text-[min(4.5vw,20px)] text-tema-yazi uppercase">
                      {correct}
                    </span>
                  </div>
                </div>

                {/* YANLIŞ KUTUSU */}
                <div className="flex flex-col justify-center items-center h-full">
                  <div className="h-[min(3vw,12px)] mb-5" />
                  <div className="w-[min(19.5vw,73px)] aspect-73/36 bg-tema-enak rounded-2xl flex items-center justify-center">
                    <span className="font-poppins font-extrabold text-[min(4.5vw,20px)] text-tema-yazi uppercase">
                      {wrong}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- BUTONLAR GRUBU --- */}
      <div className="flex flex-col items-center w-full mt-[min(4vh,30px)] mb-[5vh]">
        
        {/* TEKRAR DENE BUTONU */}
        <button
          onClick={() => navigate('/meydan-oyun')}
          className="w-[min(53vw,199px)] aspect-199/44 flex items-center justify-center bg-tema-kutu rounded-[10px] shadow-md active:scale-95 transition-transform"
        >
          <span className="font-poppins font-extrabold text-[min(6vw,24px)] text-tema-enak uppercase tracking-wider text-center leading-tight">
            Tekrar Dene
          </span>
        </button>

        {/* ANA MENÜ BUTONU */}
        <button
          onClick={() => navigate('/')}
          className="w-[min(40vw,150px)] aspect-150/44 flex items-center justify-center bg-tema-buton2 rounded-[10px] shadow-md active:scale-95 transition-transform mt-[2vh]"
        >
          <span className="font-poppins font-extrabold text-[min(6vw,24px)] text-tema-enak uppercase text-center">
            Ana Menü
          </span>
        </button>

      </div>
      
    </div>
  );
}