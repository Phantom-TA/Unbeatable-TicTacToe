# ImpossibleXO — Unbeatable Tic-Tac-Toe

Live Demo: https://impossible-xo.vercel.app/

ImpossibleXO is a Tic-Tac-Toe game where the computer opponent cannot be defeated. 

### Why this exists & How it works
Most Tic-Tac-Toe games either use basic random moves (which are easy to beat) or recursive search algorithms like Minimax. While Minimax is common, it runs recursive lookups that can be computationally heavy for simple games. 

ImpossibleXO solves this by using a custom **deterministic decision tree**. By mapping out every opening, trap, and counter-move:
- The computer evaluates board states and reacts in $O(1)$ constant time.
- It runs with zero performance impact on any browser.
- It detects and blocks all common double-threat (fork) strategies, guaranteeing a win or a draw.

### Tech Stack
- **Frontend:** React 19 (using `useState` and `useEffect` hooks)
- **Language:** JavaScript (ES6+)
- **Build Tool:** Vite 7
- **Styling:** Vanilla CSS (Glassmorphism layout and responsive scaling down to `350px`)
- **Deployment:** Vercel

### Codebase Architecture
The game relies on a single source of truth: the `selections` state array. Instead of keeping duplicate states for the board cells, active player, or game status, these values are derived dynamically on each render:
- **`App.jsx`**: Manages the main game loop, derives the active player, handles the computer's move logic, and checks win/draw statuses.
- **`components/GameBoard.jsx`**: Renders the 3x3 grid.
- **`components/GameOver.jsx`**: Overlay screen shown when a win or draw is detected.
- **`components/Header.jsx`**: Renders the header and logo.
- **`utils/winning_cases.js`**: Reference array of the 8 possible winning lines.

### Custom Features
1. **Alternating Starts:** Each time you click Restart, the starting player alternates between `X` and `O`. This lets you test the AI's defense when going first vs when going second.
2. **Natural Move Delay:** The AI has a built-in 300ms delay before placing its move so the game feels natural instead of instant.
3. **Glassmorphism Design:** Modern frosted-glass panels with background gradients and scale animations for mobile responsiveness.

---

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Phantom-TA/Unbeatable-TicTacToe.git
   cd Unbeatable-TicTacToe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```
