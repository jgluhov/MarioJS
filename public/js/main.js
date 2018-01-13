import Timer from './Timer.js';
import Camera from './Camera.js'
import {createMarioEntity} from './entities.js';
import {loadLevel} from './loaders/level.js';
import {setupEntityKeyboard, setupCameraKeyboard} from './input.js';
import {createCameraLayer} from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    createMarioEntity(),
    loadLevel('1-1')
]).then(([marioEntity, level]) => {
    const camera = new Camera();

    level.entities.add(marioEntity);

    // const cameraLayer = createCameraLayer(camera);
    // level.comp.addLayer(cameraLayer);

    marioEntity.pos.set(50, 100);

    const entityInput = setupEntityKeyboard(marioEntity);
    entityInput.listenTo(window);

    const cameraInput = setupCameraKeyboard(camera);
    cameraInput.listenTo(window);

    const timer = new Timer(1/60);

    timer.update = function updateTimer(deltaTime) {
        level.update(deltaTime);

        if (marioEntity.pos.x > 100) {
            camera.pos.x = marioEntity.pos.x - 100;
        }

        level.comp.draw(context, camera);
    };

    timer.start();
});