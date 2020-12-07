import createTag from '../../utils/create-tag';
import DOMable from '../domable';

export default class FormElement extends DOMable {
    constructor(parent, config) {
        super(parent, config);
        this.dom = createTag('div');
    }
}
