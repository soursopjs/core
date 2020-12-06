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

    reconfigure(config) {
        this.config = config;
        return this;
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

        // Check if a ModalBody object exists
        if (this.config.modalBody) this.add(this.config.modalBody);

        h5.id = 'modalTemporalLabel';
        h5.appendChild(document.createTextNode(this.config.title || ''));
        span.appendChild(document.createTextNode('x'));
        // Appending
        close.appendChild(span);
        header.appendChild(h5);
        header.appendChild(close);
        content.appendChild(header);
        content.appendChild(body);
        dialog.appendChild(content);
        modal.appendChild(dialog);
        // Save
        this.body = body;
        this.dom = modal;
        // this.dom.textContent = '';
        // this.dom.appendChild(this.currentModal);
        return modal;
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
