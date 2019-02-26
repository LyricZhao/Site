const Basic = {
    site: 'http://localhost',
    main_port: '8080',
    api_port: '8001',
    login_path: '/api/login',
    create_path: '/api/create',
    say_path: '/api/say',
    upload_background_path: '/api/upload_background',
    upload_file_path: '/api/upload_file',
    upload_profile_path: '/api/upload_profile'
}

export default {
    login_api: Basic.site + ':' + Basic.api_port + Basic.login_path,
    create_api: Basic.site + ':' + Basic.api_port + Basic.create_path,
    say_api: Basic.site + ':' + Basic.api_port + Basic.say_path,
    upload_background_api: Basic.site + ':' + Basic.api_port + Basic.upload_background_path,
    upload_file_api: Basic.site + ':' + Basic.api_port + Basic.upload_file_path,
    upload_profile_api: Basic.site + ':' + Basic.api_port + Basic.upload_profile_path
}