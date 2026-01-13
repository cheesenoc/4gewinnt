import React from 'react';
import { PLAYER_1, PLAYER_2 } from '../utils/gameLogic';

const WinnerModal = ({ winner, onRestart, isDraw }) => {
    if (!winner && !isDraw) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>
                    {isDraw ? 'Unentschieden!' : `${winner === PLAYER_1 ? 'Spieler 1 (Rot)' : 'Spieler 2 (Gelb)'} gewinnt!`}
                </h2>
                <button className="btn btn-primary" onClick={onRestart}>
                    Nochmal spielen
                </button>
            </div>
        </div>
    );
};

export default WinnerModal;
