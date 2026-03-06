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
    <div className="w-full h-full relative overflow-visible">
      <style>{homeAnimations}</style>

      {/* 1. Üst Dalgalı Arka Plan (Wave) ve Başlık */}
      <WaveHeader title="AKIL KATI" showIcons={false} />

      {/* 3. Maskot Tilki - Süzülme ve giriş animasyonu eklendi */}
      <div 
        className="absolute z-20 pointer-events-auto"
        style={{ 
          width: '177px', 
          height: '177px', 
          top: '198px', 
          left: '0px',
          animation: 'slideInLeft 0.8s ease-out forwards, floatFox 4s ease-in-out infinite 0.8s'
        }} 
      >
         <img src={foxImage} alt="Fox Mascot" className="w-full h-full object-contain drop-shadow-lg" />
      </div>

      {/* 4. Merkezi Sarı Kart (Buton Konteynırı) - Yavaşça belirmesi için animasyon */}
      <div 
        className="absolute bg-tema-vector shadow-md z-10"
        style={{ 
          width: '356px', 
          height: '374px', 
          top: '333px', 
          left: 'calc(50% - 178px)', 
          borderRadius: '6px',
          animation: 'fadeInCard 0.6s ease-out forwards'
        }} 
      >
        <div className="relative w-full h-full">
          
            {/* Butonlara gecikmeli (delay) pop-in animasyonu eklendi */}
            <div style={{ animation: 'popInButton 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s forwards', opacity: 0 }}>
              <PuzzleButton
                title={<>EZBER<br/>KARTLARI</>}
                Icon={EzberSVG}
                style={{ width: '199.5px', height: '173.9px', left: '6px', top: '19px', position: 'absolute' }}
                textStyle={{ width: '102px', height: '60px', left: '17.17px', top: '47px' }}
                onClick={() => navigate("/ezber")}
              />
            </div>

            <div style={{ animation: 'popInButton 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s forwards', opacity: 0 }}>
              <PuzzleButton
                title={<>SIRALI<br/>TEST</>} 
                Icon={SiraliSVG}
                style={{ width: '183px', height: '214px', top: '19.22px', left: '169.31px', position: 'absolute' }}
                textStyle={{ width: '65px', height: '60px', left: '90.86px', top: '51.78px' }}
                onClick={() => navigate("/sirali")}
              />
            </div>

            <div style={{ animation: 'popInButton 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.7s forwards', opacity: 0 }}>
              <PuzzleButton
                title={<>MEYDAN<br/>OKUMA</>} 
                Icon={MeydanSVG}
                style={{ width: '216px', height: '201px', top: '157.9px', left: '6px', position: 'absolute' }}
                textStyle={{ width: '91px', height: '60px', left: '31.17px', top: '87.1px' }}
                onClick={() => navigate("/meydan")}
              />
            </div>

            <div style={{ animation: 'popInButton 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.9s forwards', opacity: 0 }}>
              <PuzzleButton
                title={<>SEÇİMLİ<br/>TEST</>} 
                Icon={TestSVG}
                style={{ width: '197px', height: '240px', top: '122.91px', left: '157.4px', position: 'absolute' }}
                textStyle={{ width: '81px', height: '60px', left: '83.77px', top: '134.09px' }}
                onClick={() => navigate("/secimli")}
              />
            </div>
        </div>
      </div>
    </div>
  );
}