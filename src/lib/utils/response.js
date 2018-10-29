const HTTP_STATUS_500 = 500
const HTTP_STATUS_400 = 400
const HTTP_STATUS_200 = 200




const makeResponse = (ctx, status) => {
  ctx.status = status
  return (body) => {
    ctx.body = body
    return
  }
}

const validatationErrorResponse = (ctx, validationError, reqBody, message) => {
  const { details } = validationError
  const invalid = details[0].path[0]
  const errorMessage = details[0].message

  makeResponse(ctx, HTTP_STATUS_400)({
    message: `validatationErrorResponse - ${message}`,
    reqBody,
    resBody: {
      error: validationError,
      invalid,
      errorMessage,
    }
  })
  return ctx
}

const businessLogicErrorErrorResponse = (ctx, error, reqBody) => {
  const { httpStatusCode, message, data } = error
  console.log(error)
  makeResponse(ctx, httpStatusCode)({
    message: `businessLogicErrorErrorResponse - ${message}`,
    reqBody,
    resBody: {
      error: data,
    }
  })
  return ctx
}

const anywayErrorResponse = (ctx, anywayError, reqBody, message) => {
  console.log(anywayError)
  makeResponse(ctx, HTTP_STATUS_500)({
    message: `anywayErrorResponse - ${message}`,
    reqBody,
    resBody: {
      error: anywayError,
    }
  })
  return ctx
}

const response = (ctx, reqBody, resBody, message) => {
  ctx.status = HTTP_STATUS_200
  ctx.body = {
    message,
    reqBody,
    resBody,
  }
}


module.exports = {
  makeResponse,
  validatationErrorResponse,
  businessLogicErrorErrorResponse,
  anywayErrorResponse,
  response,
}



