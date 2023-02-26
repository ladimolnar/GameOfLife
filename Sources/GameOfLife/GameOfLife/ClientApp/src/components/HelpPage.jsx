import React from 'react';
import SvgButtons from '../BootstrapIcons/SvgButtons.jsx';
import '../styles/HelpPage.css';

function HelpPage() {

    return (
        <div className="help-page">
            <br />
            The Game of Life, is a cellular automaton created by British mathematician John Horton Conway in 1970.

            The state of a cell depends on the states of its eight neighbors. At each generation,
            the following rules are applied:

            <ul>
                <li>Any live cell with fewer than 2 neighbors dies, as if by starvation.</li>
                <li>Any live cell with more than 3 neighbors dies, as if by overpopulation.</li>
                <li>A new cell appears in an empty position that has exactly 3 neighbors as if by reproduction.</li>
            </ul>

            These simple rules can lead to complex patterns and behaviors.
            The Game of Life has been studied extensively in mathematics and computer science,
            and it has been used as a model for studying complex systems and emergent behavior. 

            <br />
            <br />
            <br />

            <div id="tipArea">
                <div id="info_icon">
                    {SvgButtons.bi_info_circle}
                </div>

                <div className="tip-text">Click on any cell to edit the map.</div>
            </div>

            <br />
            <br />

            Read more about <a href="http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank">Conway's Game of Life</a>
            <br />
            <br />

        </div>
    );
};

export default HelpPage;
