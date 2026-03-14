import React, { useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SelectiveGameResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { correct = 0, wrong = 0, answers = [] } = location.state || {};

  const total = correct + wrong;
  const successRate = total > 0 ? Math.round((correct / total) * 100) : 0;

  // --- DİNAMİK GERİ BİLDİRİM VE SAYI RENK MANTIĞI ---
  const getFeedbackConfig = () => {
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
  };

  const feedback = getFeedbackConfig();

  // SADECE YANLIŞ CEVAPLARI FİLTRELE
  const wrongAnswers = answers.filter(ans => !ans.isCorrect);

  // --- REFERANSLAR ---
  const listRef = useRef(null);
  const thumbRef = useRef(null);
  const channelRef = useRef(null);
  
  // Sürükleme (Drag) Durum Yönetimi
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startScrollTop = useRef(0);

  // 1. LİSTE KAYDIKÇA KAPSÜLÜ HAREKET ETTİREN FONKSİYON
  const updateThumbPosition = () => {
    if (!listRef.current || !thumbRef.current || !channelRef.current) return;

    const list = listRef.current;
    const thumb = thumbRef.current;
    const channel = channelRef.current;

    const maxScrollTop = list.scrollHeight - list.clientHeight;
    
    if (maxScrollTop <= 0) {
      thumb.style.display = 'none';
      return;
    } else {
      thumb.style.display = 'block';
    }

    const percentage = list.scrollTop / maxScrollTop;
    const channelHeight = channel.getBoundingClientRect().height;
    const thumbHeight = thumb.getBoundingClientRect().height;
    
    const margin = 4;
    const minTop = margin - 4; // Senin kalibre ettiğin değer
    const maxTop = channelHeight - thumbHeight - margin;

    const newTop = minTop + (percentage * (maxTop - minTop));
    thumb.style.top = `${newTop}px`;
  };

  // 2. KAPSÜLÜ TUTUP SÜRÜKLEME MANTIĞI (POINTER EVENTS)
  const handlePointerDown = (e) => {
    isDragging.current = true;
    startY.current = e.clientY;
    startScrollTop.current = listRef.current.scrollTop;
    
    document.body.style.userSelect = 'none'; // Sürüklerken metin seçilmesin
    if (thumbRef.current) thumbRef.current.style.transition = 'none'; 
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;

    const list = listRef.current;
    const channel = channelRef.current;
    const thumb = thumbRef.current;

    const deltaY = e.clientY - startY.current;
    const channelHeight = channel.getBoundingClientRect().height;
    const thumbHeight = thumb.getBoundingClientRect().height;
    const scrollHeight = list.scrollHeight - list.clientHeight;
    
    // Kapsülün kanaldaki hareket mesafesi ile listenin scroll mesafesi arasındaki oran
    const scrollRatio = scrollHeight / (channelHeight - thumbHeight - 8);
    
    list.scrollTop = startScrollTop.current + (deltaY * scrollRatio);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    document.body.style.userSelect = 'auto';
    if (thumbRef.current) thumbRef.current.style.transition = 'top 0.05s linear';
  };

  // 3. EVENT LISTENERLARIN BAĞLANMASI
  useEffect(() => {
    const list = listRef.current;
    if (list) {
      list.addEventListener('scroll', updateThumbPosition);
      // Window üzerinden dinliyoruz ki parmak kanaldan çıksa da sürükleme kopmasın
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      
      // İlk yüklemede pozisyonu hesapla
      setTimeout(updateThumbPosition, 0);
    }

    return () => {
      if (list) list.removeEventListener('scroll', updateThumbPosition);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [answers]);

  return (
    <div className="w-full flex-1 flex flex-col items-center py-[min(4vh,2rem)] px-6 gap-y-[min(3vh,24px)] overflow-y-auto scrollbar-hide">
      
      {/* Üst Alan: Doğru ve Yanlış Kutuları */}
      <div className="w-full flex justify-center gap-[min(4vw,16px)] -mt-[1vh] shrink-0">
        <div 
          className="flex items-center justify-center gap-[min(2vw,8px)] rounded-[20px] shadow-sm"
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

        <div 
          className="flex items-center justify-center gap-[min(2vw,8px)] rounded-[20px] shadow-sm"
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
      </div>

      {/* Orta Alan: Sonuçlar Kutusu - Sadece yanlış varsa gösterilir */}
      {wrongAnswers.length > 0 && (
        <div 
          className="flex items-stretch shadow-sm shrink-0"
          style={{ 
            width: 'min(85vw, 240px)', 
            backgroundColor: '#F8971F', 
            borderRadius: '12px',
            padding: '8px', 
            // Scrollbar varsa gap bırak, yoksa bırakma
            gap: wrongAnswers.length > 6 ? '8px' : '0px' 
          }}
        >
          {/* 1. LİSTE ALANI */}
          <div 
            className="flex-1 overflow-hidden"
            style={{ borderRadius: '8px' }}
          >
            <div 
              ref={listRef}
              className="w-full overflow-y-auto hide-scrollbar" 
              style={{ 
                maxHeight: 'calc((min(6.8vw, 25.66px) * 6) + (2px * 5))',
                height: 'max-content',
                backgroundColor: '#FEF1D9',
              }}
            >
              <div className="flex flex-col gap-0.5" style={{ backgroundColor: '#F8971F' }}>
                {wrongAnswers.map((ans, idx) => (
                  <div 
                    key={idx}
                    className="w-full flex items-center shrink-0"
                    style={{ 
                      height: 'min(6.8vw, 25.66px)',
                      backgroundColor: '#FEF1D9', 
                    }}
                  >
                    {/* Eşit Gap İçin 5 Sütunlu Grid */}
                    <div className="grid grid-cols-5 items-center w-full px-10 font-poppins font-extrabold text-tema-yazi uppercase"
                        style={{ fontSize: 'min(3.8vw, 15px)' }}>
                      
                      <span className="text-center">{ans.num1}</span>
                      <span className="text-center">X</span>
                      <span className="text-center">{ans.num2}</span>
                      <span className="text-center mr-2">=</span>
                      
                      <div className="flex items-center justify-center whitespace-nowrap">
                        <span style={{ color: '#A50000' }}>{ans.userAnswer}</span>
                        <span className="text-[#51AE00] opacity-80 ml-2" style={{ fontSize: '0.8em' }}>
                          ({ans.num1 * ans.num2})
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2. SCROLLBAR KANALI - Sadece 6'dan fazla yanlış varsa render edilir */}
          {wrongAnswers.length > 6 && (
            <div 
              ref={channelRef}
              style={{ 
                width: '28px', 
                backgroundColor: '#F8971F', 
                borderRadius: '100px',
                border: '2px solid #F5E4C3',
                position: 'relative',
                overflow: 'hidden',
                flexShrink: 0,
                touchAction: 'none' 
              }}
            >
              <div 
                ref={thumbRef}
                onPointerDown={handlePointerDown}
                style={{ 
                  position: 'absolute',
                  width: '100%', 
                  height: '90px',
                  backgroundColor: '#F5E4C3', 
                  borderRadius: '100px',
                  top: '0px',
                  left: '0px',
                  border: '4px solid transparent',
                  backgroundClip: 'padding-box',
                  cursor: 'grab',
                  touchAction: 'none',
                  transition: 'top 0.05s linear'
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* --- ALT-ORTA ALAN: GÜNCELLENEN KISIM --- */}
      <div className="flex flex-col items-center space-y-[2vh] shrink-0">
        
        {/* SADECE METİN (Kutu yok, Renk sabit #130D3D) */}
        <p className="font-poppins font-normal leading-tight text-center" 
           style={{ fontSize: 'min(4vw, 16px)', color: '#130D3D' }}>
          {feedback.text}
        </p>
        
        {/* BAŞARI ORANI KUTUSU */}
        <div 
          className="flex items-center justify-center gap-[min(1.5vw,6px)] shadow-sm"
          style={{ 
            width: 'min(36vw, 140px)', 
            aspectRatio: '140 / 40', 
            borderRadius: '100px',
            background: 'var(--Tema-Mat-ak-yaz-rengi, #FEF1D9)' // Sabit Krem Arka Plan
          }}
        >
          <span className="font-poppins font-extrabold leading-none text-center" 
                style={{ fontSize: 'min(5.5vw, 22px)', color: feedback.numberColor }}> {/* Dinamik % Renk */}
            %{successRate}
          </span>
          <span className="font-poppins font-semibold leading-none text-center uppercase" 
                style={{ fontSize: 'min(3.5vw, 14px)', color: '#130D3D' }}>
            BAŞARI
          </span>
        </div>
      </div>

      {/* Butonlar */}
      <div className="flex flex-col items-center w-full gap-[1.5vh] mt-auto pb-[4vh] space-y-[1.5vh] shrink-0">
        <button
          onClick={() => navigate('/oyun', { state: location.state?.gameConfig })}
          className="w-[min(53vw,199px)] aspect-199/44 flex items-center justify-center bg-tema-kutu rounded-[10px] shadow-md active:scale-95 transition-transform"
        >
          <span className="font-poppins font-extrabold text-[min(6vw,24px)] text-tema-enak uppercase tracking-wider">
            Tekrar Dene
          </span>
        </button>

        <button
          onClick={() => navigate('/')}
          className="w-[min(40vw,150px)] aspect-150/44 flex items-center justify-center bg-tema-buton2 rounded-[10px] shadow-md active:scale-95 transition-transform"
        >
          <span className="font-poppins font-extrabold text-[min(6vw,24px)] text-tema-enak uppercase">
            Ana Menü
          </span>
        </button>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}