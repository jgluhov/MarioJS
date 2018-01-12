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
        entity.run.direction += keyState ? 1 : -1;
    });

    input.addMapping('ArrowLeft', keyState => {
        entity.run.direction += keyState ? -1 : 1;
    });

    return input;
}

export function setupCameraKeyboard(camera) {
    const input = new Keyboard();

    input.addMapping('Period', keyState => {
        if (keyState) {
            camera.pos.x += 48;
        }
    });

    input.addMapping('Comma', keyState => {
        if (keyState) {
            camera.pos.x -= 48;
        }
    });

    return input;
}