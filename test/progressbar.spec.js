/* global describe, before, after, it */
/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const puppeteer = require('puppeteer');

const puppeteerConfig = require('./puppeteer-config');
const ProgressBarPage = require('./pages/progressbar-page');
const { app } = require('./server');

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

describe("ProgressBar page", () => {
    before(startApp);
    after(tearDown);

    it("loads the page progressbar", async () => {
        const response = await page.goto(
            `${URL}/progressbar.html`,
            { waitUntil: "domcontentloaded" },
        );

        expect(response.status()).to.be.equal(200);
    });

    it("defines the Progress class", async () => {
        const progressBarPage = new ProgressBarPage(page);
        expect(await progressBarPage.isLoadedProgressClass()).is.true;
    });

    it("the progress bar has percent value", async () => {
        const progressBarPage = new ProgressBarPage(page);
        const percent = await progressBarPage.getPercent();
        expect(percent).to.be.equal(14);
    });

    it("changes progress bar when percent is given", async () => {
        const progressBarPage = new ProgressBarPage(page);
        await progressBarPage.setPercent(50);
        const percent = await progressBarPage.getPercent();
        expect(percent).to.be.equal(50);
    });

    it("progresss bar hides when prompted", async () => {
        const progressBarPage = new ProgressBarPage(page);
        await progressBarPage.hideProgressBar();
        expect(await progressBarPage.isShowed()).is.false;
    });

    it("progresss bar shows when prompted", async () => {
        const progressBarPage = new ProgressBarPage(page);
        await progressBarPage.showProgressBar();
        expect(await progressBarPage.isShowed()).is.true;
    });

    it("deletes the progress bar", async () => {
        const progressBarPage = new ProgressBarPage(page);
        await progressBarPage.deleteProgressBar();
        expect(await progressBarPage.isParentContainerEmpty()).is.true;
    });

    it("Sets 0 if the percent is less than 0", async () => {
        const progressBarPage = new ProgressBarPage(page);
        await progressBarPage.setPercent(-23);
        const percent = await progressBarPage.getPercent();
        expect(percent).to.be.equal(0);
    });

    it("Sets 100 if the percent is major than 100", async () => {
        const progressBarPage = new ProgressBarPage(page);
        await progressBarPage.setPercent(2003);
        const percent = await progressBarPage.getPercent();
        expect(percent).to.be.equal(100);
    });
});
