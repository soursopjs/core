import createTag from '../../utils/create-tag';
import FormGroup from './form-group';
import InputSimple from './input-simple';

/**
 * @typedef {import('./piece').Piece} Piece
*/

export default class InputText extends FormGroup {
    /**
     * Constructor of InputText class
     * @param {Piece | Element} parent The parent Piece
     * @param {Object} config The object of configurations
     * @param {Object} config.input The config to config the InputSimple object
     */
    constructor(parent, config) {
        super(parent, config);
        if (!this.config.input) this.config.input = {};
        if (!this.config.input.attrs) this.config.input.attrs = {};
        this.config.input.attrs.class = 'form-control';
        this.inputSimple = new InputSimple(this.config.input);
        this.spanTag = null;
    }

    build() {
        this.inputSimple.build();
        const labelTag = createTag('label', { class: 'd-block' });
        this.spanTag = createTag('span', { class: 'd-inline-block mb-2' });
        this.inputSimple.value = this.config.value || '';
        this.spanTag.innerText = this.config.label || '';
        // Add the elements
        labelTag.appendChild(this.spanTag);
        labelTag.appendChild(this.inputSimple.dom);
        this.dom.appendChild(labelTag);
        this.addToParent();
        return this;
    }

    set value(value) {
        this.inputSimple.value = value;
    }

    get value() {
        return this.inputSimple.value;
    }

    set text(text) {
        this.spanTag.innerText = text;
    }

    get text() {
        return this.spanTag.innerText;
    }
}
