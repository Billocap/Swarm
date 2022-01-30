import * as Model from './lib/model.js';
import * as View from './lib/view.js';

import warp from './utils/warp.js';

let sprite;
let id = 0;

const flocks = new Map();
const renderers = new Map();

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

window.createFlock = () => {
    const flockName = `flock ${id}`;
    const amount = parseFloat($("#part-amount").val());

    const massMin = parseFloat($("#mass-min").val());
    const massMax = parseFloat($("#mass-max").val());

    const forceMin = parseFloat($("#force-min").val());
    const forceMax = parseFloat($("#force-max").val());

    const speedMin = parseFloat($("#speed-min").val());
    const speedMax = parseFloat($("#speed-max").val());

    sprite = $("#boid-shape").val();

    let flock = new Model.Flock(amount);

    for(const boid of flock) {
        boid.x = random(0, windowWidth);
        boid.y = random(0, windowHeight);
        boid.z = random(0, windowHeight);

        boid.mass = random(massMin, massMax);
        boid.maxSpeed = random(speedMin, speedMax);
        boid.maxForce = random(forceMin, forceMax);
    }

    let renderer = new View.Flock(sprites[sprite]);
    
    flocks.set(flockName, flock);
    renderers.set(flockName, renderer);

    $("#flocks").append(
        $(`<div class="clearfix">flock ${id}</div>`).append(
            $('<a href="#" class="float-end">delete</a>').click(function() {
                flocks.delete(flockName);

                document.querySelector("#flocks").removeChild(this.parentNode);
            })
        )
    );

    id++;
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

    for (const [flockName, flock] of flocks) {
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
    
            renderers.get(flockName).draw(boid);
        }
    }
}

window.windowResized = () => {
    resizeCanvas(windowWidth, windowHeight);
}