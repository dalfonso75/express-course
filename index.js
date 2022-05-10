const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server in express');
});

routerApi(app);

app.listen(port, () => {
  console.log(`My port ${port}`);
});
