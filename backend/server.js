"use strict";

const express = require("express");


//Variables
const hostName = "localhost";
const port = 8000;

const app = express();
app.listen(port, hostName, () => {
    console.log(`Listening at http://${hostName}:${port}`);
});

