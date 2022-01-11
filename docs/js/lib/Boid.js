/**
 * Boids are simple autonomous agents capable o basic decision making.
 */
class Boid {
    constructor(position, mass, maxForce, maxSpeed) {
        this.mass = mass;
        this.position = position;
        
        this.velocity = new p5.Vector(0, 0, 0);

        this.maxForce = maxForce;
        this.maxSpeed = maxSpeed;
    }

    // #region X
    get x() {
        return this.position.x;
    }

    set x(value) {
        this.position.x = value;
    }
    // #endregion

    // #region Y
    get y() {
        return this.position.y;
    }

    set y(value) {
        this.position.y = value;
    }
    // #endregion

    // #region Z
    get z() {
        return this.position.z;
    }

    set z(value) {
        this.position.z = value;
    }
    //#endregion

    /**
     * Applies a force vector to the boid.
     * @param {Vector} force The force vector.
     */
    force(force) {
        // Makes sure the force isn't too strong.
        force.limit(this.maxForce);

        // Calculates the acceleration vector.
        const acceleration = force.div(this.mass);

        // Applies the acceleration vector and limits velocity.
        this.velocity.add(acceleration).limit(this.maxSpeed);

        // Apply velocity.
        this.position.add(this.velocity);
    }

    /**
     * Applies a force that steers the boid in a certain direction.
     * @param {Vector} direction Desired direction.
     */
    steer(direction) {
        // Calculates the force necessary to correct the trajectory.
        const steering = p5.Vector.sub(direction, this.velocity);

        // Applies the force.
        this.force(steering);
    }

    /**
     * Makes the boid move towards a position in space.
     * @param {Vector} target A vector representing the position.
     */
    seek(target) {
        // Gets a vector pointing from this object to the target.
        const correction = p5.Vector.sub(target, this.position);

        // Corrects the magnitude of the vector and steers towards it.
        this.steer(correction.setMag(this.maxSpeed));
    }

    /**
     * Makes the boid move away from a position in space.
     * @param {Vector} target A vector representing the position.
     */
    flee(target) {
        // Gets a vector pointing from the target to this object.
        const correction = p5.Vector.sub(this.position, target);

        // Corrects the magnitude of the vector and steers towards it.
        this.steer(correction.setMag(this.maxSpeed));
    }
}

export default Boid;