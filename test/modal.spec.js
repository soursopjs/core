/* global describe, before, after, it */
/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const puppeteer = require('puppeteer');

const ModalPage = require('./pages/modal-page');
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

describe("Modal page", () => {
    before(startApp);
    after(tearDown);

    it("loads the page modal", async () => {
        const response = await page.goto(
            `${URL}/modal.html`,
            { waitUntil: "domcontentloaded" },
        );

        expect(response.status()).to.be.equal(200);
    });

    it("defines the Modal class", async () => {
        const modalPage = new ModalPage(page);
        expect(await modalPage.isLoadedModalClass()).to.be.true;
    });

    it("Shows the modal", async () => {
        const modalPage = new ModalPage(page);
        await modalPage.showModal();
        expect(await modalPage.isShowed()).to.be.true;
    });

    it("Hides the modal", async () => {
        const modalPage = new ModalPage(page);
        await modalPage.hideModal();
        expect(await modalPage.isShowed()).to.be.false;
    });
});
