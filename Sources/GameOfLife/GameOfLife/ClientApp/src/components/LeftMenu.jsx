import React, { useState, useEffect, useCallback } from 'react';
import AppConstants from '../utils/AppConstants.js';
import SvgButtons from '../BootstrapIcons/SvgButtons.jsx';
import HelpPage from './HelpPage.jsx';
import { subscribe, unsubscribe } from "../services/Events.js"

import '../styles/Common.css';
import '../styles/LeftMenu.css';

/**
 * @param {GameOfLifeController} gameOfLifeController
 */
function increaseBoardSize(gameOfLifeController) {

    let boardSize = gameOfLifeController.getBoardSize();

    if (tryIncreaseBoardSize(boardSize)) {
        gameOfLifeController.resizeBoard(boardSize);
    }
}

/**
 * @param {GameOfLifeController} gameOfLifeController
 */
function reduceBoardSize(gameOfLifeController) {

    let boardSize = gameOfLifeController.getBoardSize();

    if (tryReduceBoardSize(boardSize)) {
        gameOfLifeController.resizeBoard(boardSize);
    }
}

function tryIncreaseBoardSize(boardSize) {

    if (boardSize.rows + AppConstants.RowsIncrement <= AppConstants.MaxRowsCount &&
        boardSize.cols + AppConstants.ColsIncrement <= AppConstants.MaxColsCount) {
        boardSize.rows += AppConstants.RowsIncrement;
        boardSize.cols += AppConstants.ColsIncrement;
        return true;
    }

    return false;
}

function tryReduceBoardSize(boardSize) {

    if (boardSize.rows - AppConstants.RowsIncrement >= AppConstants.MinRowsCount &&
        boardSize.cols - AppConstants.ColsIncrement >= AppConstants.MinColsCount) {
        boardSize.rows -= AppConstants.RowsIncrement;
        boardSize.cols -= AppConstants.ColsIncrement;
        return true;
    }

    return false;
}

//async function loadBoardIds() {
//    console.log('Fetching board Ids from the server...');
//    const response = await fetch('boards');
//    const data = await response.json();
//    console.log('Board Ids : ' + JSON.stringify(data));
//}

/**
 * Component. Renders the left menu.
 * 
 * @param {{gameOfLifeController: GameOfLifeController}} props 
 */
function LeftMenu({ gameOfLifeController, showModal }) {

    const [minSizeReached, setMinSizeReached] = useState(false);
    const [maxSizeReached, setMaxSizeReached] = useState(false);

    const handleBoardSizeChanged = useCallback((event) => {

        let boardSize = gameOfLifeController.getBoardSize();
        let minReached = tryReduceBoardSize(boardSize) === false;

        boardSize = gameOfLifeController.getBoardSize();
        let maxReached = tryIncreaseBoardSize(boardSize) === false;

        setMinSizeReached(minReached);
        setMaxSizeReached(maxReached);

    }, [gameOfLifeController]);

    useEffect(() => handleBoardSizeChanged(), [handleBoardSizeChanged]);

    useEffect(() => {
        subscribe("GameOfLifeController:BoardSizeChanged", handleBoardSizeChanged);
        return () => unsubscribe("GameOfLifeController:BoardSizeChanged", handleBoardSizeChanged);
    }, [handleBoardSizeChanged]);

    return (
        <>
            <div className="left-menu menu">
                <div className="left-menu-inner">
                    <button
                        id="btnHome"
                        className="buttonSvg button-menu"
                        title="Reset to initial configuration"
                        onClick={() => gameOfLifeController.resetToInitialBoard()} >
                        {SvgButtons.bi_house_door}
                    </button>

                    <button
                        id="btnIncreaseSize"
                        className="buttonSvg button-menu"
                        title="Increase board size"
                        disabled={maxSizeReached}
                        onClick={() => increaseBoardSize(gameOfLifeController)} >
                        {SvgButtons.bi_plus_square}
                    </button>

                    <button
                        id="btnReduceResize"
                        className="buttonSvg button-menu"
                        title="Reduce board size"
                        disabled={minSizeReached}
                        onClick={() => reduceBoardSize(gameOfLifeController)} >
                        {SvgButtons.bi_dash_square}
                    </button>

                    <button
                        id="btnRandom"
                        className="buttonSvg button-menu"
                        title="Randomize board"
                        onClick={() => gameOfLifeController.setRandomBoard()} >
                        {SvgButtons.bi_shuffle}
                    </button>

                    <button
                        id="btnClear"
                        className="buttonSvg button-menu"
                        title="Clear board"
                        onClick={() => gameOfLifeController.resetToEmptyBoard()} >
                        {SvgButtons.bi_trash3}
                    </button>

                    <button
                        id="btnHelp"
                        className="buttonSvg button-menu"
                        title="Help"
                        onClick={() => {
                            showModal("Conway's Game of Life", <HelpPage />);
                        }}>
                        {SvgButtons.bi_question_circle}
                    </button>
                </div>
            </div>
        </>
    );
}

export default LeftMenu;

/*

                <button
                    id="btnLoad"
                    className="buttonSvg button-menu"
                    title="Load board configuration"
                    onClick={() => loadBoardIds()} >
                    {SvgButtons.bi_cloud_arrow_down}
                </button>

                <button
                    id="btnSave"
                    className="buttonSvg button-menu"
                    title="Save board configuration">
                    {SvgButtons.bi_cloud_arrow_up}
                </button>

                <button
                    id="btnDownload"
                    className="buttonSvg button-menu"
                    title="Download board configuration">
                    {SvgButtons.bi_cloud_download}
                </button>

                <button
                    id="btnUpload"
                    className="buttonSvg button-menu"
                    title="Upload board configuration">
                    {SvgButtons.bi_cloud_upload}
                </button>

 */
