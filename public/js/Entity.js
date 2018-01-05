import {Vector2D} from './math.js';

export default class Entity {
    constructor() {
        this.pos = new Vector2D(0, 0);
        this.vel = new Vector2D(0, 0);
    }
}