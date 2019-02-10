const root_path = process.cwd()

const Manage = require(root_path + '/manage/manage.js')
const Router = require('koa-router')

const ChildRouter = new Router()

ChildRouter.post('/login', Manage.Login)

module.exports = ChildRouter
