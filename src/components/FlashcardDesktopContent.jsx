// src/components/FlashcardDesktopContent.jsx
import React from 'react';
import { TABLE_MENU_ITEMS } from '../constants';

function MultiplicationTable({ selectedTable }) {
  const multipliers = [2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div
      role="tabpanel"
      aria-labelledby={`tab-${selectedTable}`}
      className="flex-1 flex items-center justify-center py-6"
    >
      <div
        className="grid gap-0 text-tema-yazi font-poppins font-bold text-[32px] tracking-wide"
        style={{ gridTemplateColumns: '2rem 1.5rem 2rem 1.5rem 3rem' }}
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
              <div className={`${bg} ${roundedTL} ${roundedBL} text-right py-2 pl-4 pr-1`}>
                {selectedTable}
              </div>
              <div className={`${bg} text-center py-2`}>x</div>
              <div className={`${bg} text-right py-2 pr-1`}>{m}</div>
              <div className={`${bg} text-center py-2`}>=</div>
              <div className={`${bg} ${roundedTR} ${roundedBR} text-right py-2 pr-4`}>
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
    <div role="tablist" className="flex flex-col">
      {TABLE_MENU_ITEMS.map(({ id, label }) => {
        const isActive = id === selected;
        return (
          <button
            key={id}
            id={`tab-${id}`}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(id)}
            className={`px-6 py-3 text-left font-poppins font-bold text-base border-t-2 border-r-2 transition-colors rounded-r-lg ${
              isActive
                ? 'bg-tema-secili border-tema-kutu text-tema-yazi'
                : 'bg-tema-enak border-transparent text-tema-yazi/70 hover:bg-tema-secili/40'
            }`}
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
    <div className="flex flex-row min-h-[500px] pr-16">
      <MultiplicationTable selectedTable={selected} />
      <TabButtonList selected={selected} onSelect={onSelect} />
    </div>
  );
}
