export default class SpriteSheet {
    constructor(image, width, height) {
        this.image = image;
        this.width = width;
        this.height = height;

        this.animations = new Map();
        this.tiles = new Map();
    }

    defineAnimation(name, animation) {
        this.animations.set(name, animation);
    }

    define(name, x, y, width, height) {
        const buffers = [false, true].map(flip => {
            const buffer = document.createElement('canvas'),
                bufferContext = buffer.getContext('2d');

            buffer.width = width;
            buffer.height = height;

            if (flip) {
                bufferContext.scale(-1, 1);
                bufferContext.translate(-width, 0);
            }

            bufferContext
                .drawImage(
                    this.image,
                    x,
                    y,
                    width,
                    height,
                    0,
                    0,
                    width,
                    height
                );

            return buffer;
        });

        this.tiles.set(name, buffers);
    }

    defineTile(name, x, y) {
        return this.define(name, x * this.width, y * this.height, this.width, this.height);
    }

    draw(name, context, x, y, flip = false) {
        const buffer = this.tiles.get(name)[+flip];
        context.drawImage(buffer, x, y);
    }

    drawAnimation(name, context, x, y, distance) {
        const animation = this.animations.get(name);
        this.drawTile(animation(distance), context, x, y);
    }

    drawTile(name, context, x, y) {
        this.draw(name, context, x * this.width, y * this.height);
    }
}
