import React from 'react';

const GameMenu = ({ onStartGame, gameMode }) => {
    return (
        <div className="game-menu">
            <div className="menu-group">
                <label>Spielmodus:</label>
                <div className="mode-selector">
                    <button
                        className={`btn ${gameMode === 'pvp' ? 'btn-primary' : ''}`}
                        onClick={() => onStartGame('pvp')}
                    >
                        2 Spieler
                    </button>
                    <button
                        className={`btn ${gameMode === 'pve' ? 'btn-primary' : ''}`}
                        onClick={() => onStartGame('pve')}
                    >
                        Gegen Computer
                    </button>
                </div>
            </div>
            <button className="btn" onClick={() => onStartGame(gameMode)}>
                Neustart
            </button>
        </div>
    );
};

export default GameMenu;
