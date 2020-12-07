import createTag from '../../utils/create-tag';
import DOMable from '../domable';

/**
 * @typedef {import('../piece').Piece} Piece
*/

export default class InputSimple extends DOMable {
    /**
     * Constructor of InputSimple class
     * @param {Piece | Element} parent The parent Piece
     * @param {Object} config The object of configurations
     * @param {Object} config.attrs The attributes of InputSimple
     * @param {string} config.type The type of InputSimple
     */
    constructor(parent, config) {
        super(parent, config);
        this.dom = createTag('input');
    }

    build() {
        if (this.config.attrs) {
            Object.entries(
                this.config.attrs,
            ).forEach(attr => this.dom.setAttribute(...attr));
        }
        if (this.config.type) this.dom.type = this.config.type;
        this.addToParent();
        return this;
    }

    set value(value) {
        this.dom.value = value;
    }

    get value() {
        return this.dom.value;
    }
}
