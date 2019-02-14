const root_path = process.cwd()

const settings = require(root_path + '/settings/logger.js')

const ColorFormat = (str, background_color, font_color) => {
    let prefix = '\033[' + String(background_color) + ';' + String(font_color) + 'm'
    let suffix = '\033[0m'
    return prefix + str + suffix
}

const Log = (info, type, position) => {
    if(settings.enable !== true) return
    let str = '', current_time = new Date()
    if(settings.with_type) str = str + ColorFormat('[' + type + ']', settings.type_background_color, settings.type_font_color) + ' '
    if(settings.with_time) str = str + ColorFormat('[' + current_time + ']', settings.time_background_color, settings.time_font_color) + ' '
    if(settings.with_position && position !== '') str = str + ColorFormat('[' + position + ']', settings.position_background_color, settings.position_font_color) + ' '
    if(settings.with_info) str = str + ColorFormat(info, settings.info_background_color, settings.info_font_color)
    console.log(str)
}

const Info = (str, position = '') => {
    Log(str, 'INFO', position)
}

const Warn = (str, position = '') => {
    Log(str, 'WARN', position)
}

const Error = (str, position = '') => {
    Log(str, 'ERRO', position)
}

const Debug = (str, position = '') => {
    Log(str, 'DBUG', position)
}

module.exports = {
    Info, Warn, Error, Debug
}