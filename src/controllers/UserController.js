import catchAsync from '../utils/catchAsync.js'
import User from '../models/User.js'

const getOne = catchAsync(async (id) => {
  return User.findOne({ where: { id } })
})

export default { getOne, createOne }
