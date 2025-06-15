const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from "public"
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html from the current directory
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
