const express = require('express')
const router = express.Router();
const Subscriptions  = require('../model/SubscriptionsModel')


router.route('/').
    get(function(req,resp)
    {
        Subscriptions.find({},  (err,subs) =>
        {
            if(err)
            {
                return resp.send(err)
            }
            return resp.json(subs)
        })       
    });


module.exports = router; 