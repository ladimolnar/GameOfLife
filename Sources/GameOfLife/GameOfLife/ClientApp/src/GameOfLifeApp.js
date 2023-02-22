import React, { Component } from 'react';
import styles from './GameOfLifeApp.module.css';


function GameOfLifeApp() {

    return (
        <main>

            <section className={styles.SectionTop}>
                <h1>Conway's Game of Life</h1>
            </section>

            <section className={styles.SectionLeft}>
                Menu Area
            </section>

            <section className={styles.SectionControls}>
                Play Controls Area
            </section>

            <section className={styles.SectionBoard}>
                Board Area
            </section>

        </main>
    )
}

export default GameOfLifeApp