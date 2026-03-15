import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import useSound from 'use-sound';
import { useGameStore } from '../store/useGameStore';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import Numpad from '../components/Numpad'; // Yeni ekledik

const FlipNumber = ({ value }) => {
  return (
    <div className="relative flex items-center justify-center w-full h-full perspective-[1000px]">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={value}
          initial={{ rotateX: -90, y: "-50%", opacity: 0 }}
          animate={{ rotateX: 0, y: "0%", opacity: 1 }}
          exit={{ rotateX: 90, y: "50%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 15, duration: 0.4 }}
          style={{ transformOrigin: "center center" }}
          className="absolute flex items-center justify-center w-full h-full"
        >
          {value}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default function MeydanGamePage() {
  const navigate = useNavigate();
  const { handleAnswer, setMode, timer, resetGame } = useGameStore();

  const [questions] = useState(() => {
    let allQuestions = [];
    for (let i = 2; i <= 9; i++) {
      for (let j = 2; j <= 9; j++) {
        allQuestions.push({ num1: i, num2: j, answer: i * j });
      }
    }
    for (let i = allQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
    }
    return allQuestions.slice(0, 20);
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState('idle'); 
  const [localTimer, setLocalTimer] = useState(0);
  const [showPenalty, setShowPenalty] = useState(false);
  const [results, setResults] = useState({ correct: 0, wrong: 0, answers: [] });
  const [counterPortal, setCounterPortal] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [wrongGuesses, setWrongGuesses] = useState([]);

  useEffect(() => {
    const t = setTimeout(() => {
      resetGame();
      setMode('CHALLENGE');
    }, 0);
    return () => clearTimeout(t);
  }, [setMode, resetGame]);

  useEffect(() => {
    if (timer > 0) {
      const penaltyId = setTimeout(() => {
        setLocalTimer(prev => prev + 10);
        setShowPenalty(true);
      }, 0);
      const hideId = setTimeout(() => setShowPenalty(false), 1500);
      return () => {
        clearTimeout(penaltyId);
        clearTimeout(hideId);
      };
    }
  }, [timer]);

  useEffect(() => {
    const cTarget = document.getElementById('wave-header-counter-target');
    if (cTarget) Promise.resolve().then(() => setCounterPortal(cTarget));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setLocalTimer(prev => prev + 1), 1000);
    return () => clearInterval(interval);
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

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

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
    useGameStore.setState({ currentQuestion });
    const isCorrect = parseInt(userInput, 10) === currentQuestion.answer;
    const currentAnswerData = {
      num1: currentQuestion.num1,
      num2: currentQuestion.num2,
      userAnswer: userInput,
      isCorrect: isCorrect
    };

    if (isCorrect) {
      handleAnswer(userInput);
      playCorrect();
      triggerVibration([35, 40, 35]);
      setStatus('correct');
      setResults(prev => ({ 
        ...prev, 
        correct: prev.correct + 1,
        answers: [...prev.answers, currentAnswerData]
      }));

      setTimeout(() => {
        if (currentIndex + 1 < questions.length) {
          setCurrentIndex(prev => prev + 1);
          setUserInput('');
          setStatus('idle');
          setMistakes(0);
          setWrongGuesses([]);
        } else {
          navigate('/meydan-sonuc', { 
            state: { 
              time: localTimer, 
              correct: results.correct + 1, 
              wrong: results.wrong,
              answers: [...results.answers, currentAnswerData] 
            } 
          });
        }
      }, 700);
    } else {
      playWrong();
      triggerVibration([60, 40, 60]);
      setStatus('wrong');
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      setWrongGuesses(prev => [...prev, userInput]);
      setResults(prev => ({ 
        ...prev, 
        answers: [...prev.answers, currentAnswerData]
      }));
      handleAnswer(userInput);
      if (newMistakes >= 3) {
        setResults(prev => ({ ...prev, wrong: prev.wrong + 1 }));
        setTimeout(() => {
          if (currentIndex + 1 < questions.length) {
            setCurrentIndex(prev => prev + 1);
            setUserInput('');
            setStatus('idle');
            setMistakes(0);
            setWrongGuesses([]);
          } else {
            navigate('/meydan-sonuc', { 
              state: { 
                time: localTimer, 
                correct: results.correct, 
                wrong: results.wrong + 1,
                answers: [...results.answers, currentAnswerData]
              } 
            });
          }
        }, 700);
      } else {
        setTimeout(() => {
          setUserInput('');
          setStatus('idle');
        }, 500);
      }
    }
  };

  return (
    <div className="w-full h-full relative flex flex-col items-center pb-10">
      {counterPortal && createPortal(
        <div className="relative w-full h-full font-poppins font-extrabold -translate-y-4" style={{ color: '#F5E4C3' }}>
          <span className="absolute text-[15px] leading-5.5 text-center" style={{ left: '5%', top: '14.28%', width: '23px' }}>{currentIndex + 1}</span>
          <span className="absolute text-[32px] leading-12 text-center" style={{ left: '40%', top: '0%', width: '7px' }}>/</span>
          <span className="absolute text-[15px] leading-5.5 text-center" style={{ left: '55%', top: '54.76%', width: '28px' }}>{questions.length}</span>
        </div>,
        counterPortal
      )}
      <div className="relative z-20 w-[89.33%] max-w-83.75 flex flex-col items-center mt-4">
        <div className="relative flex flex-col items-center">
          <div 
            className="bg-tema-kutu flex items-center justify-center relative z-30 overflow-hidden font-poppins font-extrabold text-[14px] text-tema-yazi leading-none" 
            style={{ width: '75px', height: '23px', borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}
          >
            {formatTime(localTimer).split('').map((char, index) => (
              char === ':' ? (
                <span key="colon" className="mx-px mb-px">:</span>
              ) : (
                <div key={index} className="relative w-2.75 h-full flex items-center justify-center">
                  <FlipNumber value={char} />
                </div>
              )
            ))}
          </div>
          <AnimatePresence>
            {showPenalty && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="absolute -top-7 z-50 font-poppins font-extrabold text-[14px] text-[#721C24] whitespace-nowrap drop-shadow-sm">
                +10 Sn Ceza!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="relative w-full h-24 bg-tema-kutu rounded-[20px] shadow-sm flex items-center px-4">
          <div className="w-full grid grid-cols-3 gap-x-9">
            <div className="w-full aspect-74/70 bg-tema-enak rounded-[20px] flex items-center justify-center overflow-hidden font-poppins font-extrabold text-[32px] text-tema-yazi">
              <FlipNumber value={currentQuestion?.num1} />
            </div>
            <div className="w-full aspect-74/70 bg-tema-enak rounded-[20px] flex items-center justify-center overflow-hidden font-poppins font-extrabold text-[32px] text-tema-yazi">
              <FlipNumber value={currentQuestion?.num2} />
            </div>
            <div 
              className="relative w-full aspect-74/70 rounded-[20px] flex items-center justify-center transition-colors duration-300 shadow-inner overflow-hidden font-poppins font-extrabold text-[32px]"
              style={{ 
                backgroundColor: status === 'correct' ? '#D4EDDA' : status === 'wrong' ? '#F8D7DA' : 'var(--color-tema-enak)',
                color: status === 'correct' ? '#155724' : status === 'wrong' ? '#721C24' : 'var(--color-tema-yazi)'
              }}
            >
              <FlipNumber value={userInput !== '' ? userInput : ' '} />
            </div>
          </div>
          <div className="absolute left-[33.33%] top-1/2 -translate-x-1/2 -translate-y-1/2"><span className="font-poppins font-extrabold text-[32px] text-tema-yazi">×</span></div>
          <div className="absolute left-[66.66%] top-1/2 -translate-x-1/2 -translate-y-1/2"><span className="font-poppins font-extrabold text-[32px] text-tema-yazi">=</span></div>
        </div>
        <div className="w-full grid grid-cols-3 gap-x-9 px-4 h-5 mt-1">
          <div className="col-start-3 flex justify-center gap-1">
            {wrongGuesses.map((guess, idx) => (
              <div key={idx} className="flex h-5 w-5 items-center justify-center rounded-[5px] bg-tema-enak text-[11px] font-extrabold italic leading-none text-tema-yazi shadow-sm">
                {guess}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex justify-center items-center h-1 mb-1 gap-">
          {[...Array(mistakes)].map((_, i) => (
            <span key={i} className="font-poppins font-extrabold text-[7.5vw] min-[512px]:text-[28px] text-tema-yazi tracking-widest">X</span>
          ))}
        </div>

        {/* --- MODÜLER NUMPAD KULLANIMI --- */}
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