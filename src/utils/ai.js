import { ROWS, COLS, EMPTY, checkWin, checkDraw, findLowestEmptyRow, PLAYER_1, PLAYER_2 } from './gameLogic';

// Weights for heuristics
const SCORE_4 = 10000;
const SCORE_3 = 100;
const SCORE_2 = 10;

// Evaluation function for non-terminal states
const evaluateWindow = (window, piece) => {
    let score = 0;
    const oppPiece = piece === PLAYER_1 ? PLAYER_2 : PLAYER_1;

    const countPiece = window.filter(cell => cell === piece).length;
    const countEmpty = window.filter(cell => cell === EMPTY).length;
    const countOpp = window.filter(cell => cell === oppPiece).length;

    if (countPiece === 4) {
        score += SCORE_4;
    } else if (countPiece === 3 && countEmpty === 1) {
        score += SCORE_3;
    } else if (countPiece === 2 && countEmpty === 2) {
        score += SCORE_2;
    }

    if (countOpp === 3 && countEmpty === 1) {
        score -= SCORE_3 * 4; // Penalty for opponent having 3 (block necessary)
    }

    return score;
};

const scorePosition = (board, piece) => {
    let score = 0;

    // Center column preference
    const centerArray = [];
    for (let r = 0; r < ROWS; r++) {
        centerArray.push(board[r][Math.floor(COLS / 2)]);
    }
    const centerCount = centerArray.filter(c => c === piece).length;
    score += centerCount * 3;

    // Horizontal
    for (let r = 0; r < ROWS; r++) {
        const rowArray = board[r];
        for (let c = 0; c < COLS - 3; c++) {
            const window = rowArray.slice(c, c + 4);
            score += evaluateWindow(window, piece);
        }
    }

    // Vertical
    for (let c = 0; c < COLS; c++) {
        const colArray = [];
        for (let r = 0; r < ROWS; r++) {
            colArray.push(board[r][c]);
        }
        for (let r = 0; r < ROWS - 3; r++) {
            const window = colArray.slice(r, r + 4);
            score += evaluateWindow(window, piece);
        }
    }

    // Diagonal
    for (let r = 0; r < ROWS - 3; r++) {
        for (let c = 0; c < COLS - 3; c++) {
            const window = [board[r][c], board[r + 1][c + 1], board[r + 2][c + 2], board[r + 3][c + 3]];
            score += evaluateWindow(window, piece);
        }
    }

    for (let r = 0; r < ROWS - 3; r++) {
        for (let c = 0; c < COLS - 3; c++) {
            const window = [board[r + 3][c], board[r + 2][c + 1], board[r + 1][c + 2], board[r][c + 3]];
            score += evaluateWindow(window, piece);
        }
    }

    return score;
};

const minmax = (board, depth, alpha, beta, maximizingPlayer) => {
    const validLocations = [];
    for (let c = 0; c < COLS; c++) {
        if (findLowestEmptyRow(board, c) !== -1) validLocations.push(c);
    }

    // Terminal nodes
    if (checkWin(board, PLAYER_2)) return { score: 10000000 };
    if (checkWin(board, PLAYER_1)) return { score: -10000000 };
    if (validLocations.length === 0) return { score: 0 }; // Draw
    if (depth === 0) return { score: scorePosition(board, PLAYER_2) };

    if (maximizingPlayer) {
        let value = -Infinity;
        let column = validLocations[Math.floor(Math.random() * validLocations.length)];
        for (let col of validLocations) {
            const row = findLowestEmptyRow(board, col);
            const tempBoard = board.map(r => [...r]);
            tempBoard[row][col] = PLAYER_2;
            const newScore = minmax(tempBoard, depth - 1, alpha, beta, false).score;
            if (newScore > value) {
                value = newScore;
                column = col;
            }
            alpha = Math.max(alpha, value);
            if (alpha >= beta) break;
        }
        return { column, score: value };
    } else {
        // Minimizing player (Human, Player 1)
        let value = Infinity;
        let column = validLocations[Math.floor(Math.random() * validLocations.length)];
        for (let col of validLocations) {
            const row = findLowestEmptyRow(board, col);
            const tempBoard = board.map(r => [...r]);
            tempBoard[row][col] = PLAYER_1;
            const newScore = minmax(tempBoard, depth - 1, alpha, beta, true).score;
            if (newScore < value) {
                value = newScore;
                column = col;
            }
            beta = Math.min(beta, value);
            if (alpha >= beta) break;
        }
        return { column, score: value };
    }
};

export const getBestMove = (board) => {
    // Use depth 4 or 5 for decent performance/difficulty
    const result = minmax(board, 4, -Infinity, Infinity, true);
    return result.column;
};
