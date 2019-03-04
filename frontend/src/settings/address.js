const basic = {
    site: 'http://localhost',
    static_server: 'http://localhost:8001',
    main_port: '8080',
    api_port: '8001',
    login_path: '/api/login',
    create_path: '/api/create',
    say_path: '/api/say',
    upload_background_path: '/api/upload_background',
    upload_file_path: '/api/upload_file',
    upload_album_path: '/api/upload_album',
    upload_profile_path: '/api/upload_profile',
    get_profile_path: '/api/get_profile',
    get_background_path: '/api/get_background',
    get_file_list_path: '/api/get_file_list',
    delete_file_path: '/api/delete_file',
    get_all_user_path: '/api/get_all_user',
    get_album_list_path: '/api/get_album_list',
    delete_album_path: '/api/delete_album'
}

export default {
    static_server: basic.static_server,
    login_api: basic.site + ':' + basic.api_port + basic.login_path,
    create_api: basic.site + ':' + basic.api_port + basic.create_path,
    say_api: basic.site + ':' + basic.api_port + basic.say_path,
    upload_background_api: basic.site + ':' + basic.api_port + basic.upload_background_path,
    upload_album_api: basic.site + ':' + basic.api_port + basic.upload_album_path,
    upload_file_api: basic.site + ':' + basic.api_port + basic.upload_file_path,
    upload_profile_api: basic.site + ':' + basic.api_port + basic.upload_profile_path,
    get_profile_api: basic.site + ':' + basic.api_port + basic.get_profile_path,
    get_background_api: basic.site + ':' + basic.api_port + basic.get_background_path,
    get_file_list_api: basic.site + ':' + basic.api_port + basic.get_file_list_path,
    delete_file_api: basic.site + ':' + basic.api_port + basic.delete_file_path,
    get_all_user_api: basic.site + ':' + basic.api_port + basic.get_all_user_path,
    get_album_list_api: basic.site + ':' + basic.api_port + basic.get_album_list_path,
    delete_album_api: basic.site + ':' + basic.api_port + basic.delete_album_path
}