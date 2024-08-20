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




// calculate the avg
const calculateAverage = (numbers) => {
    if (!numbers.length) {
        return 0;
    }
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
};

app.get('/numbers/:numberId', async (req, res) => {
    const { numberId } = req.params;

    // Fetch numbers from the third-party API
    const fetchedNumbers = await fetchNumbers(numberId);

  
    storedNumbers = Array.from(new Set([...storedNumbers, ...fetchedNumbers]));
    storedNumbers.sort((a, b) => a - b); // Ensure numbers are sorted

    // Maintain the window size
    if (storedNumbers.length > WINDOW_SIZE) {
        windowPrevState = storedNumbers.slice(0, WINDOW_SIZE);
        windowCurrState = storedNumbers.slice(-WINDOW_SIZE);
        storedNumbers = windowCurrState;
    } else {
        windowCurrState = storedNumbers;
    }

    // Calculate average
    const avg = calculateAverage(windowCurrState);

    
    const response = {
        windowPrevState,
        windowCurrState,
        numbers: fetchedNumbers,
        avg
    };

    return res.json(response);
});


