import {Behaviour} from '../Entity.js';

export default class Run extends Behaviour {
    constructor() {
        super('run');

        this.direction = 0;
        this.speed = 30000;
        this.distance = 0;
        this.heading = 1;
    }

    update(entity, deltaTime) {
        entity.vel.x = this.speed * this.direction * deltaTime;

        if (this.direction !== 0) {
            this.heading = this.direction;
            this.distance += Math.abs(entity.vel.x) * deltaTime;
        } else {
            this.distance = 0;
        }
    }
}