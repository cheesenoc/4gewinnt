import React from 'react';
import GameCell from './GameCell';
import { ROWS, COLS } from '../utils/gameLogic';

const GameBoard = ({ board, onColumnClick, disabled }) => {
    return (
        <div className="game-board">
            {board.map((row, r) => (
                <div key={r} className="board-row">
                    {row.map((cell, c) => (
                        <GameCell
                            key={`${r}-${c}`}
                            value={cell}
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
