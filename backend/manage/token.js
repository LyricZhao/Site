const root_path = process.cwd()

const db = require(root_path + '/database/mongo.js')
const jwt = require('jsonwebtoken')
const logger = require(root_path + '/logger/logger.js')

var createToken = (user_id) => {
    const token = jwt.sign({
        user_id: user_id
    }, 'lyricz', {
        expiresIn: '60s'
    })
    return token
}

var checkToken = async (ctx, callback) => {
    let username = undefined
    if(ctx.request.body.hasOwnProperty('username')) {
        username = ctx.request.body.username
    } else if(ctx.req.hasOwnProperty('username')) {
        username = ctx.req.username
    }
    if(ctx.request.header['authorization'] && username) {
        let doc = await db.find_one_user({
            username: username,
            token: ctx.request.header['authorization']
        })
        if(doc) {
            callback()
        } else {
            logger.Info('Invalid token detected', 'token.js: checkToken')            
            ctx.status = 401
        }
    } else {
        logger.Info('No token or username detected', 'token.js: checkToken')
        ctx.status = 401
    }
}

module.exports = {
    createToken, checkToken
}