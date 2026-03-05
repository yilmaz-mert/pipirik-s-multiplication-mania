import React, { useEffect, useState } from 'react';

export default function Layout({ children }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      // Modern tarayıcılarda visualViewport daha hassas sonuç verir
      const width = window.visualViewport ? window.visualViewport.width : window.innerWidth;
      const height = window.visualViewport ? window.visualViewport.height : window.innerHeight;

      const scaleX = width / 393;
      const scaleY = height / 852;
      
      // Tasarımı bozmadan sığdır
      setScale(Math.min(scaleX, scaleY));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    // 1. Arka Planı Buraya Taşıdık: Artık boşluklar "siyah" değil "grid" görünecek
    <div className="fixed inset-0 w-full h-full flex justify-center items-center bg-white bg-grid-paper overflow-hidden select-none touch-none">
      
      {/* 2. Ölçeklenen Tasarım Alanı */}
      <div 
        className="relative shrink-0 transition-transform duration-300 ease-out"
        style={{ 
          width: '393px', 
          height: '852px',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        {/* Sayfa İçeriği */}
        <div className="w-full h-full relative z-10">
          {children}
        </div>
      </div>

      {/* 3. Alt Bar: Tasarımın değil, telefonun en altına yapışması için dışarı aldık */}
      {/* Eğer alt barın da ölçeklenmesini istersen içeride bırakabilirsin */}
      <div className="fixed top-0 left-0 w-full h-8.5 bg-[#D9D9D9] z-50 border-t border-gray-300"></div>
      <div className="fixed bottom-0 left-0 w-full h-8.5 bg-[#D9D9D9] z-50 border-t border-gray-300"></div>
    </div>
  );
}