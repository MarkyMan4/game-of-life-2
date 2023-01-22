import Grid from './grid'

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const cellsAcross = 100;
const cellSize = canvas.width / cellsAcross;
const cellsDown = Math.floor(canvas.height / cellSize);

let grid = new Grid(cellsAcross, cellsDown);

const drawGrid = () => {
    for(let i = 0; i < grid.cells.length; i++) {
        for(let j = 0; j < grid.cells[i].length; j++) {
            ctx.beginPath();
            ctx.rect(j * cellSize, i * cellSize, cellSize, cellSize);
            ctx.fillStyle = grid.cells[i][j] ? 'white' : 'black';
            ctx.strokeStyle = 'white';
            ctx.fill();
            ctx.stroke();
        }
    }
}

drawGrid();
