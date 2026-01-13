import React from 'react';
import { PLAYER_1, PLAYER_2 } from '../utils/gameLogic';

const GameCell = ({ value, isHighlight, onClick, disabled }) => {
    let chipClass = 'chip';
    if (value === PLAYER_1) chipClass += ' player-1 dropped';
    if (value === PLAYER_2) chipClass += ' player-2 dropped';
    if (isHighlight) chipClass += ' highlight';

    return (
        <div className="cell" onClick={disabled ? undefined : onClick}>
            <div className={chipClass}></div>
            {/* Mask to make the hole look realistic */}
            <div className="cell-mask"></div>
        </div>
    );
};

export default GameCell;
