const mongoose = require('mongoose')

const Schema = mongoose.Schema


const MsgSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String,
    required: true
  },
  content: {
    type: String,
    require: true,
  },
  replies: {
    type: Array,
    require: false,
    default: []
  },
  content: {
    type: String,
    require: true,
  },
  create_at: {
    type: Number,
    default: Date.now()
  },
  date: {
    type: Number,
    default: Date.now()
  },
})

module.exports = Msg = mongoose.model('msg', MsgSchema)