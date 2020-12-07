import createTag from '../../utils/create-tag';
import DOMable from '../domable';

/**
 * @typedef {import('../piece').Piece} Piece
*/

export default class OptionSimple extends DOMable {
    /**
     * Constructor of OptionSimple class
     * @param {Piece | Element} parent The parent Piece
     * @param {Object} config The object of configurations
     * @param {Object} config.attrs The attributes of OptionSimple
     */
    constructor(parent, config) {
        super(parent, config);
        this.dom = createTag('option');
    }

    build() {
        if (this.config.attrs) {
            Object.entries(
                this.config.attrs,
            ).forEach(attr => this.dom.setAttribute(...attr));
        }
        if (this.config.label) this.dom.label = this.config.label;
        if (this.config.value) this.dom.value = this.config.value;
        if (this.config.selected) this.dom.selected = this.config.selected;
        this.addToParent();
        return this;
    }

    // TODO: disabled

    select() {
        this.dom.selected = true;
    }

    unselect() {
        this.dom.selected = false;
    }

    isSelect() {
        return this.dom.selected;
    }

    set value(value) { this.dom.value = value; }

    set label(label) { this.dom.label = label; }

    get value() { return this.dom.value; }

    get label() { return this.dom.label; }
}
