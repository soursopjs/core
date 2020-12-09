import DOMable from './domable';
import createTag from '../utils/create-tag';
import { ModalNotDefinedError } from './errors';

export default class Modal extends DOMable {
    /**
     * Constructor of Modal class
     * @param {Element} parent The parent element
     * @param {object} config The object of configurations
     */
    constructor(parent, config) {
        super(parent, config);
        this.body = null;
    }

    build() {
        const modal = createTag('div', {
            class: 'modal',
            tabindex: '-1',
            'aria-labelledby': 'modalTemporalLabel',
            'aria-hidden': 'true',
        });
        modal.id = 'modalTemporal';

        const dialog = createTag('div', {
            class: 'modal-dialog modal-dialog-centered',
        });

        const content = createTag('div', { class: 'modal-content' });
        const header = createTag('div', { class: 'modal-header' });
        const h5 = createTag('h5', { class: 'modal-title' });
        const close = createTag('button', {
            class: 'close',
            'data-dismiss': 'modal',
            'aria-label': 'Close',
        });
        const span = createTag('span', { 'aria-hidden': 'true' });
        const body = createTag('div', { class: 'modal-body' });
        const footer = createTag('div', { class: 'modal-footer' });

        // Check if a ModalBody object exists
        if (this.config.modalBody) this.add(this.config.modalBody);

        // Check if there are buttons
        if (this.config.buttons) {
            this.config.buttons.forEach(button => { footer.appendChild(button.dom); });
        }

        h5.id = 'modalTemporalLabel';
        h5.appendChild(document.createTextNode(this.config.title || ''));
        span.appendChild(document.createTextNode('x'));
        // Appending
        close.appendChild(span);
        header.appendChild(h5);
        header.appendChild(close);
        content.appendChild(header);
        content.appendChild(body);
        if (this.config.buttons) {
            content.appendChild(footer);
        }
        dialog.appendChild(content);
        modal.appendChild(dialog);
        // Save
        this.body = body;
        this.dom = modal;
        this.addToParent();
        return this;
    }

    /**
     * Show the modal and return itself
     */
    show() {
        if (!this.dom) throw new ModalNotDefinedError();
        // eslint-disable-next-line no-undef
        if (typeof $ !== 'undefined') $(this.dom).modal('show');
        return this;
    }

    /**
     * Hide the modal and return itself
     */
    hide() {
        if (!this.dom) throw new ModalNotDefinedError();
        // eslint-disable-next-line no-undef
        if (typeof $ !== 'undefined') $(this.dom).modal('hide');
        return this;
    }
}
