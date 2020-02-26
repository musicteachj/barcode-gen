const express = require('express');
const bodyParser = require("body-parser");
var cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const barcodes = require('./routes/api/barcodes');

app.use('/api/barcodes/', barcodes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));