import React from 'react';
import { EzberSVG, SiraliSVG, MeydanSVG, TestSVG } from '../components/PuzzleIcons';
import foxImage from '../assets/foxy.png';

export default function HomePage() {
  return (
    <div className="w-full h-full relative">
      
        {/* 1. Üst Dalgalı Arka Plan (Wave) */}
        <div 
        className="absolute z-0 pointer-events-none"
        style={{ 
            top: '0', 
            left: '50%', 
            transform: 'translateX(-50%)',
            width: '100vw', 
            height: '313px',
        }}
        >
            <svg 
                viewBox="0 0 375 305" 
                className="w-full h-full block" // block ekleyerek inline boşlukları sildik
                shapeRendering="geometricPrecision" 
                preserveAspectRatio="none" 
            >
                <path 
                    // Path'in başlangıcını 0 yerine -1 yaparak SVG içinde de boşluk kalmamasını garantiye alabiliriz
                    d="M-1 -1H376V194.394C375 254.398 307.909 289.17 249.375 275.971C194.258 263.541 149.326 273.269 100.876 291.42C51.9 309.77 -1 276.193 -1 223.892V-1Z"
                    fill="#9CB9B7"
                    style={{ filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.25))' }}
                />
            </svg>
        </div>
      {/* 2. Başlık */}
      <h1 
        className="absolute w-full font-outfit font-extrabold text-[36px] text-[#F5E4C3] text-center z-10"
        style={{ top: '130px' }}
      >
        AKIL KATI
      </h1>

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
                top: '19px' 
            }}
            textStyle={{
                width: '102px',   // Figma'daki Width
                height: '60px',   // Figma'daki Height
                left: '17.17px',  // Hesapladığımız Relative Left
                top: '47px'       // Hesapladığımız Relative Top
            }}
            onClick={() => console.log("Ezber")}
            />

            <PuzzleButton
            title={<>SIRALI<br/>TEST</>} 
            Icon={SiraliSVG}
            style={{ 
                width: '183px', 
                height: '214px', 
                top: '19.22px', 
                left: 'calc(183.31px - 10px - 4px)'
            }}
            textStyle={{
                width: '65px',    // Figma Genişlik
                height: '60px',   // Figma Yükseklik
                left: '90.86px',  // Hesaplanan Bağıl Left
                top: '51.78px'    // Hesaplanan Bağıl Top
            }}
            onClick={() => console.log("Sıralı")}
            />

            <PuzzleButton
            title={<>MEYDAN<br/>OKUMA</>} 
            Icon={MeydanSVG}
            style={{ 
                width: '216px', 
                height: '201px', 
                top: '157.9px', 
                left: 'calc(20px - 10px - 4px)' // Senin manuel düzeltmen
            }}
            textStyle={{
                width: '91px',    // Figma Genişlik
                height: '60px',   // Figma Yükseklik
                left: '31.17px',  // Hesaplanan Bağıl Left
                top: '87.1px'     // Hesaplanan Bağıl Top
            }}
            onClick={() => console.log("Meydan")}
            />

            <PuzzleButton
            title={<>SEÇİMLİ<br/>TEST</>} 
            Icon={TestSVG}
            style={{ 
                width: '197px', 
                height: '240px', 
                top: '122.91px', 
                left: 'calc(171.4px - 10px - 4px)'
            }}
            textStyle={{
                width: '81px',     // Figma Genişlik
                height: '60px',    // Figma Yükseklik
                left: '83.77px',   // Hesaplanan Bağıl Left
                top: '134.09px'    // Hesaplanan Bağıl Top
            }}
            onClick={() => console.log("Seçimli")}
            />
        </div>
      </div>
    </div>
  );
}

// Buton Bileşeni (Gölge efekti CSS ile veriliyor)
// eslint-disable-next-line no-unused-vars
function PuzzleButton({ title, Icon, onClick, style, textStyle }) {
  return (
    // Kapsayıcı kutu: pointer-events-none (Tıklamalar dikdörtgenin içinden geçer)
    <div 
      style={style} 
      className="absolute pointer-events-none flex items-start justify-start"
    >
      <div className="w-full h-full relative">
        <div className="w-full h-full drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <Icon 
            onClick={onClick} 
            // Burada artık pointer-events-auto YOK, sadece animasyon var
            className="w-full h-full transition-transform duration-200 active:scale-95" 
          />
        </div>
        
        <div 
          style={textStyle}
          className="absolute flex items-center justify-center pointer-events-none"
        >
          <span className="font-poppins font-black text-[20px] text-[#F5E4C3] text-center leading-7.5 uppercase select-none">
            {title}
          </span>
        </div>
      </div>
    </div>
  );
}