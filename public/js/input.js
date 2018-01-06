import Keyboard from './Keyboard.js';

export function setupKeyboard(entity) {
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