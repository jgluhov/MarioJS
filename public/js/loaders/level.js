import {
    createBackgroundLayer,
    createCollisionLayer,
    createSpriteLayer
} from "../layers.js";
import {loadJSON} from "../utils.js";
import Level from "../Level.js";
import {loadSpriteSheet} from '../loaders.js';

export function loadLevel(name) {
    return loadJSON(`/levels/${name}.json`)
        .then(levelSpec => {
            return Promise.all([
                levelSpec,
                loadSpriteSheet(levelSpec.spriteSheet)
            ]);
        }).then(([levelSpec, tileSprites]) => {
            const level = new Level();
            createTiles(level, levelSpec.tiles, levelSpec.patterns);

            const tileLayer = createBackgroundLayer(level, tileSprites);
            level.comp.addLayer(tileLayer);

            const spriteLayer = createSpriteLayer(level.entities);
            level.comp.addLayer(spriteLayer);

            const collisionLayer = createCollisionLayer(level);
            level.comp.addLayer(collisionLayer);

            return level;
        });
}

function expandSpan(xStart, xLen, yStart, yLen) {
    const coords = [],
        xEnd = xStart + xLen,
        yEnd = yStart + yLen;

    for (let x = xStart; x < xEnd; x++) {
        for (let y = yStart; y < yEnd; y++) {
            coords.push({x, y});
        }
    }

    return coords;
}

function createTiles(level, tiles, patterns, offsetX = 0, offsetY = 0) {

    const applyRange = (tile, xStart, xLen, yStart, yLen) => {
        for(const {x, y} of expandSpan(xStart, xLen, yStart, yLen)) {
            const derivedX = x + offsetX,
                derivedY = y + offsetY;

            if (tile.pattern) {
                console.log('pattern detected', patterns[tile.pattern]);
                const tiles = patterns[tile.pattern].tiles;
                createTiles(level, tiles, patterns, derivedX, derivedY);
            } else {
                level.tiles.set(derivedX, derivedY, {
                    name: tile.name,
                    type: tile.type
                });
            }
        }
    };

    tiles.forEach(tile => {
        tile.ranges.forEach(range => {
            if (range.length === 4) {
                const [xStart, xLen, yStart, yLen] = range;
                applyRange(tile, xStart, xLen, yStart, yLen);
            } else if (range.length === 3) {
                const [xStart, xLen, yStart] = range;
                applyRange(tile, xStart, xLen, yStart, 1);
            } else if (range.length === 2) {
                const [xStart, yStart] = range;
                applyRange(tile, xStart, 1, yStart, 1);
            }
        });
    });
}