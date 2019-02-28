const root_path = process.cwd()

const db = require(root_path + '/database/mongo.js')
const fs = require('fs')
const logger = require(root_path + '/logger/logger.js')
const settings = require(root_path + '/settings/server.js')

const Login = async (ctx) => {
    let user = {
        username: ctx.request.body.username,
        password: ctx.request.body.password
    }
    let doc = await db.find_one_user(user)
    ctx.body = {info: doc ? 0 : 1}
    ctx.status = 200
}

/* 0 for success, 1 for invaild password, 2 for duplicate */
const CreateAccount = async (ctx) => {
    let user = {
        username: ctx.request.body.username,
        real_name: ctx.request.body.real_name,
        password: ctx.request.body.password,
        level: ctx.request.body.level
    }
    let root_pass = ctx.request.body.root_pass
    ctx.body = {info: root_pass === settings.root_pass ? 0 : 1}
    if(!ctx.body.info) {
        if(await db.find_one_user({username: user.username})) {
            ctx.body.info = 2
        } else {
            db.save_doc(user)
        }
    }
    ctx.status = 200
}

const Say = async (ctx) => {
    let text = {
        date: (new Date()).toLocaleString(),
        username: ctx.request.body.username,
        context: ctx.request.body.text,
        is_private: ctx.request.body.is_private
    }
    db.save_text(text)
    ctx.status = 200
}

const GrabFile = (ctx, path = '') => {
}

const UploadBackground = async (ctx) => {
}

const UploadFile = async (ctx) => {
}

const UploadProfile = async (ctx) => {

}

module.exports = {
    Login, CreateAccount, Say,
    UploadBackground, UploadFile, UploadProfile
}