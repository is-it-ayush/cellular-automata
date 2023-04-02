import p5 from 'p5';
import { Grid } from './cgol/Grid';



export let cell_size = 50; // The size of a cell in the grid; large size = less cells in the grid
export let initial_population_rate = 0.1; // 0.95 = 95% of the cells are alive


/**
 * @internal
 */
let alive = 0;
export let grid: Grid;
let isPaused = false;
let aliveNode = document.getElementById('alive-cells');
let isPausedNode = document.getElementById('is-paused');


function draw(p: p5) {
    p.resizeCanvas(p.windowWidth, p.windowHeight);

    // controlling the grid with the mouse
    if (p.mouseIsPressed) {

        let x = Math.floor(p.mouseX / cell_size) * cell_size;
        let y = Math.floor(p.mouseY / cell_size) * cell_size;

        let cell = grid.cells.find(c => c.x == x && c.y == y);
        if (cell) {
            if (p.mouseButton == p.LEFT) {
                cell.isAlive = true;
            }
            else if (p.mouseButton == p.RIGHT) {
                cell.isAlive = false;
            }
        }
    }

    // update the dom nodes
    if (aliveNode && isPausedNode) {
        if (aliveNode.innerText != `${alive}`) {
            aliveNode.innerText = `${alive}`;
        }
        if (isPaused) {
            isPausedNode.innerText = `Time halts.`;
        }
        else {
            isPausedNode.innerText = `Time flows.`;
        }
    }

    grid.draw(p);
    alive = grid.getAliveCells().length;
    if (!isPaused) {
        grid.update();
    }
}

function setup(p: p5) {
    // height & width of screen.
    const width = p.windowWidth;
    const height = p.windowHeight;
    p.createCanvas(width * 1, height);
    p.background(255);
    grid = new Grid(width, height);
    grid.randomize();
}

let init = function (p: p5) {
    p.setup = () => setup(p);
    p.draw = () => draw(p);
    p.keyTyped = (event: KeyboardEvent) => {
        event.preventDefault();
        if (event.key == 'r') {
            console.log(`Grid: Resetting the grid...`);
            grid.cells.forEach(c => c.isAlive = false);
        }
        else if (event.key == " ") {
            console.log(`Grid: The grid is now ${isPaused ? 'unpaused' : 'paused'}.`);
            isPaused = !isPaused;
        }
        else if (event.key == 'q') {
            console.log(`Grid: Randomizing the grid with a population rate of ${initial_population_rate}%...`);
            grid.randomize();
        }
    };
}

new p5(init, window.document.getElementById('canvas')!);