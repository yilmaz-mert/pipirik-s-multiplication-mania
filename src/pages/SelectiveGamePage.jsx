import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import useSound from 'use-sound';
import Numpad from '../components/Numpad';
import QuestionCard from '../components/QuestionCard';

export default function SelectiveGamePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [answerHistory, setAnswerHistory] = useState([]);
  
  const [questions] = useState(() => {
    let newQuestions = [];
    const tables = location.state?.selected || ['mix'];
    if (tables.includes('mix')) {
      let allQuestions = [];
      for (let i = 2; i <= 9; i++) {
        for (let j = 2; j <= 9; j++) allQuestions.push({ num1: i, num2: j, answer: i * j });
      }
      for (let i = allQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
      }
      newQuestions = allQuestions.slice(0, 20);
    } else {
      tables.forEach(table => {
        for (let i = 1; i <= 10; i++) newQuestions.push({ num1: table, num2: i, answer: table * i });
      });
      for (let i = newQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newQuestions[i], newQuestions[j]] = [newQuestions[j], newQuestions[i]];
      }
    }
    return newQuestions;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState('idle'); 
  const [results, setResults] = useState({ correct: 0, wrong: 0 });
  const [isExiting, setIsExiting] = useState(false);
  const [portalTarget, setPortalTarget] = useState(null);

  useEffect(() => {
    const target = document.getElementById('wave-header-portal-target');
    if (target) Promise.resolve().then(() => setPortalTarget(target));
  }, []); 

  const [playClick] = useSound('/sounds/click.ogg', { volume: 0.5 });
  const [playCorrect] = useSound('/sounds/correct.ogg');
  const [playWrong] = useSound('/sounds/wrong.ogg');

  const triggerVibration = (pattern) => {
    if (typeof window !== 'undefined' && navigator && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];
  const progressPercentage = ((currentIndex + 1) / questions.length) * 100;

  const handleNumpad = (value) => {
    if (status !== 'idle') return; 
    if (userInput === '' && value === '0') return;
    playClick();
    triggerVibration(25);
    if (userInput.length < 3) setUserInput(prev => prev + value);
  };

  const handleDelete = () => {
    if (status !== 'idle') return;
    playClick();
    triggerVibration(35);
    setUserInput(prev => prev.slice(0, -1));
  };

  const handleCheck = () => {
    if (status !== 'idle' || userInput === '') return;
    const isCorrect = parseInt(userInput, 10) === currentQuestion.answer;
    const currentResult = {
      num1: currentQuestion.num1, num2: currentQuestion.num2,
      userAnswer: userInput, correctAnswer: currentQuestion.answer, isCorrect
    };
    setAnswerHistory(prev => [...prev, currentResult]);
    if (isCorrect) {
      playCorrect(); setStatus('correct'); triggerVibration([35, 40, 35]);
      setResults(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      playWrong(); triggerVibration([60, 40, 60]); setStatus('wrong');
      setResults(prev => ({ ...prev, wrong: prev.wrong + 1 }));
    }
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setIsExiting(true); 
        setTimeout(() => {
          setCurrentIndex(prev => prev + 1); setUserInput(''); setStatus('idle'); setIsExiting(false);
        }, 300);
      } else {
        const finalCorrect = isCorrect ? results.correct + 1 : results.correct;
        const finalWrong = !isCorrect ? results.wrong + 1 : results.wrong;
        navigate('/secimli-sonuc', { 
          state: { correct: finalCorrect, wrong: finalWrong, answers: [...answerHistory, currentResult], gameConfig: location.state } 
        });
      }
    }, 700); 
  };
  
  return (
    <div className="w-full h-full relative flex flex-col items-center pb-10 overflow-hidden">
      {portalTarget && createPortal(
        <div className="w-[89.33%] max-w-83.75 flex flex-col animate-[fadeInProgress_0.5s_ease-out_forwards]">
          <div className="flex justify-end w-full -mb-2 -translate-y-4">
            <span className="text-tema-enak font-poppins font-extrabold text-[13px] leading-none">{currentIndex + 1} / {questions.length}</span>
          </div>
          <div className="w-full h-2.5 bg-tema-enak rounded-full shadow-inner">
            <div className="h-full bg-tema-kutu rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }} />
          </div>
        </div>, portalTarget 
      )}

      <div className="relative z-20 w-[89.33%] max-w-83.75 flex flex-col items-center mt-2">
        <QuestionCard
          key={currentIndex}
          num1={currentQuestion?.num1}
          num2={currentQuestion?.num2}
          userInput={userInput}
          status={status}
          isExiting={isExiting}
        />

        <Numpad userInput={userInput} onNumpadPress={handleNumpad} onDelete={handleDelete} onCheck={handleCheck} className="mt-6" />
      </div>
    </div>
  );
}