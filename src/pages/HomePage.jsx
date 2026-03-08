import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EzberSVG, SiraliSVG, MeydanSVG, TestSVG } from '../components/PuzzleIcons';
import foxImage from '../assets/foxy.png';
import WaveHeader from '../components/WaveHeader';
import PuzzleButton from '../components/PuzzleButton';

export default function HomePage() {
  const navigate = useNavigate();

  // Ana sayfa için özel animasyonlar
  const homeAnimations = `
    @keyframes floatFox {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-12px) rotate(2deg); }
    }
    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-50px) scale(0.9); }
      to { opacity: 1; transform: translateX(0) scale(1); }
    }
    @keyframes popInButton {
      from { opacity: 0; transform: scale(0.5); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes fadeInCard {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  return (
    <div className="w-full h-full relative flex flex-col items-center pb-10">
      <style>{homeAnimations}</style>

      {/* 1. Üst Dalga */}
      <WaveHeader title="AKIL KATI" showIcons={false} />

      <div className="relative w-[92%] mt-12 flex flex-col items-center"> 
        
        {/* Maskot Tilki: 
            - Artık absolute; çünkü sol üst köşeye "iğneleyeceğiz".
            - -top-16 ve -left-4 gibi değerlerle kutunun biraz dışına taşırabilirsin (Figma'daki gibi).
            - w-[45%]: Kapsayıcı paketin %45'i kadar olur, yani kutuyla orantılı büyür.
        */}
        <div 
          className="absolute z-20 w-[45%] aspect-square top-0 left-0 -translate-y-[60%] -translate-x-[5%] pointer-events-none"
          style={{ animation: 'slideInLeft 0.8s ease-out forwards, floatFox 4s ease-in-out infinite 0.8s' }} 
        >
          <img src={foxImage} alt="Fox Mascot" className="w-full h-full object-contain drop-shadow-lg" />
        </div>

        {/* Merkez Sarı Kart:
            - w-full: Paket ne kadarsa o kadar yayılır.
            - Artık paketin içinde olduğu için otomatik hizalanır.
        */}
        <div 
          className="relative w-full aspect-356/374 bg-tema-vector shadow-md z-10 rounded-lg"
          style={{ animation: 'fadeInCard 0.6s ease-out forwards' }} 
        >
          <div className="relative w-full h-full">
              {/* EZBER KARTLARI */}
            <div style={{ animation: 'popInButton 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s forwards', opacity: 0, position: 'absolute', left: '1.68%', top: '5.08%', width: '56.04%', height: '46.50%' }}>
              <PuzzleButton
                title={<>EZBER<br/>KARTLARI</>}
                Icon={EzberSVG}
                style={{ width: '100%', height: '100%' }}
                textStyle={{ width: '51%', height: '34%', left: '8.6%', top: '27%' }}
                onClick={() => navigate("/ezber")}
              />
            </div>

            {/* SIRALI TEST */}
            <div style={{ animation: 'popInButton 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s forwards', opacity: 0, position: 'absolute', left: '47.56%', top: '5.14%', width: '51.40%', height: '57.22%' }}>
              <PuzzleButton
                title={<>SIRALI<br/>TEST</>} 
                Icon={SiraliSVG}
                style={{ width: '100%', height: '100%' }}
                textStyle={{ width: '35%', height: '28%', left: '49.6%', top: '24.2%' }}
                onClick={() => navigate("/sirali")}
              />
            </div>

            {/* MEYDAN OKUMA */}
            <div style={{ animation: 'popInButton 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.7s forwards', opacity: 0, position: 'absolute', left: '1.68%', top: '42.22%', width: '60.67%', height: '53.74%' }}>
              <PuzzleButton
                title={<>MEYDAN<br/>OKUMA</>} 
                Icon={MeydanSVG}
                style={{ width: '100%', height: '100%' }}
                textStyle={{ width: '42%', height: '30%', left: '14.4%', top: '43.3%' }}
                onClick={() => navigate("/meydan")}
              />
            </div>

            {/* SEÇİMLİ TEST */}
            <div style={{ animation: 'popInButton 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.9s forwards', opacity: 0, position: 'absolute', left: '44.21%', top: '32.86%', width: '55.34%', height: '64.17%' }}>
              <PuzzleButton
                title={<>SEÇİMLİ<br/>TEST</>} 
                Icon={TestSVG}
                style={{ width: '100%', height: '100%' }}
                textStyle={{ width: '41%', height: '25%', left: '42.5%', top: '55.8%' }}
                onClick={() => navigate("/secimli")}
              />
            </div>
          </div>
        </div>
      </div>     
    </div>
  );
}