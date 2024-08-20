const express = require('express');
const axios = require('axios');

const app = express();

const PORT = process.env.PORT||3000;

const WINDOW_SIZE = 10;
const TIMEOUT = 500; 

let windowPrevState = [];
let windowCurrState = [];
let storedNumbers = [];

app.listen(PORT, () => {
    console.log(`Server is running on port number ${PORT}`);
});

