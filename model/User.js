const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
  },
  age: {
    type: Number,
  },
  sex: {
    type: Number,
  },
  date: {
    type: Number,
    detfaul: Date.now()
  }
})

const User = mongoose.model('user', UserSchema)
module.exports = User