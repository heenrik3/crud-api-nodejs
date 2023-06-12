class Exception extends Error {
  constructor(msg, code) {
    super(msg)

    this.code = code
    this.status = `${this.code}`.startsWith('4') ? 'fail' : 'error'

    Error.captureStackTrace(this, this.constructor)
  }
}

export default Exception
