import Keyboard from './Keyboard.js';

export function setupEntityKeyboard(entity) {
    const input = new Keyboard();

    input.addMapping('Space', keyState => {
        if (keyState) {
            entity.jump.start();
        } else {
            entity.jump.cancel();
        }
    });

    input.addMapping('ArrowRight', keyState => {
        entity.run.direction = keyState;
    });

    input.addMapping('ArrowLeft', keyState => {
        entity.run.direction = -keyState;
    });

    return input;
}

export function setupCameraKeyboard(camera) {
    const input = new Keyboard();

    input.addMapping('Period', keyState => {
        if (keyState) {
            camera.pos.x += 96;
        }
    });

    input.addMapping('Comma', keyState => {
        if (keyState) {
            camera.pos.x -= 96;
        }
    });

    return input;
}