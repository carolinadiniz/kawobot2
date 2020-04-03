module.exports = () => {
   const mongoose = require('mongoose')
   mongoose.Promise = global.Promise
   mongoose.connect('mongodb://localhost/kawobot', {useNewUrlParser: true, useUnifiedTopology: true}).then(() =>
   console.log('\033[0;32m[\033[0;36m'+'Mongodb \033[0;32m Conectado com Sucesso]'+'\033[0m')).catch(() =>
   console.log('\033[0;31m[\033[0;36m'+'\033[0;31mFalha ao se conectar ao MongoDB]'+'\033[0m')
   )
}