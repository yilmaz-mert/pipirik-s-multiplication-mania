import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ResultStats from '../components/GameResult/ResultStats';
import WrongAnswersList from '../components/GameResult/WrongAnswersList';
import FeedbackSummary from '../components/GameResult/FeedbackSummary';
import MeydanActionButtons from '../components/GameResult/MeydanActionButtons';

export default function MeydanResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { correct = 0, wrong = 0, answers = [] } = location.state || {};

  const total = correct + wrong;
  const successRate = total > 0 ? Math.round((correct / total) * 100) : 0;
  const wrongAnswers = answers.filter(ans => !ans.isCorrect);

  return (
    <div className="w-full flex-1 flex flex-col items-center py-[min(4vh,2rem)] px-6 gap-y-[min(3vh,24px)] overflow-y-auto scrollbar-hide">
      <ResultStats correct={correct} wrong={wrong} />
      
      {wrongAnswers.length > 0 && (
        <WrongAnswersList wrongAnswers={wrongAnswers} />
      )}

      <FeedbackSummary successRate={successRate} />

      <MeydanActionButtons 
        onNext={() => navigate('/meydan-record', { state: location.state })} 
        onMainMenu={() => navigate('/')} 
      />
    </div>
  );
}