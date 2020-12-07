import FormElement from './form-element';

export default class FormCheck extends FormElement {
    constructor(parent, config) {
        super(parent, config);
        this.dom.classList.add('form-check');
    }
}
