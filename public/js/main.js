import {loadImage, loadJSON} from './utils.js';
import SpriteSheet from './sprite-sheet.js';
import {CELL_HEIGHT, CELL_WIDTH} from './constants.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

function drawBackground(background, context, sprites) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; x++) {
            for (let y = y1; y < y2; y++) {
                sprites.drawTile(background.tile, context, x, y);
            }
        }
    })
}

loadImage('/img/tiles.png')
    .then(image => {
        const sprites = new SpriteSheet(image, CELL_WIDTH, CELL_HEIGHT);
        sprites.define('ground', 0, 0);
        sprites.define('sky', 3, 23);

        loadJSON('/levels/1-1.json')
            .then(level => {
                level.backgrounds.forEach(background => {
                    drawBackground(background, context, sprites);
                });
            });
    });
