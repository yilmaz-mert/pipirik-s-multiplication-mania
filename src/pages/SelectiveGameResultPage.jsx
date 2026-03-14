import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Modüllerimizi içe aktarıyoruz
import ResultStats from "../components/GameResult/ResultStats";
import WrongAnswersList from "../components/GameResult/WrongAnswersList";
import FeedbackSummary from "../components/GameResult/FeedbackSummary";
import ActionButtons from "../components/GameResult/ActionButtons";

export default function SelectiveGameResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Veri Kontrolü ve Ayıklama
  const { correct = 0, wrong = 0, answers = [] } = location.state || {};
  const total = correct + wrong;
  const successRate = total > 0 ? Math.round((correct / total) * 100) : 0;
  const wrongAnswers = answers.filter(ans => !ans.isCorrect);

  // Navigasyon Fonksiyonları
  const handleRetry = () => {
    navigate('/secimli-oyun', { state: location.state?.gameConfig });
  };

  const handleMainMenu = () => {
    navigate('/');
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center py-[min(4vh,2rem)] px-6 gap-y-[min(3vh,24px)] overflow-y-auto scrollbar-hide">
      
      {/* 1. Üst Alan (İstatistikler) */}
      <ResultStats correct={correct} wrong={wrong} />

      {/* 2. Orta Alan (Hatalı Sorular Listesi - Sadece hata varsa gösterilir) */}
      {wrongAnswers.length > 0 && (
        <WrongAnswersList wrongAnswers={wrongAnswers} />
      )}

      {/* 3. Alt-Orta Alan (Başarı Özeti) */}
      <FeedbackSummary successRate={successRate} />

      {/* 4. Alt Alan (Aksiyon Butonları) */}
      <ActionButtons onRetry={handleRetry} onMainMenu={handleMainMenu} />

    </div>
  );
}