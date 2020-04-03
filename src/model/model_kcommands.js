const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Model_kcommands = new Schema({
   channel: {
      type: String
   },
   command_name: {
      type: String
   },
   command_message: {
      type: String
   },
   command_count: {
      type: Number,
      default: 0
   }
})

mongoose.model('model_kcommands', Model_kcommands)