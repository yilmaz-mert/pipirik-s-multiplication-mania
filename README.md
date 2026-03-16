# 🦊 Pipirik's Multiplication Mania

An interactive, high-performance web application designed to make learning multiplication tables fun and engaging for students. Built with the latest web technologies to provide a seamless, game-like experience.

## ✨ Key Features

* **Diverse Game Modes**: Includes Flashcards (Ezber), Sequential Tests (Sıralı), Selective Practice (Seçimli), and the high-intensity "Challenge" (Meydan Okuma) mode.
* **Time-Based Challenge**: Test your speed in Challenge mode with a real-time stopwatch and penalty system for incorrect answers.
* **Dynamic Visuals**: Powered by **Framer Motion** for smooth transitions and a custom **FlipNumber** animation for a professional feel.
* **Local Records**: Tracks your best scores using **Zustand Persistence**, saving your top 3 challenge records directly in your browser.
* **Interactive UI**: Includes haptic feedback (vibration), sound effects, and a custom mascot (Foxy) to guide the learning journey.

## 🚀 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Core framework using modern hook standards |
| **Vite** | Lightning-fast build tool and dev server |
| **Tailwind CSS v4** | Cutting-edge styling with utility classes |
| **Zustand** | Centralized state management with persistence |
| **Framer Motion** | Advanced UI animations and transitions |
| **Lucide React** | Clean and consistent iconography |
| **use-sound** | Immersive audio feedback |

## 🛠️ Getting Started

1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/your-username/pipirik-s-multiplication-mania.git](https://github.com/your-username/pipirik-s-multiplication-mania.git)
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run the development server**:
    ```bash
    npm run dev
    ```
4.  **Build for production**:
    ```bash
    npm run build
    ```

## 📂 Project Structure

* `src/pages/`: Contains the main application screens like `HomePage`, `MeydanGamePage`, etc.
* `src/components/`: Reusable UI modules such as `QuestionCard`, `RecordsTable`, and `Numpad`.
* `src/hooks/`: Custom logic including `useGameLogic` for shared game behaviors.
* `src/store/`: Zustand store managing global game state and records.
* `src/constants/`: Centralized configuration for game limits and asset paths.

## 📝 License

This project is open-source and available under the MIT License.