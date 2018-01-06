import Timer from './Timer.js';
import {createMarioEntity} from './entities.js';
import {loadLevel} from './utils.js';
import {setupKeyboard} from './input.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    createMarioEntity(),
    loadLevel('1-1')
]).then(([marioEntity, level]) => {
    level.entities.add(marioEntity);

    marioEntity.pos.set(300, 100);

    const input = setupKeyboard(marioEntity);
    input.listenTo(window);

    const timer = new Timer(1/60);

    timer.update = function updateTimer(deltaTime) {
        level.comp.draw(context);
        level.update(deltaTime);
    };

    timer.start();
});