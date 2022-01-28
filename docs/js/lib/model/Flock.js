import Boid from "./Boid.js";

/**
 * Controls the behavior of multiple boids.
 * @extends Set<Boid>
 */
class Flock extends Set {
    /**
     * @param {number} size Number of boids the flock starts with.
     */
    constructor(size = 0) {
        const boids = [];

        for (let i = 0; i < size; i++) {
            boids.push(new Boid());
        }

        super(boids);
    }

    /**
     * Returns an array containing all the boids in this flock.
     * @returns {Boid[]} Array of boids.
     */
    boids() {
        return Array.from(this);
    }
}

export default Flock;