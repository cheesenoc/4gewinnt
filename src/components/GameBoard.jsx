import React from 'react';
import GameCell from './GameCell';

const GameBoard = ({ board, winningCells, onColumnClick, disabled }) => {
    const isWinningCell = (r, c) => {
        if (!winningCells) return false;
        return winningCells.some(cell => cell.r === r && cell.c === c);
    };

    return (
        <div className="game-board">
            {board.map((row, r) => (
                <div key={r} className="board-row">
                    {row.map((cell, c) => (
                        <GameCell
                            key={`${r}-${c}`}
                            value={cell}
                            isHighlight={isWinningCell(r, c)}
                            onClick={() => onColumnClick(c)}
                            disabled={disabled}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default GameBoard;
