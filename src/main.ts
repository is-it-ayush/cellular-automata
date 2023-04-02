import p5 from 'p5';

function setup(p: p5) {
    p.createCanvas(500, 500);
    p.background(220);

}

function draw(p: p5) {
    // draw a circle
    if (p.mouseIsPressed) {
        p.fill(0);
    }
    else {
        p.fill(255);
    }
    p.ellipse(p.mouseX, p.mouseY, 80, 80);
}

new p5((p: p5) => {
    p.setup = () => setup(p);
    p.draw = () => draw(p);
});
