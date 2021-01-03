const mongoose = require ('mongoose')

let Schema = mongoose.Schema;

let SubscriptionsSchema = new Schema({
   
   MemberId: Schema.Types.ObjectId,
   Movies: [{ movieId :  Schema.Types.ObjectId, data:  Date }]
});


module.exports = mongoose.model('Subscriptions', SubscriptionsSchema )