import {Behaviour} from '../Entity.js';

export default class Velocity extends Behaviour {
    constructor() {
        super('velocity');
    }

    update(entity, deltaTime) {
        entity.pos.x += entity.vel.x * deltaTime;
        entity.pos.y += entity.vel.y * deltaTime;
    }
}