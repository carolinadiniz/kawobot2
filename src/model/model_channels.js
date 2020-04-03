const mongoose = require('mongoose')
const Schema = mongoose.Schema

const model_channels = new Schema({
   channel: {
      type: String,
      required: true
   },
   status: {
      type: Boolean,
      default: true
   }
})

mongoose.model('model_channels', model_channels)