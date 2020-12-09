class MessageDialogPage {
    constructor(page) {
        this.page = page;
    }

    async isLoadedModalClass() {
        const defined = this.page.evaluate(() => {
            // eslint-disable-next-line no-undef
            const x = soursopCore.dialogboxes.MessageDialog;
            return typeof x === "function" && /^\s*class\s+/.test(x.toString());
        });
        return defined;
    }

    async showMessageDialog() {
        // eslint-disable-next-line no-undef
        await this.page.evaluate(() => { md.show(); });
    }

    async isShowed() {
        // eslint-disable-next-line no-undef
        const display = await this.page.evaluate(() => md.modal.dom.style.display);
        return display === "block";
    }

    async clickButtonThatSay(text) {
        const xPath = `//button[text()[contains(.,"${text}")]]`;
        const elements = await this.page.$x(xPath);
        await elements[0].click();
    }

    async checkResultOfClicking() {
        // eslint-disable-next-line no-undef
        const status = await this.page.evaluate(() => v);
        return status;
    }
}

module.exports = MessageDialogPage;
