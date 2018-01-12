import Entity from './Entity.js';
import Run from './behaviours/Run.js'
import Jump from './behaviours/Jump.js';
import {loadSpriteSheet} from './loaders.js';
import {createAnimation} from './animation.js';

export function createMarioEntity() {
    return loadSpriteSheet('characters')
        .then(sprite => {
            const mario = new Entity();
            mario.size.set(20, 33);

            const runAnimation = createAnimation(['run-1', 'run-2', 'run-3'], 12);

            function routeFrame(mario) {
                if (mario.run.distance > 0) {
                    if ((mario.vel.x > 0 && mario.run.direction < 0) || (mario.vel.x < 0 && mario.run.direction > 0)) {
                        return 'break'
                    }
                    return runAnimation(mario.run.distance);
                }

                return 'idle';
            }

            mario.draw = function drawMario(context) {
                sprite.draw(routeFrame(this), context, 0, 0, this.run.heading < 0);
            };

            mario.addBehaviours(new Run());
            mario.addBehaviours(new Jump());

            return mario;
        });
}