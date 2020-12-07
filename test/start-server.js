const { app } = require('./server');

const PORT = 5080;

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log("Server started at port", PORT);
});
