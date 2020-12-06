import createTag from '../utils/create-tag';
import DOMable from './domable';

export default class Button extends DOMable {
    constructor(parent, config) {
        super(parent, config);
        this.dom = null;
        this.tagName = null;
    }

    build() {
        this.tagName = this.config.tag || 'button';
        const button = createTag(this.tagName, { class: 'btn' });
        // Configure the element
        if (this.config.lg) button.classList.add('btn-lg');
        if (this.config.sm) button.classList.add('btn-sm');
        if (this.config.block) button.classList.add('btn-block');
        if (this.tagName === 'button') {
            button.type = 'button';
            button.innerText = this.config.value || '';
        }
        if (this.tagName === 'input') {
            button.type = this.config.type || 'button';
            button.value = this.config.value || '';
        }
        if (this.tagName === 'a') {
            button.role = 'button';
            button.href = this.config.href || '#';
        }
        // Builds and returns
        this.dom = button;
        this.addToParent();
        return this;
    }

    disable() {
        this.dom.setAttribute('disabled', 'true');
        if (this.tagName === 'a') {
            this.dom.setAttribute('aria-disabled', 'true');
            this.dom.classList.add('disabled');
        }
    }

    enable() {
        this.dom.removeAttribute('disabled');
        if (this.tagName === 'a') {
            this.dom.removeAttribute('aria-disabled');
            this.dom.classList.remove('disabled');
        }
    }

    isDisabled() {
        if (this.tagName === 'a') {
            return (this.dom.classList.contains('disabled'));
        }
        return !!(this.dom.getAttribute('disabled'));
    }
}
