const root_path = process.cwd()

const sha1 = require('sha1')
const model = require(root_path + '/database/model.js')

const connect_options = {
    autoReconnect: true,
    connectTimeoutMS: 3000,
    keepAlive: true,
    poolSize: 10,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    socketTimeoutMS: 3000,
    useNewUrlParser: true,
}

const admin = {
    username: 'lyricz',
    real_name: 'Chenggang Zhao',
    password: sha1('ilovepauline'),
    level: model.level_enum.admin
}

module.exports = {
    admin: admin,
    connect: connect_options,
    create_admin: true,
    drop_when_start: true,
    url: 'mongodb://localhost'
}