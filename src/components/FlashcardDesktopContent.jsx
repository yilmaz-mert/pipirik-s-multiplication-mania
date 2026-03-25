// src/components/FlashcardDesktopContent.jsx
import React from 'react';
import { TABLE_MENU_ITEMS } from '../constants';

function MultiplicationTable({ selectedTable }) {
  const multipliers = [2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div
      id="flashcard-tabpanel"
      role="tabpanel"
      aria-labelledby={`tab-${selectedTable}`}
      className="flex-1 flex items-center justify-center p-6"
    >
      <div
        className="grid gap-0 text-tema-yazi font-poppins font-bold text-[28px] tracking-wide w-full max-w-[380px]"
        style={{ gridTemplateColumns: '3rem 2rem 3rem 2rem 4rem' }}
      >
        {multipliers.map((m, index) => {
          const isOrange = index % 2 === 1;
          const bg = isOrange ? 'bg-tema-kutu' : 'bg-tema-enak';
          const isFirst = index === 0;
          const isLast = index === multipliers.length - 1;
          const roundedTL = isFirst ? 'rounded-tl-2xl' : '';
          const roundedBL = isLast ? 'rounded-bl-2xl' : '';
          const roundedTR = isFirst ? 'rounded-tr-2xl' : '';
          const roundedBR = isLast ? 'rounded-br-2xl' : '';

          return (
            <React.Fragment key={m}>
              <div className={`${bg} ${roundedTL} ${roundedBL} text-right py-3 pl-4 pr-1`}>
                {selectedTable}
              </div>
              <div className={`${bg} text-center py-3`}>x</div>
              <div className={`${bg} text-right py-3 pr-1`}>{m}</div>
              <div className={`${bg} text-center py-3`}>=</div>
              <div className={`${bg} ${roundedTR} ${roundedBR} text-right py-3 pr-4`}>
                {selectedTable * m}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

function TabButtonList({ selected, onSelect }) {
  return (
    <div role="tablist" aria-orientation="vertical" className="flex flex-col w-[200px] shrink-0">
      {TABLE_MENU_ITEMS.map(({ id, label }) => {
        const isActive = id === selected;
        return (
          <button
            key={id}
            id={`tab-${id}`}
            role="tab"
            aria-selected={isActive}
            aria-controls="flashcard-tabpanel"
            onClick={() => onSelect(id)}
            className={`flex-1 px-4 text-center font-poppins font-bold text-base border border-tema-kutu/20 transition-colors ${
              isActive
                ? 'bg-tema-secili border-tema-kutu text-tema-yazi'
                : 'bg-tema-enak text-tema-yazi/70 hover:bg-tema-secili/40'
            } ${id === 2 ? 'rounded-tr-lg' : ''} ${id === 9 ? 'rounded-br-lg' : ''}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default function FlashcardDesktopContent({ selected, onSelect }) {
  return (
    <div className="flex flex-row min-h-[520px] pr-16">
      <MultiplicationTable selectedTable={selected} />
      <TabButtonList selected={selected} onSelect={onSelect} />
    </div>
  );
}
