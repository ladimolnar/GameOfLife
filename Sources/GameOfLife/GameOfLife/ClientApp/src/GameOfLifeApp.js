import React, { useState, useEffect, useMemo } from 'react';
import GameOfLifeEngine from './services/GameOfLifeEngine.js';
import GameOfLifeController from './services/GameOfLifeController.js';
import GameOfLifeBoard from './components/GameOfLifeBoard.jsx';
import LeftMenu from './components/LeftMenu.jsx';
import TopMenu from './components/TopMenu.jsx';
import Modal from './components/Modal.jsx';
import boardFactory from './utils/BoardFactory.js';

import './styles/GameOfLifeApp.css';

// The main component in the application.
function GameOfLifeApp() {

    const [modalProperties, setModalProperties] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const gameOfLifeController = useMemo(() => new GameOfLifeController(new GameOfLifeEngine(), boardFactory()), []);

    useEffect(() => {
        gameOfLifeController.startPlay();
        return () => gameOfLifeController.pausePlay();
    }, [gameOfLifeController]);

    const handleShowModal = (title, content) => {
        setModalProperties({ title: title, content: content, show: true });
    };

    const handleCloseModal = () => {
        setModalProperties({ title: null, content: null, show: false });

    };

    return (
        <>
            <Modal title={modalProperties.title} show={modalProperties.show} onClose={handleCloseModal}>
                {modalProperties.content}
            </Modal>
            <main>

                <section className="section-top">
                    <span>Conway's Game of Life</span>
                </section>

                <section className="section-left">
                    <LeftMenu gameOfLifeController={gameOfLifeController} showModal={handleShowModal} />
                </section>

                <section className="section-controls">
                    <TopMenu gameOfLifeController={gameOfLifeController} />
                </section>

                <section className="section-board">
                    <GameOfLifeBoard gameOfLifeController={gameOfLifeController} />
                </section>

            </main>
        </>)
}

export default GameOfLifeApp
