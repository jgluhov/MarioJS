import Entity from './Entity.js';
import Run from './behaviours/Run.js'
import Velocity from './behaviours/Velocity.js';
import Jump from './behaviours/Jump.js';
import {loadMarioSprite} from './sprites.js'

export function createMarioEntity() {
    return loadMarioSprite()
        .then(sprite => {
            const mario = new Entity();
            mario.size.set(14, 16);

            mario.draw = function drawMario(context) {
                sprite.draw('idle', context, this.pos.x, this.pos.y);
            };

            mario.addBehaviours(new Run());
            mario.addBehaviours(new Jump());
            // mario.addBehaviours(new Velocity());

            return mario;
        });
}