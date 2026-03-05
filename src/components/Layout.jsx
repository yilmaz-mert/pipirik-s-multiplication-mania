import React from 'react';

export default function Layout({ children }) {
  return (
    // Ekranı ortalayan dış kapsayıcı
    <div className="min-h-screen flex justify-center items-center">
      {/* Mobil cihaz referans alınmış ana ekran (Max genişlik: 428px) */}
      <div className="w-full max-w-107 h-dvh max-h-231.5 relative overflow-hidden bg-grid-paper shadow-2xl flex flex-col">
        
        {/* Sayfa İçeriği */}
        <div className="flex-1 relative z-10">
          {children}
        </div>

        {/* Sabit Alt Bar (#D9D9D9, 34px yükseklik) */}
        <div className="absolute bottom-0 left-0 w-full h-8.5 bg-[#D9D9D9] z-50"></div>
      </div>
    </div>
  );
}