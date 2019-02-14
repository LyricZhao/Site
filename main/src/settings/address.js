const Basic = {
    site: 'http://localhost',
    main_port: '8080',
    api_port: '8001',
    login_path: '/api/login',
    create_path: '/api/create',
    say_path: '/api/say'
}

export default {
    login_api: Basic.site + ':' + Basic.api_port + Basic.login_path,
    create_api: Basic.site + ':' + Basic.api_port + Basic.create_path,
    say_api: Basic.site + ':' + Basic.api_port + Basic.say_path
}