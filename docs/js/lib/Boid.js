class Boid {
    constructor(position, mass, maxForce, maxSpeed) {
        this.mass = mass;
        this.position = position;

        this.maxForce = maxForce;
        this.maxSpeed = maxSpeed;
        
        this.velocity = new p5.Vector(0, 0, 0);
    }

    get x() {
        return this.position.x;
    }

    set x(value) {
        this.position.x = value;
    }

    get y() {
        return this.position.y;
    }

    set y(value) {
        this.position.y = value;
    }

    get z() {
        return this.position.z;
    }

    set z(value) {
        this.position.z = value;
    }

    force(force) {
        // Makes sure the force isn't too strong
        force.limit(this.maxForce);

        // Applies a acceleration and limits velocity
        const acceleration = p5.Vector.div(force, this.mass);

        this.velocity.add(acceleration).limit(this.maxSpeed);
        //====================

        // Apply velocity.
        this.position.add(this.velocity);
    }
}