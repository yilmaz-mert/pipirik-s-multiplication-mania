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

  // Animasyonlar aynı kalıyor
  const testAnimations = `
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
    <div className="w-full h-full relative flex flex-col items-center overflow-x-hidden overflow-y-auto pb-10">
      <style>{testAnimations}</style>
      
      <WaveHeader 
        title={<>SEÇİMLİ<br/>TEST</>} 
        aspect="aspect-375/210" 
        titleTop="35%" 
      />

      <div className="relative z-20 w-[92%] max-w-90 flex flex-col items-center mt-2">
        
        {/* Soru Kutusu */}
        <div 
          className="w-full max-w-80.5 min-h-17 flex justify-center items-center bg-tema-kutu mb-6 px-4 py-3 rounded-[21px] shadow-md"
          style={{ animation: 'smoothFadeIn 0.4s ease-out forwards' }}
        >
          <span className="font-poppins font-semibold text-[min(4.5vw,17px)] text-tema-yazi text-center leading-tight">
            Hangi sayıların çarpımını istiyorsun?
          </span>
        </div>

        {/* BLOB VE MENÜ GRUBU: Blob artık bu kutunun bir parçası */}
        <div className="relative w-[85%] max-w-74.25 mb-6 flex flex-col items-center">

          {/* 2. Toggle Menüsü Kutusu */}
          <div 
            className="w-full aspect-297/359 flex flex-col p-2 bg-tema-kutu rounded-[9px] shadow-md overflow-hidden"
            style={{ animation: 'smoothFadeIn 0.4s ease-out 0.15s forwards', opacity: 0 }}
          >
            {questionsList.map((item, index) => {
              const isSelected = selected.includes(item.id);
              const isFirst = index === 0;
              const isLast = index === questionsList.length - 1;
              
              return (
                <button
                  key={item.id}
                  onClick={() => toggleSelection(item.id)}
                  className={`w-full flex-1 flex items-center justify-center font-outfit font-bold text-[min(4.8vw,18px)] text-tema-yazi transition-colors
                    ${isSelected ? 'bg-tema-secili' : 'bg-tema-enak'}
                    ${isFirst ? 'rounded-t-md' : ''}
                    ${isLast ? 'rounded-b-md' : 'border-b-2 border-tema-kutu'}
                  `}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Başla Butonu - Responsive Güncelleme */}
        <button
          onClick={handleStart}
          className="w-[min(34vw,135px)] aspect-127/44 flex justify-center items-center bg-tema-buton2 rounded-[10px] shadow-md transition-transform active:scale-95"
          style={{ animation: 'smoothFadeIn 0.4s ease-out 0.3s forwards', opacity: 0 }}
        >
          <span className="font-outfit font-black text-[min(6.4vw,24px)] tracking-wider text-tema-enak">
            BAŞLA
          </span>
        </button>

      </div>
    </div>
  );
}