const { BusinessLogicError } = require('lib/utils/error')
const { response, businessLogicErrorErrorResponse, anywayErrorResponse } = require('lib/utils/response')
const usersService = require('./users.service')

exports.getUserListController = async (ctx) => {
  const TAG = 'getUserList'
  const { query } = ctx.request

  try {
    const resBody = await usersService.getUserListService(query)
    response(ctx, { query }, resBody, TAG)
  } catch (error) {
    anywayErrorResponse(ctx, error, { query }, TAG)
  }
}

exports.postUserController = async (ctx) => {
  const TAG = 'postUser'
  const { body } = ctx.request

  try {
    const resBody = await usersService.postUserService(body)
    response(ctx, { body }, resBody, TAG)
  } catch (error) {
    anywayErrorResponse(ctx, error, { body }, TAG)
  }
}

exports.getUserController = async (ctx) => {
  const TAG = 'postUser'
  const { params } = ctx

  try {
    const resBody = await usersService.getUserService(params)
    response(ctx, { params }, resBody, TAG)
  } catch (error) {
    if (error instanceof BusinessLogicError) {
      businessLogicErrorErrorResponse(ctx, error, { params, body }, TAG)
    } else {
      anywayErrorResponse(ctx, error, { params, body }, TAG)
    }
  }
}

exports.putUserController = async (ctx) => {
  const TAG = 'putUser'
  const { params } = ctx
  const { body } = ctx.request

  try {
    const resBody = await usersService.putUserService({ ...params, ...body })
    response(ctx, { params, body }, resBody, TAG)
  } catch (error) {
    if (error instanceof BusinessLogicError) {
      businessLogicErrorErrorResponse(ctx, error, { params, body }, TAG)
    } else {
      anywayErrorResponse(ctx, error, { params, body }, TAG)
    }
  }
}

exports.patchUserController = async (ctx) => {
  const TAG = 'patchUser'
  const { params } = ctx
  const { body } = ctx.request

  try {
    const resBody = await usersService.patchUserService({ ...params, ...body })
    response(ctx, { params, body }, resBody, TAG)
  } catch (error) {
    if (error instanceof BusinessLogicError) {
      businessLogicErrorErrorResponse(ctx, error, { params, body }, TAG)
    } else {
      anywayErrorResponse(ctx, error, { params, body }, TAG)
    }
  }
}

exports.deleteUserController = async (ctx) => {
  const TAG = 'deleteUser'
  const { params } = ctx

  try {
    const resBody = await usersService.deleteUserService({ ...params })
    response(ctx, { params }, resBody, TAG)
  } catch (error) {
    if (error instanceof BusinessLogicError) {
      businessLogicErrorErrorResponse(ctx, error, { params }, TAG)
    } else {
      anywayErrorResponse(ctx, error, { params }, TAG)
    }
  }
}