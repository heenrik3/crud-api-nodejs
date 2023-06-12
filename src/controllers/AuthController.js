import jwt from 'jsonwebtoken'
import catchAsync from '../utils/catchAsync.js'
import User from '../models/User.js'
import Exception from '../utils/Exception.js'

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

function createAndSendToken(user, code, res) {
  delete user.dataValues.id
  delete user.dataValues.password

  const token = signToken(user.id)

  res.status(code).json({
    status: 'success',
    token,
    user,
  })
}

const protect = catchAsync(async (req, res, next) => {
  // 1) Get the token and check if it exists

  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer ')
  )
    return next(
      new Exception('You are not logged in. Please log in to access this.', 401)
    )

  const token = req.headers.authorization.split(' ')[1]

  // 2) Verify the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET)

  // 3) Check if the user exists
  const user = await User.findOne({
    attributes: {
      include: ['password'],
    },
    where: {
      id: decoded.id,
    },
  })

  if (!user)
    return next(
      new Exception(
        'This user does not exits. Please, create a new account.',
        401
      )
    )

  req.user = user

  next()
})

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  // 1) Check if email and password exists
  if (!email || !password)
    return next(new Exception('Please provide email and password!', 400))

  // 2) Check if email exists and password is correct
  const user = await User.findOne({ where: { email } })

  if (!user) return next(new Exception('Incorrect email or password', 401))

  createAndSendToken(user, 200, res)
})

const register = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body)

  createAndSendToken(user, 200, res)
})

export default { login, register, protect }
