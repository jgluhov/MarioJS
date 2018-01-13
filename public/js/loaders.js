import Level from './Level.js';
import {
    createBackgroundLayer,
    createSpriteLayer,
    createCollisionLayer,
    createCameraLayer
} from './layers.js';
import {loadJSON, loadImage} from './utils.js'
import SpriteSheet from "./SpriteSheet.js";
import {createAnimation} from "./animation.js";

export function loadSpriteSheet(name) {
    return loadJSON(`/sprites/${name}.json`)
        .then(sheetSpec => {
            return Promise
                .all([
                    sheetSpec,
                    loadImage(sheetSpec.imageUrl)
                ])
                .then(([sheetSpec, image]) => {
                    const sprites = new SpriteSheet(
                        image,
                        sheetSpec.tileW,
                        sheetSpec.tileH
                    );

                    if (sheetSpec.tiles) {
                        sheetSpec.tiles.forEach(tileSpec => {
                            const [indexX, indexY] = tileSpec.index;
                            sprites.defineTile(tileSpec.name, indexX, indexY);
                        });
                    }

                    if (sheetSpec.frames) {
                        sheetSpec.frames.forEach(frameSpec => {
                            const [x, y, width, height] = frameSpec.rect;
                            sprites.define(frameSpec.name, x, y, width, height);
                        });
                    }

                    if (sheetSpec.animations) {
                        sheetSpec.animations.forEach(animationSpec => {
                            const animation = createAnimation(animationSpec.frames, animationSpec.frameLen);
                            sprites.defineAnimation(animationSpec.name, animation);
                        });
                    }

                    return sprites;
                });
        })
}

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

function createTiles(level, tiles, patterns, offsetX = 0, offsetY = 0) {

    const applyRange = (tile, xStart, xLen, yStart, yLen) => {
        const xEnd = xStart + xLen;
        const yEnd = yStart + yLen;

        for (let x = xStart; x < xEnd; x++) {
            for (let y = yStart; y < yEnd; y++) {
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