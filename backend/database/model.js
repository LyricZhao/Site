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

const text_schema = {
    date: String,
    username: String,
    context: String,
    is_private: Boolean
}

module.exports = {
    level_enum, user_schema, text_schema
}