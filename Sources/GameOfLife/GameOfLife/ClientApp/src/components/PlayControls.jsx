import React, { useState, useEffect, useCallback } from 'react';
import SvgButtons from '../BootstrapIcons/SvgButtons.jsx';
import { subscribe, unsubscribe } from "../services/Events.js"

import '../styles/PlayControls.css';
import '../styles/Common.css';

/**
 * Component. Renders the play controls. Handles the GameOfLifeController:PlayStateChanged event.
 * 
 * @param {{gameOfLifeController: GameOfLifeController}} props 
 */
function PlayControls({ gameOfLifeController }) {

    const [playState, setPlayState] = useState(gameOfLifeController.playState);

    const updatePlayState = useCallback((event) => { setPlayState(event.detail.playState); }, []);

    useEffect(() => {
        subscribe("GameOfLifeController:PlayStateChanged", updatePlayState);
        return () => unsubscribe("GameOfLifeController:PlayStateChanged", updatePlayState);
    }, [updatePlayState]);

    return (
        <>
            <button
                id="btnRestart"
                className="buttonSvg buttonControls"
                title="Restart with frame 1"
                onClick={() => gameOfLifeController.rewindToFrameZero()} >
                {SvgButtons.bi_skip_start_btn}
            </button>

            <button
                id="btnPause"
                className={`buttonSvg buttonControls ${playState === "paused" ? "ui-hidden" : "ui-visible"} `}
                title="Pause"
                onClick={() => gameOfLifeController.pausePlay()} >
                {SvgButtons.bi_pause_btn}
            </button>

            <button
                id="btnPlay"
                className={`buttonSvg buttonControls ${playState === "running" ? "ui-hidden" : "ui-visible"} `}
                title="Play"
                onClick={() => gameOfLifeController.startPlay()} >
                {SvgButtons.bi_play_btn}
            </button>

            <button
                id="btnNextFrame"
                className="buttonSvg buttonControls"
                title="Next frame"
                disabled={playState !== "paused"}
                onClick={() => gameOfLifeController.nextFrame()} >
                {SvgButtons.bi_1_square_mod}
            </button>

        </>
    );
}

export default PlayControls;
