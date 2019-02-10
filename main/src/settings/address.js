const Basic = {
    site: 'http://localhost',
    main_port: '8080',
    login_port: '8001',
    login_path: '/api/login'
}

export default {
    login_api: Basic.site + ':' + Basic.login_port + Basic.login_path
}