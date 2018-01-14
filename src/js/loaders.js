import {loadJSON, loadImage} from './utils.js'
import SpriteSheet from "./SpriteSheet.js";
import {createAnimation} from "./animation.js";

export function loadSpriteSheet(name) {
    return loadJSON(`sprites/${name}.json`)
        .then(sheetSpec => {
            return Promise
                .all([
                    sheetSpec,
                    loadImage(sheetSpec.imageUrl)
                ])
                .then(([sheetSpec, image]) => {
                    const sprites = new SpriteSheet(
                        image,
                        sheetSpec.tileW,
                        sheetSpec.tileH
                    );

                    if (sheetSpec.tiles) {
                        sheetSpec.tiles.forEach(tileSpec => {
                            const [indexX, indexY] = tileSpec.index;
                            sprites.defineTile(tileSpec.name, indexX, indexY);
                        });
                    }

                    if (sheetSpec.frames) {
                        sheetSpec.frames.forEach(frameSpec => {
                            const [x, y, width, height] = frameSpec.rect;
                            sprites.define(frameSpec.name, x, y, width, height);
                        });
                    }

                    if (sheetSpec.animations) {
                        sheetSpec.animations.forEach(animationSpec => {
                            const animation = createAnimation(animationSpec.frames, animationSpec.frameLen);
                            sprites.defineAnimation(animationSpec.name, animation);
                        });
                    }

                    return sprites;
                });
        })
}
