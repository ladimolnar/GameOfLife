import React, { useState, useEffect, useCallback } from 'react';
import GameOfLifeCell from "./GameOfLifeCell";
import { subscribe, unsubscribe } from "../services/Events.js"

import './GameOfLifeBoard.css';

// Handles the change in the board size. Updates the CSS styles that control a cell
// so that the new (larger or smaller) board will still look good on th escreen.
function UpdateBoardStyleAccordingToSize({ rows, cols }) {

    console.log("UpdateBoardStyleAccordingToSize()", rows, cols)

    let cellSize = 17;
    let cellMargin = 2;

    if (rows > 20) cellSize -= 2;
    if (rows > 30) cellSize -= 2;
    if (rows > 40) cellSize -= 2;

    if (rows > 50) {

        cellMargin = 1;
    }

    if (rows > 60) cellSize -= 1;
    if (rows > 70) cellSize -= 1;

    let style = document.createElement("style");
    style.innerHTML = `.board-cell-calculated { width: ${cellSize}px; height: ${cellSize}px; margin: ${cellMargin}px; }`;

    console.log(style);
    document.head.appendChild(style);
}

/**
 * Component: GameOfLifeBoard. Responsible for rendering the board and handling board related events.
 * 
 * @param {{gameOfLifeController: GameOfLifeController}} props 
 */
function GameOfLifeBoard({ gameOfLifeController }) {
    console.log("GameOfLifeBoard()", gameOfLifeController);


    const [board, setBoard] = useState(gameOfLifeController.getBoard());

    const updateBoard = useCallback((event) => {
        console.log("GameOfLifeBoard.updateBoard()", event.detail.board)

        setBoard(event.detail.board)
    }, []);

    const handleBoardSizeChanged = useCallback((event) => UpdateBoardStyleAccordingToSize(event.detail), []);

    const { rows, cols } = gameOfLifeController.getBoardSize();

    useEffect(() => {
        UpdateBoardStyleAccordingToSize({ rows, cols });
    }, [rows, cols]);

    useEffect(() => {
        subscribe("GameOfLifeController:BoardChanged", updateBoard);
        return () => unsubscribe("GameOfLifeController:BoardChanged", updateBoard);
    }, [updateBoard]);

    useEffect(() => {
        subscribe("GameOfLifeController:BoardSizeChanged", handleBoardSizeChanged);
        return () => unsubscribe("GameOfLifeController:BoardSizeChanged", handleBoardSizeChanged);
    }, [handleBoardSizeChanged]);

    console.log("GameOfLifeBoard.render()", board);
    return (
        <div className="board">
            {
                board.map((row, i) => (
                    <div key={i} className="board-row">
                        {row.map((cell, j) => <GameOfLifeCell key={`${i}-${j}`} gameOfLifeController={gameOfLifeController} row={i} col={j} cell={cell} />)}
                    </div>
                ))
            }
        </div>
    );
}

export default GameOfLifeBoard;
