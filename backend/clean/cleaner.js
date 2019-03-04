const root_path = process.cwd()

const del = require('del')
const fs = require('fs')

module.exports = {
    cleanUploads: () => {
        console.log(root_path)
        console.log(del.sync([
            root_path + '/uploads/background/**',
            root_path + '/uploads/file/**',
            root_path + '/uploads/profile/**'
        ]))
        fs.mkdirSync(root_path + '/uploads/background')
        fs.mkdirSync(root_path + '/uploads/file')
        fs.mkdirSync(root_path + '/uploads/profile')
    }
}