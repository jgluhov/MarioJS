import {Behaviour} from '../Entity.js';

export default class Run extends Behaviour {
    constructor() {
        super('run');

        this.direction = 0;
        this.speed = 10000;
        this.distance = 0;
    }

    update(entity, deltaTime) {
        entity.vel.x = this.speed * this.direction * deltaTime;

        if (this.direction !== 0) {
            this.distance += Math.abs(entity.vel.x) * deltaTime;
        } else {
            this.distance = 0;
        }
    }
}