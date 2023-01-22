export default class Grid {
    private _cellsAcross: number;
    private _cellsDown: number;
    public cells: boolean[][]; // represents living/dead cells

    constructor(cellsAcross: number, cellsDown: number) {
        this._cellsAcross = cellsAcross;
        this._cellsDown = cellsDown;
        this.cells = [];
        
        // initialize the grid to all dead cells
        this.resetCells();
    }

    // set all cells to dead
    public resetCells() {
        this.cells = [];

        for(let i = 0; i < this._cellsDown; i++) {
            let cellRow = [];

            for(let j = 0; j < this._cellsAcross; j++) {
                cellRow.push(false);
            }

            this.cells.push(cellRow);
        }
    }

    // recreate grid with random cells starting out alive
    public randomize() {
        this.cells = [];

        for(let i = 0; i < this._cellsDown; i++) {
            let cellRow = [];

            for(let j = 0; j < this._cellsAcross; j++) {
                cellRow.push(Math.random() >= 0.7);
            }

            this.cells.push(cellRow);
        }
    }

    /*
    If a living cell has two or three living neighbors, it survives
    If a dead cell has three live neighbors, it becomes alive
    All other cells die or stay dead
    */
    public evalRules() {
        let newCells: boolean[][] = [];

        for(let i = 0; i < this.cells.length; i++) {
            let cellRow: boolean[] = [];

            for(let j = 0; j < this.cells[i].length; j++) {
                let livingNeighbors = this.getNumLivingNeighbors(j, i);
                cellRow.push(this.getNewCellValue(this.cells[i][j], livingNeighbors));
            }

            newCells.push(cellRow);
        }

        this.cells = newCells;
    }

    /*
    each cell has 8 neighboring cells
    if the given indices are on the edge of the grid, the cells off the grid are considered dead
    */
    private getNumLivingNeighbors(x: number, y: number): number {
        let count = 0;

        if(y > 0 && x > 0 && this.cells[y - 1][x - 1]) { // above left
            count++;
        }
        if(y > 0 && this.cells[y - 1][x]) { // above
            count++;
        }
        if(y > 0 && x < this.cells[y].length - 1 && this.cells[y - 1][x + 1]) { // above right
            count++;
        }
        if(x < this.cells[y].length - 1 && this.cells[y][x + 1]) { // right
            count++;
        }
        if(y < this.cells.length - 1 && x < this.cells[y].length - 1 && this.cells[y + 1][x + 1]) { // down right
            count++;
        }
        if(y < this.cells.length - 1 && this.cells[y + 1][x]) { // down
            count++;
        }
        if(y < this.cells.length - 1 && x > 0 && this.cells[y + 1][x - 1]) { // down left
            count++;
        }
        if(x > 0 && this.cells[y][x - 1]) { // left
            count++;
        }

        return count;
    }

    // can probably write this logic more elegantly, this works for now though
    private getNewCellValue(currentValue: boolean, numLivingNeighbors: number): boolean {
        if(currentValue && (numLivingNeighbors === 2 || numLivingNeighbors === 3)) {
            return true;
        }
        else if (!currentValue && numLivingNeighbors === 3) {
            return true;
        }

        return false;
    }
}
