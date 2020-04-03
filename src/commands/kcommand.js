const mongoose = require('mongoose')
require('../model/model_kcommands')
require('../model/model_lists')
const model_kcommands = mongoose.model('model_kcommands')
const model_lists = mongoose.model('model_lists')

module.exports = (client, channel, username, message, user) => {
   
   newCommand = () => {
      // Adicionado kcommand
      const newCommand = {
         channel: channel, 
         command_name: command_name,
         command_message: command_message
      }

      new model_kcommands(newCommand).save().then((doc) => {
         console.log(doc)
         client.action(channel, 'Comando criado com sucesso!')
      }).catch(() => {
         client.action(channel, 'Erro ao criar comando!')
      })
   }

   updatelist = (List_command) => {
      console.log('updatelist = (List_command) => {')
      console.log(List_command)
      model_lists.findOneAndUpdate({channel: channel}, {$set:{List_kcommands: List_command}}, {new: true}, (err, doc) => {
      })
   }




   // Command option
   let command_option = message.split(' ')[1].toLowerCase()
   if (command_option === 'update') {
      let List_command = []
         model_kcommands.find({channel: channel}).then((Commands) => {

            // Verificar lista
            for (let command of Commands) {
               List_command.push(command['command_name'])
            }
            updatelist(List_command)
         })
      return;
   }
   let command_name = message.split(' ')[2].toLowerCase()
   let command_message = message.replace(message.split(' ')[0], '').replace(message.split(' ')[1], ' ').replace(message.split(' ')[2], ' ').replace(/^\s*/, '')
   
   // Message error when command name isn't defined
   if (command_option === undefined) {
      client.say(channel, 'Erro ao criar comando! todo comando precisa de um nome ----- Exemplo: !kcommand add "nome" "messagem resposta"')
      return;
   }
   




   // Create a new kcommand
   if (command_option === 'add') {

      // Message error when message command isn't defined
      if (command_message === undefined) {
         client.say(channel, 'Erro ao criar comando! Comando precisa de mensagem após o nome do comando----- Exemplo: !kcommand add "nome" "messagem resposta"')
         return;
      }

      // Shearch for all commands in a list from channel
      model_lists.find({channel:channel}).then((List) => {

         // If the list does not exist
         if (List[0] === undefined | List[0] === null) {
            
            newCommand()
            
            setTimeout(() => {
               // Adicionando kcommando a lista
               List_command = []
               model_kcommands.find({channel: channel}).then((Commands) => {
                  // Verificar lista
                  for (let command of Commands) {
                     List_command.push(command['command_name'])
                  }

                  // Criar lista de comandos
                  const newList = {
                     channel: channel,
                     List_kcommands: List_command
                  }

                  new model_lists(newList).save().then(() => {
                     console.log(`CREATE - [${channel}] List_kcommands | ${List_command}`)
                  })
               })
            }, 2000)

            
         // Se lista existir
         } else {
            
            let List_commands = List[0]['List_kcommands']
            

            // Atualizar comando se já existir
            if (List_commands.includes(command_name) == true) {

               model_kcommands.findOneAndUpdate({channel: channel, command_name: command_name}, {$set: {command_message: command_message}}, {new: true}, (err, doc) => {
                  console.log(doc)
                  client.action(channel, `Comando Atualizado!`)
               })

            // Criar novo comando se não existir
            } else {

               // Criando novo comando
               newCommand()
               
               setTimeout(()=>{
                     // Atualizando lista de comandos
                  let List_command = []

                  model_kcommands.find({channel: channel}).then((Commands) => {

                     // Verificar lista
                     for (let command of Commands) {
                        List_command.push(command['command_name'])
                     }
                     updatelist(List_command)
                  })
               }, 2000)
            }
         }
      })
   }

   if (command_option === 'delete') {
      model_lists.find({channel: channel}).then((List) => {

         // Atualizando lista
         let List_command = List[0]['List_kcommands']

         List_command.splice(List_command.indexOf(command_name), 1)

         if (List_command === null) {
            List_command = []
         }

         updatelist(List_command)

         // deletando comando
         model_kcommands.deleteOne({command_name: command_name}, (err) => {
            client.action(channel, `O comando !${command_name} deletado`)
         })
         
      })

   }

}