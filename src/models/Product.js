import Sequelize from 'sequelize'
import db from '../db.js'

const Product = db.define(
  'Product',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  },
  {
    id: false,
    timestamps: false, // Disables the createdAt and updatedAt fields,
  }
)

export default Product
