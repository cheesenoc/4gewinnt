import React from 'react';

const GameMenu = ({ onStartGame, gameMode, difficulty }) => {

    const getButtonClass = (mode, diff) => {
        const isActive = gameMode === mode && (!diff || difficulty === diff);
        return `btn icon-btn ${isActive ? 'active' : ''}`;
    };

    return (
        <div className="game-menu">
            {/* 2 Players */}
            <button
                className={getButtonClass('pvp')}
                onClick={() => onStartGame('pvp')}
                title="2 Spieler"
                aria-label="2 Spieler Modus"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span className="btn-label">2P</span>
            </button>

            {/* Computer Easy - Green */}
            <button
                className={getButtonClass('pve', 'easy')}
                onClick={() => onStartGame('pve', 'easy')}
                title="Computer (Leicht)"
                aria-label="Computer Leicht"
                style={{ color: '#4ade80' }} // Green
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                    <circle cx="12" cy="5" r="2"></circle>
                    <path d="M12 7v4"></path>
                    <line x1="8" y1="16" x2="8" y2="16"></line>
                    <line x1="16" y1="16" x2="16" y2="16"></line>
                    {/* Smile for easy */}
                    <path d="M9 19c1.5 1 4.5 1 6 0"></path>
                </svg>
                <span className="btn-label">Easy</span>
            </button>

            {/* Computer Medium - Yellow */}
            <button
                className={getButtonClass('pve', 'medium')}
                onClick={() => onStartGame('pve', 'medium')}
                title="Computer (Mittel)"
                aria-label="Computer Mittel"
                style={{ color: '#facc15' }} // Yellow/Gold
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                    <circle cx="12" cy="5" r="2"></circle>
                    <path d="M12 7v4"></path>
                    <line x1="8" y1="16" x2="8" y2="16"></line>
                    <line x1="16" y1="16" x2="16" y2="16"></line>
                    {/* Straight mouth for medium */}
                    <line x1="9" y1="19" x2="15" y2="19"></line>
                </svg>
                <span className="btn-label">Med</span>
            </button>

            {/* Computer Hard - Red */}
            <button
                className={getButtonClass('pve', 'hard')}
                onClick={() => onStartGame('pve', 'hard')}
                title="Computer (Schwer)"
                aria-label="Computer Schwer"
                style={{ color: '#ef4444' }} // Red
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                    <circle cx="12" cy="5" r="2"></circle>
                    <path d="M12 7v4"></path>
                    <line x1="8" y1="16" x2="8" y2="16"></line>
                    <line x1="16" y1="16" x2="16" y2="16"></line>
                    {/* Frown/Zigzag for hard/evil */}
                    <path d="M9 20l2-2 2 2 2-2"></path>
                </svg>
                <span className="btn-label">Hard</span>
            </button>

            {/* Restart */}
            <button
                className="btn icon-btn"
                onClick={() => onStartGame()}
                title="Neustart"
                aria-label="Neustart"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                    <path d="M3 3v5h5"></path>
                </svg>
                <span className="btn-label">Reset</span>
            </button>
        </div>
    );
};

export default GameMenu;
