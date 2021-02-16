const express = require('express');
const bodyParser = require("body-parser");
var cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const barcodes = require('./routes/api/barcodes');

app.use('/api/barcodes/', barcodes);

// Handle production
if (process.env.NODE_ENV === 'production') {
  // Static folder
  // app.use(express.static(__dirname + '/public/'));
  app.use(express.static(path.join(__dirname, 'public')));

  // Handle SPA
  // app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
  app.get(/.*/, (req, res) => res.sendFile(path.resolve(__dirname, 'public', 'index.html')));
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));