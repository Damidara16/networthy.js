const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const validateCard = require('./cardValidator');

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/submit-credit-card', (req, res) => {
    console.log('Credit Card Data:', req.body);
    const [errors, errorFields] = validateCard(req.body)
    const netWorth = getRandomNumber(1000000, 1000000000);
    res.json({ status: errors.length === 0 ? 'success' : 'fail', netWorth: errors.length === 0 ? netWorth : 0, errors, errorFields });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
