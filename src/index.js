// Koa Pacakge
const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const compress = require('koa-compress')

const routes = require('./routes')
const app = new Koa()

// Koa Configure
app.use(bodyParser())
app.use(compress())

app.use(routes.allowedMethods())
app.use(routes.routes())

app.listen(4000, () => {
  console.log(`[localhost:4000]: server is running now`)
})

module.exports = app
