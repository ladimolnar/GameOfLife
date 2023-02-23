import React, { useEffect, useMemo } from 'react';
import './GameOfLifeApp.css';
import GameOfLifeEngine from './services/GameOfLifeEngine.js';
import GameOfLifeController from './services/GameOfLifeController.js';
import GameOfLifeBoard from './components/GameOfLifeBoard.jsx';
import MenuArea from './components/MenuArea.jsx';
import PlayControlsArea from './components/PlayControlsArea.jsx';

import boardFactory from './utils/BoardFactory.js';

// The main component in the application.
function GameOfLifeApp() {

    const gameOfLifeController = useMemo(() => new GameOfLifeController(new GameOfLifeEngine(), boardFactory()), []);

    useEffect(() => {
        gameOfLifeController.startPlay();
        return () => gameOfLifeController.pausePlay();
    }, [gameOfLifeController]);


    return (
        <main>

            <section className="section-top">
                <h1>Conway's Game of Life</h1>
            </section>

            <section className="section-left">
                <MenuArea />
            </section>

            <section className="section-controls">
                <PlayControlsArea />
            </section>

            <section className="section-board">
                <GameOfLifeBoard gameOfLifeController={gameOfLifeController} />
            </section>

        </main>
    )
}

export default GameOfLifeApp
