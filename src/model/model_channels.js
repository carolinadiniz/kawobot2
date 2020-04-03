const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Model_channels = new Schema({
   channel: {
      type: String,
      required: true
   },
   status: {
      type: Boolean,
      default: true
   }
})

mongoose.model('model_channels', Model_channels)