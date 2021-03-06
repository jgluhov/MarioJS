import {COLOR_BLUE, COLOR_RED, COLOR_PURPLE} from './constants.js';
import TileResolver from "./TileResolver.js";

export function createBackgroundLayer(level, tiles, sprites) {
    const tileResolver = new TileResolver(tiles);

    const buffer = document.createElement('canvas'),
        bufferContext = buffer.getContext('2d');

    buffer.width = 1264 + 16;
    buffer.height = 480;

    function redraw(startIndex, endIndex) {
        bufferContext.clearRect(0, 0, buffer.width, buffer.height);

        for (let x = startIndex; x <= endIndex; x++) {
            const column = tiles.grid[x];

            if (column) {
                column.forEach((tile, y) => {
                    if (sprites.animations.has(tile.name)) {
                        sprites.drawAnimation(tile.name, bufferContext, x - startIndex, y, level.totalTime);
                    } else {
                        sprites.drawTile(tile.name, bufferContext, x - startIndex, y);
                    }
                });
            }
        }
    }

    return function drawBackgroundLayer(context, camera) {
        const drawWidth = tileResolver.toIndex(camera.size.x),
            drawFrom = tileResolver.toIndex(camera.pos.x),
            drawTo = drawFrom + drawWidth;

        redraw(drawFrom, drawTo);

        context.drawImage(buffer, -camera.pos.x % 16, -camera.pos.y);
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
        context.lineWidth = 1;
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
        context.lineWidth = 1;
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

export function createCameraLayer(cameraToDraw) {
    return function drawCameraRect(context, fromCamera) {
        context.strokeStyle = COLOR_PURPLE;

        context.beginPath();
        context.rect(
            cameraToDraw.pos.x - fromCamera.pos.x,
            cameraToDraw.pos.y - fromCamera.pos.y,
            cameraToDraw.size.x,
            cameraToDraw.size.y
        );
        context.stroke();
    }
}
