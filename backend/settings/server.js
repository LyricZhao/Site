const sha1 = require('sha1')

module.exports = {
    port: 8002,
    root_pass: sha1('dxrhaokan'),
    enable_koa_cors: true,
    clean_before_start: true
}