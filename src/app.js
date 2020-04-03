// importando modulos
const tmi = require('tmi.js')
const connection = require('./settings/connection.js')
const commands = require('./commands/commands.js')
const connection_mongoose = require('./settings/connection_mongoose')
const message_reader = require('./message_reader')

console.clear()

// Mongoose connection
connection_mongoose()

// TMI.js
var client = new tmi.client(connection)
client.connect().then(() => 
    console.log('\033[0;32m[\033[0;36m'+'tmi.js \033[0;32m Conectado com Sucesso]'+'\033[0m')).catch(() =>
    console.log('\033[0;31m[\033[0;36m'+'tmi.js \033[0;31mFalha ao tentar se conectar]'+'\033[0m')
)

client.on('chat', function (channel, username, message, self) {
   new commands(client, channel, username, message, self)
   new message_reader(client, channel, username, message, self)
}) 