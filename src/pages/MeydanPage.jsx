import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/useGameStore';

export default function MeydanPage() {
  const navigate = useNavigate();
  // Store'dan geçmiş rekorları çekiyoruz
  const { records } = useGameStore();

  // En iyi 3 rekoru listelemek için
  const displayRecords = records.slice(0, 3);
  
  // YAZI STİLLERİ GÜNCELLENDİ: px yerine min(vw, px) kullanarak esnek hale getirildi
  const headerTextStyle = "text-center font-poppins font-black text-[min(4vw,16px)] text-tema-yazi uppercase leading-[150%] tracking-[0.15em]";
  const rowTextStyle = "text-center font-poppins font-extrabold text-[min(5vw,20px)] text-tema-yazi uppercase leading-[150%] tracking-[0.05em]";

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col items-center">
      
      {/* --- REKOR GRUBU (BAŞLIK + KUTU) --- */}
      {/* Maksimum bir genişlik eklendi ki dev ekranlarda çok fazla uzamasın (max-w-[500px] gibi çalışır) */}
      <div className="flex flex-col items-center w-[min(89.33%,450px)] mt-[5vh]">
        
        {/* REKOR Başlık Sekmesi */}
        <div 
          className="bg-tema-kutu rounded-t-[9px] flex items-center justify-center z-10 w-[33.6%] aspect-126/27 -mb-px"
        >
          {/* Yazı boyutu esnek yapıldı */}
          <span className="font-poppins font-black text-[min(4.5vw,20px)] leading-[150%] tracking-[0.21em] text-tema-yazi">
            REKOR
          </span>
        </div>

        {/* REKOR Gövde Kutusu */}
        <div className="w-full bg-tema-kutu rounded-[9px] flex flex-col items-center pt-[2.4%] px-[2.4%] pb-[3%] shadow-sm aspect-335/224">
          
          {/* SÜRE-DOĞRU-YANLIŞ Başlık Satırı */}
          {/* Hatalı 'text-[20px]' çakışması kaldırıldı, sadece headerTextStyle kullanılıyor */}
          <div className="flex w-full items-center rounded-t-[9px] gap-[5.01%] h-[17.13%]">
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

      {/* --- BUTONLAR GRUBU --- */}
      <div className="flex flex-col items-center w-full mt-[min(4vh,30px)] mb-[5vh]">
        
        {/* BAŞLA BUTONU */}
        <button
          onClick={() => navigate('/meydan-oyun')}
          className="w-[min(54vw,220px)] aspect-202/72 flex items-center justify-center bg-tema-buton2 rounded-[30px] shadow-md active:scale-95 transition-transform"
        >
          <span className="font-poppins font-extrabold text-[min(9.5vw,40px)] text-tema-enak uppercase tracking-wider">
            Başla
          </span>
        </button>

        {/* İPUCU BUTONU */}
        <button
          className="w-[min(34vw,135px)] aspect-127/44 flex items-center justify-center bg-tema-kutu rounded-[10px] shadow-md active:scale-95 transition-transform mt-[2vh]"
        >
          <span className="font-poppins font-extrabold text-[min(6vw,24px)] text-tema-enak uppercase">
            İpucu
          </span>
        </button>

      </div>
      
    </div>
  );
}