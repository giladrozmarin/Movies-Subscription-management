const mongoose = require ('mongoose')

let Schema = mongoose.Schema;

let MembersSchema = new Schema({
   
   Name: String,
   Email: String,
   City:  String
   
});


module.exports = mongoose.model('members', MembersSchema )