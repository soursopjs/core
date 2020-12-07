const path = require('path');
const express = require('express');

// Create the app
const app = express();

// Enable bootstrap
app.use(express.static(
    path.join(__dirname, '../node_modules/bootstrap/dist'),
));

// Enable jquery
app.use(express.static(
    path.join(__dirname, '../node_modules/jquery/dist'),
));

// Enable built scripts
// Enable public files
app.use(express.static(
    path.join(__dirname, '../build'),
));

// Enable public files
app.use(express.static(
    path.join(__dirname, 'public'),
));

module.exports = { app };
