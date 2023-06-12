import Exception from '../utils/Exception.js'

const constructError = (code, status, message) => {
  return {
    code,
    status,
    message,
  }
}

export const createError = (err) => {
  let error

  // console.log(err instanceof Exception)
  // Handle known errors
  if (err instanceof Exception) {
    error = constructError(err.code, err.status, err.message)
    // } else if (err.name === 'SequelizeValidationError') {
    //   error = constructError(400, 'fail', err.message)
    // } else if (err.name === 'SequelizeUniqueConstraintError') {
    //   error = constructError(400, 'fail', `You${err.errors.toString()}`)
  } else {
    error.code = 500
    error.status = 'fail'
    error.message = 'An unknown error happened.'
  }

  return error
}

const sendError = (err, res) => {
  res.status(err.code).json({ status: err.status, message: err.message })
}

const errorHandler = (err, req, res, next) => {
  const error = createError(err)

  sendError(error, res)
}

export default errorHandler
