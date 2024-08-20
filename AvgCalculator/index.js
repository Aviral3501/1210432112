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

// helper function to fetch the numbers from test server api
const fetchNumbers = async (numberId) => {
    const url = `http://20.244.56.144/test/${numberId}`;
    try {
        const response = await axios.get(url, { timeout: TIMEOUT });
        if (response.status === 200) {
            return response.data.numbers || [];
        } else {
            return [];
        }
    } catch (error) {
        return [];
    }
};
