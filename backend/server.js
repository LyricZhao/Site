const root_path = process.cwd()

const Koa = require('koa')
const BodyParser = require('koa-bodyparser')
const Cors = require('koa2-cors')
const Logger = require(root_path + '/logger/logger.js')
const Router = require('koa-router')
const Routes = require(root_path + '/router/router.js')
const ServerSettings = require(root_path + '/settings/server.js')

const app = new Koa()
if(ServerSettings.enable_koa_cors) {
    app.use(Cors({credentials: true}))
}
app.use(BodyParser())
const router = new Router()
router.use('/api', Routes.routes(), Routes.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())

var server = app.listen(ServerSettings.port, () => {
    Logger.Info('Backend server successfully starts on port ' + ServerSettings.port + '.', 'server.js:server')
})

module.exports = server