// src/components/Layout.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import WaveHeader from './WaveHeader';

// Rota bazlı Header Konfigürasyonu
const getHeaderConfig = (pathname) => {
  switch (pathname) {
    case '/':
      return { title: 'AKIL KATI', showIcons: false, aspectRatio: '375 / 275', titleTop: '42%' };
    case '/secimli':
      // \n karakteri whitespace-pre-wrap sayesinde otomatik alt satıra atar
      return { title: 'SEÇİMLİ\nTEST', showIcons: true, aspectRatio: '375 / 210', titleTop: '35%' };
    case '/oyun':
      return { title: 'SEÇİMLİ\nTEST', showIcons: true, aspectRatio: '375 / 220', titleTop: '25%' };
    case '/secimli-sonuc':
      return { title: 'SEÇİMLİ\nTEST', showIcons: true, aspectRatio: '375 / 200', titleTop: '35%' };
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
          <WaveHeader 
            title={headerConfig.title}
            showIcons={headerConfig.showIcons}
            aspectRatio={headerConfig.aspectRatio}
            titleTop={headerConfig.titleTop}
          />

                {!isHomePage && (
          <div 
            className="absolute z-0 pointer-events-none opacity-100"
            style={{ 
              width: '117.6%', 
              left: '-6.4%', 
              top: '279px',
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