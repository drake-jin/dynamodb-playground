// class BasicError extends Error {
class BasicError {
// throw new BusinessLogicError({ httpStatusCode: 404, message: 'patchUserService' })
// throw new 는 로그가 runtime error처럼 찍혀서 마음에 안들어서 바꿈.

    constructor({ httpStatusCode, message, data }) {
    this.httpStatusCode = httpStatusCode
    this.message = message
    this.data = data
  }
}

class BusinessLogicError extends BasicError {
  constructor(options) {
    super(options)
  }
}

module.exports = {
  BasicError,
  BusinessLogicError,
}
