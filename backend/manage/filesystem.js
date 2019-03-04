const root_path = process.cwd()

const fs = require('fs')
const logger = require(root_path + '/logger/logger.js')

const getUserPath = (username) => {
    return root_path + '/uploads/file/' + username
}

const mkdirUser = (username) => {
    let userpath = getUserPath(username)
    if(!fs.existsSync(userpath)) {
        fs.mkdirSync(userpath)
        logger.info('Creating BOPAN dir for ' + username, 'filesystem.js: mkdirUser')
    }
}

const storeUserFile = (username, file) => {
    let filepath = getUserPath(username) + '/' + file.originalname
    fs.renameSync(file.path, filepath)
    logger.info('Writing into file: ' + filepath, 'filesystem.js: storeUserFile')
}

const removeFile = (file) => {
    let filepath = getUserPath(file.username) + '/' + file.file_name
    if(fs.existsSync(filepath)) {
        fs.unlinkSync(filepath)
        logger.info('Removing file: ' + filepath, 'filesystem.js: removeFile')
    }
}

module.exports = {
    mkdirUser, storeUserFile, removeFile
}