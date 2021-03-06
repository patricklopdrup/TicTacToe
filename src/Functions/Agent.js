
// Function called from the game
export function AI(squares, human, ai, isMaximizing) {
    const aiMove = bestMove(squares, human, ai);
    console.log("result: " + aiMove);
    return aiMove;
}

//#region AI functions
// Starting the actual function and returning the best move found
function bestMove(board, human, ai) {
    let _board = board.slice();
    let value = -Infinity;
    let move;

    if (_board.every(s => s === null)) {
        return 4;
    }

    const moves = getPossibleMoves(_board);
    for (let i = 0; i < moves.length; i++) {
        _board[moves[i]] = ai;
        //let score = minimax(_board, 20, false);
        let score = alphaBeta(_board, 20, -Infinity, Infinity, false, human, ai)
        _board[moves[i]] = null;
        if (score > value) {
            value = score;
            move = moves[i];
        }
    }
    return move;
}

//#region alpha beta pruning
function alphaBeta(board, depth, alpha, beta, isMaximizing, human, ai) {
    let _board = board.slice();
    const result = calculateWinner(_board);
    if (result !== null) {
        //AI is maximizer and human is minimizer
        if (result === ai)
            return 20;
        else if (result === human)
            return -20;
        else // return 0 for a tie
            return 0;
        //return winnerScores[result];

    } else if (depth === 0) {
        return calculateHuristic(_board, isMaximizing);
    }

    if (isMaximizing) {
        let value = -Infinity;
        const moves = getPossibleMoves(_board);
        for (let i = 0; i < moves.length; i++) {
            // Set the local board
            _board[moves[i]] = isMaximizing ? ai : human;
            let score = alphaBeta(_board, depth - 1, alpha, beta, false, human, ai);
            // Reset the local board
            _board[moves[i]] = null;
            value = Math.max(value, score);
            if (value >= beta) {
                break;
            }
            alpha = Math.max(alpha, value);
        }
        return value;
    } else {
        let value = Infinity;
        const moves = getPossibleMoves(_board);
        for (let i = 0; i < moves.length; i++) {
            _board[moves[i]] = isMaximizing ? ai : human;
            let score = alphaBeta(_board, depth - 1, alpha, beta, true, human, ai);
            _board[moves[i]] = null;
            value = Math.min(value, score);
            if (value <= alpha) {
                break;
            }
            beta = Math.min(beta, value);
        }
        return value;
    }
}
//#endregion

//#region Minimax
function minimax(board, depth, isMaximizing) {
    let _board = board.slice();
    const result = calculateWinner(_board);
    if (result !== null) {
        return winnerScores[result];
    }

    if (isMaximizing) {
        let value = -Infinity;
        const moves = getPossibleMoves(_board);
        for (let i = 0; i < moves.length; i++) {
            _board[moves[i]] = isMaximizing ? 'X' : 'O';
            let score = minimax(_board, depth - 1, false);
            _board[moves[i]] = null;
            value = Math.max(value, score);
        }
        return value;
    } else {
        let value = Infinity;
        const moves = getPossibleMoves(_board);
        for (let i = 0; i < moves.length; i++) {
            _board[moves[i]] = isMaximizing ? 'X' : 'O';
            let score = minimax(_board, depth - 1, true);
            _board[moves[i]] = null;
            value = Math.min(value, score);
        }
        return value;
    }
}
//#endregion
//#endregion

//#region Helper functions and more
// Returns all moves not currently populated
function getPossibleMoves(board) {
    let moves = [];

    for (let i = 0; i < board.length; i++) {
        if (board[i] == null) {
            moves.push(i);
        }
    }
    return moves;
}

function calculateHuristic(squares, isMaximizing) {
    let huristic = 0;
    squares.forEach((square, index) => {
        if (square === 'X') {
            huristic += huristicScore[index];
        } else if (square === 'O') {
            huristic -= huristicScore[index];
        }
    });
    if (huristic !== 0) {
        console.log("huristic: " + huristic)
    }
    return huristic;
}

// Give score to the maximizer and minimizer
const winnerScores = {
    X: 20,
    O: -20,
    tie: 0
}

const huristicScore = {
    0: 3, /**/ 1: 2, /**/ 2: 3,
    3: 2, /**/ 4: 4, /**/ 5: 2,
    6: 3, /**/ 7: 2, /**/ 8: 3,
}

// Returns X, O, tie or null
export function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    if (isTie(squares)) {
        return 'tie'
    } else {
        return null;
    }
}

function isTie(squares) {
    let countFilledSquares = 0;
    for (let i = 0; i < squares.length; i++) {
        if (squares[i]) {
            countFilledSquares++;
        }
    }
    // Return true if all 9 squares are filled otherwise false
    return countFilledSquares === 9;
}
//#endregion