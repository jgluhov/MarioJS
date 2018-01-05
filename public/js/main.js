import Compositor from './Compositor.js';
import Timer from './Timer.js';
import {createMarioEntity} from './entities.js';
import {loadJSON} from './utils.js';
import {loadBackgroundSprites} from './sprites.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';
import Keyboard from './Keyboard.js';
import {SPACE_KEY} from './constants.js'

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    createMarioEntity(),
    loadBackgroundSprites(),
    loadJSON('/levels/1-1.json')
]).then(([marioEntity, backgroundSprites, level]) => {
    const comp = new Compositor();

    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
    comp.addLayer(backgroundLayer);

    const gravity = 30;
    marioEntity.pos.set(300, 100);

    const input = new Keyboard();
    input.listenTo(window);
    input.addMapping(SPACE_KEY, keyState => {
        if (keyState) {
            marioEntity.jump.start();
        } else {
            marioEntity.jump.cancel();
        }
    });

    const spriteLayer = createSpriteLayer(marioEntity);
    comp.addLayer(spriteLayer);

    const timer = new Timer(1/60);

    timer.update = function updateTimer(deltaTime) {
        comp.draw(context);
        marioEntity.update(deltaTime);

        marioEntity.vel.y += gravity;
    };

    timer.start();
});