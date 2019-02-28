const root_path = process.cwd()

const settings = require(root_path + '/settings/logger.js')

const colorFormat = (str, background_color, font_color) => {
    let prefix = '\033[' + String(background_color) + ';' + String(font_color) + 'm'
    let suffix = '\033[0m'
    return prefix + str + suffix
}

const log = (info, type, position) => {
    if(settings.enable !== true) return
    let str = '', current_time = new Date()
    if(settings.with_type) str = str + colorFormat('[' + type + ']', settings.type_background_color, settings.type_font_color) + ' '
    if(settings.with_time) str = str + colorFormat('[' + current_time + ']', settings.time_background_color, settings.time_font_color) + ' '
    if(settings.with_position && position !== '') str = str + colorFormat('[' + position + ']', settings.position_background_color, settings.position_font_color) + ' '
    if(settings.with_info) str = str + colorFormat(info, settings.info_background_color, settings.info_font_color)
    console.log(str)
}

const info = (str, position = '') => {
    log(str, 'INFO', position)
}

const warn = (str, position = '') => {
    log(str, 'WARN', position)
}

const error = (str, position = '') => {
    log(str, 'ERRO', position)
}

const debug = (str, position = '') => {
    log(str, 'DBUG', position)
}

module.exports = {
    info, warn, error, debug
}