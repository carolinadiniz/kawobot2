const mongoose = require('mongoose')
require('./model/model_lists')
require('./model/model_kcommands')
var model_lists = mongoose.model('model_lists')
var model_kcommands = mongoose.model('model_kcommands')

module.exports = message_reader = function(client, channel, username, message, self)  {
   

   if (message.toLowerCase().split(' ')[0][0] === '!') {
      lower_and_splited_message = message.toLowerCase().split(' ')
      command_name = message.toLowerCase().split(' ')[0].substr(1)


      model_lists.find({channel: channel}).then((List) => {
         List_commands = List[0]['List_kcommands']


         if (List_commands.includes(command_name) === true) {
            
            allCommands = (List_commands) => {
               let List = ''
               for (let command of List_commands) {
                  List = command + ', ' + List
               }
               return List
            }

            model_kcommands.findOne({channel: channel, command_name: command_name}).then((Command) => {
               
               console.log(Command[''])

               Message = Command['command_message']

               if (Message.includes('(_USER_)') == true) {
                  Message = Message.replace('(_USER_)', `${username['display-name']}`)
               }
               if (Message.includes('(_PERCENT_)') == true) {
                  Message = Message.replace('(_PERCENT_)', `${Math.ceil(Math.random(0, 101) * 100)}%`)
               }
               if (Message.includes('(_RANDOM_)') == true) {
                  Message = Message.replace('(_RANDOM_)', `${Math.ceil(Math.random(0, 101) * 100)}`)
               }
               if (Message.includes('(_TOUSER_)') == true) {
                  Message = Message.replace('(_TOUSER_)', `${message.replace(message.split(' ')[0], '').replace(/^\s*/, '')}`)
               }
               if (Message.includes('(_COMMANDS_)') == true) {
                  Message = Message.replace('(_COMMANDS_)', `${allCommands(List_commands)}`)
               }
               if (Message.includes('(_COUNT_)') == true) {
                  model_kcommands.findOneAndUpdate({command_name: command_name}, {$set:{command_count: Command['command_count'] + 1}}, {new: true}, (err, doc) => { console.log(doc)}) 
                  Message = Message.replace('(_COUNT_)', `${Command['command_count'] + 1}`)
               }

               client.say(channel, Message)

            })
         }
      
      })
   }
   

}