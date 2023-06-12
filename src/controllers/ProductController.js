import catchAsync from '../utils/catchAsync.js'
import Product from '../models/Product.js'

const getAll = catchAsync(async (req, res, next) => {
  const products = await Product.findAll()

  res.json({ status: 'success', result: products.length, data: products })
})

async function getOne(req, res, next) {}
const createOne = catchAsync(async (req, res, next) => {
  const product = await Product.create(req.body)

  res.json({ status: 'success', product })
})

const ProductController = { getAll, getOne, createOne }

export default ProductController
