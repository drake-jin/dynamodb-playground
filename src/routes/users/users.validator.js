const Joi = require('joi')
const { validatationErrorResponse } = require('lib/utils/response')

module.exports.getUserListValidator = async (ctx, next) => {
  const { query } = ctx.request

  const schema = Joi.object({
    order: Joi.any().valid(['asc', 'desc']),
    status: Joi.any().valid(['blind', 'display', 'banned']),
  })
  const validation = Joi.validate(query, schema)
  if (validation.error) {
    validatationErrorResponse(ctx, validation.error, query)
    return
  }

  await next()
}


module.exports.postUserValidator = async (ctx, next) => {
  const { body } = ctx.request

  const schema = Joi.object({
    phone: Joi.string().regex(/^[0-9]{11}$/i).required(),
    name: Joi.string().min(2).max(50).required(),
    nickname: Joi.string().min(2).max(50).required(),
    age: Joi.number().required(),
    job: Joi.string().min(2).max(50).required(),
    location: Joi.string().min(2).max(50).required(),
    groups: Joi.array(),
  })
  const validation = Joi.validate(body, schema)
  if (validation.error) {
    validatationErrorResponse(ctx, validation.error, body)
    return
  }

  await next()
}

module.exports.getUserValidator = async (ctx, next) => {
  const { params } = ctx

  const schema = Joi.object({
    id: Joi.number().required(),
  })
  const validation = Joi.validate(params, schema)
  if (validation.error) {
    validatationErrorResponse(ctx, validation.error, params)
    return
  }
  await next()
}

module.exports.putUserValidator = async (ctx, next) => {
  const { params } = ctx
  const { body } = ctx.request

  const schema = Joi.object({
    phone: Joi.string().regex(/^[0-9]{11}$/i).required(),
    name: Joi.string().min(2).max(50).required(),
    nickname: Joi.string().min(2).max(50).required(),
    age: Joi.number().required(),
    job: Joi.string().min(2).max(50).required(),
    location: Joi.string().min(2).max(50).required(),
    groups: Joi.array(),
    id: Joi.number().required(),
  })
  const validation = Joi.validate({ ...body, ...params }, schema)
  if (validation.error) {
    validatationErrorResponse(ctx, validation.error, body)
    return
  }

  await next()
}

module.exports.patchUserValidator = async (ctx, next) => {
  const { body } = ctx.request

  const schema = Joi.object({
    status: Joi.any().valid(['display', 'blind', 'banned']).required(),
  })
  const validation = Joi.validate(body, schema)
  if (validation.error) {
    validatationErrorResponse(ctx, validation.error, body)
    return
  }

  await next()
}

module.exports.deleteUserValidator = async (ctx, next) => {
  const { params } = ctx

  const schema = Joi.object({
    id: Joi.number().required(),
  })
  const validation = Joi.validate(params, schema)
  if (validation.error) {
    validatationErrorResponse(ctx, validation.error, params)
    return
  }
  await next()
}
