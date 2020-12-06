class ModalPage {
    constructor(page) {
        this.page = page;
    }

    async isLoadedModalClass() {
        const defined = this.page.evaluate(() => {
            // eslint-disable-next-line no-undef
            const x = soursopCore.Modal;
            return typeof x === "function" && /^\s*class\s+/.test(x.toString());
        });
        return defined;
    }

    async showModal() {
        // eslint-disable-next-line no-undef
        await this.page.evaluate(() => m.show());
    }

    async hideModal() {
        // eslint-disable-next-line no-undef
        await this.page.evaluate(() => m.hide());
    }

    async isShowed() {
        // eslint-disable-next-line no-undef
        const display = await this.page.evaluate(() => m.dom.style.display);
        return display === "block";
    }
}

module.exports = ModalPage;
