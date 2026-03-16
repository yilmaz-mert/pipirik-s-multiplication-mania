import React from 'react';

/**
 * QuestionCard – modüler çarpım sorusu kartı.
 *
 * Props:
 *   num1, num2    – çarpılan sayılar
 *   userInput     – kullanıcının girdiği cevap (string)
 *   status        – 'idle' | 'correct' | 'wrong'
 *   isExiting     – kart çıkış animasyonu tetiklensin mi?
 *   renderValue   – opsiyonel: (value) => ReactNode
 *                   Varsa sayıları ve cevabı bu fonksiyonla render eder
 *                   (Meydan modunda FlipNumber gibi).
 *                   Yoksa standart <span> kullanılır.
 *   headerContent    – opsiyonel: ReactNode
 *                     Kartın hemen üzerinde (bitişik) görünecek alan.
 *                     Meydan modundaki sayaç + ceza uyarısı buradan gelir.
 *   disableAnimation – opsiyonel: boolean (varsayılan false)
 *                     true ise kart kayma animasyonu devre dışı kalır;
 *                     sadece FlipNumber gibi iç animasyonlar çalışır.
 */
export default function QuestionCard({
  num1,
  num2,
  userInput,
  status = 'idle',
  isExiting = false,
  renderValue,
  headerContent,
  disableAnimation = false,
}) {
  const renderNum = (value) => {
    if (renderValue) return renderValue(value);
    return (
      <span className="font-poppins font-extrabold text-[32px] text-tema-yazi">
        {value}
      </span>
    );
  };

  const renderAnswer = () => {
    if (renderValue) return renderValue(userInput !== '' ? userInput : ' ');
    return (
      <span className="font-poppins font-extrabold text-[32px]">
        {userInput}
      </span>
    );
  };

  const answerCellStyle = {
    backgroundColor:
      status === 'correct' ? '#D4EDDA'
      : status === 'wrong'   ? '#F8D7DA'
      : 'var(--color-tema-enak)',
    color:
      status === 'correct' ? '#155724'
      : status === 'wrong'   ? '#721C24'
      : 'var(--color-tema-yazi)',
    animation:
      status === 'correct' ? 'bounceCorrect 0.6s ease-in-out'
      : status === 'wrong'   ? 'shakeWrong 0.4s ease-in-out'
      : 'none',
  };

  const cardStyle = {
    animation: disableAnimation
      ? 'none'
      : isExiting
        ? 'slideOutQuestion 0.3s ease-in forwards'
        : 'slideInQuestion 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
  };

  return (
    <div className="relative flex flex-col items-center w-full">
      {headerContent}

      <div
        className="relative w-full h-24 bg-tema-kutu rounded-[20px] shadow-sm flex items-center px-4 overflow-hidden"
        style={cardStyle}
      >
        <div className="w-full grid grid-cols-3 gap-x-9">
          {/* num1 */}
          <div className="w-full aspect-74/70 bg-tema-enak rounded-[20px] flex items-center justify-center overflow-hidden font-poppins font-extrabold text-[32px] text-tema-yazi">
            {renderNum(num1)}
          </div>

          {/* num2 */}
          <div className="w-full aspect-74/70 bg-tema-enak rounded-[20px] flex items-center justify-center overflow-hidden font-poppins font-extrabold text-[32px] text-tema-yazi">
            {renderNum(num2)}
          </div>

          {/* cevap hücresi */}
          <div
            className="relative w-full aspect-74/70 rounded-[20px] flex items-center justify-center transition-colors duration-300 shadow-inner overflow-hidden font-poppins font-extrabold text-[32px]"
            style={answerCellStyle}
          >
            {renderAnswer()}
          </div>
        </div>

        {/* × işareti */}
        <div className="absolute left-[33.33%] top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="font-poppins font-extrabold text-[32px] text-tema-yazi">×</span>
        </div>

        {/* = işareti */}
        <div className="absolute left-[66.66%] top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="font-poppins font-extrabold text-[32px] text-tema-yazi">=</span>
        </div>
      </div>
    </div>
  );
}
