// Здесь я описываю схему того, как пользователь будет храниться в моей базе данных
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  password: String
})

module.exports = mongoose.model('User', userSchema)
