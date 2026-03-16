import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useGameStore = create(
  persist(
    (set, get) => ({
      // --- GENERAL STATE ---
      activeMode: null,
      currentQuestion: null,
      score: { correct: 0, wrong: 0 },
      progress: 0,

      // --- CHALLENGE MODE STATE ---
      timer: 0,
      wrongInARow: 0,
      records: [],

      // --- RECORD MANAGEMENT ---
      addRecord: (newRecord) => {
        const { records } = get();
        const updatedRecords = [...records, newRecord];
        // Sort by most correct, then fewest wrong, then fastest time
        updatedRecords.sort((a, b) => {
          if (b.correct !== a.correct) return b.correct - a.correct;
          if (a.wrong !== b.wrong) return a.wrong - b.wrong;
          return a.timeSeconds - b.timeSeconds;
        });
        set({ records: updatedRecords });
      },

      // --- GAME ACTIONS ---
      setMode: (mode) => set({ activeMode: mode, score: { correct: 0, wrong: 0 }, progress: 1 }),

      handleAnswer: (userAnswer) => {
        const { currentQuestion, score, wrongInARow, activeMode } = get();
        const isCorrect = parseInt(userAnswer, 10) === currentQuestion.answer;

        if (isCorrect) {
          set({ score: { ...score, correct: score.correct + 1 }, wrongInARow: 0 });
        } else {
          const newWrongCount = score.wrong + 1;
          const newWrongInARow = wrongInARow + 1;
          // Every 3rd consecutive wrong answer triggers a +10s penalty in Challenge mode
          if (activeMode === 'CHALLENGE' && newWrongInARow === 3) {
            set((state) => ({ timer: state.timer + 10 }));
          }
          set({ score: { ...score, wrong: newWrongCount }, wrongInARow: newWrongInARow % 3 });
        }
      },

      resetGame: () => set({ score: { correct: 0, wrong: 0 }, timer: 0, progress: 0 }),
    }),
    {
      name: 'carpim-tablosu-storage',
      // Only persist records across sessions; runtime state resets on reload
      partialize: (state) => ({ records: state.records }),
    }
  )
);
