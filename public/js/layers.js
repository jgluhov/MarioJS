import {COLOR_BLUE, COLOR_RED} from './constants.js';

export function createBackgroundLayer(level, sprites) {
    const buffer = document.createElement('canvas'),
        context = buffer.getContext('2d');

    buffer.width = 640;
    buffer.height = 448;

    level.tiles.forEach((tile, x, y) => {
        sprites.drawTile(tile.name, context, x, y);
    });

    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0, 0);
    }
}

export function createSpriteLayer(entities) {
    return function drawSpriteLayer(context) {
        entities.forEach(entity => {
            entity.draw(context);
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

    return function drawCollision(context) {
        context.strokeStyle = COLOR_BLUE;
        resolvedTiles.forEach(({indexX, indexY}) => {
            context.beginPath();
            context.rect(
                indexX * tileSize,
                indexY * tileSize,
                tileSize,
                tileSize
            );
            context.stroke();
        });

        context.strokeStyle = COLOR_RED;
        level.entities.forEach(entity => {
            context.beginPath();
            context.rect(
                entity.pos.x,
                entity.pos.y,
                entity.size.x,
                entity.size.y
            );
            context.stroke();
        });

        resolvedTiles.length = 0;
    }
}