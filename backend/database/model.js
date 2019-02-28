const level_enum = {
    admin: 0,
    lover: 1,
    friend: 2
}

const user_schema = {
    username: String,
    real_name: String,
    password: String,
    level: Number,
    token: String
}

const text_schema = {
    date: String,
    username: String,
    context: String,
    is_private: Boolean
}

const file_schema = {
    username: String,
    file: String
}

module.exports = {
    level_enum, user_schema, text_schema, file_schema
}