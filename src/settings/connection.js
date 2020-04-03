require('../model/model_channels')
const mongoose = require('mongoose')
const identity = require('./key.json')
const model_channels = mongoose.model('model_channels')


let Channels = []
model_channels.find().then((channels) => {
   for (let channel of channels) {
      Channels.push(channel['channel'].substr(1))
   }
})


module.exports = connection = {
   options: {
      debug: true
   },
   connection: {
      cluster: "aws",
      reconnect: true,
      reconnectDecay: 1,
      reconnectInterval: 1000
   },
   identity: {
      username: identity['username'],
      password: identity['password'] 
   },
   channels: Channels
}