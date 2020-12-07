import createTag from '../../utils/create-tag';
import FormCheck from './form-check';
import InputSimple from './input-simple';

export default class Checkbox extends FormCheck {
    constructor(parent, config) {
        super(parent, config);
        if (!this.config.input) this.config.input = {};
        if (!this.config.input.attrs) this.config.input.attrs = {};
        this.config.input.attrs.class = 'form-check-input';
        this.config.input.type = 'checkbox';
        this.inputSimple = new InputSimple(this.config.input);
        this.spanTag = null;
    }

    build() {
        this.inputSimple.build();
        const labelTag = createTag('label', { class: 'd-block form-check-label' });
        this.spanTag = createTag('span', { class: 'd-inline-block mb-2' });
        this.inputSimple.value = this.config.value || '';
        this.spanTag.innerText = this.config.label || '';
        // Add the elements
        labelTag.appendChild(this.inputSimple.dom);
        labelTag.appendChild(this.spanTag);
        this.dom.appendChild(labelTag);
        this.addToParent();
        return this;
    }

    toggle() {
        return (this.isChecked()) ? this.uncheck() : this.check();
    }

    check() {
        this.inputSimple.dom.checked = true;
    }

    uncheck() {
        this.inputSimple.dom.checked = false;
    }

    isChecked() {
        return this.inputSimple.dom.checked;
    }

    set value(value) {
        this.inputSimple.value = value;
    }

    get value() {
        return this.inputSimple.value;
    }
}
