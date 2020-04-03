// importando modulos
const tmi = require('tmi.js')
const mongoose = require('mongoose')
const connection = require('./settings/connection.js')

// TMI.js
var client = new tmi.client(connection)
client.connect()

client.on('chat', function (channel, username, message, self) {
   
}) 