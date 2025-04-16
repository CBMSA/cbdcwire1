const express = require('express');
const app = express();
const tradeRoute = require('./routes/tradeRoute');
require('dotenv').config();

app.use(express.json());
app.use('/api', tradeRoute);
app.use(express.static('frontend'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`CBDC Trade App running on port ${PORT}`));