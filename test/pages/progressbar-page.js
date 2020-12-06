class ProgressBarPage {
    constructor(page) {
        this.page = page;
    }

    isLoadedProgressClass() {
        const defined = this.page.evaluate(() => {
            // eslint-disable-next-line no-undef
            const x = soursopCore.ProgressBar;
            return typeof x === "function" && /^\s*class\s+/.test(x.toString());
        });
        return defined;
    }

    async getPercent() {
        // eslint-disable-next-line no-undef
        const width = await this.page.evaluate(() => p.dom.children[0].style.width);
        return Number.parseInt(width, 10);
    }

    async setPercent(value) {
        /* eslint-disable no-undef */
        await this.page.evaluate(valuePassed => {
            p.percent = valuePassed;
        }, value);
    }

    async hideProgressBar() {
        // eslint-disable-next-line no-undef
        await this.page.evaluate(() => p.hide());
    }

    async showProgressBar() {
        // eslint-disable-next-line no-undef
        await this.page.evaluate(() => p.show());
    }

    async isShowed() {
        // eslint-disable-next-line no-undef
        const itHas = await this.page.evaluate(() => p.dom.classList.contains("invisible"));
        return !itHas;
    }

    async deleteProgressBar() {
        // eslint-disable-next-line no-undef
        await this.page.evaluate(() => p.delete());
    }

    async isParentContainerEmpty() {
        const children = await this.page.evaluate(() => container.children);
        return !children.length;
    }
}

module.exports = ProgressBarPage;
