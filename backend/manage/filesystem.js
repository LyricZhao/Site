const root_path = process.cwd()

const fs = require('fs')
const logger = require(root_path + '/logger/logger.js')

const getUserPath = (username) => {
    return root_path + '/uploads/file/' + username
}

const mkdirUser = async (username) => {
    let userpath = getUserPath(username)
    fs.exists(userpath, (exists) => {
        if(!exists) fs.mkdirSync(userpath)
    })
}

const storeUserFile = async (username, file) => {
    let filepath = getUserPath(username) + '/' + file.originalname
    fs.rename(file.path, filepath, (err) => {
        if(err) logger.error(err, 'filesystem.js: storeUserFile')
    })
}

const removeFile = async (file) => {
    let filepath = getUserPath(file.username) + '/' + file.file_name
    fs.exists(filepath, (exists) => {
        if(exists) {
            fs.unlinkSync(filepath)
        }
    })
}

module.exports = {
    mkdirUser, storeUserFile, removeFile
}