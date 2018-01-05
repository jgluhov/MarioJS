import Level from './Level.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';
import {loadBackgroundSprites} from './sprites.js';

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

export function loadLevel(name) {
    return Promise.all([
        loadJSON(`/levels/${name}.json`),
        loadBackgroundSprites()
    ]).then(([levelSpec, backgroundSprites]) => {
            const level = new Level();

            const backgroundLayer = createBackgroundLayer(levelSpec.backgrounds, backgroundSprites);
            level.comp.addLayer(backgroundLayer);

            const spriteLayer = createSpriteLayer(level.entities);
            level.comp.addLayer(spriteLayer);

            return level;
        });
}