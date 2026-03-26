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
    // CSS-variable trick: set --wr via style so the Tailwind arbitrary class can reference it,
    // then override with lg:[aspect-ratio:auto] + lg:h-[100px] on desktop.
    <div
      className="relative w-full shrink-0 transition-all duration-600 ease-in-out [aspect-ratio:var(--wr)] lg:[aspect-ratio:auto] lg:h-[100px]"
      style={{ '--wr': aspectRatio }}
    >
      {/* Mobile wave background — hidden on desktop */}
      <div className="lg:hidden absolute inset-0 z-0 pointer-events-none w-full h-full">
        <div
          className="absolute w-full"
          style={{ backgroundColor: '#9CB9B7', height: '100vh', bottom: '99%', left: 0 }}
        />
        <svg viewBox="0 0 375 305" className="w-full h-full block relative z-10" shapeRendering="geometricPrecision" preserveAspectRatio="none">
          <path d="M-1 -1H376V194.394C375 254.398 307.909 289.17 249.375 275.971C194.258 263.541 149.326 273.269 100.876 291.42C51.9 309.77 -1 276.193 -1 223.892V-1Z" fill="#9CB9B7" style={{ filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.25))' }} vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      {/* Desktop wave background — hidden on mobile */}
      <svg
        className="hidden lg:block absolute left-0 right-0 top-0 bottom-0 w-full h-full drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
        viewBox="0 0 1440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path d="M0 0H1440V14.3537C1440 57.7245 1403.53 92.2747 1360.2 90.4038C792.82 65.9054 523.842 78.0546 76.3144 91.7155C34.6167 92.9883 0 59.5199 0 17.8027V0Z" fill="#9CB9B7"/>
      </svg>

      {/* Title + portal slot.
          Mobile: absolutely positioned at --title-top (% from top), centred horizontally.
          Desktop: vertically centred in the 100px bar, left-padded 100px, left-aligned. */}
      <div
        className="absolute w-full [top:var(--title-top)] lg:top-0 lg:h-full lg:justify-start lg:pt-5 lg:left-[100px] lg:w-auto z-10 flex flex-col items-center lg:items-start gap-3 transition-all duration-600 ease-in-out"
        style={{ '--title-top': titleTop }}
      >
        {title && (
          <h1 className="font-outfit font-extrabold text-[7.5vw] min-[512px]:text-[38.4px] lg:text-[36px] lg:leading-[45px] text-tema-enak lg:text-[#FEF1D9] drop-shadow-lg text-center lg:text-left leading-tight px-4 lg:px-0 whitespace-pre-wrap transition-all duration-300">
            {title}
          </h1>
        )}
        <div id="wave-header-portal-target" className="w-full flex justify-center lg:hidden"></div>
      </div>

      {/* Question counter portal target */}
      <div
        id="wave-header-counter-target"
        className="absolute z-20"
        style={{ left: '10.66%', top: '68.7%', width: '14.93%', height: '15.27%' }}
      ></div>

      {/* Navigation icons */}
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
