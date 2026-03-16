import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Numpad from '../components/Numpad';
import QuestionCard from '../components/QuestionCard';
import GameHeaderStats from '../components/GameHeaderStats';
import { useGameLogic } from '../hooks/useGameLogic';

export default function SiraliGamePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [questions] = useState(() => {
    const tables = location.state?.selected || ['mix'];
    const newQuestions = [];
    if (tables.includes('mix')) {
      for (let i = 2; i <= 9; i++)
        for (let j = 1; j <= 10; j++) newQuestions.push({ num1: i, num2: j, answer: i * j });
    } else {
      [...tables].sort((a, b) => a - b).forEach((table) => {
        for (let i = 1; i <= 10; i++) newQuestions.push({ num1: table, num2: i, answer: table * i });
      });
    }
    return newQuestions;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState({ correct: 0, wrong: 0, answers: [] });

  const {
    userInput, setUserInput,
    status, setStatus,
    isExiting, setIsExiting,
    handleNumpad, handleDelete,
    playCorrect, playWrong,
    triggerVibration,
  } = useGameLogic();

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];

  const handleCheck = () => {
    if (status !== 'idle' || userInput === '') return;
    const isCorrect = parseInt(userInput, 10) === currentQuestion.answer;
    const currentAnswerData = {
      num1: currentQuestion.num1,
      num2: currentQuestion.num2,
      userAnswer: userInput,
      isCorrect,
    };

    if (isCorrect) {
      playCorrect();
      triggerVibration([35, 40, 35]);
      setStatus('correct');
      setResults((prev) => ({
        ...prev,
        correct: prev.correct + 1,
        answers: [...prev.answers, currentAnswerData],
      }));
    } else {
      playWrong();
      triggerVibration([60, 40, 60]);
      setStatus('wrong');
      setResults((prev) => ({
        ...prev,
        wrong: prev.wrong + 1,
        answers: [...prev.answers, currentAnswerData],
      }));
    }

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setIsExiting(true);
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
          setUserInput('');
          setStatus('idle');
          setIsExiting(false);
        }, 300);
      } else {
        const finalCorrect = isCorrect ? results.correct + 1 : results.correct;
        const finalWrong = !isCorrect ? results.wrong + 1 : results.wrong;
        navigate('/sirali-sonuc', {
          state: {
            correct: finalCorrect,
            wrong: finalWrong,
            answers: [...results.answers, currentAnswerData],
            gameConfig: location.state,
          },
        });
      }
    }, 700);
  };

  return (
    <div className="w-full h-full relative flex flex-col items-center pb-10 overflow-hidden">
      <GameHeaderStats mode="progress" currentIndex={currentIndex} total={questions.length} />

      <div className="relative z-20 w-[89.33%] max-w-83.75 flex flex-col items-center mt-2">
        <QuestionCard
          key={currentIndex}
          num1={currentQuestion?.num1}
          num2={currentQuestion?.num2}
          userInput={userInput}
          status={status}
          isExiting={isExiting}
        />
        <Numpad
          userInput={userInput}
          onNumpadPress={handleNumpad}
          onDelete={handleDelete}
          onCheck={handleCheck}
          className="mt-4"
        />
      </div>
    </div>
  );
}
