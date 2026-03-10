// src/components/WaveHeader.jsx
import React from 'react';
import { Home, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function WaveHeader({ 
  title, 
  titleTop = '42%', 
  showIcons = true, 
  aspectRatio = "375 / 275", 
}) {
  const navigate = useNavigate();

  return (
    <div 
      className="relative w-full shrink-0 transition-all duration-600 ease-in-out" 
      style={{ aspectRatio }}
    >
      {/* 1. Arka Plan SVG */}
      <div className="absolute inset-0 z-0 pointer-events-none w-full h-full">
        <div 
          className="absolute w-full"
          style={{ backgroundColor: '#9CB9B7', height: '100vh', bottom: '99%', left: 0 }} 
        />
        <svg viewBox="0 0 375 305" className="w-full h-full block relative z-10" shapeRendering="geometricPrecision" preserveAspectRatio="none">
          <path d="M-1 -1H376V194.394C375 254.398 307.909 289.17 249.375 275.971C194.258 263.541 149.326 273.269 100.876 291.42C51.9 309.77 -1 276.193 -1 223.892V-1Z" fill="#9CB9B7" style={{ filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.25))' }} vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      
      {/* 2. Başlık ve Alt İçerik Grubu */}
      <div 
        className="absolute w-full z-10 flex flex-col items-center gap-3 transition-all duration-600 ease-in-out" 
        style={{ top: titleTop }}
      >
        {title && (
          <h1 className="font-outfit font-extrabold text-[7.5vw] min-[512px]:text-[38.4px] text-tema-enak drop-shadow-lg text-center leading-tight px-4 whitespace-pre-wrap transition-all duration-300">
            {title}
          </h1>
        )}
        
        <div id="wave-header-portal-target" className="w-full flex justify-center"></div>
      </div>

      {/* 3. Soru Sayacı*/}
      <div 
        id="wave-header-counter-target" 
        className="absolute z-20"
        style={{ 
          left: '10.66%',
          top: '68.7%',   
          width: '14.93%', 
          height: '15.27%'
        }}
      ></div>

      {/* 4. İkonlar */}
      {showIcons && (
        <div className="absolute top-[10%] w-full px-6 flex justify-between items-center z-50">
          <button onClick={() => navigate(-1)} className="text-[#1D324F] active:scale-90 transition-transform p-2 cursor-pointer">
            <ChevronLeft size={28} strokeWidth={3} />
          </button>
          <button onClick={() => navigate('/')} className="text-[#1D324F] active:scale-90 transition-transform p-2 cursor-pointer">
            <Home size={28} strokeWidth={3} />
          </button>
        </div>
      )}
    </div>
  );
}