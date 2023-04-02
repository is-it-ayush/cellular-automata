import type p5 from "p5";
import { cell_size, grid, initial_population_rate } from "../main";
import { Cell } from "./Cell";

export class Grid {
    cells: Cell[] = [];

    constructor(width: number, height: number) {
        for (let x = 0; x < width; x += cell_size) {
            for (let y = 0; y < height; y += cell_size) {
                this.cells.push(new Cell(x, y));
            }
        }
    }

    draw(p: p5) {
        this.cells.forEach(c => c.draw(p));
    }

    update() {
        this.cells.forEach(c => {
            let aliveNeighbors = c.getAliveNeighbors().length;
            if (c.isAlive) {
                // any live cell with fewer than 2 or more than 3 live neighbors dies; as if by underpopulation or overpopulation
                if (aliveNeighbors < 2 || aliveNeighbors > 3) {
                    c.isAlive = false;
                }
            } else {
                // any dead cell with exactly 3 live neighbors becomes a live cell; as if by reproduction
                if (aliveNeighbors == 3) {
                    c.isAlive = true;
                }
            }

        }
        );
    }

    getAliveCells() {
        return this.cells.filter(c => c.isAlive);
    }

    randomize() {
        grid.cells.forEach(c => c.isAlive = Math.random() > (1 - initial_population_rate));
    }
}