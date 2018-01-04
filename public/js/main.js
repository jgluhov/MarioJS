import Compositor from './Compositor.js';
import {loadJSON} from './utils.js';
import {loadMarioSprite, loadBackgroundSprites} from './sprites.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    loadMarioSprite(),
    loadBackgroundSprites(),
    loadJSON('/levels/1-1.json')
]).then(([marioSprite, backgroundSprites, level]) => {
    const comp = new Compositor();

    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
    comp.add(backgroundLayer);

    const pos = {
        x: 0,
        y: 0,
    };

    const spriteLayer = createSpriteLayer(marioSprite, pos);
    comp.add(spriteLayer);

    const update = () => {
        comp.draw(context);

        pos.x += 5;
        pos.y += 5;
        requestAnimationFrame(update);
    };

    update();
});