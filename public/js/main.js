import Compositor from './Compositor.js';
import Timer from './Timer.js';
import {createMarioEntity} from './entities.js';
import {loadJSON} from './utils.js';
import {loadBackgroundSprites} from './sprites.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    createMarioEntity(),
    loadBackgroundSprites(),
    loadJSON('/levels/1-1.json')
]).then(([marioEntity, backgroundSprites, level]) => {
    const comp = new Compositor();

    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
    comp.add(backgroundLayer);

    const gravity = 30;
    marioEntity.pos.set(0, 400);
    marioEntity.vel.set(400, -600);

    const spriteLayer = createSpriteLayer(marioEntity);
    comp.add(spriteLayer);

    const timer = new Timer(1/60);

    timer.update = function updateTimer(deltaTime) {
        comp.draw(context);
        marioEntity.update(deltaTime);

        marioEntity.vel.y += gravity;
    };

    timer.start();
});