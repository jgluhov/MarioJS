import {COLOR_BLUE, COLOR_RED} from './constants.js';

export function createBackgroundLayer(level, sprites) {
    const buffer = document.createElement('canvas'),
        context = buffer.getContext('2d');

    buffer.width = 2048;
    buffer.height = 448;

    level.tiles.forEach((tile, x, y) => {
        sprites.drawTile(tile.name, context, x, y);
    });

    return function drawBackgroundLayer(context, camera) {
        context.drawImage(buffer, -camera.pos.x, -camera.pos.y);
    }
}

export function createSpriteLayer(entities, width = 64, height = 64) {
    const spriteBuffer = document.createElement('canvas'),
        spriteBufferContext = spriteBuffer.getContext('2d');

    spriteBuffer.width = width;
    spriteBuffer.height = height;

    return function drawSpriteLayer(context, camera) {
        entities.forEach(entity => {
            spriteBufferContext.clearRect(0, 0, width, height);

            entity.draw(spriteBufferContext);

            context.drawImage(spriteBuffer,
                entity.pos.x - camera.pos.x,
                entity.pos.y - camera.pos.y)
        });
    }
}

export function createCollisionLayer(level) {
    const resolvedTiles = [];
    const tileResolver = level.tileCollider.tiles;
    const tileSize = tileResolver.tileSize;

    const getByIndexOriginal = tileResolver.getByIndex.bind(tileResolver);

    tileResolver.getByIndex = function getByIndexFake(indexX, indexY) {
        resolvedTiles.push({indexX, indexY});
        return getByIndexOriginal(indexX, indexY);
    };

    return function drawCollision(context, camera) {
        context.strokeStyle = COLOR_BLUE;
        resolvedTiles.forEach(({indexX, indexY}) => {
            context.beginPath();
            context.rect(
                indexX * tileSize - camera.pos.x,
                indexY * tileSize - camera.pos.y,
                tileSize,
                tileSize
            );
            context.stroke();
        });

        context.strokeStyle = COLOR_RED;
        level.entities.forEach(entity => {
            context.beginPath();
            context.rect(
                entity.pos.x - camera.pos.x,
                entity.pos.y - camera.pos.y,
                entity.size.x,
                entity.size.y
            );
            context.stroke();
        });

        resolvedTiles.length = 0;
    }
}

export function createCameraLayer() {
    
}