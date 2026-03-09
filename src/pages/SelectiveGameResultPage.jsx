import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function SelectiveGameResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { correct = 0, wrong = 0 } = location.state || {};

  const customAnimations = `
    @keyframes revealLine {
      0% { clip-path: polygon(0 0, 0 0, 0 0); opacity: 0; }
      1% { opacity: 1; }
      100% { clip-path: polygon(0 0, 200% 0, 0 200%); opacity: 1; }
    }
    @keyframes slideDownCorrect {
      0% { opacity: 0; transform: translateY(-50px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUpWrong {
      0% { opacity: 0; transform: translateY(50px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes popIn {
      0% { opacity: 0; transform: scale(0.3); }
      70% { transform: scale(1.1); }
      100% { opacity: 1; transform: scale(1); }
    }
    @keyframes boxFadeIn {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
  `;

  return (
    <div className="w-full h-full relative flex flex-col items-center overflow-x-hidden overflow-y-auto pb-10">
      <style>{customAnimations}</style>

      {/* 2. Ana İçerik Kapsayıcısı (Yine 375px'e sabitlendi) */}
      <div className="relative z-20 w-full max-w-93.75 flex flex-col items-center mt-16">
        
        {/* Ana Turuncu Kutu - %79.2 (297/375) genişlik, 297/322 oran */}
        <div 
          className="relative flex flex-col items-center bg-tema-kutu w-[79.2%] aspect-297/322 rounded-[9px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
          style={{ animation: 'boxFadeIn 0.6s ease-out forwards' }}
        >
          {/* Sonuçlar Başlığı */}
          <h2 className="text-tema-yazi text-center mt-[3%] font-poppins font-extrabold text-[min(8.5vw,32px)] leading-none">
            SONUÇLAR
          </h2>

          {/* İç Kutu (Açık Krem/Sarımsı) - %88.55 (263/297) genişlik, %16.77 (54/322) üstten boşluk */}
          <div 
            className="absolute bg-tema-enak overflow-hidden w-[88.55%] aspect-263/250 rounded-[20px] top-[16.77%]"
          >
            {/* Çapraz Çizgi SVG (w-full ve h-full ile otomatik kaplatıldı) */}
            <div 
              className="absolute inset-0 pointer-events-none" 
              style={{ 
                animation: 'revealLine 1s cubic-bezier(0.65, 0, 0.35, 1) 0.3s forwards',
                opacity: 0
              }}
            > 
              {/* preserveAspectRatio="none" ile kutu esnese bile çizgi köşeden köşeye gider */}
              <svg width="100%" height="100%" viewBox="0 0 269 253" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8ZM92.5 103.5L91.0143 103.707V103.707L92.5 103.5ZM189 165.5L187.671 166.195L189 165.5ZM252.5 244.5C252.5 248.918 256.082 252.5 260.5 252.5C264.918 252.5 268.5 248.918 268.5 244.5C268.5 240.082 264.918 236.5 260.5 236.5C256.082 236.5 252.5 240.082 252.5 244.5ZM8 8L7.97857 9.49985C30.6118 9.82318 80.7217 29.6792 91.0143 103.707L92.5 103.5L93.9857 103.293C83.4783 27.7208 32.0549 6.84349 8.02143 6.50015L8 8ZM92.5 103.5L91.0143 103.707C94.2683 127.11 99.8237 139.132 107.331 144.567C114.917 150.058 124.011 148.473 133.043 146.27C142.304 144.01 151.684 141.059 160.95 142.597C170.008 144.101 179.197 149.984 187.671 166.195L189 165.5L190.329 164.805C181.553 148.016 171.68 141.337 161.441 139.637C151.409 137.972 141.258 141.177 132.332 143.355C123.176 145.589 115.427 146.724 109.091 142.137C102.676 137.493 97.2317 126.64 93.9857 103.293L92.5 103.5ZM189 165.5L187.671 166.195C215.381 219.206 247.197 241.416 260.003 245.915L260.5 244.5L260.997 243.085C249.137 238.918 217.819 217.394 190.329 164.805L189 165.5Z" fill="#130D3D"/>
              </svg>
            </div>

            {/* Yanlış Yazısı (Sol Alt Alan) */}
            <div 
              className="absolute pointer-events-none w-[76%] top-[40%] left-[-22%]" 
              style={{ animation: 'slideUpWrong 0.6s ease-out 0.6s forwards', opacity: 0 }}
            >
              <div className="rotate-90 font-poppins font-semibold text-[min(17vw,64px)] text-tema-yazi/10 leading-none text-center">
                yanlış
              </div>
            </div>
            
            {/* Yanlış Sayısı */}
            <div 
              className="absolute pointer-events-none text-tema-yazi w-[25%] top-[58%] left-[28.5%]" 
              style={{ animation: 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1.2s forwards', opacity: 0 }}
            >
              <div className="font-poppins font-black text-[min(24vw,90px)] leading-none text-center">
                {wrong}
              </div>
            </div>

            {/* Doğru Yazısı (Sağ Üst Alan) */}
            <div 
              className="absolute pointer-events-none w-[76%] top-[30%] right-[-22.8%]" 
              style={{ animation: 'slideDownCorrect 0.6s ease-out 0.6s forwards', opacity: 0 }}
            >
              <div className="-rotate-90 font-poppins font-semibold text-[min(17vw,64px)] text-tema-yazi/10 leading-none text-center">
                doğru
              </div>
            </div>

            {/* Doğru Sayısı */}
            <div 
              className="absolute pointer-events-none text-tema-yazi w-[40%] top-[4%] left-[34.2%]" 
              style={{ animation: 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1s forwards', opacity: 0 }}
            >
              <div className="font-poppins font-black text-[min(24vw,90px)] leading-none text-center">
                {correct}
              </div>
            </div>

          </div>
        </div>

        {/* Ana Menü Butonu - %40 (150/375) genişlik, 150/44 oran */}
        <button
          onClick={() => navigate('/')}
          className="w-[40%] aspect-150/44 mt-8 bg-tema-buton2 text-tema-enak flex justify-center items-center active:scale-95 transition-transform hover:opacity-90 rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] font-poppins font-extrabold text-[min(4.8vw,18px)]"
          style={{ animation: 'boxFadeIn 0.5s ease-out 1.5s forwards', opacity: 0 }}
        >
          ANA MENÜ
        </button>

      </div>
    </div>
  );
}