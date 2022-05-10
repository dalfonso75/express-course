const express = require('express');
const faker = require('faker');

const router = express.Router();

router.get('/', (req, res) => {
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
router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
})

router.get('/:productId', (req, res) => {
  const { productId } = req.params;
  if (productId === '999') {
    res.status(404).json({
      message: "Not Found"
    })
  } else {
    res.status(200).json({
      productId,
      name: 'Product 1',
      price: '1000',
    });
  }
});

router.post("/", (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: "Created",
    data: body
  })
})

router.patch("/:productId", (req, res) => {
  const { productId } = req.params
  const body = req.body;
  res.json({
    message: "Update",
    data: body,
    productId,
  })
})

router.delete("/:productId", (req, res) => {
  const { productId } = req.params
  res.json({
    message: "Delete",
    productId,
  })
})

module.exports = router;
