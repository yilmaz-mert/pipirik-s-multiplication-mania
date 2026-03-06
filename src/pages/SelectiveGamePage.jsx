import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WaveHeader from '../components/WaveHeader';
import { Delete, Check } from 'lucide-react';

export default function SelectiveGamePage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'correct', 'wrong'
  const [results, setResults] = useState({ correct: 0, wrong: 0 });

  // Soruları oluştur: component ilk mount olduğunda bir kez çalışsın
  useEffect(() => {
    let newQuestions = [];
    const tables = location.state?.selected || ['mix'];
    
    if (tables.includes('mix')) {
      for (let i = 0; i < 20; i++) {
        const num1 = Math.floor(Math.random() * 8) + 2; // 2 to 9
        const num2 = Math.floor(Math.random() * 8) + 2;
        newQuestions.push({ num1, num2, answer: num1 * num2 });
      }
    } else {
      tables.forEach(table => {
        // Her tablo için 10 soru üreteceğiz (1'den 10'a kadar)
        let tableQuestions = [];
        for (let i = 1; i <= 10; i++) {
          tableQuestions.push({ num1: table, num2: i, answer: table * i });
        }
        // Karıştır
        tableQuestions = tableQuestions.sort(() => Math.random() - 0.5);
        newQuestions = [...newQuestions, ...tableQuestions];
      });
      // Tüm kombine soruları da karıştır
      newQuestions = newQuestions.sort(() => Math.random() - 0.5);
    }
    setQuestions(newQuestions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentQuestion = questions[currentIndex];

  const handleNumpad = (value) => {
    if (status !== 'idle') return; // Cevap gösterilirken tuşlara basma
    if (userInput.length < 3) {
      setUserInput(prev => prev + value);
    }
  };

  const handleDelete = () => {
    if (status !== 'idle') return;
    setUserInput(prev => prev.slice(0, -1));
  };

  const handleCheck = () => {
    if (status !== 'idle' || userInput === '') return;
    
    const parsedInput = parseInt(userInput, 10);
    const isCorrect = parsedInput === currentQuestion.answer;

    if (isCorrect) {
      setStatus('correct');
      setResults(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setStatus('wrong');
      setResults(prev => ({ ...prev, wrong: prev.wrong + 1 }));
    }

    setTimeout(() => {
      // Sonraki soru veya sonuçlar
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(prev => prev + 1);
        setUserInput('');
        setStatus('idle');
      } else {
        // Oyun Bitti
        alert(`Oyun Bitti! Doğru: ${isCorrect ? results.correct + 1 : results.correct}, Yanlış: ${!isCorrect ? results.wrong + 1 : results.wrong}`);
        navigate('/'); // Şimdilik ana sayfaya dön
      }
    }, 1000);
  };

  if (questions.length === 0) return <div>Yükleniyor...</div>;

  const progressPercentage = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="relative w-full h-full min-h-screen overflow-visible flex flex-col items-center">
      {/* Background SVG */}
      <div className="absolute pointer-events-none z-10" style={{ top: '309px', left: '-24px' }}>
        <svg width="441" height="456" viewBox="0 0 375 456" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M415 146.881L375 352.881C361.5 386.381 310.4 453.881 214 455.881C93.5 458.381 156 391.881 59.5 330.381C-37 268.881 -33 196.381 -11.5 123.381C3.21467 73.4197 80.2274 18.0717 107.496 5.74437C130.192 -6.18937 164.445 -0.947524 220 34.9732C283.55 76.0639 321.323 102.142 345.5 118.668C361 128.072 395.1 137.081 407.5 97.8811C419.9 58.6811 417.667 114.214 415 146.881Z" fill="var(--color-tema-vector)"/>
        </svg>
      </div>

      <WaveHeader 
        title={
          <>
            SEÇİMLİ<br/>TEST
          </>
        } 
        waveHeight="222px" 
        titleTop="60px"
      />

      <div className="relative z-20 flex flex-col items-center w-full max-w-93.75 mx-auto pt-40 pb-5">
        
        {/* Progress Bar ve Sayı Göstergesi */}
        <div className="w-full flex-col px-4 mb-4">
          <div className="flex justify-end w-83.75 mx-auto">
            <div 
              className="flex justify-center items-center rounded bg-tema-enak px-2 py-0.5 mb-1 text-tema-yazi font-poppins font-extrabold text-[15px] tracking-wide"
            >
              {currentIndex + 1}/{questions.length}
            </div>
          </div>
          
          <div 
            className="w-83.75 h-0 mx-auto relative rounded-full" 
            style={{ border: '10px solid var(--color-tema-enak)' }}
          >
            {/* İlerleyen alan */}
            <div 
              className="absolute -left-2.5 -top-2.5 h-0 rounded-full transition-all duration-300"
              style={{
                 border: '10px solid var(--color-tema-kutu)',
                 width: `calc(${progressPercentage}% + 10px)` // Barın içi dolsun
              }}
            ></div>
          </div>
        </div>

        {/* Soru Alanı */}
        <div className="w-83.75 h-24 bg-tema-kutu rounded-[20px] shadow-sm flex items-center justify-around px-4 mb-6 relative">
          <div className="w-18.5 h-17.5 bg-tema-enak rounded-[20px] flex items-center justify-center">
            <span className="font-poppins font-extrabold text-[36px] text-tema-yazi">{currentQuestion?.num1}</span>
          </div>
          <span className="font-poppins font-extrabold text-[36px] text-tema-yazi">×</span>
          <div className="w-18.5 h-17.5 bg-tema-enak rounded-[20px] flex items-center justify-center">
            <span className="font-poppins font-extrabold text-[36px] text-tema-yazi">{currentQuestion?.num2}</span>
          </div>
          <span className="font-poppins font-extrabold text-[36px] text-tema-yazi">=</span>
          <div className="w-18.5 h-17.5 bg-tema-enak rounded-[20px] flex items-center justify-center">
            <span 
              className="font-poppins font-extrabold text-[36px]"
              style={{
                 color: status === 'correct' ? 'var(--color-correct)' : status === 'wrong' ? 'var(--color-wrong)' : 'var(--color-tema-yazi)'
              }}
            >
              {userInput}
            </span>
          </div>
        </div>

        {/* Numpad */}
        <div className="w-76 grid grid-cols-3 gap-5 mx-auto mt-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
             <button
                key={num}
                onClick={() => handleNumpad(num.toString())}
                className="w-18.5 h-17.5 bg-tema-kutu rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex justify-center items-center active:bg-tema-secili transition-colors"
             >
                <span className="font-poppins font-extrabold text-[36px] text-tema-yazi">{num}</span>
             </button>
          ))}
          
          <button
              onClick={handleDelete}
              className="w-18.5 h-17.5 bg-tema-kutu rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex justify-center items-center active:bg-tema-secili transition-colors"
          >
             <Delete size={32} strokeWidth={3} className="text-tema-yazi" />
          </button>
          
          <button
              onClick={() => handleNumpad('0')}
              className="w-18.5 h-17.5 bg-tema-kutu rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex justify-center items-center active:bg-tema-secili transition-colors"
          >
             <span className="font-poppins font-extrabold text-[36px] text-tema-yazi">0</span>
          </button>
          
          <button
              onClick={handleCheck}
              className="w-18.5 h-17.5 bg-tema-kutu rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex justify-center items-center active:bg-tema-secili transition-colors"
          >
             <Check size={40} strokeWidth={4} className="text-tema-yazi" />
          </button>
        </div>

      </div>
    </div>
  );
}
