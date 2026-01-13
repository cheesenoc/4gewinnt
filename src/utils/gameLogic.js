export const ROWS = 6;
export const COLS = 7;
export const EMPTY = null;
export const PLAYER_1 = 1;
export const PLAYER_2 = 2;

export const createBoard = () => {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY));
};

export const checkWin = (board, player) => {
    // Check horizontal
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c <= COLS - 4; c++) {
            if (
                board[r][c] === player &&
                board[r][c + 1] === player &&
                board[r][c + 2] === player &&
                board[r][c + 3] === player
            ) {
                return true;
            }
        }
    }

    // Check vertical
    for (let r = 0; r <= ROWS - 4; r++) {
        for (let c = 0; c < COLS; c++) {
            if (
                board[r][c] === player &&
                board[r + 1][c] === player &&
                board[r + 2][c] === player &&
                board[r + 3][c] === player
            ) {
                return true;
            }
        }
    }

    // Check diagonal (down-right)
    for (let r = 0; r <= ROWS - 4; r++) {
        for (let c = 0; c <= COLS - 4; c++) {
            if (
                board[r][c] === player &&
                board[r + 1][c + 1] === player &&
                board[r + 2][c + 2] === player &&
                board[r + 3][c + 3] === player
            ) {
                return true;
            }
        }
    }

    // Check diagonal (up-right)
    for (let r = 3; r < ROWS; r++) {
        for (let c = 0; c <= COLS - 4; c++) {
            if (
                board[r][c] === player &&
                board[r - 1][c + 1] === player &&
                board[r - 2][c + 2] === player &&
                board[r - 3][c + 3] === player
            ) {
                return true;
            }
        }
    }

    return false;
};

export const checkDraw = (board) => {
    return board.every((row) => row.every((cell) => cell !== EMPTY));
};

export const findLowestEmptyRow = (board, col) => {
    for (let r = ROWS - 1; r >= 0; r--) {
        if (board[r][col] === EMPTY) {
            return r;
        }
    }
    return -1;
};
