const { app } = require('./server');

const PORT = 5080;

app.listen(PORT, () => {
    console.log("Server started at port", PORT);
});