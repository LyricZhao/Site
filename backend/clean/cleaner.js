const del = require('del')

module.exports = {
    cleanUploads: () => {
        del([
            './uploads/background/*',
            './uploads/file/*',
            './uploads/profile/*'
        ])
    }
}