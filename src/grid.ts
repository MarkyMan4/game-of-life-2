export default class Grid {
    private _cellsAcross: number;
    private _cellsDown: number;
    private _cells: boolean[][]; // represents living/dead cells

    constructor(cellsAcross: number, cellsDown: number) {
        this._cellsAcross = cellsAcross;
        this._cellsDown = cellsDown;
        this._cells = [];

        // initialize the grid with dead cells
        for(let i = 0; i < this._cellsDown; i++) {
            let cellRow = [];

            for(let j = 0; j < this._cellsAcross; j++) {
                cellRow.push(false);
            }

            this._cells.push(cellRow);
        }
    }

    public get cells() {
        return this._cells;
    }
}
