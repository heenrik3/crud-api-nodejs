import express from 'express'

import ProductController from '../controllers/ProductController.js'

const router = express.Router()

router
  .route('/')
  .get(ProductController.getAll)
  .post(ProductController.createOne)

export default router
