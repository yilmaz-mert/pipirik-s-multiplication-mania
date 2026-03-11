import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import useSound from 'use-sound';
import { useGameStore } from '../store/useGameStore';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

// --- YAPRAK ÇEVİRME (FLIP) BİLEŞENİ ---
const FlipNumber = ({ value }) => {
  return (
    <div className="relative flex items-center justify-center w-full h-full perspective-[1000px]">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={value}
          initial={{ rotateX: -90, y: "-50%", opacity: 0 }}
          animate={{ rotateX: 0, y: "0%", opacity: 1 }}
          exit={{ rotateX: 90, y: "50%", opacity: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 150, 
            damping: 15,
            duration: 0.4 
          }}
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

  useEffect(() => {
    resetGame();
    setMode('CHALLENGE');
  }, [setMode, resetGame]);

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
  const [results, setResults] = useState({ correct: 0, wrong: 0 });
  const [counterPortal, setCounterPortal] = useState(null);

  const [mistakes, setMistakes] = useState(0);
  const [wrongGuesses, setWrongGuesses] = useState([]);

  useEffect(() => {
    const cTarget = document.getElementById('wave-header-counter-target');
    if (cTarget) {
      Promise.resolve().then(() => setCounterPortal(cTarget));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLocalTimer(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer > 0) {
      Promise.resolve().then(() => {
        setLocalTimer(prev => prev + 10);
        setShowPenalty(true);
      });
      
      const timeoutId = setTimeout(() => setShowPenalty(false), 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [timer]);

  const [playClick] = useSound('/sounds/click.ogg', { volume: 0.5 });
  const [playCorrect] = useSound('/sounds/correct.ogg');
  const [playWrong] = useSound('/sounds/wrong.ogg');

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];
  const numpadKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'del', '0', 'check'];

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleNumpad = (value) => {
    if (status !== 'idle') return; 
    if (userInput === '' && value === '0') return;
    playClick();
    if (userInput.length < 3) setUserInput(prev => prev + value);
  };

  const handleDelete = () => {
    if (status !== 'idle') return;
    playClick();
    setUserInput(prev => prev.slice(0, -1));
  };

  const handleCheck = () => {
    if (status !== 'idle' || userInput === '') return;
    
    const isCorrect = parseInt(userInput, 10) === currentQuestion.answer;

    if (isCorrect) {
      // Doğru cevap mantığı aynı kalıyor
      useGameStore.setState({ currentQuestion }); 
      handleAnswer(userInput);
      playCorrect();
      setStatus('correct');
      setResults(prev => ({ ...prev, correct: prev.correct + 1 }));

      setTimeout(() => {
        if (currentIndex + 1 < questions.length) {
          setCurrentIndex(prev => prev + 1);
          setUserInput('');
          setStatus('idle');
          setMistakes(0);
          setWrongGuesses([]);
        } else {
          navigate('/meydan-sonuc', { state: { time: localTimer, correct: results.correct + 1, wrong: results.wrong } });
        }
      }, 700);

    } else {
      // YANLIŞ CEVAP DURUMU
      playWrong();
      setStatus('wrong');
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      setWrongGuesses(prev => [...prev, userInput]);

      // --- KRİTİK DEĞİŞİKLİK: Her yanlışta Store'u bilgilendir ---
      handleAnswer(userInput); 

      if (newMistakes >= 3) {
        // Soruyu tamamen kaybettiğinde toplam yanlış sonucunu artır
        setResults(prev => ({ ...prev, wrong: prev.wrong + 1 }));
        
        setTimeout(() => {
          if (currentIndex + 1 < questions.length) {
            setCurrentIndex(prev => prev + 1);
            setUserInput('');
            setStatus('idle');
            setMistakes(0);
            setWrongGuesses([]);
          } else {
            navigate('/meydan-sonuc', { state: { time: localTimer, correct: results.correct, wrong: results.wrong + 1 } });
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
        <div className="relative w-full h-full font-poppins font-extrabold" style={{ color: '#F5E4C3' }}>
          <span className="absolute text-[15px] leading-5.5 text-center" style={{ left: '5%', top: '14.28%', width: '23px' }}>{currentIndex + 1}</span>
          <span className="absolute text-[32px] leading-12 text-center" style={{ left: '40%', top: '0%', width: '7px' }}>/</span>
          <span className="absolute text-[15px] leading-5.5 text-center" style={{ left: '55%', top: '54.76%', width: '28px' }}>{questions.length}</span>
        </div>,
        counterPortal
      )}

      <div className="relative z-20 w-[89.33%] max-w-83.75 flex flex-col items-center mt-2">
        
        {/* TIMER */}
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
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                // z-50 eklendi ve y ekseni biraz daha yukarı çekildi
                className="absolute -top-7 z-50 font-poppins font-extrabold text-[14px] text-[#721C24] whitespace-nowrap drop-shadow-sm"
              >
                +10 Sn Ceza!
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* SORU KUTUSU - mt-2 kaldırıldı, timer ile birleşti */}
        <div className="relative w-full h-24 bg-tema-kutu rounded-[20px] shadow-sm flex items-center px-4">
          <div className="w-full grid grid-cols-3 gap-x-9">
            
            {/* 1. Sayı Alanı */}
            <div className="w-full aspect-74/70 bg-tema-enak rounded-[20px] flex items-center justify-center overflow-hidden font-poppins font-extrabold text-[32px] text-tema-yazi">
              <FlipNumber value={currentQuestion?.num1} />
            </div>
            
            {/* İKİnci Sayı Alanı */}
            <div className="w-full aspect-74/70 bg-tema-enak rounded-[20px] flex items-center justify-center overflow-hidden font-poppins font-extrabold text-[32px] text-tema-yazi">
              <FlipNumber value={currentQuestion?.num2} />
            </div>
            
            {/* ÜÇüncü Alan: Cevap */}
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

        {/* YANLIŞ TAHMİNLER */}
        <div className="w-full grid grid-cols-3 gap-x-9 px-4 h-5 mt-2">
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

        {/* X'LER ALANI */}
        <div className="w-full flex justify-center items-center h-1 mb-2 gap-">
          {[...Array(mistakes)].map((_, i) => (
            <span key={i} className="font-poppins font-extrabold text-[7.5vw] min-[512px]:text-[28px] text-tema-yazi tracking-widest">X</span>
          ))}
        </div>

        {/* NUMPAD ALANI */}
        <div className="w-full grid grid-cols-3 gap-x-9 gap-y-4 px-4 mt-4">
          {numpadKeys.map((key) => (
            <button
              key={key}
              onClick={() => (key === 'del' ? handleDelete() : key === 'check' ? handleCheck() : handleNumpad(key))}
              className={`w-full aspect-74/70 rounded-[18px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex justify-center items-center active:scale-90 transition-all duration-150 ${key === 'check' ? (userInput === '' ? 'bg-gray-300 opacity-50' : 'bg-tema-buton2') : 'bg-tema-kutu'}`}
            >
              {key === 'del' ? (
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className="text-tema-yazi"><path fillRule="evenodd" clipRule="evenodd" d="M3.52186 25.5567C2.73194 24.3667 2.31061 22.9701 2.31061 21.5417C2.31061 20.1134 2.73194 18.7168 3.52186 17.5267C6.48269 13.0607 10.0366 9.70937 12.0982 7.95396C13.4292 6.82004 15.0847 6.25171 16.7613 6.18387C19.1015 6.08854 23.0964 5.95837 27.5 5.95837C30.6561 5.95837 33.7004 6.02529 36.0837 6.09771C39.5304 6.20312 42.3244 8.89537 42.46 12.3732C42.5743 15.428 42.6293 18.4848 42.625 21.5417C42.625 25.3532 42.5489 28.4259 42.46 30.7102C42.3244 34.188 39.5304 36.8794 36.0837 36.9857C33.7004 37.059 30.6561 37.125 27.5 37.125C23.0964 37.125 19.1015 36.9949 16.7613 36.8995C15.0847 36.8317 13.4292 36.2625 12.0982 35.1295C10.0366 33.3731 6.48361 30.0236 3.52186 25.5567ZM34.2669 18.36C34.881 17.6963 35.0552 16.7631 34.5052 16.0445C34.2751 15.742 33.9735 15.3918 33.5839 15.0022C33.2572 14.6722 32.909 14.3641 32.5417 14.08C31.823 13.531 30.8899 13.7051 30.2262 14.3193C28.9964 15.4665 27.7835 16.6317 26.5879 17.8145C25.3931 16.6325 24.1808 15.4682 22.9515 14.322C22.2879 13.707 21.3547 13.5328 20.636 14.0819C20.3335 14.3129 19.9843 14.6135 19.5938 15.0031C19.2042 15.3936 18.9035 15.7438 18.6725 16.0454C18.1225 16.764 18.2967 17.6972 18.9118 18.3609C20.0583 19.5902 21.2229 20.8024 22.4052 21.9973C20.6929 23.739 19.5883 24.9031 18.9063 25.6392C18.2921 26.3029 18.1179 27.236 18.6679 27.9547C18.898 28.2572 19.1987 28.6074 19.5892 28.997C19.9797 29.3865 20.3289 29.6881 20.6305 29.9182C21.3501 30.4682 22.2824 30.294 22.946 29.6799C23.683 28.9979 24.8472 27.8924 26.5879 26.18C28.3296 27.8942 29.4947 28.9988 30.2317 29.6808C30.8954 30.295 31.8285 30.4691 32.5472 29.92C32.8497 29.689 33.1989 29.3884 33.5894 28.9988C33.979 28.6083 34.2797 28.2581 34.5107 27.9565C35.0607 27.2379 34.8865 26.3047 34.2714 25.641C33.5894 24.905 32.4839 23.739 30.7707 21.9973C31.9536 20.8021 33.1197 19.5895 34.2669 18.36Z" fill="currentColor"/></svg>
              ) : key === 'check' ? (
                <Check size={40} strokeWidth={4} className={userInput === '' ? 'text-gray-500' : 'text-tema-enak'} />
              ) : (
                <span className="font-poppins font-extrabold text-[32px] text-tema-yazi">{key}</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}