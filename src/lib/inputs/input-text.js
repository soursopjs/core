import createTag from '../../utils/create-tag';
import FormGroup from './form-group';
import Input from './input';

/**
 * @typedef {import('./piece').Piece} Piece
*/

export default class InputText extends FormGroup {
    /**
     * Constructor of InputText class
     * @param {Piece | Element} parent The parent Piece
     * @param {Object} config The object of configurations
     * @param {Object} config.input The config to config the Input object
     */
    constructor(parent, config) {
        super(parent, config);
        if (!this.config.input) this.config.input = {};
        if (!this.config.input.attrs) this.config.input.attrs = {};
        this.config.input.attrs.class = 'form-control';
        this.input = new Input(this, this.config.input);
        this.spanTag = null;
    }

    build() {
        const labelTag = createTag('label', { class: 'd-block' });
        this.input.dom.classList.add('form-control');
        this.spanTag = createTag('span');
        this.input.value = this.config.value || '';
        this.spanTag.innerText = this.config.label || '';
        // Add the elements
        labelTag.appendChild(this.spanTag);
        labelTag.appendChild(this.input.dom);
        this.dom.appendChild(labelTag);
        this.addToParent();
        return this;
    }

    set value(value) {
        this.input.value = value;
    }

    get value() {
        return this.input.value;
    }

    set text(text) {
        this.spanTag.innerText = text;
    }

    get text() {
        return this.spanTag.innerText;
    }
}
