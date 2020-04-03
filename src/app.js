// importando modulos
const tmi = require('tmi.js')
const mongoose = require('mongoose')
const connection = require('./settings/connection.js')
const commands = require('./commands/commands.js')
const connection_mongoose = require('./settings/connection_mongoose')

console.clear()

// Mongoose connection
connection_mongoose()

// TMI.js
var client = new tmi.client(connection)
client.connect()

client.on('chat', function (channel, username, message, self) {
   new commands(client, channel, username, message, self)
}) 