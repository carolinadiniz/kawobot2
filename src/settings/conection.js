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
      username: "kawobot",
      password: "mgggjo7yfb6lihg9jek3wryj6dmfw3" 
   },
   channels: ['is_kaworii']
}