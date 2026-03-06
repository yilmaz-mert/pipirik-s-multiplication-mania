import React, { useEffect, useState } from 'react';

export default function Layout({ children }) {
  const [scale, setScale] = useState(1);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const handleResize = () => {
      // Modern tarayıcılarda visualViewport daha hassas sonuç verir
      const width = window.visualViewport ? window.visualViewport.width : window.innerWidth;
      const height = window.visualViewport ? window.visualViewport.height : window.innerHeight;

      const scaleX = width / 393;
      const scaleY = height / 852;
      
      // Tasarımı bozmadan sığdır
      setScale(Math.min(scaleX, scaleY));
      setViewport({ w: width, h: height });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    // 1. Arka Planı Buraya Taşıdık: Artık boşluklar "siyah" değil "grid" görünecek
    // Scale ve Viewport değerlerini CSS değişkeni olarak içeriye aktarıyoruz
    <div 
      className="fixed inset-0 w-full h-full flex justify-center bg-white bg-grid-paper overflow-hidden select-none touch-none"
      style={{ 
        '--app-scale': scale,
        '--vp-w': `${viewport.w}px`,
        '--vp-h': `${viewport.h}px`
      }}
    >
      
      {/* 2. Ölçeklenen Tasarım Alanı */}
      <div 
        className="relative shrink-0 transition-transform duration-300 ease-out"
        style={{ 
          width: '393px', 
          height: '852px',
          transform: `scale(${scale})`,
          transformOrigin: 'top center', // <-- KRİTİK: Hep üstten başlasın, üstte boşluk olmasın
        }}
      >
        {/* Sayfa İçeriği */}
        <div className="w-full h-full relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}