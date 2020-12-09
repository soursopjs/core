/* global describe, before, after, it */
/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const puppeteer = require('puppeteer');

const MessageDialogPage = require('./pages/messagedialog-page');
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

describe("MessageDialog page", () => {
    before(startApp);
    after(tearDown);

    it("loads the page messagedialog", async () => {
        const response = await page.goto(
            `${config.URL}/messagedialog.html`,
            { waitUntil: "domcontentloaded" },
        );

        expect(response.status()).to.be.equal(200);
    });

    it("defines the MessageDialog class", async () => {
        const messageDialogPage = new MessageDialogPage(page);
        expect(await messageDialogPage.isLoadedModalClass()).to.be.true;
    });

    it("preshows the messagedialog", async () => {
        const messageDialogPage = new MessageDialogPage(page);
        expect(await messageDialogPage.checkResultOfClicking()).is.null;
        expect(await messageDialogPage.isShowed()).is.true;
    });

    it("clicks the button cancel", async () => {
        const messageDialogPage = new MessageDialogPage(page);
        await messageDialogPage.clickButtonThatSay("Cancel");
        expect(await messageDialogPage.checkResultOfClicking()).is.false;
    });

    it("shows the messagedialog", async () => {
        const messageDialogPage = new MessageDialogPage(page);
        page.waitForTimeout(400);
        await messageDialogPage.showMessageDialog();
        expect(await messageDialogPage.isShowed()).is.true;
    });

    it("clicks the button ok", async () => {
        const messageDialogPage = new MessageDialogPage(page);
        await messageDialogPage.clickButtonThatSay("Ok");
        expect(await messageDialogPage.checkResultOfClicking()).is.true;
    });
});
