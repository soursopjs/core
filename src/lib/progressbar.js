import DOMable from './domable';
import Piece from './piece';

export default class ProgressBar extends DOMable {
    /**
     * Constructor of ProgressBar class
     * @param {Element} parent The parent element
     * @param {object} config The object of configurations
     */
    constructor(parent, config) {
        super(parent, config);
        this.dom = document.createElement('div');
        this.dom.classList.add('progress');
        this.dom.classList.add('mb-3');

        // Create the progress element
        this._progress = document.createElement('div');
        this._progress.classList.add('progress-bar');
        this._progress.setAttribute('role', 'progressbar');
        this._progress.setAttribute('aria-valuemin', '0');
        this._progress.setAttribute('aria-valuemax', '100');
        this._progress.setAttribute('aria-valuenow', '0');

        // Config the progress element
        if (this.config.visible === false) this.dom.classList.add('invisible');
        if (this.config.classes) {
            if (typeof this.config.classes === 'string') {
                this.config.classes = this.config.classes.split(' ');
            }
            this.config.classes.forEach(css => this.dom.classList.add(css));
        }

        // Check if enable striped progressbar
        if (this.config.striped) this._progress.classList.add('progress-bar-striped');
        else if (this.config.striped === false) this._progress.classList.remove('progress-bar-striped');

        // Check if enable animated progressbar
        if (this.config.animated) this._progress.classList.add('progress-bar-animated');
        if (this.config.animated === false) this._progress.classList.remove('progress-bar-animated');
        // Check if height is defined
        if (this.config.height) this.dom.style.height = `${this.config.height}px`;

        // Define the background color
        if (this.config.bg) this._progress.classList.add(`bg-${this.config.bg}`);

        // Set a initial value
        if (this.config.value) this._progress.style.width = `${this.config.value}%`;

        // Add to the DOM/Piece-parent
        this.dom.appendChild(this._progress);
        if (this.parent) {
            if (this.parent instanceof Element) this.parent.appendChild(this.dom);
            else if (this.parent instanceof Piece) this.parent.add(this);
        }
    }

    /**
     * Set the percent value
     * @param {number} value
     */
    set percent(value) {
        this.setPercent(value);
    }

    /**
     * Return the percent value
     */
    get percent() {
        return Number.parseInt(this._progress.style.width, 10);
    }

    /**
     * Set the percent value and return itself
     * @param {number} value
     */
    setPercent(value) {
        const valueNormalized = Math.max(0, Math.min(value, 100));
        this._progress.setAttribute('aria-valuenow', valueNormalized);
        this._progress.style.width = `${valueNormalized}%`;
        return this;
    }

    /**
     * Show the progress bar and return itself
     */
    show() {
        this.dom.classList.remove('invisible');
        return this;
    }

    /**
     * Hide the progress bar and return itself
     */
    hide() {
        this.dom.classList.add('invisible');
        return this;
    }
}
