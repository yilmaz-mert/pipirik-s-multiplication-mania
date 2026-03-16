// Sound asset paths used across all game modes
export const SOUNDS = {
  CLICK: '/sounds/click.ogg',
  CORRECT: '/sounds/correct.ogg',
  WRONG: '/sounds/wrong.ogg',
};

// Table selection items shared between EzberKartlariPage and SelectiveTestPage
export const TABLE_MENU_ITEMS = [
  { id: 2, label: 'İKİLER' },
  { id: 3, label: 'ÜÇLER' },
  { id: 4, label: 'DÖRTLER' },
  { id: 5, label: 'BEŞLER' },
  { id: 6, label: 'ALTILAR' },
  { id: 7, label: 'YEDİLER' },
  { id: 8, label: 'SEKİZLER' },
  { id: 9, label: 'DOKUZLAR' },
];

// Selective game also exposes a mixed-mode option
export const SELECTIVE_MENU_ITEMS = [
  ...TABLE_MENU_ITEMS,
  { id: 'mix', label: 'KARIŞIK 20 SORU' },
];

// Star-shaped button labels used in SiraliTestPage
export const STAR_MENU_ITEMS = [
  { id: 2, label: "2'ler" },
  { id: 3, label: "3'ler" },
  { id: 4, label: "4'ler" },
  { id: 5, label: "5'ler" },
  { id: 6, label: "6'ler" },
  { id: 7, label: "7'ler" },
  { id: 8, label: "8'ler" },
  { id: 9, label: "9'ler" },
];

// Maximum questions per game session for selective and challenge modes
export const SELECTIVE_QUESTION_LIMIT = 20;
export const CHALLENGE_QUESTION_COUNT = 20;
