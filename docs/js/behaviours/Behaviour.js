export class Behaviour {
    constructor(name) {
        this.name = name;
    }

    obstruct() {

    }

    update() {
        console.warn('Unhandled update call in Behaviour');
    }
}