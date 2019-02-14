const root_path = process.cwd()

const db = require(root_path + '/database/mongo.js')
const logger = require(root_path + '/logger/logger.js')

const Login = async (ctx) => {
    let user = {
        username: ctx.request.body.username,
        password: ctx.request.body.password
    }
    let doc = await db.find_one(user)
    ctx.body = {info: doc ? 0 : 1}
    ctx.status = 200
}

module.exports = {
    Login
}