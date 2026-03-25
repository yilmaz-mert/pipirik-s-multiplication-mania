// src/components/DesktopGameLayout.jsx
import React from 'react';
import foxImage from '../assets/foxy.png';

export default function DesktopGameLayout({ sidebarTitle, children }) {
  return (
    <div className="relative max-w-[920px] w-full mx-auto">
      {/* OuterCard — orange */}
      <div className="bg-tema-kutu rounded-3xl p-5">
        {/* InnerCard — cream, relative for sidebar positioning */}
        <div className="relative bg-tema-enak rounded-2xl overflow-hidden">
          {children}

          {/* Sidebar — flush with InnerCard right edge */}
          <div className="absolute right-0 top-0 h-full w-16 backdrop-blur-sm bg-[rgba(250,236,162,0.25)] rounded-r-2xl flex items-center justify-center">
            <span
              className="font-outfit font-extrabold text-5xl text-tema-kutu/60 -rotate-90 origin-center whitespace-nowrap"
              aria-hidden="true"
            >
              {sidebarTitle}
            </span>
          </div>
        </div>
      </div>

      {/* Mascot — overlaps left edge */}
      <img
        src={foxImage}
        alt=""
        aria-hidden="true"
        className="absolute w-[328px] h-[328px] -left-[192px] top-[164px] pointer-events-none object-contain drop-shadow-lg"
      />
    </div>
  );
}
