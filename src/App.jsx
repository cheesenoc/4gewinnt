import { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import GameMenu from './components/GameMenu';
import WinnerModal from './components/WinnerModal';
import { useGameState } from './hooks/useGameState';
import { playDropSound, playWinSound } from './utils/audio';
import { getBestMove } from './utils/ai';
import { PLAYER_1, PLAYER_2 } from './utils/gameLogic';

function App() {
    const { board, currentPlayer, winner, winningCells, isDraw, dropChip, resetGame } = useGameState();
    const [gameMode, setGameMode] = useState('pve');
    const [isAiThinking, setIsAiThinking] = useState(false);

    // Sound effects for win
    useEffect(() => {
        if (winner) {
            playWinSound();
        }
    }, [winner]);

    // Handle AI turn
    useEffect(() => {
        if (gameMode === 'pve' && currentPlayer === PLAYER_2 && !winner && !isDraw) {
            setIsAiThinking(true);
            const timer = setTimeout(() => {
                const col = getBestMove(board);
                if (dropChip(col)) playDropSound(); // AI plays sound
                setIsAiThinking(false);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [currentPlayer, winner, isDraw, gameMode, board, dropChip]);

    const handleColumnClick = (col) => {
        if (gameMode === 'pve' && currentPlayer === PLAYER_2) return;
        if (dropChip(col)) playDropSound(); // Human plays sound
    };

    const handleRestart = (mode) => {
        setGameMode(mode || gameMode);
        resetGame();
    };

    return (
        <div className="app-container">
            <h1>4 Gewinnt</h1>

            <GameMenu
                onStartGame={handleRestart}
                gameMode={gameMode}
            />

            <div className="turn-indicator" style={{ marginBottom: '1rem', fontWeight: 'bold' }}>
                {winner || isDraw ? (
                    <span>Spiel beendet</span>
                ) : (
                    <span style={{ color: currentPlayer === PLAYER_1 ? 'var(--color-player-1)' : 'var(--color-player-2)' }}>
                        {currentPlayer === PLAYER_1 ? "1. Spieler (Rot)" : (gameMode === 'pve' ? "Computer" : "2. Spieler (Gelb)")} ist am Zug
                        {isAiThinking && "..."}
                    </span>
                )}
            </div>

            <GameBoard
                board={board}
                winningCells={winningCells}
                onColumnClick={handleColumnClick}
                disabled={winner || isDraw || (gameMode === 'pve' && currentPlayer === PLAYER_2)}
            />

            <WinnerModal
                winner={winner}
                isDraw={isDraw}
                onRestart={() => handleRestart()}
            />
        </div>
    );
}

export default App;
