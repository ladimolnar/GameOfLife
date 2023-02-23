import BoardConstants from "../services/BoardConstants.js";
import AppConstants from "./AppConstants.js";

function boardFactory() {

    const rows = AppConstants.InitialRowsCount;
    const cols = AppConstants.InitialColsCount;

    // Create an empty 2D array with all values set to BoardConstants.CellValueEmpty
    const board = Array(rows).fill().map(() => Array(cols).fill(BoardConstants.CellValueEmpty));

    const presetConfiguration = GetPresetConfiguration();

    const minX = Math.min(...presetConfiguration.map(p => p.x));
    const minY = Math.min(...presetConfiguration.map(p => p.y));
    const maxX = Math.max(...presetConfiguration.map(p => p.x));
    const maxY = Math.max(...presetConfiguration.map(p => p.y));

    const offsetX = Math.floor((cols - (maxX - minX)) / 2);
    const offsetY = Math.floor((rows - (maxY - minY)) / 2);

    presetConfiguration.forEach(p => {
        board[p.y + offsetY][p.x + offsetX] = BoardConstants.CellValueAlive;
    });

    return board;
}

function GetPresetConfiguration() {
    return [
        { x: 0, y: 0 },
        { x: 0, y: 1 },

        { x: 1, y: 2 },
        { x: 2, y: 2 },
        { x: 3, y: 2 },
        { x: 5, y: 2 },
        { x: 6, y: 2 },
        { x: 7, y: 2 },
        { x: 8, y: 2 },
        { x: 9, y: 2 },

        { x: 1, y: 5 },
        { x: 2, y: 5 },
        { x: 3, y: 5 },
        { x: 4, y: 5 },
        { x: 5, y: 5 },
        { x: 7, y: 5 },
        { x: 8, y: 5 },
        { x: 9, y: 5 },
    ];
}



export default boardFactory;