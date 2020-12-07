import createTag from '../../utils/create-tag';
import FormGroup from './form-group';
import TextareaSimple from './textarea-simple';

export default class Textarea extends FormGroup {
    constructor(parent, config) {
        super(parent, config);
        if (!this.config.textarea) this.config.textarea = {};
        if (!this.config.textarea.attrs) this.config.textarea.attrs = {};
        this.config.textarea.attrs.class = 'form-control';
        this.textareaSimple = new TextareaSimple(this.config.textarea);
        this.spanTag = null;
    }

    build() {
        this.textareaSimple.build();
        const labelTag = createTag('label', { class: 'd-block' });
        this.spanTag = createTag('span', { class: 'd-inline-block mb-2' });
        this.textareaSimple.value = this.config.value || '';
        this.spanTag.innerText = this.config.label || '';
        // Add the elements
        labelTag.appendChild(this.spanTag);
        labelTag.appendChild(this.textareaSimple.dom);
        this.dom.appendChild(labelTag);
        this.addToParent();
        return this;
    }
}
