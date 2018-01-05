import Entity from './Entity.js';
import Velocity from './behaviours/Velocity.js';
import Jump from './behaviours/Jump.js';
import {loadMarioSprite} from './sprites.js'

export function createMarioEntity() {
    return loadMarioSprite()
        .then(sprite => {
            const mario = new Entity();

            mario.draw = function drawMario(context) {
                sprite.draw('idle', context, this.pos.x, this.pos.y);
            };

            mario.addBehaviours(new Velocity());
            mario.addBehaviours(new Jump());

            return mario;
        });
}