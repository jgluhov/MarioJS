function drawBackground(background, context, sprites) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; x++) {
            for (let y = y1; y < y2; y++) {
                sprites.drawTile(background.tile, context, x, y);
            }
        }
    })
}

export function createBackgroundLayer(backgrounds, sprites) {
    const buffer = document.createElement('canvas');
    buffer.width = 640;
    buffer.height = 448;

    backgrounds.forEach(background => {
        drawBackground(background, buffer.getContext('2d'), sprites);
    });

    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0, 0);
    }
}

export function createSpriteLayer(sprite, pos) {
    return function drawSpriteLayer(context) {
        for (let i = 0; i < 25; i++) {
            sprite.draw('idle', context, pos.x + i * 16, pos.y);
        }
    }
}