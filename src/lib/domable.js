import Piece from './piece';
import { NodeParentNotDefinedError } from './errors';

export default class DOMable extends Piece {
    /**
     * Constructor of DOMable class
     * @param {Piece} parent The parent Piece
     * @param {object} config The object of configurations
     */
    constructor(parent, config) {
        super();
        // Check if first parameter is instance of `Piece` or config object
        this.config = config;
        this.parent = parent;
        if (!(this.parent instanceof Piece || this.parent instanceof Element)) {
            this.config = this.parent;
            this.parent = null;
        }
        // Set default value for config variable
        if (this.config == null) this.config = {};
    }

    addToParent() {
        if (this.parent) {
            if (this.parent instanceof Element) this.parent.appendChild(this.dom);
            else if (this.parent instanceof Piece) this.parent.add(this);
        }
    }

    reconfigure(config) {
        this.config = config;
        return this;
    }

    delete() {
        if (this.parent) {
            if (this.parent instanceof Element) this.parent.removeChild(this.dom);
            else if (this.parent instanceof Piece) this.parent.remove(this);
        } else {
            throw new NodeParentNotDefinedError();
        }
    }
}
