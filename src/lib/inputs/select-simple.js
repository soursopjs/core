import createTag from '../../utils/create-tag';
import DOMable from '../domable';
import OptionSimple from './option-simple';

/**
 * @typedef {import('../piece').Piece} Piece
*/

export default class SelectSimple extends DOMable {
    constructor(parent, config) {
        super(parent, config);
        this.dom = createTag('select', { class: 'form-control' });
    }

    build() {
        this.addToParent();
        return this;
    }

    /**
     * Add new option to the SelectSimple
     * @param {string} label The option's label
     * @param {string} value The option's value
     */
    addOption(label, value, selected) {
        const optionSimple = new OptionSimple({ label, value, selected });
        optionSimple.build();
        this.dom.appendChild(optionSimple.dom);
    }

    set value(value) {
        this.dom.value = value;
    }

    get value() {
        return this.dom.value;
    }
}
