import React, { useEffect, useMemo } from 'react';
import GameOfLifeEngine from './services/GameOfLifeEngine.js';
import GameOfLifeController from './services/GameOfLifeController.js';
import GameOfLifeBoard from './components/GameOfLifeBoard.jsx';
import LeftMenu from './components/LeftMenu.jsx';
import TopMenu from './components/TopMenu.jsx';
import boardFactory from './utils/BoardFactory.js';

import './styles/GameOfLifeApp.css';

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
                <span>Conway's Game of Life</span>
            </section>

            <section className="section-left">
                <LeftMenu gameOfLifeController={gameOfLifeController} />
            </section>

            <section className="section-controls">
                <TopMenu gameOfLifeController={gameOfLifeController} />
            </section>

            <section className="section-board">
                <GameOfLifeBoard gameOfLifeController={gameOfLifeController} />
            </section>

        </main>
    )
}

export default GameOfLifeApp
