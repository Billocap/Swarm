/**
 * Boids are simple autonomous agents capable o basic decision making.
 */
class Boid {
    /**
     * @param {p5.Vector} [position] The initial position as a vector.
     * @param {number} [mass] The boid's mass.
     * @param {number} [maxForce] The maximum force this boid can be affected by.
     * @param {number} [maxSpeed] he maximum velocity this boid can have.
     */
    constructor(position, mass, maxForce, maxSpeed) {
        /**
         * This boid's mass.
         */
        this.mass = mass || 1;
        /**
         * A vector representing the boid's position, only use this field
         * for calculations that use vectors.
         * @type {p5.Vector}
         */
        this.position = position || new p5.Vector(0, 0, 0);
        /**
         * A vector representing the boid's velocity.
         * @type {p5.Vector}
         */
        this.velocity = new p5.Vector(0, 0, 0);
        /**
         * The maximum force this boid can be affected by, values greater than
         * this are set to this value.
         */
        this.maxForce = maxForce || 3;
        /**
         * The maximum velocity this boid can have, values greater than
         * this are set to this value.
         */
        this.maxSpeed = maxSpeed || 5;
    }

    // #region X coord
    /**
     * Boid's x coordinate.
     */
    get x() {
        return this.position.x;
    }

    /**
     * Boid's x coordinate.
     */
    set x(value) {
        this.position.x = value;
    }
    // #endregion

    // #region Y coord
    /**
     * Boid's y coordinate.
     */
    get y() {
        return this.position.y;
    }

    /**
     * Boid's y coordinate.
     */
    set y(value) {
        this.position.y = value;
    }
    // #endregion

    // #region Z coord
    /**
     * Boid's z coordinate.
     */
    get z() {
        return this.position.z;
    }

    /**
     * Boid's z coordinate.
     */
    set z(value) {
        this.position.z = value;
    }
    //#endregion

    /**
     * Applies a force vector to the boid.
     * @param {p5.Vector} force The force vector.
     */
    force(force) {
        force.limit(this.maxForce);

        // F = m * a therefor a = F / m.
        const acceleration = force.div(this.mass);

        this.velocity.add(acceleration).limit(this.maxSpeed);

        this.position.add(this.velocity);
    }

    /**
     * Applies a force that steers the boid in a certain direction.
     * @param {p5.Vector} direction Desired direction.
     */
    steer(direction) {
        // Calculates the force necessary to correct the trajectory.
        const steering = p5.Vector.sub(direction, this.velocity);

        this.force(steering);
    }

    /**
     * Makes the boid move towards a position in space.
     * @param {p5.Vector} target A vector representing the position.
     */
    seek(target) {
        // Vector from this.position -> target.
        const correction = p5.Vector.sub(target, this.position);

        // This vector should always be equal to maxSpeed.
        correction.setMag(this.maxSpeed);

        this.steer(correction);
    }

    /**
     * Makes the boid move away from a position in space.
     * @param {p5.Vector} target A vector representing the position.
     */
    flee(target) {
        // Vector from target -> this.position.
        const correction = p5.Vector.sub(this.position, target);

        // This vector should always be equal to maxSpeed.
        correction.setMag(this.maxSpeed);

        this.steer(correction);
    }

    /**
     * Makes the boid move towards a position in space and slow down as it
     * approaches the target.
     * 
     * The slowing behavior only happen if the distance from the boid to the
     * target is less than the stopping radius.
     * @param {p5.Vector} target A vector representing the position.
     * @param {number} [radius] The stopping radius.
     */
    arrive(target, radius = 5) {
        // Vector from this.position -> target.
        const correction = p5.Vector.sub(target, this.position);

        // Slows down the boid in a way proportional to the stopping radius.
        const slowingSpeed = this.maxSpeed / radius;

        correction.mult(slowingSpeed);
        //===============================

        this.steer(correction);
    }
}

export default Boid;