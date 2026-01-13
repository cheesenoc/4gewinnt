import { useState, useCallback } from 'react';
import { createBoard, checkWin, checkDraw, findLowestEmptyRow, PLAYER_1, PLAYER_2 } from '../utils/gameLogic';

export const useGameState = () => {
    const [board, setBoard] = useState(createBoard());
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
    const [winner, setWinner] = useState(null);
    const [isDraw, setIsDraw] = useState(false);

    const resetGame = useCallback(() => {
        setBoard(createBoard());
        setCurrentPlayer(PLAYER_1);
        setWinner(null);
        setIsDraw(false);
    }, []);

    const dropChip = useCallback((col) => {
        if (winner || isDraw) return false;

        const row = findLowestEmptyRow(board, col);
        if (row === -1) return false;

        const newBoard = board.map((r) => [...r]);
        newBoard[row][col] = currentPlayer;
        setBoard(newBoard);

        if (checkWin(newBoard, currentPlayer)) {
            setWinner(currentPlayer);
        } else if (checkDraw(newBoard)) {
            setIsDraw(true);
        } else {
            setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
        }
        return true;
    }, [board, currentPlayer, winner, isDraw]);

    return {
        board,
        currentPlayer,
        winner,
        isDraw,
        dropChip,
        resetGame,
        setBoard, // Exposed for AI usage or specialized resets
        setCurrentPlayer, // Exposed for AI
    };
};
