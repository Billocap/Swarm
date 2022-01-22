import Flock from './lib/Flock.js';
import warp from './utils/warp.js';

/**
 * @type {Flock}
 */
let flock;
let sprite;

$("#hover").click(
    function() {
        $(this)
            .toggleClass("open")
            .children("i")
                .toggleClass("open");

        $("#menu").toggleClass("open");
    }
);

window.createFlock = () => {
    const amount = parseFloat($("#part-amount").val());

    const massMin = parseFloat($("#mass-min").val());
    const massMax = parseFloat($("#mass-max").val());

    const forceMin = parseFloat($("#force-min").val());
    const forceMax = parseFloat($("#force-max").val());

    const speedMin = parseFloat($("#speed-min").val());
    const speedMax = parseFloat($("#speed-max").val());

    sprite = $("#boid-shape").val();

    flock = new Flock(amount);

    for(const boid of flock) {
        boid.x = random(0, windowWidth);
        boid.y = random(0, windowHeight);
        boid.z = random(0, windowHeight);

        boid.mass = random(massMin, massMax);
        boid.maxSpeed = random(speedMin, speedMax);
        boid.maxForce = random(forceMin, forceMax);
    }
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

        // Draws particles respecting their z coordinate.
        push();
            fill(
                map(boid.x, 0, windowWidth, 20, 250),
                map(boid.y, 0, windowHeight, 20, 250),
                map(boid.z, 0, windowHeight, 20, 250)
            );
            stroke(
                map(boid.x, 0, windowWidth, 0, 200),
                map(boid.y, 0, windowHeight, 0, 200),
                map(boid.z, 0, windowHeight, 0, 200)
            );
            
            translate(boid.x, boid.y, boid.z);
            rotate(boid.velocity.heading());
            scale(boid.mass / 5);

            if (sprite == "arrow") {
                beginShape();
                    vertex(10, 0);
                    vertex(-3, 6);
                    vertex(0, 0);
                    vertex(-3, -6);
                endShape();
            } else {
                circle(0, 0, 10);
            }
        pop();
        //==============================
    }
}

window.windowResized = () => {
    resizeCanvas(windowWidth, windowHeight);
}