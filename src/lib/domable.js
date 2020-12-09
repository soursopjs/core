import Piece from './piece';
import { NodeParentNotDefinedError, DOMError } from './errors';

/**
 * @typedef {import('./piece').Piece} Piece
*/

export default class DOMable extends Piece {
    /**
     * Constructor of DOMable class
     * @param {Piece | Element} [parent] The parent Piece
     * @param {Object} [config={}] The object of configurations
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
        this.dom = null;
    }

    /**
     * Add this piece to a parent.
     */
    addToParent() {
        if (this.parent) {
            if (this.parent instanceof Element) this.parent.appendChild(this.dom);
            else if (this.parent instanceof Piece) this.parent.add(this);
        }
    }

    /**
     * Change the parent.
     * @param {Piece | Element} parent The new parent
     */
    changeParent(parent) {
        if (this.dom === null) throw new DOMError(parent, 'The DOM is null');
        this.delete();
        this.parent = parent;
        this.addToParent();
        // if (this.parent) {
        //     this.parent.removeChild(this.dom);
        // }
        // this.parent = parent;
        // parent.appendChild(this.dom);
        return this;
    }

    /**
     * Update the config object.
     * @param {Object} config The new config object
     */
    reconfigure(config) {
        this.config = config;
        return this;
    }

    /**
     * Delete this piece from the parent piece.
     */
    delete() {
        if (this.parent) {
            if (this.parent instanceof Element) this.parent.removeChild(this.dom);
            else if (this.parent instanceof Piece) this.parent.remove(this);
        } else {
            throw new NodeParentNotDefinedError();
        }
    }
}
