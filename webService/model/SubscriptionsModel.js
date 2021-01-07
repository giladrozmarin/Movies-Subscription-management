const mongoose = require ('mongoose')

let Schema = mongoose.Schema;

let SubscriptionsSchema = new Schema({
   
   MemberId: Schema.Types.ObjectId,
   Movies: [{ movieId :  Schema.Types.ObjectId, date:  Date }]
   
});


module.exports = mongoose.model('subscriptions', SubscriptionsSchema )




