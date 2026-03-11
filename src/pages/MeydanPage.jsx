import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/useGameStore';
import foxyHint from '../assets/foxy_hint.png';
// İkonları import ediyoruz
import { History, Ban, X, ZoomIn, Rocket } from 'lucide-react';

export default function MeydanPage() {
  const navigate = useNavigate(); //
  const { records } = useGameStore(); //
  const [isHintModalOpen, setIsHintModalOpen] = useState(false);

  const displayRecords = records.slice(0, 3); //
  
  const headerTextStyle = "text-center font-poppins font-extrabold text-[min(5vw,20px)] text-tema-yazi uppercase leading-[150%] tracking-[0.15em]";
  const rowTextStyle = "text-center font-poppins font-extrabold text-[min(5vw,20px)] text-tema-yazi uppercase leading-[150%] tracking-[0.05em]";

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col items-center">
      
      {/* --- REKOR GRUBU --- */}
      <div className="flex flex-col items-center w-[min(89.33%,450px)] mt-[5vh]">
        <div className="bg-tema-kutu rounded-t-[9px] flex items-center justify-center z-10 w-[33.6%] aspect-126/27 -mb-px">
          <span className="font-poppins font-black text-[min(5vw,20px)] leading-[150%] tracking-[0.21em] text-tema-yazi">
            REKOR
          </span>
        </div>

        <div className="w-full bg-tema-kutu rounded-[9px] flex flex-col items-center pt-[2.4%] px-[2.4%] pb-[3%] shadow-sm aspect-335/224">
          <div className="flex w-full items-center rounded-t-[9px] gap-[5.01%] h-[17.13%]">
            <div className={`flex-1 h-full flex items-center justify-center bg-tema-secili/20 rounded-t-[9px] ${headerTextStyle}`}>Süre</div>
            <div className={`flex-1 h-full flex items-center justify-center bg-tema-secili/20 rounded-t-[9px] ${headerTextStyle}`}>Doğru</div>
            <div className={`flex-1 h-full flex items-center justify-center bg-tema-secili/20 rounded-t-[9px] ${headerTextStyle}`}>Yanlış</div>
          </div>

          <div className="flex flex-col w-full flex-1 rounded-b-[9px] rounded-t-[9px] overflow-hidden shadow-inner">
            {[0, 1, 2].map((idx) => {
              const record = displayRecords[idx];
              const rowBg = idx % 2 === 0 ? '#F5E4C3' : '#F9C261';
              return (
                <div key={idx} className="grid grid-cols-3 w-full items-center h-1/3 border-b border-black/5 last:border-0" style={{ backgroundColor: rowBg }}>
                  {record ? (
                    <>
                      <span className="text-center font-poppins font-medium text-[min(5vw,20px)] text-tema-yazi uppercase leading-[150%] tracking-[0.05em]">{record.time}</span>
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
      <div className="flex flex-col items-center w-full mt-[min(4vh,30px)] mb-[5vh]">
        <button
          onClick={() => navigate('/meydan-oyun')}
          className="w-[min(54vw,220px)] aspect-202/72 flex items-center justify-center bg-tema-buton2 rounded-[30px] shadow-md active:scale-95 transition-transform"
        >
          <span className="font-poppins font-extrabold text-[min(9.5vw,40px)] text-tema-enak uppercase tracking-wider">Başla</span>
        </button>

        <button
          onClick={() => setIsHintModalOpen(true)}
          className="w-[min(34vw,135px)] aspect-127/44 flex items-center justify-center bg-tema-kutu rounded-[10px] shadow-md active:scale-95 transition-transform mt-[2vh]"
        >
          <span className="font-poppins font-extrabold text-[min(6vw,24px)] text-tema-enak uppercase">İpucu</span>
        </button>
      </div>

      {/* --- PROFESYONEL İPUCU MODAL --- */}
      {isHintModalOpen && (
        <div 
          onClick={() => setIsHintModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-[89.333vw] max-w-83.75 aspect-335/385 bg-tema-kutu rounded-[9px] flex items-center justify-center shadow-2xl animate-in zoom-in-95 duration-300 cursor-default"
          >
            {/* Foxy Maskot */}
            <div className="absolute -top-[16%] -left-[2%] w-[28%] z-10 drop-shadow-xl pointer-events-none">
              <img src={foxyHint} alt="Foxy" className="w-full h-auto object-contain" />
            </div>

            {/* İç Kutu */}
            <div className="w-[94.02%] h-[95.06%] bg-tema-enak rounded-[9px] p-[6%] flex flex-col text-tema-yazi overflow-hidden">
              
              <p className="font-poppins font-medium text-[12.5px] leading-tight text-center mb-[6%] px-2">
                Hızın ve dikkatin test ediliyor! En kısa sürede bitirip zirveye yerleşebilir misin? İşte kurallar:
              </p>
              
              {/* Kurallar Listesi */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-[5%] scrollbar-hide text-center font-poppins text-[11px] leading-tight">
                
                {/* Her kural tek bir akışta: Başlık (Kalın/İtalik) + Açıklama (İnce/Düz) */}
                <p>
                  <span className="inline-flex items-center gap-1 italic font-extrabold mr-1 align-middle">
                    <History size={13} strokeWidth={3} className="translate-y-[0.5px]" /> Süre İleri Akar:
                  </span> 
                  <span className="font-medium align-middle italic lg:not-italic">Oyun başladığı an süre işlemeye başlar. Hedefin, tüm soruları en kısa sürede tamamlamak!</span>
                </p>

                <p>
                  <span className="inline-flex items-center gap-1 italic font-extrabold mr-1 align-middle">
                    <Ban size={13} strokeWidth={3} className="translate-y-[0.5px]" /> Hata Sınırı ve Ceza:
                  </span> 
                  <span className="font-medium align-middle">Her ÜÇ yanlışta bir bitirme sürene ceza puanı (ek süre) eklenir. Dikkatli ol!</span>
                </p>

                <p>
                  <span className="inline-flex items-center gap-1 italic font-extrabold mr-1 align-middle">
                    <X size={13} strokeWidth={3} className="translate-y-[0.5px]" /> Pas Geçmek Yok:
                  </span> 
                  <span className="font-medium align-middle">İlerlemek için her soruya bir yanıt vermelisin; stratejini iyi kur!</span>
                </p>

                <p>
                  <span className="inline-flex items-center gap-1 italic font-extrabold mr-1 align-middle">
                    <ZoomIn size={13} strokeWidth={3} className="translate-y-[0.5px]" /> Hata Takibi:
                  </span> 
                  <span className="font-medium align-middle">Yaptığın tüm yanlışları ekranın bir köşesinden anlık olarak takip edebilirsin.</span>
                </p>

                <p>
                  <span className="inline-flex items-center gap-1 italic font-extrabold mr-1 align-middle">
                    <Rocket size={13} strokeWidth={3} className="translate-y-[0.5px]" /> Rekorlar:
                  </span> 
                  <span className="font-medium align-middle">En az süre ve en az yanlışla bitirdiğin skorlar "Rekorlar" kısmında ölümsüzleşir!</span>
                </p>
                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}