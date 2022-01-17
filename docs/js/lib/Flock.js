import Boid from "./Boid.js";

class Flock extends Set {
    constructor(size = 0) {
        const boids = [];

        for (let i = 0; i < size; i++) {
            boids.push(new Boid());
        }

        super(boids);
    }

    toArray() {
        return Array.from(this);
    }
}

export default Flock;