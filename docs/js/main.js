import * as Model from './lib/model.js';
import * as View from './lib/view.js';

import warp from './utils/warp.js';

/**
 * @type {Flock}
 */
let flock;
let sprite;
let renderer;

let sprites = {
    arrow() {
        beginShape();
            vertex(10, 0);
            vertex(-3, 6);
            vertex(0, 0);
            vertex(-3, -6);
        endShape();
    },
    circle() {
        circle(0, 0, 10);
    }
};

// $("#hover").click(
//     function() {
//         $(this)
//             .toggleClass("open")
//             .children("i")
//                 .toggleClass("open");

//         $("#menu").toggleClass("open");
//     }
// );

window.createFlock = () => {
    const amount = parseFloat($("#part-amount").val());

    const massMin = parseFloat($("#mass-min").val());
    const massMax = parseFloat($("#mass-max").val());

    const forceMin = parseFloat($("#force-min").val());
    const forceMax = parseFloat($("#force-max").val());

    const speedMin = parseFloat($("#speed-min").val());
    const speedMax = parseFloat($("#speed-max").val());

    sprite = $("#boid-shape").val();

    flock = new Model.Flock(amount);

    for(const boid of flock) {
        boid.x = random(0, windowWidth);
        boid.y = random(0, windowHeight);
        boid.z = random(0, windowHeight);

        boid.mass = random(massMin, massMax);
        boid.maxSpeed = random(speedMin, speedMax);
        boid.maxForce = random(forceMin, forceMax);
    }

    renderer = new View.Flock(sprites[sprite]);
}

window.setup = () => {
    createFlock();
    
    createCanvas(windowWidth, windowHeight);
}

window.draw = () => {
    background(31);
    const drawBorder = $("#draw-border").is(":checked");

    if (drawBorder) {
        strokeWeight(2);
    } else {
        strokeWeight(0);
    }

    const target = createVector(mouseX, mouseY, windowHeight / 2);
    const arrive = $("#behavior").is(":checked");

    for (const boid of flock) {
        if (mouseIsPressed) {
            boid.flee(target);
        } else {
            if (arrive) {
                boid.arrive(target, 25);
            } else {
                boid.seek(target);
            }
        }
        
        boid.x = warp(boid.x, 0, windowWidth);
        boid.y = warp(boid.y, 0, windowHeight);
        boid.z = warp(boid.z, 0, windowHeight);

        renderer.draw(boid);
    }
}

window.windowResized = () => {
    resizeCanvas(windowWidth, windowHeight);
}