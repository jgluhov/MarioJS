import {Vector2D} from './math.js';

export class Behaviour {
    constructor(name) {
        this.name = name;
    }

    update() {
        console.warn('Unhandled update call in Behaviour');
    }
}

export default class Entity {
    constructor() {
        this.pos = new Vector2D(0, 0);
        this.vel = new Vector2D(0, 0);

        this.behaviours = [];
    }

    addBehaviours(behaviour) {
        this.behaviours.push(behaviour);
        this[behaviour.name] = behaviour;
    }

    update(deltaTime) {
        this.behaviours.forEach(behaviour => {
            behaviour.update(this, deltaTime);
        });
    }
}