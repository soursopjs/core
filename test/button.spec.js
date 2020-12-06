/* global describe, before, after, it */
/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const puppeteer = require('puppeteer');

const ButtonPage = require('./pages/button-page');
const { app } = require('./server');
const puppeteerConfig = require('./puppeteer-config');

const PORT = 5002;
const URL = `http://localhost:${PORT}`;

// Objects
let server;
let browser;
let page;

// Functions to start and stop the server
async function startApp() {
    this.timeout(1000000);
    server = app.listen(PORT);
    browser = await puppeteer.launch(puppeteerConfig);
    page = await browser.newPage();
}
async function tearDown() {
    await browser.close();
    await server.close();
}

describe("Button page", () => {
    before(startApp);
    after(tearDown);

    it("loads the page button", async () => {
        const response = await page.goto(
            `${URL}/button.html`,
            { waitUntil: "domcontentloaded" },
        );

        expect(response.status()).to.be.equal(200);
    });

    it("defines the Button class", async () => {
        const buttonPage = new ButtonPage(page);
        expect(await buttonPage.isLoadedModalClass()).to.be.true;
    });

    it("enables the button", async () => {
        const buttonPage = new ButtonPage(page);
        await buttonPage.enableButton();
        expect(await buttonPage.isDisabled()).is.false;
    });

    it("disables the button", async () => {
        const buttonPage = new ButtonPage(page);
        await buttonPage.disableButton();
        expect(await buttonPage.isDisabled()).is.true;
    });
});
