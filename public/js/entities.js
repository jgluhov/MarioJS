import Entity from './Entity.js';
import Run from './behaviours/Run.js'
import Jump from './behaviours/Jump.js';
import {loadSpriteSheet} from './loaders.js';
import {createAnimation} from './animation.js';

export function createMarioEntity() {
    return loadSpriteSheet('mario')
        .then(sprite => {
            const mario = new Entity();
            mario.size.set(65, 66);

            const runAnimation = createAnimation([
                'run-1', 'run-2', 'run-3', 'run-4', 'run-5',
                'run-6', 'run-7', 'run-8', 'run-9', 'run-10'
            ], 20);

            function routeFrame(mario) {
                if (mario.run.direction !== 0) {
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