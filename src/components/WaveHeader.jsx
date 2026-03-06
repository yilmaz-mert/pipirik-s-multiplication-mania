import React from 'react';

export default function WaveHeader({ title, waveHeight = '313px' }) {
  return (
    <>
      <div 
        className="absolute z-0 pointer-events-none"
        style={{ 
          top: '0', 
          left: '50%', 
          transform: 'translateX(-50%)',
          width: 'calc(var(--vp-w) / var(--app-scale, 1))', 
          height: waveHeight,
        }}
      >
        <div 
          className="absolute w-full"
          style={{ 
            backgroundColor: '#9CB9B7', 
            height: '2000px', 
            bottom: '99%', 
            left: 0
          }} 
        />
        <svg 
          viewBox="0 0 375 305" 
          className="w-full h-full block relative z-10" 
          shapeRendering="geometricPrecision" 
          preserveAspectRatio="none" 
        >
          <path 
            d="M-1 -1H376V194.394C375 254.398 307.909 289.17 249.375 275.971C194.258 263.541 149.326 273.269 100.876 291.42C51.9 309.77 -1 276.193 -1 223.892V-1Z"
            fill="#9CB9B7"
            style={{ filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.25))' }}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
      
      {/* Başlık */}
      {title && (
        <h1 
          className="absolute w-full font-outfit font-extrabold text-[36px] text-[#F5E4C3] text-center z-10"
          style={{ top: '130px' }}
        >
          {title}
        </h1>
      )}
    </>
  );
}
