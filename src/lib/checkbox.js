import createTag from '../utils/create-tag';
import DOMable from './domable';

export default class Checkbox extends DOMable {
    constructor(parent, config) {
        super(parent, config);
        this.dom = createTag('div', { class: 'form-check' });
        this.checkbox = null;
        // TODO: how to change the label text if this is not saved
    }

    set value(value) {
        this.checkbox.value = value;
    }

    get value() {
        return this.checkbox.value;
    }

    build() {
        const input = createTag('input', { class: 'form-check-input' });
        input.type = 'checkbox';
        if (this.config.value) input.value = this.config.value;

        let element = input;
        if (this.config.label) {
            const label = createTag('label', { class: 'form-check-label' });
            const span = createTag('span');
            // Set the label text
            span.innerText = this.config.label;
            // Add label and input element
            label.appendChild(input);
            label.appendChild(span);
            element = label;
        }
        // Add to the DOM
        this.checkbox = input;
        this.dom.appendChild(element);
        this.addToParent();
        return this;
    }

    toggle() {
        return (this.isChecked()) ? this.uncheck() : this.check();
    }

    check() {
        this.checkbox.checked = true;
    }

    uncheck() {
        this.checkbox.checked = false;
    }

    isChecked() {
        return this.checkbox.checked;
    }
}
