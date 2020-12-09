import createTag from '../../utils/create-tag';
import Button from '../button';
import Modal from '../modal';

export default class MessageDialog {
    constructor(container, title, message, buttons) {
        this.container = container;
        this.title = title;
        this.message = message;
        this.buttons = buttons;
        this.resolve = () => {};
        this.reject = () => {};

        // Add buttons if there are
        if (this.buttons && this.buttons.length) {
            const allButtons = [];
            this.buttons.forEach(button => {
                // Check if this is a customized button
                if (button instanceof Button) {
                    button.eventual.addEventListener('click', () => {
                        this.onClick(button);
                    }, false);
                    allButtons.push(button);
                } else {
                    const newButton = new Button({
                        value: button.value,
                        classes: button.class,
                    }).build();
                    newButton.eventual.addEventListener('click', () => {
                        this.onClick(button.id);
                    }, false);
                    allButtons.push(newButton);
                }
            });
            this.buttons = allButtons;
        }

        // Create the modal
        this.modal = new Modal(
            this.container,
            {
                title: this.title, buttons: this.buttons,
            },
        ).build();
        const p = createTag('p');
        p.innerText = this.message;
        this.modal.body.appendChild(p);
    }

    onClick(id) {
        this.resolve(id);
        this.close();
    }

    show() {
        this.modal.show();
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }

    close() {
        this.modal.hide();
    }
}
