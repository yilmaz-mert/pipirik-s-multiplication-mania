import React from 'react';
import { useNavigate } from 'react-router-dom';

const questionsList = [
  { id: 2, label: "2'ler" },
  { id: 3, label: "3'ler" },
  { id: 4, label: "4'ler" },
  { id: 5, label: "5'ler" },
  { id: 6, label: "6'ler" },
  { id: 7, label: "7'ler" },
  { id: 8, label: "8'ler" },
  { id: 9, label: "9'ler" }
];

export default function SiraliTestPage() {
  const navigate = useNavigate();

  // Yıldızlara özel dönerek büyüme (pop-in) animasyonu eklendi
  const testAnimations = `
    @keyframes smoothFadeIn {
      0% { opacity: 0; transform: translateY(10px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes starEntry {
      0% { opacity: 0; transform: scale(0) rotate(-45deg); }
      60% { opacity: 1; transform: scale(1.15) rotate(15deg); }
      100% { opacity: 1; transform: scale(1) rotate(0deg); }
    }
  `;

  const handleStarClick = (id) => {
    navigate('/sirali-oyun', { state: { selected: [id] } });
  };

  return (
    <div className="w-full h-full relative flex flex-col items-center overflow-x-hidden overflow-y-auto pb-10 pt-12 px-4">
      <style>{testAnimations}</style>

      {/* Soru Kutusu */}
      <div 
        className="w-full max-w-71.75 min-h-17.25 flex justify-center items-center bg-tema-kutu mb-8 rounded-[21px] px-4 py-2 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
        style={{ animation: 'smoothFadeIn 0.4s ease-out forwards' }}
      >
        <span className="font-poppins font-semibold text-[17px] leading-tight text-tema-yazi text-center">
          Hangi sayının <br/> çarpımını istiyorsun?
        </span>
      </div>

      {/* Seçim Kutusu */}
      <div 
        className="w-full max-w-74.25 min-h-64.75 bg-tema-kutu rounded-[9px] relative p-5 drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
        style={{ animation: 'smoothFadeIn 0.4s ease-out 0.15s forwards', opacity: 0 }}
      >
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-4 w-full h-full content-center">
           {questionsList.map((item, index) => {
              // Her yıldız için index'e bağlı olarak artan bir gecikme (delay) hesaplıyoruz
              const animationDelay = 0.3 + (index * 0.08);

              return (
                <button
                  key={item.id}
                  onClick={() => handleStarClick(item.id)}
                  // Orijinal değerler korundu, stil kısmına yeni animasyon ve opacity: 0 eklendi
                  className="relative w-19.75 h-19 flex items-center justify-center transition-transform duration-200 active:scale-90 hover:scale-110 group"
                  style={{ 
                    animation: `starEntry 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${animationDelay}s forwards`,
                    opacity: 0 // Animasyon başlayana kadar gizli tut
                  }}
                >
                  <svg 
                    // Üzerine gelindiğinde (hover) SVG'nin parlaması için drop-shadow eklendi
                    className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]" 
                    viewBox="0 0 79 76" 
                    fill="#F5E4C3" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M33.7128 3.61297C35.8017 -1.20431 42.6333 -1.2043 44.7223 3.61298L51.3861 18.9804C52.2555 20.9853 54.1462 22.359 56.3217 22.5663L72.9962 24.1552C78.2232 24.6533 80.3343 31.1505 76.3983 34.6258L63.8423 45.7123C62.2041 47.1587 61.4819 49.3814 61.9571 51.5144L65.5986 67.8639C66.7402 72.989 61.2133 77.0045 56.6918 74.335L42.2679 65.8194C40.3861 64.7085 38.049 64.7085 36.1672 65.8194L21.7433 74.3351C17.2217 77.0045 11.6949 72.989 12.8364 67.8638L16.478 51.5144C16.9531 49.3814 16.2309 47.1587 14.5928 45.7123L2.03673 34.6258C-1.89926 31.1505 0.211823 24.6533 5.43884 24.1552L22.1134 22.5663C24.2888 22.359 26.1796 20.9853 27.049 18.9804L33.7128 3.61297Z" />
                  </svg>
                  
                  <span className="relative z-10 font-outfit font-bold text-[14px] text-tema-yazi mt-1 drop-shadow-[0_1px_1px_rgba(19,13,61,0.2)]">
                    {item.label}
                  </span>
                </button>
              );
           })}
        </div>
      </div>
    </div>
  );
}