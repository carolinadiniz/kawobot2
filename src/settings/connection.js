const identity = require('./key.json')

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
   channels: ['is_kaworii']
}