const root_path = process.cwd()

const manage = require(root_path + '/manage/manage.js')
const router = require('koa-router')

const child_router = new router()

/* TODO: Move into config */

child_router.post('/login', manage.login)
child_router.post('/create', manage.createAccount)
child_router.post('/get_all_user', manage.getAllUser)

child_router.get('/get_profile', manage.getProfile)
child_router.get('/get_background', manage.getBackground)

child_router.post('/get_file_list', manage.getFileList)
child_router.post('/get_album_list', manage.getAlbumList)
child_router.post('/delete_file', manage.deleteFile)
child_router.post('/delete_album', manage.deleteAlbum)

const multer = require('koa-multer')
const upload_background = multer({dest: process.cwd() + '/uploads/background/'})
const upload_file = multer({dest: process.cwd() + '/uploads/file/'})
const upload_profile = multer({dest: process.cwd() + '/uploads/profile/'})
const upload_album = multer({dest: process.cwd() + '/uploads/file/'})
child_router.post('/upload_background', upload_background.single('background'), manage.uploadBackground)
child_router.post('/upload_file', upload_file.single('file'), manage.uploadFile)
child_router.post('/upload_profile', upload_profile.single('profile'), manage.uploadProfile)
child_router.post('/upload_album', upload_profile.single('album'), manage.uploadAlbum)

module.exports = child_router
