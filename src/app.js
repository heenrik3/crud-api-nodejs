import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import hpp from 'hpp'
import xss from 'xss-clean'
import compression from 'compression'
import dotenv from 'dotenv'

import productRoutes from './routes/ProductRoutes.js'
import authRoutes from './routes/AuthRoutes.js'
import AuthController from './controllers/AuthController.js'

import errorHandler from './controllers/ErrorController.js'

dotenv.config()

const V1 = '/api/v1/'

const app = express()

app.disable('powered-by')

app.use(cors())

app.use(helmet())

app.use(hpp())

app.use(xss())

app.use(compression())

app.use(express.json({ limit: '10kb' }))

app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} at ${req.url}`)
  next()
})

app.use(V1 + 'products', productRoutes)

app.use(V1 + 'auth', authRoutes)

app.use(V1, AuthController.protect)

app.use(errorHandler)

export default app
