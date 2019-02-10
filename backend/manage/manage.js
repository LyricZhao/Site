const root_path = process.cwd()

const Logger = require(root_path + '/logger/logger.js')

const Login = async (ctx) => {
    let username = ctx.request.body.username
    let password = ctx.request.body.password
    Logger.Debug('Login: ' + username + ': ' + password)
    ctx.status = 200
}

module.exports = {
    Login
}