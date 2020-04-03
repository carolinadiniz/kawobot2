// importando modulos
const tmi = require('tmi.js')
const mongoose = require('mongoose')
const connection = require('./settings/connection.js')
const commands = require('./commands/commands.js')

console.clear()

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/kawobot', {useNewUrlParser: true, useUnifiedTopology: true}).then(() =>
console.log('\033[0;32m[\033[0;36m'+'Mongodb \033[0;32m Conectado com Sucesso]'+'\033[0m')).catch(() =>
console.log('\033[0;31m[\033[0;36m'+'\033[0;31mFalha ao se conectar ao MongoDB]'+'\033[0m')
)

// TMI.js
var client = new tmi.client(connection)
client.connect()

client.on('chat', function (channel, username, message, self) {
   new commands(client, channel, username, message, self)
}) 