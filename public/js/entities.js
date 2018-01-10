import Entity from './Entity.js';
import Run from './behaviours/Run.js'
import Jump from './behaviours/Jump.js';
import {loadSpriteSheet} from './loaders.js';

export function createMarioEntity() {
    return loadSpriteSheet('mario')
        .then(sprite => {
            const mario = new Entity();
            mario.size.set(40, 56);

            const frames = [
                'run-1', 'run-2', 'run-3', 'run-4', 'run-5',
                'run-6', 'run-7', 'run-8', 'run-9', 'run-10'
            ];

            function routeFrame(mario) {
                if (mario.run.direction !== 0) {
                    const frameIndex = Math.floor(mario.run.distance / 5) % frames.length;
                    const frameName = frames[frameIndex];

                    return frameName;
                }
                return 'idle';
            }

            mario.draw = function drawMario(context) {
                sprite.draw(routeFrame(this), context, 0, 0);
            };

            mario.addBehaviours(new Run());
            mario.addBehaviours(new Jump());

            return mario;
        });
}