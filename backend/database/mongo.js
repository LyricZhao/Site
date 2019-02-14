const root_path = process.cwd()

const logger = require(root_path + '/logger/logger.js')
const mongoose = require('mongoose')
const os = require('os')

const db_options = require(root_path + '/settings/database.js')
const model = require(root_path + '/database/model.js')

var loaded = false
var user_db, user_model
var text_db, text_model
mongoose.Promise = global.Promise
const user_schema = new mongoose.Schema(model.user_schema)
const text_schema = new mongoose.Schema(model.text_schema)

const save_doc = (info) => {
    let doc = new user_model(info)
    doc.save((err, res) => {
        if(err) logger.Error(err, 'mongo.js: save_doc')
    })
}

const save_text = (text) => {
    let doc = new text_model(text)
    doc.save((err, res) => {
        if(err) logger.Error(err, 'mongo.js: save_txt')
    })
}

const find_one_user = async (requirement) => {
    return new Promise((resolve, reject) => {
        user_model.findOne(requirement, (err, doc) => {
            if(err) reject(err)
            resolve(doc)
        })
    })
}

const find_all_user = async (requirement) => {
    return new Promise((resolve, reject) => {
        user_model.find(requirement, (err, doc) => {
            if(err) reject(err)
            resolve(doc)
        })
    })
}

const find_text_user = async (username, sort_by_date = true, find_private = false) => {
    let user = {username: username}
    if(find_private) user.is_private = false
    return new Promise((resolve, reject) => {
        text_model.find(user, null, sort_by_date ? {sort: '-date'} : {}, (err, obj) => {
            if(err) reject(err)
            resolve(obj)
        })
    })
}

const on_user_db_connected = async () => {
    if(db_options.drop_when_start) {
        logger.Info('Database (user) dropped.', 'mongo.js: on_user_db_connected')
        user_db.dropDatabase()
    }
    user_model = user_db.model('user', user_schema)
    logger.Info('Database (user) connected.', 'mongo.js: on_user_db_connected')
    if(db_options.create_admin) {
        save_doc(db_options.admin)
    }
}

const on_text_db_connected = async () => {
    if(db_options.drop_when_start) {
        logger.Info('Database (text) dropped.', 'mongo.js: on_text_db_connected')
        text_db.dropDatabase()
    }
    text_model = text_db.model('text', text_schema)
    logger.Info('Database (text) connected.', 'mongo.js: on_text_db_connected')
}

const close = () => {
    logger.Info('Database connection closed', 'mongo.js: close_db')
    user_db.close()
    text_db.close()
    mongoose.connection.close()
}

const load = () => {
    if(loaded) return
    loaded = true
    logger.Info('Trying to connect to database ...', 'mongo.js: load_db')
    user_db = mongoose.createConnection(db_options.url + '/user', db_options.connect)
    text_db = mongoose.createConnection(db_options.url + '/text', db_options.connect)
    user_db.on('open', on_user_db_connected)
    text_db.on('open', on_text_db_connected)
    user_db.on('error', () => {
        logger.Error('Error when connecting to database (user).', 'mongo.js: load_db')
        process.exit(0)
    })
    text_db.on('error', () => {
        logger.Error('Error when connecting to database (text).', 'mongo.js: load_db')
        process.exit(0)
    })
}

module.exports = {
    load, close,
    save_doc, save_text,
    find_one_user, find_all_user,
    find_text_user
}