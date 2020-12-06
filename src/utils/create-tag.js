/**
 * Create a DON node of type given and set attrs
 * @param {string} tagName Tag name
 * @param {object} attrs DOM attributes
 */
export default function createTag(tagName, attrs) {
    const dom = document.createElement(tagName);
    if (attrs) {
        Object.entries(attrs).forEach(pair => {
            dom.setAttribute(...pair);
        });
    }
    return dom;
}
