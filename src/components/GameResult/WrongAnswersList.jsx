import React, { useRef, useEffect, useCallback, useState } from 'react';

export default function WrongAnswersList({ wrongAnswers }) {
  const [isDraggingActive, setIsDraggingActive] = useState(false);
  
  const listRef = useRef(null);
  const thumbRef = useRef(null);
  const channelRef = useRef(null);
  
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startScrollTop = useRef(0);
  const rafRef = useRef(null);

  // 1. Kapsül Pozisyon Güncelleme (Stabil)
  const updateThumbPosition = useCallback(() => {
    const list = listRef.current;
    const thumb = thumbRef.current;
    const channel = channelRef.current;
    if (!list || !thumb || !channel) return;

    const maxScrollTop = list.scrollHeight - list.clientHeight;
    if (maxScrollTop <= 0) {
      thumb.style.display = 'none';
      return;
    }
    thumb.style.display = 'block';

    const percentage = list.scrollTop / maxScrollTop;
    const channelHeight = channel.getBoundingClientRect().height;
    const thumbHeight = thumb.getBoundingClientRect().height;
    
    const margin = 4;
    const minTop = margin - 4; 
    const maxTop = channelHeight - thumbHeight - margin;

    const newTop = minTop + (percentage * (maxTop - minTop));
    thumb.style.top = `${newTop}px`;
  }, []);

  // 2. Sürükleme Hareketi (Stabil)
  const handlePointerMove = useCallback((e) => {
    if (!isDragging.current) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const list = listRef.current;
      const channel = channelRef.current;
      const thumb = thumbRef.current;
      if (!list || !channel || !thumb) return;

      const deltaY = e.clientY - startY.current;
      const channelHeight = channel.getBoundingClientRect().height;
      const thumbHeight = thumb.getBoundingClientRect().height;
      const scrollHeight = list.scrollHeight - list.clientHeight;
      
      const scrollRatio = scrollHeight / (channelHeight - thumbHeight - 8);
      list.scrollTop = startScrollTop.current + (deltaY * scrollRatio);
    });
  }, []);

  // 3. Sürüklemeyi Başlatma
  const handlePointerDown = (e) => {
    isDragging.current = true;
    setIsDraggingActive(true); // Sadece state'i tetikliyoruz, gerisini useEffect hallediyor
    startY.current = e.clientY;
    startScrollTop.current = listRef.current.scrollTop;
    
    if (thumbRef.current) thumbRef.current.style.transition = 'none'; 
  };

  // 4. PRO ÇÖZÜM: Window Dinleyicilerini State'e Bağlı Yönetme
  useEffect(() => {
    if (!isDraggingActive) return;

    const handlePointerUp = () => {
      isDragging.current = false;
      setIsDraggingActive(false);
      if (thumbRef.current) thumbRef.current.style.transition = 'top 0.05s linear';
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };

    // Dinleyicileri ekle
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    document.body.style.userSelect = 'none';

    // Cleanup: State false olduğunda veya component kapandığında temizle
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      document.body.style.userSelect = 'auto';
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isDraggingActive, handlePointerMove]);

  // 5. Liste Kaydırma Dinleyicisi
  useEffect(() => {
    const list = listRef.current;
    if (list) {
      list.addEventListener('scroll', updateThumbPosition);
      setTimeout(updateThumbPosition, 0);
    }
    return () => {
      if (list) list.removeEventListener('scroll', updateThumbPosition);
    };
  }, [wrongAnswers, updateThumbPosition]);

  return (
    <div 
      className="flex items-stretch shadow-sm shrink-0"
      style={{ 
        width: 'min(85vw, 240px)', backgroundColor: '#F8971F', borderRadius: '12px',
        padding: '8px', gap: wrongAnswers.length > 6 ? '8px' : '0px' 
      }}
    >
      <div className="flex-1 overflow-hidden" style={{ borderRadius: '8px' }}>
        <div 
          ref={listRef}
          className="w-full overflow-y-auto hide-scrollbar" 
          style={{ 
            maxHeight: 'calc((min(6.8vw, 25.66px) * 6) + (2px * 5))',
            height: 'max-content', backgroundColor: '#FEF1D9',
          }}
        >
          <div className="flex flex-col gap-0.5" style={{ backgroundColor: '#F8971F' }}>
            {wrongAnswers.map((ans, idx) => (
              <div 
                key={idx}
                className="w-full flex items-center shrink-0"
                style={{ height: 'min(6.8vw, 25.66px)', backgroundColor: '#FEF1D9' }}
              >
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

      {wrongAnswers.length > 6 && (
        <div 
          ref={channelRef}
          aria-hidden="true"
          style={{ 
            width: '28px', backgroundColor: '#F8971F', borderRadius: '100px',
            border: '2px solid #F5E4C3', position: 'relative', overflow: 'hidden', flexShrink: 0, touchAction: 'none' 
          }}
        >
          <div 
            ref={thumbRef}
            onPointerDown={handlePointerDown}
            style={{ 
              position: 'absolute', width: '100%', height: '90px',
              backgroundColor: '#F5E4C3', borderRadius: '100px', top: '0px', left: '0px',
              border: '4px solid transparent', backgroundClip: 'padding-box', cursor: 'grab',
              touchAction: 'none', transition: 'top 0.05s linear'
            }}
          />
        </div>
      )}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}