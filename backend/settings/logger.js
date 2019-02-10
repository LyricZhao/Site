const root_path = process.cwd()

const Color = require(root_path + '/settings/color.js')

module.exports = {
    enable: true,
    with_type: true,
    with_time: true,
    with_position: true,
    with_info: true,
    type_background_color: Color.background.green,
    type_font_color: Color.font.black,
    time_background_color: Color.background.white,
    time_font_color: Color.font.red,
    position_background_color: Color.background.blue,
    position_font_color: Color.font.white,
    info_background_color: Color.background.black,
    info_font_color: Color.font.white
}