var kcommand = require('./kcommand')

module.exports = commands = function(client, channel, username, message, self) {
   // if bot return null
   if (self) {return;} else {
      
      // Checks if message is a command
      if (message.split(' ')[0][0] === '!') {
         
         // Checks if user is a mod or broadcaster
         userInfo = function(username) {
            mod = false
            if (username['mod'] == true) {
               mod = true
            }
            try {
               if (username['badges']['broadcaster'] === '1') {
                  mod = true
               }
            }
            catch(e) {}
            user = {
               mod: mod,
               subscriber: username['subscriber']
            }
            return user
         }
         user = userInfo(username)

         // If user is a mod can use this commands
         if (user['mod'] == true) {

            // clean the console 
            if (message == '!cls') { 
               console.clear() 
            }

            // shows username info
            if (message == '!username')  {
               console.log(username)
            }

            // K commands
            if (message.split(' ')[0][1].toLowerCase() === 'k') {
               
               // kcommand - add - delete
               if (message.split(' ')[0].toLowerCase() === '!kcommand') {
                  kcommand(client, channel, username, message, user)
               }
               

            }
         }
      }
   }
}