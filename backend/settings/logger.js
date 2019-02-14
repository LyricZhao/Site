const root_path = process.cwd()

const color = require(root_path + '/settings/color.js')

module.exports = {
    enable: true,
    with_type: true,
    with_time: true,
    with_position: true,
    with_info: true,
    type_background_color: color.background.green,
    type_font_color: color.font.black,
    time_background_color: color.background.white,
    time_font_color: color.font.red,
    position_background_color: color.background.blue,
    position_font_color: color.font.white,
    info_background_color: color.background.black,
    info_font_color: color.font.white
}