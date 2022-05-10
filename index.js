const express = require('express');
const routerApi = require('./routes');

const { logErrors, boomErrorHandler, errorHandler } = require('./middlewares/error.handler');
const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server in express');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`My port ${port}`);
});
