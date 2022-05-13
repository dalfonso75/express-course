const express = require('express');
const router = express.Router();

const ProductsService = require('../services/product.service');
const service = new ProductsService();

const validatorHandler = require('../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../schemas/product.shema');



router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

// los endpoints especificos deben ir antes que los dinamicos.
router.get('/filter', async (req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const product = await service.findOne(id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  });

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json({
      message: 'Created',
      data: newProduct,
    });
  }
);

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    try {
      const updateProduct = await service.update(id, body);
      res.json({
        message: 'Update',
        data: updateProduct,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.delete('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const deleteProductId = await service.delete(id);
    res.json({
      message: 'Delete',
      deleteProductId,
    });
  });

module.exports = router;
