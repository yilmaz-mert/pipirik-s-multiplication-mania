import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WaveHeader from '../components/WaveHeader';

const questionsList = [
  { id: 2, label: 'İKİLER' },
  { id: 3, label: 'ÜÇLER' },
  { id: 4, label: 'DÖRTLER' },
  { id: 5, label: 'BEŞLER' },
  { id: 6, label: 'ALTILAR' },
  { id: 7, label: 'YEDİLER' },
  { id: 8, label: 'SEKİZLER' },
  { id: 9, label: 'DOKUZLAR' },
  { id: 'mix', label: 'KARIŞIK 20 SORU' }
];

export default function SelectiveTestPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);

  // Göz yormayan, sadeleştirilmiş animasyonlar
  const testAnimations = `
    @keyframes pulseButton {
      0% { transform: scale(1); box-shadow: 0px 4px 4px rgba(0,0,0,0.25); }
      50% { transform: scale(1.05); box-shadow: 0px 8px 15px rgba(0,0,0,0.3); }
      100% { transform: scale(1); box-shadow: 0px 4px 4px rgba(0,0,0,0.25); }
    }
    @keyframes smoothFadeIn {
      0% { opacity: 0; transform: translateY(10px); }
      100% { opacity: 1; transform: translateY(0); }
    }
  `;

  const toggleSelection = (id) => {
    if (id === 'mix') {
      if (selected.includes('mix')) {
        setSelected([]);
      } else {
        setSelected(['mix']);
      }
      return;
    }

    let newSelected = selected.filter(s => s !== 'mix');
    if (newSelected.includes(id)) {
      newSelected = newSelected.filter(s => s !== id);
    } else {
      newSelected.push(id);
    }
    setSelected(newSelected);
  };

  const handleStart = () => {
    if (selected.length === 0) {
      alert("Lütfen en az bir seçenek belirleyin!");
      return;
    }
    navigate('/oyun', { state: { selected } });
  };

  return (
    <div className="relative w-full h-full min-h-screen overflow-visible flex flex-col items-center">
      <style>{testAnimations}</style>
      
      {/* Background SVG katmanı */}
      <div className="absolute pointer-events-none z-10" style={{ top: '309px', left: '-24px' }}>
        <svg width="441" height="456" viewBox="0 0 375 456" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M415 146.881L375 352.881C361.5 386.381 310.4 453.881 214 455.881C93.5 458.381 156 391.881 59.5 330.381C-37 268.881 -33 196.381 -11.5 123.381C3.21467 73.4197 80.2274 18.0717 107.496 5.74437C130.192 -6.18937 164.445 -0.947524 220 34.9732C283.55 76.0639 321.323 102.142 345.5 118.668C361 128.072 395.1 137.081 407.5 97.8811C419.9 58.6811 417.667 114.214 415 146.881Z" fill="var(--color-tema-vector)"/>
        </svg>
      </div>

      <WaveHeader title={<>SEÇİMLİ<br/>TEST</>} waveHeight="222px" titleTop="70px" />

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center w-full max-w-93.75 mx-auto pt-57.5 pb-10">
        
        {/* Soru Kutusu - Yumuşak giriş */}
        <div 
          className="flex justify-center items-center bg-tema-kutu mb-4 px-2"
          style={{
            width: '322px', height: '68px', borderRadius: '21px',
            boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
            backgroundColor: 'var(--color-tema-kutu)',
            animation: 'smoothFadeIn 0.4s ease-out forwards'
          }}
        >
          <span className="font-poppins font-semibold text-[17px] text-tema-yazi text-center leading-tight">
            Hangi sayıların çarpımını istiyorsun?
          </span>
        </div>

        {/* Toggle Menüsü Kutusu - Tüm liste aynı anda, tek seferde usulca beliriyor */}
        <div 
          className="flex flex-col mb-8 p-2"
          style={{
            width: '297px', height: '359px', borderRadius: '9px',
            boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
            backgroundColor: 'var(--color-tema-kutu)',
            animation: 'smoothFadeIn 0.4s ease-out 0.15s forwards',
            opacity: 0
          }}
        >
          {questionsList.map((item, index) => {
            const isSelected = selected.includes(item.id);
            const isFirst = index === 0;
            const isLast = index === questionsList.length - 1;
            
            return (
              <button
                key={item.id}
                onClick={() => toggleSelection(item.id)}
                className="w-full flex-1 flex items-center justify-center font-outfit font-bold text-[18px] text-tema-yazi transition-colors"
                style={{
                  backgroundColor: isSelected ? 'var(--color-tema-secili)' : 'var(--color-tema-enak)',
                  borderTopLeftRadius: isFirst ? '6px' : '0px',
                  borderTopRightRadius: isFirst ? '6px' : '0px',
                  borderBottomLeftRadius: isLast ? '6px' : '0px',
                  borderBottomRightRadius: isLast ? '6px' : '0px',
                  borderBottom: isLast ? 'none' : '2px solid var(--color-tema-kutu)'
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Başla Butonu */}
        <button
          onClick={handleStart}
          className="flex justify-center items-center transition-transform active:scale-95 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
          style={{
            width: '127px', height: '44px', borderRadius: '10px',
            backgroundColor: 'var(--color-tema-buton2)',
            animation: 'smoothFadeIn 0.4s ease-out 0.3s forwards',
            opacity: 0
          }}
        >
          <span className="font-outfit font-black text-[24px] tracking-wider text-tema-enak" style={{ color: 'var(--color-tema-enak)' }}>
            BAŞLA
          </span>
        </button>

      </div>
    </div>
  );
}