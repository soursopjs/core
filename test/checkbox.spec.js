/* global describe, before, after, it */
/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const puppeteer = require('puppeteer');

const CheckboxPage = require('./pages/checkbox-page');
const { app } = require('./server');
const config = require('./config');

// Objects
let server;
let browser;
let page;

// Functions to start and stop the server
async function startApp() {
    this.timeout(0);
    server = app.listen(config.PORT);
    browser = await puppeteer.launch(config.puppeteer);
    page = await browser.newPage();
}
async function tearDown() {
    await browser.close();
    await server.close();
}

describe("Checkbox page", () => {
    before(startApp);
    after(tearDown);

    it("loads the page checkbox", async () => {
        const response = await page.goto(
            `${config.URL}/checkbox.html`,
            { waitUntil: "domcontentloaded" },
        );

        expect(response.status()).to.be.equal(200);
    });

    it("defines the Checkbox class", async () => {
        const checkboxPage = new CheckboxPage(page);
        expect(await checkboxPage.isLoadedModalClass()).to.be.true;
    });

    it("changes to checked when it is clicked", async () => {
        const checkboxPage = new CheckboxPage(page);
        await checkboxPage.clickCheckbox();
        expect(await checkboxPage.isChecked()).is.true;
    });

    it("changes to unchecked when it is clicked two times", async () => {
        const checkboxPage = new CheckboxPage(page);
        await checkboxPage.clickCheckbox();
        expect(await checkboxPage.isChecked()).is.false;
    });

    it("triggers event when the checkbox is clicked");
    it("changes the label text");
});
