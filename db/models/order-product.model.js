const { Model, DataTypes, Sequelize } = require('sequelize');

const { ORDER_TABLE } = require('./order.model');
const { PRODUCT_TABLE } = require('./product.model');

const ORDER_PRODUCT_TABLE = 'orders_products';

const OrderProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  orderId: {
    field: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    // a que tabla va relacionada y la llave
    references: {
      model: ORDER_TABLE,
      key: 'id',
    },
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    // a que tabla va relacionada y la llave
    references: {
      model: PRODUCT_TABLE,
      key: 'id',
    },
  },
  createdAt: {
    allowNull: false,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
    type: DataTypes.DATE,
  },
};

class OrderProduct extends Model {
  static associate(models) {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: 'OrderProduct',
      timestamps: false,
    };
  }
}

module.exports = {
  ORDER_PRODUCT_TABLE,
  OrderProductSchema,
  OrderProduct,
};
