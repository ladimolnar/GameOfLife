import BoardConstants from "./BoardConstants.js";

import { publish } from "../services/Events.js"

// This class is responsible for the game of life logic.
// Publisher of all the events related to the game of life.
class GameOfLifeController {

    static PlayState = {
        PAUSED: 'paused',
        RUNNING: 'running',
    };

    // BUGBUG: This is called twice. Investigate.
    /**
     * @param {GameOfLifeEngine} gameOfLifeEngine
     * @param {number[][]} initialBoard
    */
    constructor(gameOfLifeEngine, initialBoard) {
        console.log("GameOfLifeController.constructor()", gameOfLifeEngine);

        this._intervalId = null;
        this._gameOfLifeEngine = gameOfLifeEngine;

        this._initialBoard = initialBoard;
        this._frameZeroBoard = initialBoard;

        this._gameOfLifeEngine.setBoard(this._initialBoard);

        this.playState = GameOfLifeController.PlayState.PAUSED;
        this.frameNumber = 0;
        this._speedInMilliseconds = 200;
    }

    getBoard() {
        return this._gameOfLifeEngine.getBoard();
    }

    getBoardSize() {

        const board = this._gameOfLifeEngine.getBoard();
        let rows = board.length;
        let cols = board[0].length;

        return { rows: rows, cols: cols };
    }

    rewindToFrameZero() {
        console.log("GameOfLifeController.rewindToFrameZero()");
        this._setFrameZeroBoard(this._frameZeroBoard);
    }

    resetToInitialBoard() {
        console.log("GameOfLifeController.rewindToInitialBoard()");
        this._setFrameZeroBoard(this._initialBoard);
    }

    resetToEmptyBoard() {
        console.log("GameOfLifeController.resetToEmptyBoard()");

        const { rows, cols } = this.getBoardSize();

        const emptyBoard = Array(rows).fill().map(() => Array(cols).fill(BoardConstants.CellValueEmpty));

        this._setFrameZeroBoard(emptyBoard);
    }

    setRandomBoard() {
        console.log("GameOfLifeController.setRandomBoard()");

        const { rows, cols } = this.getBoardSize();
        const newBoard = Array(rows).fill().map(() => Array(cols).fill(BoardConstants.CellValueEmpty));

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {

                if (Math.random() < 0.5) {
                    newBoard[row][col] = BoardConstants.CellValueEmpty;
                } else {
                    newBoard[row][col] = BoardConstants.CellValueAlive;
                }
            }
        }

        this._setFrameZeroBoard(newBoard);
    }

    resizeBoard({ rows, cols }) {

        const board = this._gameOfLifeEngine.getBoard();
        const { rows: rowsOld, cols: colsOld } = this.getBoardSize();

        const newBoard = Array(rows).fill().map(() => Array(cols).fill(BoardConstants.CellValueEmpty));

        for (let row = 0; row < rows && row < rowsOld; row++) {
            for (let col = 0; col < cols && col < colsOld; col++) {
                newBoard[row][col] = board[row][col];
            }
        }

        this._setFrameZeroBoard(newBoard);
        publish("GameOfLifeController:BoardSizeChanged", { rows: rows, cols: cols });
    }

    toggleCell(row, col) {
        console.log("GameOfLifeController.toggleCell()", row, col);

        const { rows, cols } = this.getBoardSize();
        if (row < 0 || row >= rows || col < 0 || col >= cols) {
            throw new Error("GameOfLifeController.toggleCell() - Invalid row or col");
        }

        const newBoard = this._cloneBoard();

        newBoard[row][col] = newBoard[row][col] === BoardConstants.CellValueAlive ? BoardConstants.CellValueEmpty : BoardConstants.CellValueAlive;
        this._setFrameZeroBoard(newBoard);

        publish("GameOfLifeController:BoardChanged", { board: newBoard });
    }

    setSpeed(speedInMilliseconds) {
        console.log("GameOfLifeController.setSpeed()", speedInMilliseconds);

        if (this._speedInMilliseconds !== speedInMilliseconds) {
            this._speedInMilliseconds = speedInMilliseconds;

            if (this.playState === GameOfLifeController.PlayState.RUNNING) {

                if (this._intervalId !== null) {
                    clearInterval(this._intervalId);
                    this._intervalId = null;
                }

                this._intervalId = setInterval(() => this._calculateNextFrame(), this._speedInMilliseconds);
            }
        }
    }

    startPlay() {
        console.log("GameOfLifeController.startPlay()");

        if (this.playState !== GameOfLifeController.PlayState.RUNNING) {

            this._intervalId = setInterval(() => this._calculateNextFrame(), this._speedInMilliseconds);

            this.playState = GameOfLifeController.PlayState.RUNNING;
            publish("GameOfLifeController:PlayStateChanged", { playState: this.playState });

            this._calculateNextFrame();
        }
    }

    pausePlay() {
        console.log("GameOfLifeController.pausePlay()");

        if (this._intervalId !== null) {
            clearInterval(this._intervalId);
            this._intervalId = null;
        }

        if (this.playState !== GameOfLifeController.PlayState.PAUSED) {
            this.playState = GameOfLifeController.PlayState.PAUSED;
            publish("GameOfLifeController:PlayStateChanged", { playState: this.playState });
        }
    }

    nextFrame() {
        console.log("GameOfLifeController.nextFrame()");
        this._calculateNextFrame();
    }

    // This method is used when we need to change the board contents and have React
    // components re-render. We cannot just change cells in the original board array.
    // This would keep the board pointing to the same array and the React component
    // that updates the board on screen (GameOfLifeBoard.jsx) will not be able to detect
    // a change in its state and will not rerender. So we need to create a new array.
    //
    // TODO: This could be optimized if the board points to a structure that has a
    // revision field and we use that revision field to indicate a change. This would
    // allow GameOfLifeBoard.jsx to detect changes in the board.
    _cloneBoard() {

        const board = this._gameOfLifeEngine.getBoard();
        const newBoard = [];
        for (let i = 0; i < board.length; i++) {
            newBoard[i] = board[i];
        }

        return newBoard;
    }

    _calculateNextFrame() {
        console.log("GameOfLifeController._calculateNextFrame()");

        if (this._gameOfLifeEngine.computeBoardNextStep()) {
            const newBoard = this._gameOfLifeEngine.getBoard();
            publish("GameOfLifeController:BoardChanged", { board: newBoard });
        }
        else {
            this.pausePlay();
        }

        this._setFrameNumber(this.frameNumber + 1);
    }

    _setFrameNumber(frameNumber) {
        this.frameNumber = frameNumber;
        publish("GameOfLifeController:FrameNumberChanged", { frameNumber: this.frameNumber });
    }

    _setFrameZeroBoard(board) {

        this.pausePlay();
        this._setFrameNumber(0);

        const { rows: rowsOld, cols: colsOld } = this.getBoardSize();

        this._frameZeroBoard = board;
        this._gameOfLifeEngine.setBoard(this._frameZeroBoard);

        const { rows: rowsNew, cols: colsNew } = this.getBoardSize();

        if (rowsOld !== rowsNew || colsOld !== colsNew) {
            publish("GameOfLifeController:BoardSizeChanged", { rows: rowsNew, cols: colsNew });
        }

        publish("GameOfLifeController:BoardChanged", { board: this._gameOfLifeEngine.getBoard() });
    }
}

export default GameOfLifeController;

