const level_enum = {
    admin: 0,
    lover: 1,
    friend: 2
}

const user_schema = {
    username: String,
    real_name: String,
    password: String,
    level: Number
}

module.exports = {
    level_enum: level_enum,
    user_schema: user_schema
}