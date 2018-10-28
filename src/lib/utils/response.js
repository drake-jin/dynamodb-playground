

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
    message,
    reqBody,
    resBody: {
      invalid,
      errorMessage,
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
  response,
}



