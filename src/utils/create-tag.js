/**
 * Create a DON node of type given and set attrs
 * @param {string} type Tag name
 * @param {object} attrs DOM attributes
 */
export default function createTag(type, attrs) {
    const dom = document.createElement(type);
    if (attrs) {
        Object.entries(attrs).forEach(pair => {
            dom.setAttribute(...pair);
        });
    }
    return dom;
}
