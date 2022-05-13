const express = require('express');
const router = express.Router();

const OrdesService = require('../services/order.service');
const service = new OrdesService();

const validatorHandler = require('../middlewares/validator.handler');
const {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema,
} = require('../schemas/order.schema');

router.get('/', async (req, res, next) => {
  try {
    const orders = await service.find();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const order = await service.findOne(id);
      res.json(order);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json({
        message: 'Created Order',
        data: newOrder,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updateOrder = await service.update(id, body);
      res.json({
        message: 'Update',
        data: updateOrder,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleteOrderId = await service.delete(id);
      res.json({
        message: 'Delete',
        deleteOrderId,
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
