import {CELL_HEIGHT, CELL_WIDTH} from './constants.js';
import SpriteSheet from './SpriteSheet.js';
import {loadImage} from './utils.js';

export function loadMarioSprite() {
    return loadImage('/img/characters.gif')
        .then(image => {
            const sprites = new SpriteSheet(image, CELL_WIDTH, CELL_HEIGHT);
            sprites.define('idle', 276, 44, 16, 16);

            return sprites;
        });
}