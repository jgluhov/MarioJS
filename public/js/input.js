import Keyboard from './Keyboard.js';

export function setupEntityKeyboard(marioEntity) {
    const input = new Keyboard();

    input.addMapping('Space', keyState => {
        if (keyState) {
            marioEntity.jump.start();
        } else {
            marioEntity.jump.cancel();
        }
    });

    input.addMapping('ShiftLeft', keyState => {
        marioEntity.turbo(keyState);
    });

    input.addMapping('ArrowRight', keyState => {
        marioEntity.run.direction += keyState ? 1 : -1;
    });

    input.addMapping('ArrowLeft', keyState => {
        marioEntity.run.direction += keyState ? -1 : 1;
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