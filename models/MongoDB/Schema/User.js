const Mongoose = require('mongoose')

var Schema = new Mongoose.Schema({
    username: { type: String, required: true },
    password: { type: Array, required: true },
    fullname: { type: String, required: true },
})

module.exports = (conn) => conn.model('User', Schema)