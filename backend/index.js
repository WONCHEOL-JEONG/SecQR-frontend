const express = require('express');
const app = express();
var cors =require('cors')
const port = 3001;
app.use(cors())

app.use(express.static('public'));

app.get('/api', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.get('/api/data', (req, res) => {
    const data = { message: 'This is some data from the server' };
    res.json(data);
  });


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });