import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/useGameStore';

export default function MeydanPage() {
  const navigate = useNavigate();
  // Store'dan geçmiş rekorları çekiyoruz
  const { records } = useGameStore();

  // En iyi 3 rekoru listelemek için
  const displayRecords = records.slice(0, 3);
  const headerTextStyle = "text-center font-poppins font-black text-[13px] text-tema-yazi uppercase leading-[150%] tracking-[0.21em]";
  const rowTextStyle = "text-center font-poppins font-extrabold text-[18px] text-tema-yazi uppercase leading-[150%] tracking-[0.1em]";

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col items-center">
      
      {/* --- REKOR GRUBU (BAŞLIK + KUTU) --- */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center w-[89.33%]"
        style={{ top: '5%' }} 
      >
        {/* REKOR Başlık Sekmesi */}
        <div 
          className="bg-tema-kutu rounded-t-[9px] flex items-center justify-center z-10"
          style={{ 
            width: '33.6%', 
            aspectRatio: '126/27',
            marginBottom: '-1px' 
          }}
        >
          <span className="font-poppins font-black text-[20px] leading-[150%] tracking-[0.21em] text-tema-yazi">
            REKOR
          </span>
        </div>

        {/* REKOR Gövde Kutusu */}
        <div 
          className="w-full bg-tema-kutu rounded-[9px] flex flex-col items-center pt-[2.4%] px-[2.4%] pb-[3%] shadow-sm"
          style={{ 
            aspectRatio: '335/224' 
          }}
        >
          {/* SÜRE-DOĞRU-YANLIŞ Başlık Satırı */}
          <div 
          className="flex w-full items-center rounded-t-[9px] gap-[5.01%]"
          style={{ height: '17.13%' }} // Toplam gövde yüksekliğine oranlı
          >
          <div className={`flex-1 h-full flex items-center justify-center font-extrabold text-[20px] tracking-wider bg-tema-secili/20 rounded-t-[9px] ${headerTextStyle}`}>
              Süre
          </div>
          <div className={`flex-1 h-full flex items-center justify-center font-extrabold text-[20px] tracking-wider bg-tema-secili/20 rounded-t-[9px] ${headerTextStyle}`}>
              Doğru
          </div>
          <div className={`flex-1 h-full flex items-center justify-center font-extrabold text-[20px] tracking-wider bg-tema-secili/20 rounded-t-[9px] ${headerTextStyle}`}>
              Yanlış
          </div>
          </div>

          {/* Veri Satırları Alanı */}
          <div className="flex flex-col w-full flex-1 rounded-b-[9px] overflow-hidden shadow-inner">
            {[0, 1, 2].map((idx) => {
              const record = displayRecords[idx];
              // Satır renkleri (Açık ve koyu sarı geçişli)
              const rowBg = idx % 2 === 0 ? '#F5E4C3' : '#F9C261';

              return (
                <div 
                  key={idx} 
                  className="grid grid-cols-3 w-full items-center h-1/3 border-b border-black/5 last:border-0"
                  style={{ backgroundColor: rowBg }}
                >
                  {record ? (
                    <>
                      <span className={rowTextStyle}>{record.time}</span>
                      <span className={rowTextStyle}>{record.correct}</span>
                      <span className={rowTextStyle}>{record.wrong}</span>
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
          </div>
        </div>
      </div>

      {/* --- BUTONLAR --- */}
      <button
        onClick={() => navigate('/meydan-oyun')}
        className="absolute bg-tema-buton2 rounded-[30px] flex items-center justify-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] active:scale-95 transition-transform left-1/2 -translate-x-1/2"
        style={{ 
          width: '53.8%', 
          aspectRatio: '201.85/72.39', 
          top: '54%' 
        }}
      >
        <span className="font-poppins font-extrabold text-[40px] text-tema-enak uppercase tracking-wider">Başla</span>
      </button>

      <button
        className="absolute bg-tema-kutu rounded-[10px] flex items-center justify-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] active:scale-95 transition-transform left-1/2 -translate-x-1/2"
        style={{ 
          width: '33.8%', 
          aspectRatio: '127/44', 
          top: '70%' 
        }}
      >
        <span className="font-poppins font-extrabold text-[24px] text-tema-enak uppercase">İpucu</span>
      </button>
      
    </div>
  );
}