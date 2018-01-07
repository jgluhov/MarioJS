import Level from './Level.js';
import {
    createBackgroundLayer,
    createSpriteLayer,
    createCollisionLayer
} from './layers.js';
import {loadBackgroundSprites} from './sprites.js';
import {loadJSON} from './utils.js'

function createTiles(level, backgrounds) {

    const applyRange = (background, xStart, xLen, yStart, yLen) => {
        const xEnd = xStart + xLen;
        const yEnd = yStart + yLen;
        for (let x = xStart; x < xEnd; x++) {
            for (let y = yStart; y < yEnd; y++) {
                level.tiles.set(x, y, {
                    name: background.tile
                });
            }
        }
    };
    
    backgrounds.forEach(background => {
        background.ranges.forEach(range => {
            if (range.length === 4) {
                const [xStart, xLen, yStart, yLen] = range;
                applyRange(background, xStart, xLen, yStart, yLen);
            } else if (range.length === 3) {
                const [xStart, xLen, yStart] = range;
                applyRange(background, xStart, xLen, yStart, 1);
            } else if (range.length === 2) {
                const [xStart, yStart] = range;
                applyRange(background, xStart, 1, yStart, 1);
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