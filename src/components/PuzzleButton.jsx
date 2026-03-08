import React from 'react';

// eslint-disable-next-line no-unused-vars
export default function PuzzleButton({ title, Icon, onClick, style, textStyle, ariaLabel }) {
  return (
    <button 
      style={style} 
      className="absolute flex items-start justify-start border-none bg-transparent cursor-pointer p-0 m-0 focus:outline-none"
      onClick={onClick}
      aria-label={ariaLabel || (typeof title === 'string' ? title : undefined)}
    >
      <div className="w-full h-full relative">
        <div className="w-full h-full drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex">
          <Icon 
            className="w-full h-full transition-transform duration-200 active:scale-95 pointer-events-auto" 
          />
        </div>
        
        <div 
          style={textStyle}
          className="absolute flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <span className="font-poppins font-black text-[min(5.33vw,27.3px)] text-tema-enak text-center leading-7.5 uppercase select-none">
            {title}
          </span>
        </div>
      </div>
    </button>
  );
}
