// importando modulos
const tmi = require('tmi.js')
const mongoose = require('mongoose')
const connection = require('./settings/conection.js')

// TMI.js
var client = new tmi.client(connection)
client.connect()

