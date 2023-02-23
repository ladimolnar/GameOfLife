import React from 'react';
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
            <div className="top-menu menu">
                <div className="top-menu-left" >
                    <PlayControls gameOfLifeController={gameOfLifeController} />
                </div>
                <div className="top-menu-right" >
                    <SpeedSlider gameOfLifeController={gameOfLifeController} />
                    <FrameNumber gameOfLifeController={gameOfLifeController} />
                </div>
            </div>
        </>
    );
}

export default TopMenu;
