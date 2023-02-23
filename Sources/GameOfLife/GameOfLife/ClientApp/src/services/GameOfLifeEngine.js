import BoardConstants from "./BoardConstants.js";

// Contains utilities for calculating the next frame of the game of life.
class GameOfLifeEngine {
    constructor() {
        this._board = null;
    }

    getBoard() {
        return this._board;
    }

    setBoard(board) {
        this._board = board;
    }

    computeBoardNextStep() {

        if (this._board === null) {
            throw new Error("Board is not set");
        }

        let boardChanged = false;

        const rows = this._board.length;
        const cols = this._board[0].length;

        const nextBoard = Array(rows).fill().map(() => Array(cols).fill(BoardConstants.CellValueEmpty));

        // Compute the next step for each cell
        for (let row = 0; row < rows; row++) {

            for (let col = 0; col < cols; col++) {

                const neighbours = this._calculateNeighbours(row, col);

                if (this._board[row][col] !== BoardConstants.CellValueEmpty) {
                    nextBoard[row][col] = (neighbours < 2 || neighbours > 3) ? BoardConstants.CellValueEmpty : BoardConstants.CellValueAlive;
                }
                else {
                    if (neighbours === 3) {
                        nextBoard[row][col] = BoardConstants.CellValueAlive;
                    }
                }

                if (this._board[row][col] !== nextBoard[row][col])
                {
                    boardChanged = true;
                }
            }
        }

        this._board = nextBoard;
        return boardChanged;
    }

    _calculateNeighbours(row, col) {

        let neighbours = 0;

        neighbours += this._isAlive(row - 1, col - 1) ? 1:0;
        neighbours += this._isAlive(row - 1, col) ? 1 : 0;
        neighbours += this._isAlive(row - 1, col + 1) ? 1 : 0;
        neighbours += this._isAlive(row, col - 1) ? 1 : 0;
        neighbours += this._isAlive(row, col + 1) ? 1 : 0;
        neighbours += this._isAlive(row + 1, col - 1) ? 1 : 0;
        neighbours += this._isAlive(row + 1, col) ? 1 : 0;
        neighbours += this._isAlive(row + 1, col + 1) ? 1 : 0;

        return neighbours;
    }

    _isAlive(row, col) {

        const rows = this._board.length;
        const cols = this._board[0].length;

        if (row < 0 || row >= rows || col < 0 || col >= cols) {
            return false;
        }

        return this._board[row][col] === BoardConstants.CellValueAlive;
    }
}

export default GameOfLifeEngine;
