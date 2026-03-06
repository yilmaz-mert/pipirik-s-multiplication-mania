import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EzberSVG, SiraliSVG, MeydanSVG, TestSVG } from '../components/PuzzleIcons';
import foxImage from '../assets/foxy.png';
import WaveHeader from '../components/WaveHeader';
import PuzzleButton from '../components/PuzzleButton';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full relative">
      
      {/* 1. Üst Dalgalı Arka Plan (Wave) ve Başlık */}
      <WaveHeader title="AKIL KATI" />

      {/* 3. Maskot Tilki */}
      <div 
        className="absolute z-20 pointer-events-auto"
        style={{ width: '177px', height: '177px', top: '198px', left: '0px' }} 
      >
         <img src={foxImage} alt="Fox Mascot" className="w-full h-full object-contain drop-shadow-lg" />
      </div>

      {/* 4. Merkezi Sarı Kart (Buton Konteynırı) */}
      <div 
        className="absolute bg-[#FAECA2] shadow-md z-10"
        style={{ width: '356px', height: '374px', top: '333px', left: 'calc(50% - 178px)', borderRadius: '6px' }} 
      >
        <div className="relative w-full h-full">
          
            <PuzzleButton
            title={<>EZBER<br/>KARTLARI</>} // Satır sonu için br kullanabilirsin
            Icon={EzberSVG}
            style={{ 
                width: '199.5px', height: '173.9px', 
                left: 'calc(20px - 10px - 4px)', // Senin manuel ayarın
                top: '19px',
                position: 'absolute'
            }}
            textStyle={{
                width: '102px',   // Figma'daki Width
                height: '60px',   // Figma'daki Height
                left: '17.17px',  // Hesapladığımız Relative Left
                top: '47px'       // Hesapladığımız Relative Top
            }}
            onClick={() => navigate("/ezber")}
            />

            <PuzzleButton
            title={<>SIRALI<br/>TEST</>} 
            Icon={SiraliSVG}
            style={{ 
                width: '183px', 
                height: '214px', 
                top: '19.22px', 
                left: 'calc(183.31px - 10px - 4px)',
                position: 'absolute'
            }}
            textStyle={{
                width: '65px',    // Figma Genişlik
                height: '60px',   // Figma Yükseklik
                left: '90.86px',  // Hesaplanan Bağıl Left
                top: '51.78px'    // Hesaplanan Bağıl Top
            }}
            onClick={() => navigate("/sirali")}
            />

            <PuzzleButton
            title={<>MEYDAN<br/>OKUMA</>} 
            Icon={MeydanSVG}
            style={{ 
                width: '216px', 
                height: '201px', 
                top: '157.9px', 
                left: 'calc(20px - 10px - 4px)', // Senin manuel düzeltmen
                position: 'absolute'
            }}
            textStyle={{
                width: '91px',    // Figma Genişlik
                height: '60px',   // Figma Yükseklik
                left: '31.17px',  // Hesaplanan Bağıl Left
                top: '87.1px'     // Hesaplanan Bağıl Top
            }}
            onClick={() => navigate("/meydan")}
            />

            <PuzzleButton
            title={<>SEÇİMLİ<br/>TEST</>} 
            Icon={TestSVG}
            style={{ 
                width: '197px', 
                height: '240px', 
                top: '122.91px', 
                left: 'calc(171.4px - 10px - 4px)',
                position: 'absolute'
            }}
            textStyle={{
                width: '81px',     // Figma Genişlik
                height: '60px',    // Figma Yükseklik
                left: '83.77px',   // Hesaplanan Bağıl Left
                top: '134.09px'    // Hesaplanan Bağıl Top
            }}
            onClick={() => navigate("/secimli")}
            />
        </div>
      </div>
    </div>
  );
}
