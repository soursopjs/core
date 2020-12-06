class ButtonPage {
    constructor(page) {
        this.page = page;
    }

    async isLoadedModalClass() {
        const defined = this.page.evaluate(() => {
            // eslint-disable-next-line no-undef
            const x = soursopCore.Button;
            return typeof x === "function" && /^\s*class\s+/.test(x.toString());
        });
        return defined;
    }

    async enableButton() {
        // eslint-disable-next-line no-undef
        await this.page.evaluate(() => b.enable());
    }

    async disableButton() {
        // eslint-disable-next-line no-undef
        await this.page.evaluate(() => b.disable());
    }

    async isDisabled() {
        // eslint-disable-next-line no-undef
        const status = await this.page.evaluate(() => b.isDisabled());
        return status;
    }
}

module.exports = ButtonPage;
