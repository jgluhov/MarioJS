import {Behaviour} from '../Entity.js';

export default class Run extends Behaviour {
    constructor() {
        super('run');

        this.direction = 0;
        this.speed = 10000;
    }

    update(entity, deltaTime) {
        entity.vel.x = this.speed * this.direction * deltaTime;
    }
}