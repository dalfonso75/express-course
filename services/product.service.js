const faker = require('faker');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');
class ProductsService {
  constructor() { }

  async find() {
    const products = await models.Product.findAll();
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    return product;
  }

  async create(data) {
    const newCategory = await models.Product.create(data);
    return newCategory;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const updateProduct = await product.update(changes);
    return updateProduct;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return id
  }
}

module.exports = ProductsService;
