import p5 from 'p5';
import { Grid } from './cgol/Grid';


// You can actually play with these values.
export let cell_size = 20; // The size of a cell in the grid; large size = less cells in the grid
export let initial_population_rate = 0.1; // 0.95 = 95% of the cells are alive


/**
 * Don't touch these values or I'll cast a spell on you.
 * @internal
 */
let alive = 0;
export let grid: Grid;
export let isPaused = false;
export let color_scheme = { // assume light mode;
    alive: 0,
    dead: 255
}



// DOM nodes
let aliveNode = document.getElementById('alive-cells');
let randomize_button = document.getElementById('randomize-button');
let control_time_button = document.getElementById('control-time');
let reset_button = document.getElementById('reset-grid');
let toggle_theme_button = document.getElementById('toggle-theme');

function pause() {
    console.log(`Grid: The grid is now ${isPaused ? 'unpaused' : 'paused'}.`);
    control_time_button!.innerText = isPaused ? 'Unpause' : 'Pause';
    console.log(control_time_button);
    isPaused = !isPaused;
}

function draw(p: p5) {

    // controlling the grid with the mouse
    if (p.mouseIsPressed) {

        let x = Math.floor(p.mouseX / cell_size) * cell_size;
        let y = Math.floor(p.mouseY / cell_size) * cell_size;

        let cell = grid.cells.get(`${x},${y}`);
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
    if (aliveNode) {
        if (aliveNode.innerText != `${alive}`) {
            aliveNode.innerText = `${alive}`;
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

    grid = new Grid(width, height);
    grid.randomize();

    // add event listeners to the dom nodes
    if (randomize_button && control_time_button && reset_button && toggle_theme_button) {

        randomize_button.addEventListener('click', () => {
            grid.randomize();
        });

        control_time_button.addEventListener('click', () => {
            pause()
        });

        reset_button.addEventListener('click', () => {
            grid.reset();
        });

        toggle_theme_button.addEventListener('click', () => {
            switchTheme();
        });
    }
}

let init = function (p: p5) {
    p.setup = () => setup(p);
    p.draw = () => draw(p);
    p.keyTyped = (event: KeyboardEvent) => {
        event.preventDefault();
        if (event.key == 'r') {
            grid.reset();
        }
        else if (event.key == " ") {
            pause()
        }
        else if (event.key == 'q') {
            grid.randomize();
        }
    };

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
};

function switchTheme() {
    if (!document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.add('dark');
        color_scheme = {
            alive: 255,
            dead: 0
        }
    }
    else {
        document.documentElement.classList.remove('dark');
        color_scheme = {
            alive: 0,
            dead: 255
        }
    }
}

function main() {
    new p5(init, document.getElementById('canvas')!);
}

main()