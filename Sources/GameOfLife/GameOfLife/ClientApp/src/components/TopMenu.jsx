import React, { useState, useEffect, useCallback } from 'react';
import PlayControls from './PlayControls';
import FrameNumber from './FrameNumber';
import SpeedSlider from './SpeedSlider';

import '../styles/TopMenu.css';
import '../styles/Common.css';

/**
 * Component. Renders the top menu.
 * 
 * @param {{gameOfLifeController: GameOfLifeController}} props 
 */
function TopMenu({ gameOfLifeController }) {

    return (
        <>
            <div className="controls-area">
                <div className="controls-left" >
                    <PlayControls gameOfLifeController={gameOfLifeController} />
                </div>
                <div className="controls-right" >
                    <SpeedSlider gameOfLifeController={gameOfLifeController} />
                    <FrameNumber gameOfLifeController={gameOfLifeController} />
                </div>
            </div>
        </>
    );
}

export default TopMenu;
