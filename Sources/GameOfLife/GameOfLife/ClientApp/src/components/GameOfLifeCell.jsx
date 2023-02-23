import React from 'react';
import BoardConstants from "../services/BoardConstants.js";
import GameOfLifeController from '../services/GameOfLifeController.js';

import '../styles/GameOfLifeCell.css';

/**
 * Handles a click on a board cell.
 * 
 * @param {GameOfLifeController} gameOfLifeController
 * @param {number} row
 * @param {number} col
 */
function handleCellClick(gameOfLifeController, row, col) {

    console.log("handleCellClick", row, col, gameOfLifeController.playState);

    if (gameOfLifeController.playState === "running") {
        gameOfLifeController.pausePlay();
    }
    else {
        gameOfLifeController.toggleCell(row, col);
    }
}

/**
 * Component: GameOfLifeCell. Responsible for rendering the board cell.
 * 
 * @param {{gameOfLifeController: GameOfLifeController}} props 
 */
function GameOfLifeCell({ gameOfLifeController, row, col, cell }) {
    const className = "board-cell board-cell-calculated " + (cell === BoardConstants.CellValueEmpty ? "board-cell-empty" : "board-cell-alive");
    return (
        <div
            className={className}
            onClick={() => handleCellClick(gameOfLifeController, row, col)} 
        />
    );
}

export default GameOfLifeCell;