import Timer from './Timer.js';
import {createMarioEntity} from './entities.js';
import {loadLevel} from './utils.js';
import Keyboard from './Keyboard.js';
import {SPACE_KEY} from './constants.js'

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    createMarioEntity(),
    loadLevel('1-1')
]).then(([marioEntity, level]) => {
    level.entities.add(marioEntity);

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

    const timer = new Timer(1/60);

    timer.update = function updateTimer(deltaTime) {
        level.comp.draw(context);
        level.update(deltaTime);

        marioEntity.vel.y += gravity;
    };

    timer.start();
});