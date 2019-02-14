const root_path = process.cwd()

const manage = require(root_path + '/manage/manage.js')
const router = require('koa-router')

const child_router = new router()

child_router.post('/login', manage.Login)
child_router.post('/create', manage.CreateAccount)
child_router.post('/say', manage.Say)

module.exports = child_router
