import {Behaviour} from './behaviour.js';
import {SLOW_DRAG} from "../constants.js";

export default class Run extends Behaviour {
    constructor() {
        super('run');

        this.direction = 0;
        this.acceleration = 1000;
        this.deceleration = 300;
        this.dragFactor = SLOW_DRAG;

        this.distance = 0;
        this.heading = 1;
    }

    handleHeading(entity) {
        if(entity.jump) {
            if(!entity.jump.falling) {
                this.heading = this.direction;
            }
        } else {
            this.heading = this.direction;
        }
    }


    update(entity, deltaTime) {
        const absX = Math.abs(entity.vel.x);
        if (this.direction !== 0) {

            entity.vel.x += this.acceleration * deltaTime * this.direction;
            this.handleHeading(entity);

        }  else if (entity.vel.x !== 0) {
            const decel = Math.min(absX, this.deceleration * deltaTime);
            entity.vel.x += entity.vel.x > 0 ? -decel : decel;
        } else {
            this.distance = 0;
        }

        entity.vel.x -= this.dragFactor * entity.vel.x * absX;
        this.distance += absX * deltaTime;
    }
}