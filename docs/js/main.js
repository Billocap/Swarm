import Boid from './lib/Boid.js';
import warp from './utils/warp.js';

/**
 * @type {Boid[]}
 */
let boids = [];

window.createBoids = () => {
    const amount = parseFloat($("#part-amount").val());

    const massMin = parseFloat($("#mass-min").val());
    const massMax = parseFloat($("#mass-max").val());

    const forceMin = parseFloat($("#force-min").val());
    const forceMax = parseFloat($("#force-max").val());

    const speedMin = parseFloat($("#speed-min").val());
    const speedMax = parseFloat($("#speed-max").val());

    boids = [];

    for (let i = 0; i < amount; i++) {
        boids.push(
            new Boid(
                createVector(
                    random(0, windowWidth),
                    random(0, windowHeight),
                    random(0, windowHeight)
                ),
                random(massMin, massMax),
                random(forceMin, forceMax),
                random(speedMin, speedMax)
            )
        );
    }
}

window.setup = () => {
    createBoids();

    createCanvas(windowWidth, windowHeight);
}

window.draw = () => {
    background(0);

    const target = createVector(mouseX, mouseY, windowHeight / 2);

    for (const boid of boids) {
        if (mouseIsPressed) {
            boid.flee(target);
        } else {
            boid.seek(target);
        }
        
        // Causes the particles to warp on the edges.
        boid.x = warp(boid.x, 0, windowWidth);
        boid.y = warp(boid.y, 0, windowHeight);
        boid.z = warp(boid.z, 0, windowHeight);

        // Draws particles
        push();
        translate(0, 0, boid.z);
        noStroke();
        fill(
            map(boid.x, 0, windowWidth, 20, 250),
            map(boid.y, 0, windowHeight, 20, 250),
            map(boid.z, 0, windowHeight, 20, 250)
        );
        circle(boid.x, boid.y, PI * boid.mass);
        pop();
    }
}

window.windowResized = () => {
    resizeCanvas(windowWidth, windowHeight);
}