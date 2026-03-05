// PuzzleIcons.jsx

export const EzberSVG = ({ onClick, className }) => (
  <svg
    viewBox="0 0 208 182"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ pointerEvents: 'none' }} // Dikdörtgen alanı geçirgen yapıyoruz
  >
    <path
      d="M7.33333 3.55553C14.8333 -4.44441 144.09 3.55553 144.09 3.55553H151.333H169.333C182.333 6.55553 179.833 6.55553 192.833 14.5555C205.047 24.5555 210.381 40.2896 189.145 38.0555C167.909 35.8215 140.523 48.26 151.333 84.0555C162.345 120.518 104.493 156.743 60.8333 146.86C46.0333 186.037 19 174.181 7.33333 163.356C7.33333 163.356 -0.166667 11.5555 7.33333 3.55553Z"
      fill="#F8971F"
      style={{ pointerEvents: 'auto', cursor: 'pointer' }} // Sadece turuncu şekil tıklanır
      onClick={onClick}
    />
  </svg>
);

export const SiraliSVG = ({ onClick, className }) => (
    <svg
        viewBox="0 0 183 214"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ pointerEvents: 'none' }}
    >
        <path
            d="M175.858 3.77778C169.358 -4.72222 22.6693 3.77778 22.6693 3.77778C43.3417 21.6478 75.4636 56.8724 38.5712 54.8104C1.67877 52.7485 -1.95414 108.278 10.3576 99.2778C22.6693 90.2778 83.8097 84.9905 89.9873 147.082C96.1871 209.397 156.422 211.862 175.858 200.693C175.858 200.693 182.358 12.2778 175.858 3.77778Z"
            fill="#F8971F"
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
            onClick={onClick}
        />
    </svg>
);

export const MeydanSVG = ({ onClick, className }) => (
    <svg
        viewBox="0 0 216 201"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ pointerEvents: 'none' }}
    >
        <path
            d="M182.667 188.1C182.667 188.1 25.6667 198.1 10.6667 188.1C-4.33333 178.101 10.6667 36.1005 10.6667 36.1005C14.6667 38.6005 34.6667 70.1005 53.6667 36.1005C72.6667 2.10054 66.6666 62.1005 116.167 16.1005C155.767 -20.6995 150 14.1005 142.167 36.1005C139.833 65.2672 145.967 119.6 189.167 103.6C232.367 87.6005 202.833 153.267 182.667 188.1Z"
            fill="#F8971F"
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
            onClick={onClick}
        />
    </svg>
);

export const TestSVG = ({ onClick, className }) => (
    <svg
        viewBox="0 0 197 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ pointerEvents: 'none' }}
    >
        <path
            d="M187.766 109.092C187.766 109.092 199.266 221.592 187.766 228.592C176.266 235.592 104.266 228.592 104.266 228.592C76.7659 228.592 33.6137 198.292 72.4137 151.092C76.0722 132.311 63.1959 124.754 49.2659 124.592C34.6395 124.422 18.5952 131.873 8.26593 120.092C0.527063 106.928 2.35752 48.0923 21.7659 22.5923C35.2659 -6.40762 64.7659 -5.90783 70.266 15.0922C82.2659 107.592 157.933 118.592 187.766 109.092Z"
            fill="#F8971F"
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
            onClick={onClick}
        />
    </svg>
);