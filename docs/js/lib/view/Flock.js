/**
 * Draws the whole flock with the same sprite.
 */
 class Flock {
    /**
     * @param {Function} sprite The sprite to be used.
     */
    constructor(sprite) {
        this.sprite = sprite;
    }

    /**
     * Draws a single boid.
     * @param {Boid} boid The boid to be drawn.
     */
    draw(boid) {
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

            this.sprite();
        pop();
    }
}

export default Flock;