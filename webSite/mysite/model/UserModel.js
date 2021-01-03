const mongoose = require ('mongoose')

let Schema = mongoose.Schema;

let UserSchema = new Schema({
   
   UserName: String,
   Password: String
    
});


module.exports = mongoose.model('users', UserSchema )