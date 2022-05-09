const express = require('express');
const faker = require('faker');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Server in express');
});

app.get('/new-route', (req, res) => {
  res.send('new route');
});

app.get('/products', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    products.push({
      id: index,
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    })

  }
  res.json(products);
});

// los endpoints especificos deben ir antes que los dinamicos.
app.get('/products/filter', (req, res) => {
  res.send('Yo soy un filter');
})

app.get('/products/:productId', (req, res) => {
  const { productId } = req.params;
  res.json({
    productId,
    name: 'Product 1',
    price: '1000',
  });
});

app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send('No hya parametros');
  }
});

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    productId,
    categoryId,
  });
});

app.listen(port, () => {
  console.log(`My port ${port}`);
});
