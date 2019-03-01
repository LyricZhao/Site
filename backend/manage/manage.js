const root_path = process.cwd()

const db = require(root_path + '/database/mongo.js')
const fs = require('fs')
const logger = require(root_path + '/logger/logger.js')
const settings = require(root_path + '/settings/server.js')
const token = require(root_path + '/manage/token.js')

const login = async (ctx) => {
    let user = {
        username: ctx.request.body.username,
        password: ctx.request.body.password
    }
    let doc = await db.findOneUser(user)
    if(doc) {
        doc.token = token.createToken(user.username)
        ctx.body = {
            info: 0,
            real_name: doc.real_name,
            level: doc.level,
            token: doc.token
        }
        doc.save()
        logger.info('A successful login, username: ' + ctx.request.body.username, 'manage.js: Login')
    } else {
        ctx.body = {info: 1}
        logger.info('A failed login, username: ' + ctx.request.body.username, 'manage.js: Login')
    }
    ctx.status = 200
}

/* 0 for success, 1 for invaild password, 2 for duplicate */
const createAccount = async (ctx) => {
    let user = {
        username: ctx.request.body.username,
        real_name: ctx.request.body.real_name,
        password: ctx.request.body.password,
        level: ctx.request.body.level,
        token: ''
    }
    let root_pass = ctx.request.body.root_pass
    ctx.body = {info: root_pass === settings.root_pass ? 0 : 1}
    if(!ctx.body.info) {
        if(await db.findOneUser({username: user.username})) {
            logger.info('A failed creating account request, username duplicate: ' + user.username, 'manage.js: CreateAccount')
            ctx.body.info = 2
        } else {
            db.saveDoc(user)
            logger.info('Successfully created account, username: ' + user.username + ', real name: ' + user.real_name + ', level: ' + String(user.level), 'manage.js: CreateAccount')
        }
    } else {
        logger.info('A failed creating account request with wrong root password.', 'manage.js: CreateAccount')
    }
    ctx.status = 200
}

const grabFile = (ctx, path = '') => {
}

const uploadBackground = async (ctx) => {
}

const uploadFile = async (ctx) => {
}

const uploadProfile = async (ctx) => {

}

module.exports = {
    login, createAccount,
    uploadBackground, uploadFile, uploadProfile
}