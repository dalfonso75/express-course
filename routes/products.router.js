const express = require('express');

const ProductsService = require('../services/product.service');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

// los endpoints especificos deben ir antes que los dinamicos.
router.get('/filter', async (req, res) => {
  res.send('Yo soy un filter');
})

router.get('/:productId', async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await service.findOne(productId);
    res.json(product);
  } catch (err) {
    next(err);
  }

});

router.post("/", async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json({
    message: "Created",
    data: newProduct
  })
})

router.patch("/:productId", async (req, res, next) => {
  const { productId } = req.params
  const body = req.body;
  try {
    const updateProduct = await service.update(productId, body);
    res.json({
      message: "Update",
      data: updateProduct,
    })
  } catch (err) {
    next(err);
  }
})

router.delete("/:productId", async (req, res) => {
  const { productId } = req.params
  const deleteProductId = await service.delete(productId)
  res.json({
    message: "Delete",
    deleteProductId,
  })
})

module.exports = router;
