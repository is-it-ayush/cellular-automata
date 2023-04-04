import type p5 from "p5";
import { cell_size, grid, initial_population_rate } from "../main";
import { Cell } from "./Cell";

/**
 * The grid of cells.
 */
export class Grid {
    cells: Map<string, Cell> = new Map();

    constructor(width: number, height: number) {
        this.init(width, height);
    }

    init(width: number, height: number) {
        // initialize the grid
        console.log(`Grid: Initializing the grid...`)
        for (let x = 0; x < width; x += cell_size) {
            for (let y = 0; y < height; y += cell_size) {
                this.cells.set(`${x},${y}`, new Cell(x, y));
            }
        }
    }

    draw(p: p5) {
        this.cells.forEach(c => c.draw(p));
    }

    //rules of the game
    //1. Any live cell with fewer than two or more than three live neighbours dies, as if by underpopulation.
    //2. Any live cell with two or three live neighbours lives on to the next generation.
    //3. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

    update() {
        this.cells.forEach(c => {
            let aliveNeighbors = c.getAliveNeighbors().length;
            if (c.isAlive) {
                if (aliveNeighbors < 2 || aliveNeighbors > 3) {
                    c.isAlive = false; // rule 1
                }
                else if (aliveNeighbors == 2 || aliveNeighbors == 3) {
                    c.isAlive = true; // rule 2
                }
            } else {
                if (aliveNeighbors == 3) {
                    c.isAlive = true; // rule 3
                }
            }
        });
    }

    getAliveCells() {
        return Array.from(this.cells.values()).filter(c => c.isAlive);
    }

    randomize() {
        console.log(`Grid: Randomizing the grid with a population rate of ${initial_population_rate}%...`)
        grid.cells.forEach(c => c.isAlive = Math.random() > (1 - initial_population_rate));
    }

    reset() {
        console.log(`Grid: Resetting the grid...`)
        grid.cells.forEach(c => c.isAlive = false);
    }
}