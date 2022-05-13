const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const {
  logErrors,
  boomErrorHandler,
  errorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');
const app = express();
const port = 3001;

app.use(express.json());

const whilelist = ['http://locahost:8080', 'http://127.0.0.1:5500'];
const options = {
  origin: (origin, callback) => {
    if (whilelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      console.log(origin);
      callback(new Error('No permitido'));
    }
  },
};
app.use(cors(options));
app.get('/', (req, res) => {
  res.send('Server in express');
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`My port ${port}`);
});
