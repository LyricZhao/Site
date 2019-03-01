const basic = {
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
    login_api: basic.site + ':' + basic.api_port + basic.login_path,
    create_api: basic.site + ':' + basic.api_port + basic.create_path,
    say_api: basic.site + ':' + basic.api_port + basic.say_path,
    upload_background_api: basic.site + ':' + basic.api_port + basic.upload_background_path,
    upload_file_api: basic.site + ':' + basic.api_port + basic.upload_file_path,
    upload_profile_api: basic.site + ':' + basic.api_port + basic.upload_profile_path
}