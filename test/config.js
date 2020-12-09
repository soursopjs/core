const PORT = 5002;

module.exports = {
    PORT,
    URL: `http://localhost:${PORT}`,
    puppeteer: {
        headless: false,
        slowMo: 40,
        // devtools: true,
    },
};
