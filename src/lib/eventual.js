export default class Eventual {
    /**
     * Constructor of Eventual class
     * @param {Element} target The element target
     */
    constructor(target) {
        this.target = target;
    }

    addEventListener(type, listener, ...params) {
        return this.target.addEventListener(type, listener, ...params);
    }

    removeEventListener(type, listener, ...params) {
        return this.target.removeEventListener(type, listener, ...params);
    }

    dispatchEvent(event) {
        return this.target.dispatchEvent(event);
    }
}
