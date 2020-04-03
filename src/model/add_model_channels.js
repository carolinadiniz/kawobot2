const mongoose = require('mongoose')
require('./model_channels')
const model_channels = mongoose.model('model_channels')
const connection_mongoose = require('../settings/connection_mongoose')

connection_mongoose()

const newChannel = {
   channel: 'is_kaworii'
}
new model_channels(newChannel).save().then(() => {
   console.log('novo canal adicionado')
}).catch((err)=>{
   console.log('error')
})