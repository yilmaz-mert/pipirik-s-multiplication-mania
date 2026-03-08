import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WaveHeader from '../components/WaveHeader';
import { Delete, Check } from 'lucide-react';
import useSound from 'use-sound';

export default function SelectiveGamePage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [questions] = useState(() => {
    let newQuestions = [];
    const tables = location.state?.selected || ['mix'];
    
    if (tables.includes('mix')) {
      for (let i = 0; i < 20; i++) {
        const num1 = Math.floor(Math.random() * 8) + 2; 
        const num2 = Math.floor(Math.random() * 8) + 2;
        newQuestions.push({ num1, num2, answer: num1 * num2 });
      }
    } else {
      tables.forEach(table => {
        let tableQuestions = [];
        for (let i = 1; i <= 10; i++) {
          tableQuestions.push({ num1: table, num2: i, answer: table * i });
        }
        tableQuestions = tableQuestions.sort(() => Math.random() - 0.5);
        newQuestions = [...newQuestions, ...tableQuestions];
      });
      newQuestions = newQuestions.sort(() => Math.random() - 0.5);
    }
    
    return newQuestions;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState('idle'); 
  const [results, setResults] = useState({ correct: 0, wrong: 0 });

  const [playClick] = useSound('/sounds/click.ogg', { volume: 0.5 });
  const [playCorrect] = useSound('/sounds/correct.ogg');
  const [playWrong] = useSound('/sounds/wrong.ogg');

  // Animasyonları şimdilik burada tutuyoruz, ancak ileride index.css veya tailwind.config.js'e taşıyabilirsin.
  const gameAnimations = `
    @keyframes slideInQuestion {
      from { opacity: 0; transform: translateX(50px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes shakeWrong {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-8px); }
      40%, 80% { transform: translateX(8px); }
    }
    @keyframes bounceCorrect {
      0%, 100% { transform: scale(1); }
      40% { transform: scale(1.15); }
      60% { transform: scale(0.95); }
      80% { transform: scale(1.05); }
    }
    @keyframes titleSlideUp {
      from { top: 35%; } 
      to { top: 25%; }   
    }
    @keyframes fadeInProgress {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  const currentQuestion = questions[currentIndex];

  const handleNumpad = (value) => {
    if (status !== 'idle') return; 
    if (userInput === '' && value === '0') return;

    playClick();
    if (userInput.length < 3) {
      setUserInput(prev => prev + value);
    }
  };

  const handleDelete = () => {
    if (status !== 'idle') return;
    playClick();
    setUserInput(prev => prev.slice(0, -1));
  };

  const handleCheck = () => {
    if (status !== 'idle' || userInput === '') return;
    
    const parsedInput = parseInt(userInput, 10);
    const isCorrect = parsedInput === currentQuestion.answer;

    if (isCorrect) {
      playCorrect();
      setStatus('correct');
      setResults(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      playWrong();
      setStatus('wrong');
      setResults(prev => ({ ...prev, wrong: prev.wrong + 1 }));
    }

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(prev => prev + 1);
        setUserInput('');
        setStatus('idle');
      } else {
        const finalCorrect = isCorrect ? results.correct + 1 : results.correct;
        const finalWrong = !isCorrect ? results.wrong + 1 : results.wrong;
        navigate('/secimli-sonuc', { state: { correct: finalCorrect, wrong: finalWrong } });
      }
    }, 1000);
  };

  if (questions.length === 0) return <div className="flex items-center justify-center h-full font-poppins text-tema-yazi">Yükleniyor...</div>;

  const progressPercentage = ((currentIndex + 1) / questions.length) * 100;

  // Tuş takımını basit bir diziye indirdik
  const numpadKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'del', '0', 'check'];

  return (
    <div className="w-full h-full relative flex flex-col items-center pb-10 overflow-hidden">
      <style>{gameAnimations}</style>
      
      <WaveHeader 
        title={<>SEÇİMLİ<br/>TEST</>} 
        aspect="aspect-[375/220]" 
        titleTop="25%" 
        containerClassName="animate-[titleSlideUp_0.6s_ease-out_forwards]"
      >
        <div className="w-[89.33%] max-w-83.75 flex flex-col animate-[fadeInProgress_0.5s_ease-out_0.4s_forwards] opacity-0">
          <div className="flex justify-end w-full mb-1">
            <span className="text-tema-enak font-poppins font-extrabold text-[13px] leading-none">
              {currentIndex + 1} / {questions.length}
            </span>
          </div>
          <div className="w-full h-2.5 bg-tema-enak rounded-full shadow-inner">
            <div 
              className="h-full bg-tema-kutu rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </WaveHeader>

      {/* Ana İçerik Kapsayıcısı - max-w-[335px] ile Figma'daki maksimum genişliği kilitliyoruz */}
      <div className="relative z-20 w-[89.33%] max-w-83.75 flex flex-col items-center mt-4">

        {/* --- SORU ALANI --- */}
        <div 
          key={currentIndex}
          className="relative w-full h-24 bg-tema-kutu rounded-[20px] shadow-sm mb-2 flex items-center px-4"
          style={{ animation: 'slideInQuestion 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards' }}
        >
          {/* Soru Kutuları İçin 3 Sütunlu Grid */}
          <div className="w-full grid grid-cols-3 gap-x-9">
            {/* Num 1 */}
            <div className="w-full aspect-74/70 bg-tema-enak rounded-[20px] flex items-center justify-center">
              <span className="font-poppins font-extrabold text-[32px] text-tema-yazi">{currentQuestion?.num1}</span>
            </div>
            
            {/* Num 2 */}
            <div className="w-full aspect-74/70 bg-tema-enak rounded-[20px] flex items-center justify-center">
              <span className="font-poppins font-extrabold text-[32px] text-tema-yazi">{currentQuestion?.num2}</span>
            </div>

            {/* Cevap */}
            <div 
              className="w-full aspect-74/70 rounded-[20px] flex items-center justify-center transition-colors duration-300 shadow-inner"
              style={{
                backgroundColor: status === 'correct' ? '#D4EDDA' : status === 'wrong' ? '#F8D7DA' : 'var(--color-tema-enak)',
                animation: status === 'correct' ? 'bounceCorrect 0.6s ease-in-out' : status === 'wrong' ? 'shakeWrong 0.4s ease-in-out' : 'none'
              }}
            >
              <span 
                className="font-poppins font-extrabold text-[32px]"
                style={{ color: status === 'correct' ? '#155724' : status === 'wrong' ? '#721C24' : 'var(--color-tema-yazi)' }}
              >
                {userInput}
              </span>
            </div>
          </div>

          {/* x ve = Operatörleri (Grid boşluklarının tam ortasına yerleştirildi) */}
          <div className="absolute left-[33.33%] top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="font-poppins font-extrabold text-[32px] text-tema-yazi">×</span>
          </div>
          <div className="absolute left-[66.66%] top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="font-poppins font-extrabold text-[32px] text-tema-yazi">=</span>
          </div>
        </div>

        {/* --- NUMPAD ALANI --- */}
        {/* Soru alanı ile BİREBİR AYNI px-[16px] padding ve gap-x-[36px] boşluk değerini kullanıyoruz. */}
        {/* Bu sayede tuşlar, üstteki kutularla jilet gibi hizalanacak. */}
        <div className="w-full grid grid-cols-3 gap-x-9 gap-y-4 px-4 mt-8">
          {numpadKeys.map((key) => (
            <button
              key={key}
              onClick={() => {
                if (key === 'del') handleDelete();
                else if (key === 'check') handleCheck();
                else handleNumpad(key);
              }}
              className={`w-full aspect-74/70 rounded-[18px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex justify-center items-center active:scale-90 transition-all duration-150
                ${key === 'check' ? (userInput === '' ? 'bg-gray-300 opacity-50' : 'bg-tema-buton2') : 'bg-tema-kutu'}`}
            >
              {key === 'del' ? (
                <Delete size={32} strokeWidth={3} className="text-tema-yazi" />
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