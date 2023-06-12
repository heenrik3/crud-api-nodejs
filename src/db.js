import dotenv from 'dotenv'
import Sequelize from 'sequelize'

dotenv.config()

const options = {
  dialect: 'sqlite',
  storage: `./${process.env.DB}`,
}

const db = new Sequelize(options)

export default db
