import Entity from './Entity.js';
import Run from './behaviours/Run.js'
import Jump from './behaviours/Jump.js';
import {loadSpriteSheet} from './loaders.js';
import {createAnimation} from './animation.js';
import {SLOW_DRAG, FAST_DRAG} from "./constants.js";

export function createMarioEntity() {
    return loadSpriteSheet('mario-characters')
        .then(sprite => {
            const mario = new Entity();
            mario.size.set(50, 51);

            const runAnimation = createAnimation([
                'run-1', 'run-2', 'run-3', 'run-4',
                'run-5', 'run-6', 'run-7', 'run-8',
                'run-9', 'run-10', 'run-11'
            ], 7);

            function routeFrame(mario) {

                if (mario.jump.falling) {
                    return 'jump';
                }

                if (mario.run.distance > 0) {
                    if ((mario.vel.x > 0 && mario.run.direction < 0) ||
                        (mario.vel.x < 0 && mario.run.direction > 0)) {
                        return 'break'
                    }
                    return runAnimation(mario.run.distance);
                }

                return 'idle';
            }

            mario.draw = function drawMario(context) {
                sprite.draw(routeFrame(this), context, 0, 0, this.run.heading < 0);
            };

            mario.turbo = function setTurboState(turboOn) {
                this.run.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
            };

            mario.addBehaviours(new Run());
            mario.addBehaviours(new Jump());

            return mario;
        });
}