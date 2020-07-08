const bcrypt = require('bcrypt')
const saltRounds= 2

module.exports = {
  hashing(plainPass){
    return bcrypt.hashSync(plainPass, saltRounds);
  },

  compareSync(plainPass, encrpytPass) {
    return bcrypt.compareSync(plainPass, encrpytPass)
  }
}