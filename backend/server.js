const root_path = process.cwd()

const koa = require('koa')
const body_parser = require('koa-bodyparser')
const cors = require('koa2-cors')
const logger = require(root_path + '/logger/logger.js')
const koa_router = require('koa-router')
const path = require('path')
const routes = require(root_path + '/router/router.js')
const static = require('koa-static')
const settings = require(root_path + '/settings/server.js')
const database = require(root_path + '/database/mongo.js')

if(settings.clean_before_start) {
    const cleaner = require(root_path + '/clean/cleaner.js')
    cleaner.cleanUploads()
}

database.load()
const app = new koa()
if(settings.enable_koa_cors) {
    app.use(cors({credentials: true}))
}
app.use(body_parser())
const router = new koa_router()
router.use('/api', routes.routes(), routes.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())

app.use(static(path.join(process.cwd(), './uploads/background/')))
app.use(static(path.join(process.cwd(), './uploads/default/')))
app.use(static(path.join(process.cwd(), './uploads/file/')))
app.use(static(path.join(process.cwd(), './uploads/profile/')))

var server = app.listen(settings.port, () => {
    logger.info('Backend server successfully starts on port ' + settings.port + '.', 'server.js: server')
})

module.exports = server