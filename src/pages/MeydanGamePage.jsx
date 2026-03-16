import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import Numpad from '../components/Numpad';
import QuestionCard from '../components/QuestionCard';
import FlipNumber from '../components/FlipNumber';
import GameHeaderStats from '../components/GameHeaderStats';
import { useGameLogic } from '../hooks/useGameLogic';
import { CHALLENGE_QUESTION_COUNT } from '../constants';

export default function MeydanGamePage() {
  const navigate = useNavigate();
  const { handleAnswer, setMode, timer, resetGame } = useGameStore();

  const [questions] = useState(() => {
    let allQuestions = [];
    for (let i = 2; i <= 9; i++)
      for (let j = 2; j <= 9; j++) allQuestions.push({ num1: i, num2: j, answer: i * j });
    // Fisher-Yates shuffle
    for (let i = allQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
    }
    return allQuestions.slice(0, CHALLENGE_QUESTION_COUNT);
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [localTimer, setLocalTimer] = useState(0);
  const [showPenalty, setShowPenalty] = useState(false);
  const [results, setResults] = useState({ correct: 0, wrong: 0, answers: [] });
  const [mistakes, setMistakes] = useState(0);
  const [wrongGuesses, setWrongGuesses] = useState([]);

  const {
    userInput, setUserInput,
    status, setStatus,
    handleNumpad, handleDelete,
    playCorrect, playWrong,
    triggerVibration,
  } = useGameLogic();

  // Initialize challenge mode in the store on mount
  useEffect(() => {
    const t = setTimeout(() => {
      resetGame();
      setMode('CHALLENGE');
    }, 0);
    return () => clearTimeout(t);
  }, [setMode, resetGame]);

  // React to store-level penalty timer increments triggered by handleAnswer
  useEffect(() => {
    if (timer > 0) {
      const penaltyId = setTimeout(() => {
        setLocalTimer((prev) => prev + 10);
        setShowPenalty(true);
      }, 0);
      const hideId = setTimeout(() => setShowPenalty(false), 1500);
      return () => {
        clearTimeout(penaltyId);
        clearTimeout(hideId);
      };
    }
  }, [timer]);

  // Local stopwatch — increments every second
  useEffect(() => {
    const interval = setInterval(() => setLocalTimer((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const advanceQuestion = (finalResults) => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setUserInput('');
      setStatus('idle');
      setMistakes(0);
      setWrongGuesses([]);
    } else {
      navigate('/meydan-sonuc', { state: { time: localTimer, ...finalResults } });
    }
  };

  const handleCheck = () => {
    if (status !== 'idle' || userInput === '') return;
    useGameStore.setState({ currentQuestion });
    const isCorrect = parseInt(userInput, 10) === currentQuestion.answer;
    const currentAnswerData = {
      num1: currentQuestion.num1,
      num2: currentQuestion.num2,
      userAnswer: userInput,
      isCorrect,
    };

    if (isCorrect) {
      handleAnswer(userInput);
      playCorrect();
      triggerVibration([35, 40, 35]);
      setStatus('correct');
      const updated = {
        correct: results.correct + 1,
        wrong: results.wrong,
        answers: [...results.answers, currentAnswerData],
      };
      setResults(updated);
      setTimeout(() => advanceQuestion(updated), 700);
    } else {
      playWrong();
      triggerVibration([60, 40, 60]);
      setStatus('wrong');
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      setWrongGuesses((prev) => [...prev, userInput]);
      const updatedAnswers = [...results.answers, currentAnswerData];
      setResults((prev) => ({ ...prev, answers: updatedAnswers }));
      handleAnswer(userInput);

      // After 3 wrong guesses, count the question as wrong and move on
      if (newMistakes >= 3) {
        const updated = {
          correct: results.correct,
          wrong: results.wrong + 1,
          answers: updatedAnswers,
        };
        setResults(updated);
        setTimeout(() => advanceQuestion(updated), 700);
      } else {
        setTimeout(() => {
          setUserInput('');
          setStatus('idle');
        }, 500);
      }
    }
  };

  const timerHeader = (
    <div className="relative flex flex-col items-center">
      <div
        className="bg-tema-kutu flex items-center justify-center relative z-30 overflow-hidden font-poppins font-extrabold text-[14px] text-tema-yazi leading-none"
        style={{ width: '75px', height: '23px', borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}
      >
        {formatTime(localTimer).split('').map((char, index) =>
          char === ':' ? (
            <span key="colon" className="mx-px mb-px">:</span>
          ) : (
            <div key={index} className="relative w-2.75 h-full flex items-center justify-center">
              <FlipNumber value={char} />
            </div>
          )
        )}
      </div>
      <AnimatePresence>
        {showPenalty && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="absolute -top-7 z-50 font-poppins font-extrabold text-[14px] text-[#721C24] whitespace-nowrap drop-shadow-sm"
          >
            +10 Sn Ceza!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="w-full h-full relative flex flex-col items-center pb-10">
      <GameHeaderStats mode="counter" currentIndex={currentIndex} total={questions.length} />

      <div className="relative z-20 w-[89.33%] max-w-83.75 flex flex-col items-center mt-4">
        <QuestionCard
          key="static-question-card"
          disableAnimation={true}
          useFlip={true}
          num1={currentQuestion?.num1}
          num2={currentQuestion?.num2}
          userInput={userInput}
          status={status}
          headerContent={timerHeader}
        />

        <div className="w-full grid grid-cols-3 gap-x-9 px-4 h-5 mt-1">
          <div className="col-start-3 flex justify-center gap-1">
            {wrongGuesses.map((guess, idx) => (
              <div
                key={idx}
                className="flex h-5 w-5 items-center justify-center rounded-[5px] bg-tema-enak text-[11px] font-extrabold italic leading-none text-tema-yazi shadow-sm"
              >
                {guess}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex justify-center items-center h-1 mb-1 gap-">
          {[...Array(mistakes)].map((_, i) => (
            <span
              key={i}
              className="font-poppins font-extrabold text-[7.5vw] min-[512px]:text-[28px] text-tema-yazi tracking-widest"
            >
              X
            </span>
          ))}
        </div>

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
