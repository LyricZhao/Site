const root_path = process.cwd()

const logger = require(root_path + '/logger/logger.js')
const mongoose = require('mongoose')
const os = require('os')

const db_options = require(root_path + '/settings/database.js')
const model = require(root_path + '/database/model.js')

var loaded = false
var user_db, user_model
var file_db, file_model
mongoose.Promise = global.Promise
const user_schema = new mongoose.Schema(model.user_schema)
const file_schema = new mongoose.Schema(model.file_schema)

const saveDoc = (info) => {
    let doc = new user_model(info)
    doc.save((err, res) => {
        if(err) logger.error(err, 'mongo.js: saveDoc')
    })
}

const saveFile = (file) => {
    let doc = new file_model(file)
    doc.save((err, res) => {
        if(err) logger.error(err, 'mongo.js: saveFile')
    })
}

const findOneUser = async (requirement) => {
    return new Promise((resolve, reject) => {
        user_model.findOne(requirement, (err, doc) => {
            if(err) reject(err)
            resolve(doc)
        })
    })
}

const findAllUser = async (requirement) => {
    return new Promise((resolve, reject) => {
        user_model.find(requirement, (err, doc) => {
            if(err) reject(err)
            resolve(doc)
        })
    })
}

const findFileUser = async (username) => {
    let user = {username: username}
    return new Promise((resolve, reject) => {
        file_model.find(user, (err, obj) => {
            if(err) reject(err)
            resolve(obj)
        })
    })
}

const onUserDbConnected = async () => {
    if(db_options.drop_when_start) {
        logger.info('Database (user) dropped.', 'mongo.js: onUserDbConnected')
        user_db.dropDatabase()
    }
    user_model = user_db.model('user', user_schema)
    logger.info('Database (user) connected.', 'mongo.js: onUserDbConnected')
    if(db_options.create_admin) {
        saveDoc(db_options.admin)
    }
}

const onFileDbConnected = async () => {
    if(db_options.drop_when_start) {
        logger.info('Database (file) dropped.', 'mongo.js: onFileDbConnected')
        file_db.dropDatabase()
    }
    file_model = file_db.model('file', file_schema)
    logger.info('Database (file) connected.', 'mongo.js: onFileDbConnected')
}

const close = () => {
    logger.info('Database connection closed', 'mongo.js: close_db')
    user_db.close()
    file_db.close()
    mongoose.connection.close()
}

const load = () => {
    if(loaded) return
    loaded = true
    logger.info('Trying to connect to database ...', 'mongo.js: load')
    user_db = mongoose.createConnection(db_options.url + '/user', db_options.connect)
    file_db = mongoose.createConnection(db_options.url + '/file', db_options.connect)
    user_db.on('open', onUserDbConnected)
    file_db.on('open', onFileDbConnected)
    user_db.on('error', () => {
        logger.error('Error when connecting to database (user).', 'mongo.js: load')
        process.exit(0)
    })
    file_db.on('error', () => {
        logger.error('Error when connecting to database (file).', 'mongo.js: load')
    })
}

module.exports = {
    load, close,
    saveDoc, saveFile,
    findOneUser, findAllUser,
    findFileUser
}