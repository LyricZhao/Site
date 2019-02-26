const root_path = process.cwd()

const manage = require(root_path + '/manage/manage.js')
const router = require('koa-router')

const child_router = new router()

/* TODO: Move into config */

child_router.post('/login', manage.Login)
child_router.post('/create', manage.CreateAccount)
child_router.post('/say', manage.Say)

const multer = require('koa-multer')
const upload_background = multer({dest: process.cwd() + '/uploads/background/'})
const upload_file = multer({dest: process.cwd() + '/uploads/file/'})
const upload_profile = multer({dest: process.cwd() + '/uploads/profile/'})
child_router.post('/upload_background', upload_background.single('background'), manage.UploadBackground)
child_router.post('/upload_file', upload_file.single('file'), manage.UploadFile)
child_router.post('/upload_profile', upload_profile.single('profile'), manage.UploadProfile)

module.exports = child_router
