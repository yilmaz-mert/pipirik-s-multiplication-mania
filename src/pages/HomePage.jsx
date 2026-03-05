import React from 'react';

export default function HomePage() {
  return (
    <div className="w-full h-full relative">
      
      {/* Header - Dalgalı Arka Plan (Wave SVG) */}
      <div className="absolute top-0 left-0 w-full z-0">
            <svg 
                width="100%" 
                viewBox="0 0 375 305" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                className="block h-76.25 overflow-visible"
                shapeRendering="geometricPrecision" 
            >
                <g>
                    <path d="M0 0H375V194.394C375 254.398 307.909 289.17 249.375 275.971C194.258 263.541 149.326 273.269 100.876 291.42C51.9 309.77 0 276.193 0 223.892V0Z"
                    fill="#9CB9B7"
                    style={{ 
                        filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.25))',
                        willChange: 'filter',
                        WebkitTransform: 'translateZ(0)',
                    }}
                    />
                </g>
                <defs>
                  <filter id="filter0_d_18_113" x="-4" y="0" width="383" height="304.484" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="4"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_18_113"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_18_113" result="shape"/>
                    </filter>
                </defs>
            </svg>
       </div>

      {/* Üst Kısım İçeriği (Başlık ve Maskot) */}
      <div className="relative z-10 pt-16 px-8 flex flex-col items-start">
        {/* Başlık */}
        <h1 className="font-outfit font-extrabold text-[36px] text-[#F5E4C3] tracking-wide drop-shadow-md">
          AKIL KATI
        </h1>
        
        {/* Tilki Maskotu Placeholder */}
        <div className="mt-2 w-24 h-24 bg-orange-300 rounded-full border-4 border-white flex items-center justify-center text-xs text-orange-800 font-bold shadow-lg">
          {/* TODO: src/assets/fox.png buraya eklenecek */}
          Tilki PNG
        </div>
      </div>

      {/* Merkezi Kart Alanı */}
      {/* top-[333px] ve translate-x ile tam ortalama sağlandı */}
      <div className="absolute top-83.25 left-1/2 -translate-x-1/2 w-89 h-93.5 bg-[#FAECA2] rounded-md shadow-md p-2 z-20">
        
        {/* Yapboz Butonları Konteyneri */}
        <div className="w-full h-full relative flex flex-wrap">
          
          {/* NOT: Yapboz parçalarının tam birbirine geçmesi için Figma'dan her butonun tam SVG kodunu ('Copy as SVG') alman gerekecek. 
              Şimdilik buton metinlerini ve renklerini hazırladım, div yerine SVG path'lerini buraya gömeceğiz. */}
          
          <PuzzleButton title="EZBER KARTLARI" position="top-left" />
          <PuzzleButton title="SIRALI TEST" position="top-right" />
          <PuzzleButton title="MEYDAN OKUMA" position="bottom-left" />
          <PuzzleButton title="SEÇİMLİ TEST" position="bottom-right" />

        </div>
      </div>
    </div>
  );
}

// Alt Bileşen: Yapboz Butonu (Şablon)
// eslint-disable-next-line no-unused-vars
function PuzzleButton({ title, position }) {
  // Figma'dan SVG'leri aldığında bu bileşeni refactor edeceğiz.
  // Şimdilik konsepti görmek için geçici bir grid kutusu yapıyoruz.
  return (
    <button 
      className="w-1/2 h-1/2 bg-[#F8971F] border border-[#FAECA2] flex items-center justify-center p-4 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
    >
      <span className="font-poppins font-black text-[20px] text-[#F5E4C3] text-center leading-tight drop-shadow-sm">
        {title}
      </span>
    </button>
  );
}