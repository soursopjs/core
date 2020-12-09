class CheckboxPage {
    constructor(page) {
        this.page = page;
    }

    async isLoadedModalClass() {
        const defined = this.page.evaluate(() => {
            // eslint-disable-next-line no-undef
            const x = soursopCore.inputs.Checkbox;
            return typeof x === "function" && /^\s*class\s+/.test(x.toString());
        });
        return defined;
    }

    async toggleChekbox() {
        // eslint-disable-next-line no-undef
        await this.page.evaluate(() => c.toggle());
    }

    async clickCheckbox() {
        await this.page.click("#checkbox-element");
    }

    async isChecked() {
        // eslint-disable-next-line no-undef
        const status = await this.page.evaluate(() => c.isChecked());
        return status;
    }
}

module.exports = CheckboxPage;
