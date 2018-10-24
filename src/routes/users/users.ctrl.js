

exports.getUserListController = (ctx) => {
  const { params } = ctx
  const { query } = ctx.request
  console.log(params, query)
  ctx.body = {
    methodName: 'getUserListController',
    reqBody: {
      params,
      query,
    },
    resBody: {
      users: [],
    },
  }
}

exports.postUserController = (ctx) => {
  const { body } = ctx.request
  console.log(body)
  ctx.body = {
    methodName: 'postUserController',
    reqBody: {
      body,
    },
    resBody: {
      user: {},
    },
  }
}

exports.getUserController = (ctx) => {
  const { params } = ctx
  const { query } = ctx.request
  console.log(params, query)
  ctx.body = {
    methodName: 'getUserController',
    reqBody: {
      params,
      query,
    },
    resBody: {
      user: {},
    },
  }
}

exports.putUserController = (ctx) => {
  const { params } = ctx
  const { body } = ctx.request
  console.log(params, body)
  ctx.body = {
    methodName: 'putUserController',
    reqBody: {
      params,
      body,
    },
    resBody: {
      user: {},
    }
  }
}

exports.patchUserController = (ctx) => {
  const { params } = ctx
  const { body } = ctx.request
  console.log(params, body)
  ctx.body = {
    methodName: 'patchUserController',
    reqBody: {
      params,
      body,
    },
    resBody: {
      user: {},
    }
  }
}

exports.deleteUserController = (ctx) => {
  const { params } = ctx
  console.log(params)
  ctx.body = {
    methodName: 'deleteUserController',
    reqBody: params,
  }
}