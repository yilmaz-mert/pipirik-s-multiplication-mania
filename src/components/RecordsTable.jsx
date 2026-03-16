import React from 'react';

const headerCellClass =
  'flex-1 h-full flex items-center justify-center bg-tema-secili/20 rounded-t-[9px] ' +
  'text-center font-poppins font-extrabold text-[min(5vw,20px)] text-tema-yazi ' +
  'uppercase leading-[150%] tracking-[0.15em]';

const bodyCellClass =
  'flex-1 text-center font-poppins font-extrabold text-[min(5vw,20px)] ' +
  'text-tema-yazi uppercase leading-[150%] tracking-[0.05em]';

/**
 * RecordsTable — renders the top-3 challenge records as a semantic HTML table.
 * Empty slots display a dash at reduced opacity.
 */
export default function RecordsTable({ records = [] }) {
  const displayRecords = records.slice(0, 3);

  return (
    <div className="w-full bg-tema-kutu rounded-[9px] flex flex-col items-center pt-[2.4%] px-[2.4%] pb-[3%] shadow-sm aspect-335/224">
      <table className="w-full h-full flex flex-col">
        <thead className="flex w-full items-center gap-[5.01%] h-[17.13%]">
          <tr className="flex w-full h-full gap-[5.01%]">
            <th className={headerCellClass}>Süre</th>
            <th className={headerCellClass}>Doğru</th>
            <th className={headerCellClass}>Yanlış</th>
          </tr>
        </thead>
        <tbody className="flex flex-col w-full flex-1 rounded-b-[9px] rounded-t-[9px] overflow-hidden shadow-inner">
          {[0, 1, 2].map((idx) => {
            const record = displayRecords[idx];
            const rowBg = idx % 2 === 0 ? '#F5E4C3' : '#F9C261';
            return (
              <tr
                key={idx}
                className="flex w-full items-center border-b border-black/5 last:border-0"
                style={{ backgroundColor: rowBg, height: '33.33%' }}
              >
                {record ? (
                  <>
                    <td className="flex-1 text-center font-poppins font-medium text-[min(5vw,20px)] text-tema-yazi uppercase leading-[150%] tracking-[0.05em]">
                      {record.time}
                    </td>
                    <td className={bodyCellClass}>{record.correct}</td>
                    <td className={bodyCellClass}>{record.wrong}</td>
                  </>
                ) : (
                  <>
                    <td className={`${bodyCellClass} opacity-20`}>-</td>
                    <td className={`${bodyCellClass} opacity-20`}>-</td>
                    <td className={`${bodyCellClass} opacity-20`}>-</td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
