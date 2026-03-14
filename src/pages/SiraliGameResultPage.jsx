import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Daha önce oluşturduğumuz modüller (Yolların projendeki klasör yapısına göre doğru olduğundan emin ol)
import ResultStats from '../components/GameResult/ResultStats';
import WrongAnswersList from '../components/GameResult/WrongAnswersList';
import FeedbackSummary from '../components/GameResult/FeedbackSummary';
import ActionButtons from '../components/GameResult/ActionButtons';

export default function SiraliGameResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // SiraliGamePage'den gönderilen state verilerini alıyoruz
  const { correct = 0, wrong = 0, answers = [] } = location.state || {};

  // Başarı oranı hesaplama
  const total = correct + wrong;
  const successRate = total > 0 ? Math.round((correct / total) * 100) : 0;

  // Sadece yanlış cevapları filtrele (WrongAnswersList modülüne göndermek için)
  const wrongAnswers = answers.filter(ans => !ans.isCorrect);

  // --- NAVİGASYON FONKSİYONLARI ---
  const handleRetry = () => {
    // Sıralı oyunu, en başta seçilen tablolarla (gameConfig) tekrar başlatır
    navigate('/sirali-oyun', { state: location.state?.gameConfig });
  };

  const handleMainMenu = () => {
    navigate('/');
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center py-[min(4vh,2rem)] px-6 gap-y-[min(3vh,24px)] overflow-y-auto scrollbar-hide">
      
      {/* 1. ÜST ALAN: Doğru ve Yanlış Sayıları */}
      <ResultStats correct={correct} wrong={wrong} />

      {/* 2. ORTA ALAN: Yanlış Cevaplar Listesi (Yalnızca hata varsa görünür) */}
      {wrongAnswers.length > 0 && (
        <WrongAnswersList wrongAnswers={wrongAnswers} />
      )}

      {/* 3. ALT-ORTA ALAN: Dinamik Geri Bildirim ve Başarı Oranı */}
      <FeedbackSummary successRate={successRate} />

      {/* 4. ALT ALAN: Tekrar Dene ve Ana Menü Butonları */}
      <ActionButtons onRetry={handleRetry} onMainMenu={handleMainMenu} />

    </div>
  );
}