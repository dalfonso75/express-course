const express = require('express');
const router = express.Router();

const CustomerService = require('../services/customer.service');
const service = new CustomerService();

const validatorHandler = require('../middlewares/validator.handler');
const {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
} = require('../schemas/customer.schema');

router.get('/', async (req, res, next) => {
  try {
    const customers = await service.find();
    res.json(customers);
  } catch (err) {
    next(err)
  }
});

router.get(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await service.findOne(id);
      res.json(customer);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCustomer = await service.create(body);
      res.status(201).json({ message: 'Created Customer', data: newCustomer });
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updateCustomer = await service.update(id, body);
      res.json({
        message: 'Update Customer',
        data: updateCustomer,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleteCustomerId = await service.delete(id);
      res.status(201).json({
        message: 'Delete Customer',
        deleteCustomerId,
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
