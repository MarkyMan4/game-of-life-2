import Grid from './grid'

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const runBtn = document.getElementById('run-btn') as HTMLButtonElement;
const clearBtn = document.getElementById('clear-btn') as HTMLButtonElement;
const randomizeBtn = document.getElementById('rand-btn') as HTMLButtonElement;
const cellColorInp = document.getElementById('cell-color-picker') as HTMLInputElement;
const showGridInp = document.getElementById('show-grid-input') as HTMLInputElement;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const cellsAcross = 100;
const cellSize = canvas.width / cellsAcross;
const cellsDown = Math.floor(canvas.height / cellSize);

let grid = new Grid(cellsAcross, cellsDown);
let isRunning = false;
let isMouseDown = false;
let cellColor = 'white';
let showGrid = true;

// controls for how fast animation runs
let timestep = 75;
let lastUpdateTime = new Date();

// event listeners for controls
runBtn.addEventListener('click', (_) => {
    isRunning = !isRunning;
    lastUpdateTime = new Date();

    runBtn.innerHTML = isRunning ? 'pause' : 'run';
});

clearBtn.addEventListener('click', (_) => {
    grid.resetCells();
});

randomizeBtn.addEventListener('click', (_) => {
    grid.randomize();
});

cellColorInp.addEventListener('change', (_) => {
    cellColor = cellColorInp.value;
})

showGridInp.addEventListener('change', (_) => {
    showGrid = showGridInp.checked;
})

// gets the mouse position relative to canvas, not relative to screen
const getMousePos = (ev: MouseEvent) => {
    let boundingRect = canvas.getBoundingClientRect();
    let scaleX = canvas.width / boundingRect.width;
    let scaleY = canvas.height / boundingRect.height;

    return {
        x: (ev.clientX - boundingRect.left) * scaleX, 
        y: (ev.clientY - boundingRect.top) * scaleY
    };
}

document.addEventListener('mousedown', (ev: MouseEvent) => {
    isMouseDown = true;

    const {x: mouseX, y: mouseY} = getMousePos(ev);
    
    // find the cell that was clicked and flip isAlive
    let x = Math.ceil((mouseX - cellSize) / cellSize);
    let y = Math.ceil((mouseY - cellSize) / cellSize);

    grid.cells[y][x] = !grid.cells[y][x];
});

document.addEventListener('mouseup', (_) => { isMouseDown = false; })

document.addEventListener('mousemove', (ev: MouseEvent) => {
    if(isMouseDown) {
        const {x: mouseX, y: mouseY} = getMousePos(ev);
    
        // find the cell that was clicked and flip isAlive
        let x = Math.ceil((mouseX - cellSize) / cellSize);
        let y = Math.ceil((mouseY - cellSize) / cellSize);

        grid.cells[y][x] = true;
    }
});

const drawGrid = () => {
    for(let i = 0; i < grid.cells.length; i++) {
        for(let j = 0; j < grid.cells[i].length; j++) {
            ctx.beginPath();
            ctx.rect(j * cellSize, i * cellSize, cellSize, cellSize);
            ctx.fillStyle = grid.cells[i][j] ? cellColor : 'black';
            ctx.fill();
            
            // only do this if show grid is turned on
            if(showGrid) {
                ctx.strokeStyle = grid.cells[i][j] ? 'black' : 'white';
                ctx.stroke();
            }
        }
    }
}

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();

    if(isRunning) {
        let currentTime = new Date();
        if(currentTime.getTime() - lastUpdateTime.getTime() >= timestep) {
            grid.evalRules();
            lastUpdateTime = currentTime;
        }
    }

    requestAnimationFrame(animate);
}

animate();
