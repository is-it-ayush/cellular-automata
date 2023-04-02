import type p5 from "p5";
import { cell_size, grid } from "../main";

/**
 * A cell in the grid.
 * Each cell has a position (x, y) and a state (isAlive).
 */
export class Cell {
    x: number;
    y: number;
    isAlive: boolean;
    constructor(x: number, y: number, isAlive: boolean = false) {
        this.x = x;
        this.y = y;
        this.isAlive = false;
    }

    draw(p: p5) {
        p.rect(this.x, this.y, cell_size, cell_size);
        p.fill(this.isAlive ? 255 : 0);
    }

    /**
     * Returns the neighbors of this cell in the grid.
     * @returns Cell[]
     */
    getNeighbors() {
        // find neighbors in the grid
        let neighbors: Cell[] = [];
        for (let x = this.x - cell_size; x <= this.x + cell_size; x += cell_size) {
            for (let y = this.y - cell_size; y <= this.y + cell_size; y += cell_size) {
                if (x == this.x && y == this.y) {
                    continue;
                }
                let cell = grid.cells.find(c => c.x == x && c.y == y);
                if (cell) {
                    neighbors.push(cell);
                }
            }
        }
        return neighbors;
    }

    /**
     * Returns the alive neighbors of this cell in the grid.
     * @returns Cell[]
     */
    getAliveNeighbors() {
        return this.getNeighbors().filter(c => c.isAlive);
    }
}