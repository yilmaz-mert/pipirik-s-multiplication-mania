import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useGameStore = create(
  persist(
    (set, get) => ({
      // --- GENEL DURUM ---
      activeMode: null, // 'EZBER', 'SIRALI', 'CHALLENGE', 'SEÇİMLİ'
      currentQuestion: null, // { a: 7, b: 3, answer: 21 }
      score: { correct: 0, wrong: 0 }, // [cite: 39, 40]
      progress: 0, // örn: 12/20 [cite: 2]
      
      // --- MEYDAN OKUMA ÖZEL --- [cite: 26, 27]
      timer: 0,
      wrongInARow: 0, // Her 3 yanlışta ceza puanı tetiklemek için
      records: [], // { time: '09:48', correct: 19, wrong: 1 } 

      addRecord: (newRecord) => {
        const { records } = get();
        
        // Yeni rekoru mevcut listeye ekle
        const updatedRecords = [...records, newRecord];

        // Sıralama mantığı: En çok doğru, sonra en az yanlış, sonra en hızlı süre
        updatedRecords.sort((a, b) => {
          if (b.correct !== a.correct) return b.correct - a.correct;
          if (a.wrong !== b.wrong) return a.wrong - b.wrong;
          return a.timeSeconds - b.timeSeconds;
        });

        // Güncellenmiş listeyi kaydet
        set({ records: updatedRecords });
      },

      // --- AKSİYONLAR ---
      setMode: (mode) => set({ activeMode: mode, score: { correct: 0, wrong: 0 }, progress: 1 }),
      
      handleAnswer: (userAnswer) => {
        const { currentQuestion, score, wrongInARow, activeMode } = get();
        const isCorrect = parseInt(userAnswer) === currentQuestion.answer;

        if (isCorrect) {
          set({ 
            score: { ...score, correct: score.correct + 1 },
            wrongInARow: 0 // Doğru cevapta zincir sıfırlanır
          });
        } else {
          const newWrongCount = score.wrong + 1;
          const newWrongInARow = wrongInARow + 1;
          
          // Meydan Okuma Cezası: Her 3 yanlışta süreye ceza ekle [cite: 27]
          if (activeMode === 'CHALLENGE' && newWrongInARow === 3) {
             set((state) => ({ timer: state.timer + 10 })); // Örn: 10 sn ceza
          }

          set({ 
            score: { ...score, wrong: newWrongCount },
            wrongInARow: newWrongInARow % 3
          });
        }
      },

      resetGame: () => set({ score: { correct: 0, wrong: 0 }, timer: 0, progress: 0 }),
    }),
    { name: 'carpim-tablosu-storage' } // Skorları tarayıcıda saklar
  )
);