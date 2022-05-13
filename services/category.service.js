const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class CategoryService {
  constructor() { }
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }
  async find() {
    const rta = true;
    return rta;
  }
  async findOne(id) {
    const user = id
    return user;
  }
  async update(id, changes) {
    const user = id;
    const rta = id;
    return rta;
  }
  async delete(id) {
    // const user = await this.findOne(id);
    // const rta = await user.destroy();
    return id;
  }
}
module.exports = CategoryService;
