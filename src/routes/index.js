const Route = require('koa-router')

const users = require('./users')


const route = new Route()

route.use('/users', users.routes())

module.exports = route