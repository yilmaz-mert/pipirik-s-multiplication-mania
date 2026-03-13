// src/components/Layout.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import WaveHeader from './WaveHeader';

// Rota bazlı Header Konfigürasyonu
const getHeaderConfig = (pathname) => {
  switch (pathname) {
    case '/':
      return { title: 'AKIL KATI', showIcons: false, aspectRatio: '375 / 240', titleTop: '42%' };
    case '/secimli':
      return { title: 'SEÇİMLİ\nTEST', showIcons: true, aspectRatio: '375 / 160', titleTop: '25%' };
    case '/oyun':
      return { title: 'SEÇİMLİ\nTEST', showIcons: true, aspectRatio: '375 / 200', titleTop: '25%' };
    case '/secimli-sonuc':
      return { title: 'SEÇİMLİ\nTEST', showIcons: true, aspectRatio: '375 / 200', titleTop: '35%' };
    case '/ezber':
      return { title: 'EZBER\nKARTLARI', showIcons: true, aspectRatio: '375 / 200', titleTop: '35%' };
    case '/sirali':
      return { title: 'SIRALI\nSEÇİM', showIcons: true, aspectRatio: '375 / 200', titleTop: '35%' };
    case '/sirali-oyun':
      return { title: 'SIRALI\nSEÇİM', showIcons: true, aspectRatio: '375 / 200', titleTop: '25%' };
    case '/meydan':
      return { title: 'MEYDAN\nOKUMA', showIcons: true, aspectRatio: '375 / 200', titleTop: '35%' };  
    case '/meydan-oyun':
      return { title: 'MEYDAN\nOKUMA', showIcons: true, aspectRatio: '375 / 160', titleTop: '25%' }; 
    case '/meydan-sonuc':
      return { title: 'MEYDAN\nOKUMA', showIcons: true, aspectRatio: '375 / 220', titleTop: '25%' }; 
    default:
      return { title: 'PİPİRİK', showIcons: true, aspectRatio: '375 / 210', titleTop: '35%' };
  }
};

export default function Layout({ children }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const headerConfig = getHeaderConfig(location.pathname);

  return (
    <div className="fixed inset-0 w-full h-full flex justify-center bg-white bg-grid-paper overflow-hidden select-none touch-none">
      <div className="w-full max-w-lg h-dvh relative flex flex-col overflow-x-hidden">

          {/* 1. WAVE HEADER BURAYA GELDİ (headerConfig artık kullanılıyor) */}
          <div className="relative z-0"> 
            <WaveHeader 
              title={headerConfig.title}
              showIcons={headerConfig.showIcons}
              aspectRatio={headerConfig.aspectRatio}
              titleTop={headerConfig.titleTop}
            />
          </div>

                {!isHomePage && (
          <div 
            className="absolute z-[-1] pointer-events-none opacity-100 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            style={{ 
              width: '117.6%', 
              left: '-6.4%', 
              top: '220px',
              aspectRatio: '441/456' 
            }}
          >
            <svg viewBox="0 0 375 456" className="w-full h-full" fill="none">
              <path d="M415 146.881L375 352.881C361.5 386.381 310.4 453.881 214 455.881C93.5 458.381 156 391.881 59.5 330.381C-37 268.881 -33 196.381 -11.5 123.381C3.21467 73.4197 80.2274 18.0717 107.496 5.74437C130.192 -6.18937 164.445 -0.947524 220 34.9732C283.55 76.0639 321.323 102.142 345.5 118.668C361 128.072 395.1 137.081 407.5 97.8811C419.9 58.6811 417.667 114.214 415 146.881Z" fill="var(--color-tema-vector)"/>
            </svg>
          </div>
        )}

        {/* Sayfa İçerikleri */}
        {/* flex-1 ekledik ki Header büyüyüp küçüldüğünde alt içerikleri de nazikçe aşağı itsin */}
        <div className="relative z-10 w-full flex-1 flex flex-col items-center">
          {children}
        </div>
      </div>
    </div>
  );
}