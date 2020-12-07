import FormGroup from './form-group';
import SelectSimple from './select-simple';

export default class Select extends FormGroup {
    constructor(parent, config) {
        super(parent, config);
        if (!this.config.select) this.config.select = {};
        if (!this.config.select.attrs) this.config.select.attrs = {};
        this.config.select.attrs.class = 'form-control';
        this.selectSimple = new SelectSimple(this.config.select);
        this.spanTag = null;
    }

    build() {
        this.selectSimple.build();
        if (this.config.options) {
            this.config.options.forEach(option => {
                this.selectSimple.addOption(option.label, option.value, option.selected);
            });
        }
        this.dom.appendChild(this.selectSimple.dom);
        this.addToParent();
        return this;
    }

    set value(value) { this.selectSimple.value = value; }

    get value() { return this.selectSimple.value; }
}
