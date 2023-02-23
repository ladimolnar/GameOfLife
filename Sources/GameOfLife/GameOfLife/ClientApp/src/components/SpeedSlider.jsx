import React, { useState, useCallback } from 'react';
import GameOfLifeController from '../services/GameOfLifeController.js';
import SvgButtons from '../BootstrapIcons/SvgButtons.jsx';

import '../styles/SpeedSlider.css';

// Converts a speed indicator value to milliseconds.
function getSpeedInMilliseconds(speedIndicator) {
    if (speedIndicator) {
        switch (speedIndicator.toString()) {
            case "1": return 3000;
            case "2": return 1000;
            case "3": return 500;
            case "4": return 200;
            case "5": return 50;
            default: break;
        }
    }

    console.error("SpeedSlider: getSpeedInMilliseconds: Unknown speed indicator: ", speedIndicator);
    return 1000;
}

/**
 * Component. Renders the speed slider.
 * 
 * @param {{gameOfLifeController: GameOfLifeController}} props 
 */
function SpeedSlider({ gameOfLifeController }) {

    const [speedIndicator, setSpeedIndicator] = useState(3);

    gameOfLifeController.setSpeed(getSpeedInMilliseconds(speedIndicator));

    const updateSpeed = useCallback((event) => {
        setSpeedIndicator(event.target.value);
    }, []); 

    return (
        <>
            <div className="speed-slider-area">
                <div id="speed_icon">
                    {SvgButtons.bi_speedometer2}
                </div>
                <input
                    className="speed-slider"
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={speedIndicator}
                    title="Modify the frame rate"
                    onChange={(event) => updateSpeed(event)} />
            </div>
        </>
    );
}

export default SpeedSlider;