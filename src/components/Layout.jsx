import React from 'react';

export default function Layout({ children }) {
  return (
    // Tüm ekranı kaplayan ve içeriği ortalayan dış katman
    <div className="min-h-screen w-full flex justify-center items-center bg-zinc-900 overflow-hidden">
      
      {/* Ölçeklenen Ana Konteynır (Figma Çerçevesi) */}
      <div 
        className="relative shrink-0 bg-white shadow-2xl overflow-hidden bg-grid-paper origin-center"
        style={{ 
          width: '375px', 
          height: '812px',
          // Ekran boyutuna göre kendini küçültür veya büyütür
          transform: 'scale(calc(min(100vw / 375, 100dvh / 812)))',
        }}
      >
        {/* Sayfa İçeriği */}
        <div className="w-full h-full relative z-10">
          {children}
        </div>

        {/* Sabit Alt Bar (Sarı kartın altında kalmaması için z-50) */}
        <div className="absolute bottom-0 left-0 w-full h-8.5 bg-[#D9D9D9] z-50"></div>
      </div>
    </div>
  );
}