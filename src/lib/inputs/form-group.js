import FormElement from './form-element';

export default class FormGroup extends FormElement {
    constructor(parent, config) {
        super(parent, config);
        this.dom.classList.add('form-group');
    }
}
