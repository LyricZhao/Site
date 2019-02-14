const root_path = process.cwd()

const logger = require(root_path + '/logger/logger.js')
const mongoose = require('mongoose')
const os = require('os')

const db_options = require(root_path + '/settings/database.js')
const model = require(root_path + '/database/model.js')

var main_db, user_model, loaded = false
mongoose.Promise = global.Promise
const user_schema = new mongoose.Schema(model.user_schema)

const save_doc = (doc) => {
    doc.save((err, res) => {
        if(err) logger.Error(err, 'mongo.js: save_doc')
    })
}

const find_one = async (requirement) => {
    return new Promise((resolve, reject) => {
        user_model.findOne(requirement, (err, doc) => {
            if(err) reject(err)
            resolve(doc)
        })
    })
}

const on_db_connected = async () => {
    if(db_options.drop_when_start) {
        logger.Info('Database dropped.', 'mongo.js: on_db_connected')
        main_db.dropDatabase()
    }
    logger.Info('Database connected.', 'mongo.js: on_db_connected')
    user_model = main_db.model('user', user_schema)
    let admin = new user_model(db_options.admin)
    save_doc(admin)
}

const close = () => {
    logger.Info('Database connection closed', 'mongo.js: close_db')
    main_db.close()
    mongoose.connection.close()
}

const load = () => {
    if(loaded) return
    loaded = true
    logger.Info('Trying to connect to database', 'mongo.js: load_db')
    main_db = mongoose.createConnection(db_options.url + '/user', db_options.connect)
    main_db.on('open', on_db_connected)
    main_db.on('error', () => {
        logger.Error('Error when connecting to database.', 'mongo.js: load_db')
        process.exit(0)
    })
}

module.exports = {
    load, close, save_doc,
    find_one
}