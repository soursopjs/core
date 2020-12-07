import createTag from '../../utils/create-tag';
import DOMable from '../domable';

/**
 * @typedef {import('../piece').Piece} Piece
*/

export default class Input extends DOMable {
    /**
     * Constructor of Input class
     * @param {Piece | Element} parent The parent Piece
     * @param {Object} config The object of configurations
     * @param {Object} config.attrs The attributes of Input
     */
    constructor(parent, config) {
        super(parent, config);
        this.dom = createTag('input');
        if (this.config.attrs) {
            Object.entries(
                this.config.attrs,
            ).forEach(attr => this.dom.setAttribute(...attr));
        }
    }

    set value(value) {
        this.dom.value = value;
    }

    get value() {
        return this.dom.value;
    }
}
