let boids = [];

function randRange(min, max) {
    return min + Math.random() * (max - min);
}

function createBoids() {
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
                    randRange(0, windowWidth),
                    randRange(0, windowHeight),
                    randRange(0, windowHeight)
                ),
                randRange(massMin, massMax),
                randRange(forceMin, forceMax),
                randRange(speedMin, speedMax)
            )
        );
    }
}

function setup() {
    createBoids();

    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0);

    const target = createVector(mouseX, mouseY, windowHeight / 2);

    for (const boid of boids) {
        // Makes particles be attracted to the mouse
        const att = p5.Vector.sub(target, boid.position);
        
        // But repels them when the mouse is pressed.
        if (mouseIsPressed) att.mult(-1);

        boid.force(att);
        //===================
        
        // Causes the particles to warp on the edges.
        if (boid.x < 0) boid.x = windowWidth - 1;
        if (boid.y < 0) boid.y = windowHeight - 1;
        if (boid.z < 0) boid.z = windowHeight - 1;
        if (boid.x > windowWidth) boid.x = 0;
        if (boid.y > windowHeight) boid.y = 0;
        if (boid.z > windowHeight) boid.z = 0;
        
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

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}