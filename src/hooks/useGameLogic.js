import { useState } from 'react';
import useSound from 'use-sound';
import { SOUNDS } from '../constants';

/**
 * useGameLogic — shared hook for game input, audio, and haptic feedback.
 *
 * Manages userInput, status, and isExiting state. Pages destructure the
 * returned helpers to build their own handleCheck with mode-specific logic
 * (e.g. the 3-strike penalty in Challenge mode).
 */
export function useGameLogic() {
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState('idle');
  const [isExiting, setIsExiting] = useState(false);

  const [playClick] = useSound(SOUNDS.CLICK, { volume: 0.5 });
  const [playCorrect] = useSound(SOUNDS.CORRECT);
  const [playWrong] = useSound(SOUNDS.WRONG);

  const triggerVibration = (pattern) => {
    navigator?.vibrate?.(pattern);
  };

  const handleNumpad = (value) => {
    if (status !== 'idle') return;
    if (userInput === '' && value === '0') return;
    playClick();
    triggerVibration(25);
    if (userInput.length < 3) setUserInput((prev) => prev + value);
  };

  const handleDelete = () => {
    if (status !== 'idle') return;
    playClick();
    triggerVibration(35);
    setUserInput((prev) => prev.slice(0, -1));
  };

  return {
    userInput,
    setUserInput,
    status,
    setStatus,
    isExiting,
    setIsExiting,
    handleNumpad,
    handleDelete,
    playCorrect,
    playWrong,
    triggerVibration,
  };
}
