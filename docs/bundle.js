/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const KEY_PRESSED = 1;
/* harmony export (immutable) */ __webpack_exports__["e"] = KEY_PRESSED;

const KEY_RELEASED = 0;
/* harmony export (immutable) */ __webpack_exports__["f"] = KEY_RELEASED;


const COLOR_RED = 'red';
/* harmony export (immutable) */ __webpack_exports__["c"] = COLOR_RED;

const COLOR_BLUE = 'blue';
/* harmony export (immutable) */ __webpack_exports__["a"] = COLOR_BLUE;

const COLOR_PURPLE = 'purple';
/* harmony export (immutable) */ __webpack_exports__["b"] = COLOR_PURPLE;


const SLOW_DRAG = 1 / 2000;
/* harmony export (immutable) */ __webpack_exports__["g"] = SLOW_DRAG;

const FAST_DRAG = 1 / 10000;
/* harmony export (immutable) */ __webpack_exports__["d"] = FAST_DRAG;


const Sides = {
    TOP: Symbol('top'),
    BOTTOM: Symbol('bottom')
};
/* harmony export (immutable) */ __webpack_exports__["h"] = Sides;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Matrix {
    constructor() {
        this.grid = [];
    }

    get(x, y) {
        const col = this.grid[x];

        if (col) {
            return col[y];
        }
    }

    set(x, y, value) {
        if (!this.grid[x]) {
            this.grid[x] = [];
        }

        this.grid[x][y] = value;
    }

    forEach(callback) {
        this.grid.forEach((column, x) => {
            column.forEach((value, y) => {
                callback(value, x, y);
            });
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Matrix;


class Vector2D {
    constructor(x, y) {
        this.set(x, y);
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = Vector2D;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Behaviour {
    constructor(name) {
        this.name = name;
    }

    obstruct() {}

    update() {
        console.warn('Unhandled update call in Behaviour');
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Behaviour;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = loadSpriteSheet;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SpriteSheet_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__animation_js__ = __webpack_require__(5);




function loadSpriteSheet(name) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["b" /* loadJSON */])(`sprites/${name}.json`).then(sheetSpec => {
        return Promise.all([sheetSpec, Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["a" /* loadImage */])(sheetSpec.imageUrl)]).then(([sheetSpec, image]) => {
            const sprites = new __WEBPACK_IMPORTED_MODULE_1__SpriteSheet_js__["a" /* default */](image, sheetSpec.tileW, sheetSpec.tileH);

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
                    const animation = Object(__WEBPACK_IMPORTED_MODULE_2__animation_js__["a" /* createAnimation */])(animationSpec.frames, animationSpec.frameLen);
                    sprites.defineAnimation(animationSpec.name, animation);
                });
            }

            return sprites;
        });
    });
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = loadImage;
/* harmony export (immutable) */ __webpack_exports__["b"] = loadJSON;
function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}

function loadJSON(url) {
    const options = {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    };

    return fetch(url, options).then(res => res.json());
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createAnimation;
function createAnimation(frames, frameLen) {
    return function resolveFrame(distance) {
        const frameIndex = Math.floor(distance / frameLen) % frames.length;

        return frames[frameIndex];
    };
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createBackgroundLayer;
/* harmony export (immutable) */ __webpack_exports__["b"] = createSpriteLayer;
/* unused harmony export createCollisionLayer */
/* unused harmony export createCameraLayer */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TileResolver_js__ = __webpack_require__(7);



function createBackgroundLayer(level, tiles, sprites) {
    const tileResolver = new __WEBPACK_IMPORTED_MODULE_1__TileResolver_js__["a" /* default */](tiles);

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
    };
}

function createSpriteLayer(entities, width = 64, height = 64) {
    const spriteBuffer = document.createElement('canvas'),
          spriteBufferContext = spriteBuffer.getContext('2d');

    spriteBuffer.width = width;
    spriteBuffer.height = height;

    return function drawSpriteLayer(context, camera) {
        entities.forEach(entity => {
            spriteBufferContext.clearRect(0, 0, width, height);

            entity.draw(spriteBufferContext);

            context.drawImage(spriteBuffer, entity.pos.x - camera.pos.x, entity.pos.y - camera.pos.y);
        });
    };
}

function createCollisionLayer(level) {
    const resolvedTiles = [];
    const tileResolver = level.tileCollider.tiles;
    const tileSize = tileResolver.tileSize;

    const getByIndexOriginal = tileResolver.getByIndex.bind(tileResolver);

    tileResolver.getByIndex = function getByIndexFake(indexX, indexY) {
        resolvedTiles.push({ indexX, indexY });
        return getByIndexOriginal(indexX, indexY);
    };

    return function drawCollision(context, camera) {
        context.strokeStyle = __WEBPACK_IMPORTED_MODULE_0__constants_js__["a" /* COLOR_BLUE */];
        context.lineWidth = 1;
        resolvedTiles.forEach(({ indexX, indexY }) => {
            context.beginPath();
            context.rect(indexX * tileSize - camera.pos.x, indexY * tileSize - camera.pos.y, tileSize, tileSize);
            context.stroke();
        });

        context.strokeStyle = __WEBPACK_IMPORTED_MODULE_0__constants_js__["c" /* COLOR_RED */];
        context.lineWidth = 1;
        level.entities.forEach(entity => {
            context.beginPath();
            context.rect(entity.pos.x - camera.pos.x, entity.pos.y - camera.pos.y, entity.size.x, entity.size.y);
            context.stroke();
        });

        resolvedTiles.length = 0;
    };
}

function createCameraLayer(cameraToDraw) {
    return function drawCameraRect(context, fromCamera) {
        context.strokeStyle = __WEBPACK_IMPORTED_MODULE_0__constants_js__["b" /* COLOR_PURPLE */];

        context.beginPath();
        context.rect(cameraToDraw.pos.x - fromCamera.pos.x, cameraToDraw.pos.y - fromCamera.pos.y, cameraToDraw.size.x, cameraToDraw.size.y);
        context.stroke();
    };
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class TileResolver {
    constructor(matrix, tileSize = 16) {
        this.matrix = matrix;
        this.tileSize = tileSize;
    }

    toIndex(pos) {
        return Math.floor(pos / this.tileSize);
    }

    toIndexRange(pos1, pos2) {
        const pMax = Math.ceil(pos2 / this.tileSize) * this.tileSize;
        const range = [];
        let pos = pos1;
        do {
            range.push(this.toIndex(pos));
            pos += this.tileSize;
        } while (pos < pMax);

        return range;
    }

    getByIndex(indexX, indexY) {
        const tile = this.matrix.get(indexX, indexY);

        if (tile) {
            const x1 = indexX * this.tileSize;
            const x2 = x1 + this.tileSize;
            const y1 = indexY * this.tileSize;
            const y2 = y1 + this.tileSize;
            return {
                tile,
                x1,
                x2,
                y1,
                y2
            };
        }
    }

    searchByPosition(posX, posY) {
        return this.getByIndex(this.toIndex(posX), this.toIndex(posY));
    }

    searchByRange(x1, x2, y1, y2) {
        const matches = [];
        this.toIndexRange(x1, x2).forEach(indexX => {
            this.toIndexRange(y1, y2).forEach(indexY => {
                const match = this.getByIndex(indexX, indexY);
                if (match) {
                    matches.push(match);
                }
            });
        });

        return matches;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TileResolver;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Timer_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Camera_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__entities_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__loaders_level_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__input_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__layers_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__css_styles_css__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__css_styles_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__css_styles_css__);








const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([Object(__WEBPACK_IMPORTED_MODULE_2__entities_js__["a" /* createMarioEntity */])(), Object(__WEBPACK_IMPORTED_MODULE_3__loaders_level_js__["a" /* loadLevel */])('1-1')]).then(([marioEntity, level]) => {
    const camera = new __WEBPACK_IMPORTED_MODULE_1__Camera_js__["a" /* default */]();

    level.entities.add(marioEntity);

    // const cameraLayer = createCameraLayer(camera);
    // level.comp.addLayer(cameraLayer);

    marioEntity.pos.set(50, 100);

    const entityInput = Object(__WEBPACK_IMPORTED_MODULE_4__input_js__["b" /* setupEntityKeyboard */])(marioEntity);
    entityInput.listenTo(window);

    const cameraInput = Object(__WEBPACK_IMPORTED_MODULE_4__input_js__["a" /* setupCameraKeyboard */])(camera);
    cameraInput.listenTo(window);

    const timer = new __WEBPACK_IMPORTED_MODULE_0__Timer_js__["a" /* default */](1 / 60);

    timer.update = function updateTimer(deltaTime) {
        level.update(deltaTime);

        if (marioEntity.pos.x > 100) {
            camera.pos.x = marioEntity.pos.x - 100;
        }

        level.comp.draw(context, camera);
    };

    timer.start();
});

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Timer {
    constructor(deltaTime = 1 / 60) {
        let accumulatedTime = 0;
        let lastTime = 0;

        this.updateProxy = time => {
            accumulatedTime += (time - lastTime) / 1000;

            if (accumulatedTime > 1) {
                accumulatedTime = 1;
            }

            while (accumulatedTime > deltaTime) {
                this.update(deltaTime);

                accumulatedTime -= deltaTime;
            }

            lastTime = time;

            this.enqueue();
        };
    }

    enqueue() {
        requestAnimationFrame(this.updateProxy);
    }

    start() {
        this.enqueue();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Timer;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math_js__ = __webpack_require__(1);


class Camera {
    constructor() {
        this.pos = new __WEBPACK_IMPORTED_MODULE_0__math_js__["b" /* Vector2D */](0, 0);
        this.size = new __WEBPACK_IMPORTED_MODULE_0__math_js__["b" /* Vector2D */](1264, 480);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Camera;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createMarioEntity;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__behaviours_Run_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__behaviours_Jump_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__loaders_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__animation_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants_js__ = __webpack_require__(0);







function createMarioEntity() {
    return Object(__WEBPACK_IMPORTED_MODULE_3__loaders_js__["a" /* loadSpriteSheet */])('mario-characters').then(sprite => {
        const mario = new __WEBPACK_IMPORTED_MODULE_0__Entity_js__["a" /* default */]();
        mario.size.set(50, 51);

        const runAnimation = Object(__WEBPACK_IMPORTED_MODULE_4__animation_js__["a" /* createAnimation */])(['run-1', 'run-2', 'run-3', 'run-4', 'run-5', 'run-6', 'run-7', 'run-8', 'run-9', 'run-10', 'run-11'], 7);

        function routeFrame(mario) {
            if (mario.jump.falling) {
                return 'jump';
            }

            if (mario.run.distance > 0) {
                if (mario.vel.x > 0 && mario.run.direction < 0 || mario.vel.x < 0 && mario.run.direction > 0) {
                    return 'break';
                }
                return runAnimation(mario.run.distance);
            }

            return 'idle';
        }

        mario.draw = function drawMario(context) {
            sprite.draw(routeFrame(this), context, 0, 0, this.run.heading < 0);
        };

        mario.turbo = function setTurboState(turboOn) {
            this.run.dragFactor = turboOn ? __WEBPACK_IMPORTED_MODULE_5__constants_js__["d" /* FAST_DRAG */] : __WEBPACK_IMPORTED_MODULE_5__constants_js__["g" /* SLOW_DRAG */];
        };

        mario.addBehaviours(new __WEBPACK_IMPORTED_MODULE_1__behaviours_Run_js__["a" /* default */]());
        mario.addBehaviours(new __WEBPACK_IMPORTED_MODULE_2__behaviours_Jump_js__["a" /* default */]());

        return mario;
    });
}

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math_js__ = __webpack_require__(1);


class Entity {
    constructor() {
        this.pos = new __WEBPACK_IMPORTED_MODULE_0__math_js__["b" /* Vector2D */](0, 0);
        this.vel = new __WEBPACK_IMPORTED_MODULE_0__math_js__["b" /* Vector2D */](0, 0);
        this.size = new __WEBPACK_IMPORTED_MODULE_0__math_js__["b" /* Vector2D */](0, 0);

        this.behaviours = [];
    }

    addBehaviours(behaviour) {
        this.behaviours.push(behaviour);
        this[behaviour.name] = behaviour;
    }

    obstruct(side) {
        this.behaviours.forEach(behaviour => {
            behaviour.obstruct(this, side);
        });
    }

    update(deltaTime) {
        this.behaviours.forEach(behaviour => {
            behaviour.update(this, deltaTime);
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Entity;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__behaviour_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_js__ = __webpack_require__(0);



class Run extends __WEBPACK_IMPORTED_MODULE_0__behaviour_js__["a" /* Behaviour */] {
    constructor() {
        super('run');

        this.direction = 0;
        this.acceleration = 1000;
        this.deceleration = 300;
        this.dragFactor = __WEBPACK_IMPORTED_MODULE_1__constants_js__["g" /* SLOW_DRAG */];

        this.distance = 0;
        this.heading = 1;
    }

    handleHeading(entity) {
        if (entity.jump) {
            if (!entity.jump.falling) {
                this.heading = this.direction;
            }
        } else {
            this.heading = this.direction;
        }
    }

    update(entity, deltaTime) {
        const absX = Math.abs(entity.vel.x);
        if (this.direction !== 0) {

            entity.vel.x += this.acceleration * deltaTime * this.direction;
            this.handleHeading(entity);
        } else if (entity.vel.x !== 0) {
            const decel = Math.min(absX, this.deceleration * deltaTime);
            entity.vel.x += entity.vel.x > 0 ? -decel : decel;
        } else {
            this.distance = 0;
        }

        entity.vel.x -= this.dragFactor * entity.vel.x * absX;
        this.distance += absX * deltaTime;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Run;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__behaviour_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_js__ = __webpack_require__(0);



class Jump extends __WEBPACK_IMPORTED_MODULE_0__behaviour_js__["a" /* Behaviour */] {
    constructor() {
        super('jump');

        this.ready = 0;
        this.duration = 0.3;
        this.engageTime = 0;
        this.requestTime = 0;
        this.gracePeriod = 0.1;
        this.speedBoost = 0.3;

        this.velocity = 200;
    }

    get falling() {
        return this.ready < 0;
    }

    start() {
        this.requestTime = this.gracePeriod;
    }

    cancel() {
        this.engageTime = 0;
        this.requestTime = 0;
    }

    obstruct(entity, side) {
        if (side === __WEBPACK_IMPORTED_MODULE_1__constants_js__["h" /* Sides */].BOTTOM) {
            this.ready = 1;
        } else if (side === __WEBPACK_IMPORTED_MODULE_1__constants_js__["h" /* Sides */].TOP) {
            this.cancel();
        }
    }

    update(entity, deltaTime) {
        if (this.requestTime > 0) {
            if (this.ready > 0) {
                this.engageTime = this.duration;
                this.requestTime = 0;
            }

            this.requestTime -= deltaTime;
        }

        if (this.engageTime > 0) {
            entity.vel.y = -(this.velocity + Math.abs(entity.vel.x) * this.speedBoost);
            this.engageTime -= deltaTime;
        }

        this.ready--;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Jump;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SpriteSheet {
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

            bufferContext.drawImage(this.image, x, y, width, height, 0, 0, width, height);

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
/* harmony export (immutable) */ __webpack_exports__["a"] = SpriteSheet;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = loadLevel;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layers_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Level_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__loaders_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__math_js__ = __webpack_require__(1);






function loadLevel(name) {
    return Object(__WEBPACK_IMPORTED_MODULE_1__utils_js__["b" /* loadJSON */])(`levels/${name}.json`).then(levelSpec => {
        return Promise.all([levelSpec, Object(__WEBPACK_IMPORTED_MODULE_3__loaders_js__["a" /* loadSpriteSheet */])(levelSpec.spriteSheet)]);
    }).then(([levelSpec, backgroundSprites]) => {
        const level = new __WEBPACK_IMPORTED_MODULE_2__Level_js__["a" /* default */]();

        const mergedTiles = levelSpec.layers.reduce((mergedTiles, layerSpec) => {
            return mergedTiles.concat(layerSpec.tiles);
        }, []);

        const collisionGrid = createCollisionGrid(mergedTiles, levelSpec.patterns);

        level.setCollisionGrid(collisionGrid);

        levelSpec.layers.forEach(layer => {
            const backgroundGrid = createBackgroundGrid(layer.tiles, levelSpec.patterns);
            const backgroundLayer = Object(__WEBPACK_IMPORTED_MODULE_0__layers_js__["a" /* createBackgroundLayer */])(level, backgroundGrid, backgroundSprites);
            level.comp.addLayer(backgroundLayer);
        });

        const spriteLayer = Object(__WEBPACK_IMPORTED_MODULE_0__layers_js__["b" /* createSpriteLayer */])(level.entities);
        level.comp.addLayer(spriteLayer);

        // const collisionLayer = createCollisionLayer(level);
        // level.comp.addLayer(collisionLayer);

        return level;
    });
}

function createCollisionGrid(tiles, patterns) {
    const grid = new __WEBPACK_IMPORTED_MODULE_4__math_js__["a" /* Matrix */]();

    for (const { tile, x, y } of expandTiles(tiles, patterns)) {
        grid.set(x, y, { type: tile.type });
    }

    return grid;
}

function createBackgroundGrid(tiles, patterns) {
    const grid = new __WEBPACK_IMPORTED_MODULE_4__math_js__["a" /* Matrix */]();

    for (const { tile, x, y } of expandTiles(tiles, patterns)) {
        grid.set(x, y, { name: tile.name });
    }

    return grid;
}

function* expandSpan(xStart, xLen, yStart, yLen) {
    const xEnd = xStart + xLen,
          yEnd = yStart + yLen;

    for (let x = xStart; x < xEnd; x++) {
        for (let y = yStart; y < yEnd; y++) {
            yield { x, y };
        }
    }
}

function expandRange(range) {
    if (range.length === 4) {
        const [xStart, xLen, yStart, yLen] = range;
        return expandSpan(xStart, xLen, yStart, yLen);
    } else if (range.length === 3) {
        const [xStart, xLen, yStart] = range;
        return expandSpan(xStart, xLen, yStart, 1);
    } else if (range.length === 2) {
        const [xStart, yStart] = range;
        return expandSpan(xStart, 1, yStart, 1);
    }
}

function* expandRanges(ranges) {
    for (const range of ranges) {
        for (const item of expandRange(range)) {
            yield item;
        }
    }
}

function expandTiles(tiles, patterns) {
    const expandedTiles = [];

    function walkTiles(tiles, offsetX, offsetY) {
        for (const tile of tiles) {
            for (const { x, y } of expandRanges(tile.ranges)) {
                const derivedX = x + offsetX,
                      derivedY = y + offsetY;

                if (tile.pattern) {
                    const tiles = patterns[tile.pattern].tiles;
                    walkTiles(tiles, derivedX, derivedY);
                } else {
                    expandedTiles.push({
                        tile,
                        x: derivedX,
                        y: derivedY
                    });
                }
            }
        }
    }

    walkTiles(tiles, 0, 0);
    return expandedTiles;
}

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Compositor_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TileCollider_js__ = __webpack_require__(19);



class Level {
    constructor() {
        this.gravity = 2000;
        this.totalTime = 0;

        this.comp = new __WEBPACK_IMPORTED_MODULE_0__Compositor_js__["a" /* default */]();
        this.entities = new Set();

        this.tileCollider = null;
    }

    setCollisionGrid(matrix) {
        this.tileCollider = new __WEBPACK_IMPORTED_MODULE_1__TileCollider_js__["a" /* default */](matrix);
    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime);

            entity.pos.x += entity.vel.x * deltaTime;
            this.tileCollider.checkX(entity);

            entity.pos.y += entity.vel.y * deltaTime;
            this.tileCollider.checkY(entity);

            entity.vel.y += this.gravity * deltaTime;
        });

        this.totalTime += deltaTime;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Level;


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Compositor {
    constructor() {
        this.layers = [];
    }

    addLayer(layer) {
        this.layers.push(layer);
    }

    draw(context, camera) {
        this.layers.forEach(layer => {
            layer(context, camera);
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Compositor;


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TileResolver_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_js__ = __webpack_require__(0);



class TileCollider {
    constructor(tileMatrix) {
        this.tiles = new __WEBPACK_IMPORTED_MODULE_0__TileResolver_js__["a" /* default */](tileMatrix);
    }

    checkX(entity) {
        let x;
        if (entity.vel.x > 0) {
            x = entity.pos.x + entity.size.x;
        } else if (entity.vel.x < 0) {
            x = entity.pos.x;
        } else {
            return;
        }

        const matches = this.tiles.searchByRange(x, x, entity.pos.y, entity.pos.y + entity.size.y);

        matches.forEach(match => {
            if (match.tile.type !== 'ground') {
                return;
            }

            if (entity.vel.x > 0) {
                if (entity.pos.x + entity.size.x > match.y1) {
                    entity.pos.x = match.x1 - entity.size.x;
                    entity.vel.x = 0;
                }
            } else if (entity.vel.x < 0) {
                if (entity.pos.x < match.x2) {
                    entity.pos.x = match.x2;
                    entity.vel.x = 0;
                }
            }
        });
    }

    checkY(entity) {
        let y;
        if (entity.vel.y > 0) {
            y = entity.pos.y + entity.size.y;
        } else if (entity.vel.y < 0) {
            y = entity.pos.y;
        } else {
            return;
        }

        const matches = this.tiles.searchByRange(entity.pos.x, entity.pos.x + entity.size.x, y, y);

        matches.forEach(match => {
            if (match.tile.type !== 'ground') {
                return;
            }

            if (entity.vel.y > 0) {
                if (entity.pos.y + entity.size.y > match.y1) {
                    entity.pos.y = match.y1 - entity.size.y;

                    entity.vel.y = 0;

                    entity.obstruct(__WEBPACK_IMPORTED_MODULE_1__constants_js__["h" /* Sides */].BOTTOM);
                }
            } else if (entity.vel.y < 0) {
                if (entity.pos.y < match.y2) {
                    entity.pos.y = match.y2;
                    entity.vel.y = 0;

                    entity.obstruct(__WEBPACK_IMPORTED_MODULE_1__constants_js__["h" /* Sides */].TOP);
                }
            }
        });
    }

    test(entity) {
        this.checkY(entity);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TileCollider;


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = setupEntityKeyboard;
/* harmony export (immutable) */ __webpack_exports__["a"] = setupCameraKeyboard;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Keyboard_js__ = __webpack_require__(21);


function setupEntityKeyboard(marioEntity) {
    const input = new __WEBPACK_IMPORTED_MODULE_0__Keyboard_js__["a" /* default */]();

    input.addMapping('Space', keyState => {
        if (keyState) {
            marioEntity.jump.start();
        } else {
            marioEntity.jump.cancel();
        }
    });

    input.addMapping('ShiftLeft', keyState => {
        marioEntity.turbo(keyState);
    });

    input.addMapping('ArrowRight', keyState => {
        marioEntity.run.direction += keyState ? 1 : -1;
    });

    input.addMapping('ArrowLeft', keyState => {
        marioEntity.run.direction += keyState ? -1 : 1;
    });

    return input;
}

function setupCameraKeyboard(camera) {
    const input = new __WEBPACK_IMPORTED_MODULE_0__Keyboard_js__["a" /* default */]();

    input.addMapping('Period', keyState => {
        if (keyState) {
            camera.pos.x += 48;
        }
    });

    input.addMapping('Comma', keyState => {
        if (keyState) {
            camera.pos.x -= 48;
        }
    });

    return input;
}

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_js__ = __webpack_require__(0);


class Keyboard {
    constructor() {
        // Holds the current state of a given key
        this.keyStates = new Map();

        // Holds the callback functions for key code
        this.keyMap = new Map();
    }

    addMapping(code, callback) {
        this.keyMap.set(code, callback);
    }

    handleEvent(event) {
        const { code } = event;

        if (!this.keyMap.has(code)) {
            // Did not have key mapped;
            return false;
        }

        event.preventDefault();

        const keyState = event.type === 'keydown' ? __WEBPACK_IMPORTED_MODULE_0__constants_js__["e" /* KEY_PRESSED */] : __WEBPACK_IMPORTED_MODULE_0__constants_js__["f" /* KEY_RELEASED */];

        if (this.keyStates.get(code) === keyState) {
            return;
        }

        this.keyStates.set(code, keyState);

        this.keyMap.get(code)(keyState);
    }

    listenTo(window) {
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, this.handleEvent.bind(this));
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Keyboard;


/***/ }),
/* 22 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);