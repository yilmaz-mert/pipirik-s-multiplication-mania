import React from 'react';
import FlipNumber from './FlipNumber';

/**
 * QuestionCard — the num1 × num2 = userInput grid card.
 *
 * Props:
 *   num1, num2        – the two operands
 *   userInput         – current answer string typed by the player
 *   status            – 'idle' | 'correct' | 'wrong'
 *   isExiting         – triggers the slide-out animation before question change
 *   useFlip           – when true, renders numbers with FlipNumber (Challenge mode)
 *   headerContent     – optional ReactNode rendered directly above the card,
 *                       used by MeydanGamePage for the timer tab + penalty notice
 *   disableAnimation  – when true, suppresses the slide-in/out card animation;
 *                       only inner FlipNumber animations play (Challenge mode)
 */
export default function QuestionCard({
  num1,
  num2,
  userInput,
  status = 'idle',
  isExiting = false,
  useFlip = false,
  headerContent,
  disableAnimation = false,
}) {
  const renderNum = (value) =>
    useFlip ? (
      <FlipNumber value={value} />
    ) : (
      <span className="font-poppins font-extrabold text-[32px] text-tema-yazi">{value}</span>
    );

  const renderAnswer = () =>
    useFlip ? (
      <FlipNumber value={userInput !== '' ? userInput : ' '} />
    ) : (
      <span className="font-poppins font-extrabold text-[32px]">{userInput}</span>
    );

  const answerCellStyle = {
    backgroundColor:
      status === 'correct' ? '#D4EDDA' : status === 'wrong' ? '#F8D7DA' : 'var(--color-tema-enak)',
    color:
      status === 'correct' ? '#155724' : status === 'wrong' ? '#721C24' : 'var(--color-tema-yazi)',
    animation:
      status === 'correct'
        ? 'bounceCorrect 0.6s ease-in-out'
        : status === 'wrong'
          ? 'shakeWrong 0.4s ease-in-out'
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
          <div className="w-full aspect-74/70 bg-tema-enak rounded-[20px] flex items-center justify-center overflow-hidden font-poppins font-extrabold text-[32px] text-tema-yazi">
            {renderNum(num1)}
          </div>
          <div className="w-full aspect-74/70 bg-tema-enak rounded-[20px] flex items-center justify-center overflow-hidden font-poppins font-extrabold text-[32px] text-tema-yazi">
            {renderNum(num2)}
          </div>
          <div
            className="relative w-full aspect-74/70 rounded-[20px] flex items-center justify-center transition-colors duration-300 shadow-inner overflow-hidden font-poppins font-extrabold text-[32px]"
            style={answerCellStyle}
          >
            {renderAnswer()}
          </div>
        </div>

        <div className="absolute left-[33.33%] top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="font-poppins font-extrabold text-[32px] text-tema-yazi">×</span>
        </div>
        <div className="absolute left-[66.66%] top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="font-poppins font-extrabold text-[32px] text-tema-yazi">=</span>
        </div>
      </div>
    </div>
  );
}
