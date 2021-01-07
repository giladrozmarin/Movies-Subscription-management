var express = require('express');
var router = express.Router();
const subscriptionsBL = require('../BL/subscriptionsBL')

router.get('/', async (req, res, next) => {

    let data = await subscriptionsBL.getMembers()
    console.log(data.map(v => v.movies.map(x=>x)))

    res.render('subscriptions',{data,user:true})
  });

module.exports = router;
