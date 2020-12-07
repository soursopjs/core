import createTag from '../../utils/create-tag';
import DOMable from '../domable';

/**
 * @typedef {import('../piece').Piece} Piece
*/

export default class TextareaSimple extends DOMable {
    /**
     * Constructor of TextareaSimple class
     * @param {Piece | Element} parent The parent Piece
     * @param {Object} config The object of configurations
     * @param {Object} config.attrs The attributes of TextareaSimple
     */
    constructor(parent, config) {
        super(parent, config);
        this.dom = createTag('textarea');
    }

    build() {
        if (this.config.attrs) {
            Object.entries(
                this.config.attrs,
            ).forEach(attr => this.dom.setAttribute(...attr));
        }
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
