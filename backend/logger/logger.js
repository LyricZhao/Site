const root_path = process.cwd()

const Settings = require(root_path + '/settings/logger.js')

const ColorFormat = (str, background_color, font_color) => {
    let prefix = '\033[' + String(background_color) + ';' + String(font_color) + 'm'
    let suffix = '\033[0m'
    return prefix + str + suffix
}

const Log = (info, type, position) => {
    if(Settings.enable !== true) return
    let str = '', current_time = new Date()
    if(Settings.with_type) str = str + ColorFormat('[' + type + ']', Settings.type_background_color, Settings.type_font_color) + ' '
    if(Settings.with_time) str = str + ColorFormat('[' + current_time + ']', Settings.time_background_color, Settings.time_font_color) + ' '
    if(Settings.with_position && position !== '') str = str + ColorFormat('[' + position + ']', Settings.position_background_color, Settings.position_font_color) + ' '
    if(Settings.with_info) str = str + ColorFormat(info, Settings.info_background_color, Settings.info_font_color)
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