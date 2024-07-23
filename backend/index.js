const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

app.get('/api', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/data', (req, res) => {
  const data = { message: 'This is some data from the server' };
  res.json(data);
});

app.listen(port, (err) => {
  if (err) {
    console.error('Server startup error:', err);
  } else {
    console.log(`Server is running at http://localhost:${port}`);
  }
});

process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err);
  process.exit(1); //mandatory (as per the Node.js docs)
});
