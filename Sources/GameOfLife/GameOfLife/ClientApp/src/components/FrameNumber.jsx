import React, { useState, useEffect, useCallback } from 'react';
import { subscribe, unsubscribe } from "../services/Events.js"

import '../styles/FrameNumber.css';

/**
 * Component. Renders the frame number. Handles the GameOfLifeController:FrameNumberChanged event.
 * 
 * @param {{gameOfLifeController: GameOfLifeController}} props 
 */
function FrameNumber({ gameOfLifeController }) {

    console.log("FrameNumber: ", gameOfLifeController);

    const [frameNumber, setFrameNumber] = useState(gameOfLifeController.frameNumber);

    const updateFrameNumber = useCallback((event) => {
        console.log("FrameNumber: updateFrameNumber: ", event.detail);
        setFrameNumber(event.detail.frameNumber);
    }, []);

    useEffect(() => {
        subscribe("GameOfLifeController:FrameNumberChanged", updateFrameNumber);
        return () => unsubscribe("GameOfLifeController:FrameNumberChanged", updateFrameNumber);
    }, [updateFrameNumber]);

    return <span id="frameNumber">{frameNumber+1}</span>;
}

export default FrameNumber;
