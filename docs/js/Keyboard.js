import {KEY_PRESSED, KEY_RELEASED} from './constants.js';

export default class Keyboard {
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
        const {code} = event;

        if (!this.keyMap.has(code)) {
            // Did not have key mapped;
            return false;
        }

        event.preventDefault();

        const keyState = event.type === 'keydown' ? KEY_PRESSED : KEY_RELEASED;

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