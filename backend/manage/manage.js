const root_path = process.cwd()

const db = require(root_path + '/database/mongo.js')
const fs = require('fs')
const logger = require(root_path + '/logger/logger.js')
const settings = require(root_path + '/settings/server.js')
const token = require(root_path + '/manage/token.js')
const mfs = require(root_path + '/manage/filesystem.js')

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
            username: doc.username,
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
    mfs.mkdirUser(user.username)
    ctx.status = 200
}

const uploadBackground = async (ctx) => {
    let doc = await db.findOneUser({username: ctx.req.body.username})
    doc.background = ctx.req.file.path
    doc.save()
    ctx.status = 200
}

const getFileList = async (ctx) => {
    let files = await db.findAllFile({username: ctx.request.body.username})
    ctx.status = 200
    ctx.body = {list: files}
}

const uploadFile = async (ctx) => {
    let username = ctx.req.body.username
    let doc = await db.findOneFile({username: username, file_name: ctx.req.file.originalname})
    ctx.status = 200
    if(doc) {
        ctx.body = {info: 1}
    } else {
        ctx.body = {info: 0}
        let file = {
            username: username,
            file_name: ctx.req.file.originalname,
            date: (new Date()).toLocaleString()
        }
        db.saveFile(file)
        mfs.storeUserFile(username, ctx.req.file)
    }
}

const deleteFile = async (ctx) => {
    let file = {
        username: ctx.request.body.username,
        file_name: ctx.request.body.file_name
    }
    ctx.status = 200
    db.removeOneFile(file)
    mfs.removeFile(file)
}

const uploadProfile = async (ctx) => {
    let doc = await db.findOneUser({username: ctx.req.body.username})
    doc.profile = ctx.req.file.path
    doc.save()
    ctx.status = 200
}

const processPath = (path, attr) => {
    if (!path) {
      if (attr === 'profile') return 'peppa.png'
      return 'background.jpeg'
    }
    let sp = path.split('/')
    return sp[sp.length - 1]
}

const getProfile = async (ctx) => {
    let doc = await db.findOneUser({username: ctx.query.username})
    if(!doc) {
        ctx.status = 403
    } else {
        ctx.status = 200
        ctx.redirect('/' + processPath(doc.profile, 'profile'))
    }
}

const getBackground = async (ctx) => {
    if(!ctx.query.username) {
        ctx.redirect('/background.jpeg')
    } else {
        let doc = await db.findOneUser({username: ctx.query.username})
        if(!doc) {
            ctx.status = 403
        } else {
            ctx.status = 200
            ctx.redirect('/' + processPath(doc.background, 'background'))
        }    
    }
}

const getAllUser = async (ctx) => {
    let db_data = await db.findAllUser({})
    let level_map = ['管理员', '小仙女', '小伙伴']
    ctx.body = {friends: []}
    for(let i in db_data) {
        ctx.body.friends.push({
            username: db_data[i].username,
            real_name: db_data[i].real_name,
            level_name: level_map[db_data[i].level]
        })
    }
    ctx.status = 200
}

module.exports = {
    login, createAccount,
    uploadBackground, uploadProfile, getAllUser,
    getProfile, getBackground,
    uploadFile, getFileList, deleteFile
}