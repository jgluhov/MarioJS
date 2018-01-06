import Level from './Level.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';
import {loadBackgroundSprites} from './sprites.js';
import {createCollisionLayer} from './layers.js';

export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}

export function loadJSON(url) {
    return fetch(url)
        .then(res => res.json());
}
function createTiles(level, backgrounds) {
    backgrounds.forEach(background => {
        background.ranges.forEach(([x1, x2, y1, y2]) => {
            for (let x = x1; x < x2; x++) {
                for (let y = y1; y < y2; y++) {
                    level.tiles.set(x, y, {
                        name: background.tile
                    });
                }
            }
        });
    });
}

export function loadLevel(name) {
    return Promise.all([
        loadJSON(`/levels/${name}.json`),
        loadBackgroundSprites()
    ]).then(([levelSpec, backgroundSprites]) => {
            const level = new Level();
            createTiles(level, levelSpec.backgrounds);

            const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
            level.comp.addLayer(backgroundLayer);

            const spriteLayer = createSpriteLayer(level.entities);
            level.comp.addLayer(spriteLayer);

            const collisionLayer = createCollisionLayer(level);
            level.comp.addLayer(collisionLayer);

            return level;
        });
}