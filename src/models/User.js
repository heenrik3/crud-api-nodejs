import Sequelize from 'sequelize'
import db from '../db.js'
import Exception from '../utils/Exception.js'

const User = db.define(
  'User',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        validatePassword,
      },
    },
    urlAvatar: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false, // Disables the createdAt and updatedAt fields,
    defaultScope: {
      attributes: {
        exclude: ['password'], // Exclude the 'password' attribute by default
      },
    },
  }
)

function validatePassword(password) {
  if (password.length < 8)
    throw new Exception('Password must be at least 8 characters long.', 401)
}

export default User
