import {Vector2D} from './math.js';

export default class Camera {
    constructor() {
        this.pos = new Vector2D(0, 0);
        this.size = new Vector2D(1264, 480);
    }
}
