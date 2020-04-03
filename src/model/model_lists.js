const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Model_lists = new Schema({
   channel: {
      type: String
   },
   List_blacklist: {
      type: Object,
      default: []
   },
   List_kcommands: {
      type: Object,
      default: []
   },
   List_nick_logs: {
      type: Object,
      default: []
   }
})

mongoose.model('model_lists', Model_lists)