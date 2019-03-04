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
child_router.post('/delete_file', manage.deleteFile)

const multer = require('koa-multer')
const upload_background = multer({dest: process.cwd() + '/uploads/background/'})
const upload_file = multer({dest: process.cwd() + '/uploads/file/'})
const upload_profile = multer({dest: process.cwd() + '/uploads/profile/'})
child_router.post('/upload_background', upload_background.single('background'), manage.uploadBackground)
child_router.post('/upload_file', upload_file.single('file'), manage.uploadFile)
child_router.post('/upload_profile', upload_profile.single('profile'), manage.uploadProfile)

module.exports = child_router
