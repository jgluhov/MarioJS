import {Vector2D} from './math.js';

export default class Entity {
    constructor() {
        this.pos = new Vector2D(0, 0);
        this.vel = new Vector2D(0, 0);
        this.size = new Vector2D(0, 0);

        this.behaviours = [];
    }

    addBehaviours(behaviour) {
        this.behaviours.push(behaviour);
        this[behaviour.name] = behaviour;
    }

    obstruct(side) {
        this.behaviours.forEach(behaviour => {
            behaviour.obstruct(this, side);
        });
    }

    update(deltaTime) {
        this.behaviours.forEach(behaviour => {
            behaviour.update(this, deltaTime);
        });
    }
}