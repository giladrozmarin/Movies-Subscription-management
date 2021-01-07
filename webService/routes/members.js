const express = require('express')
const router = express.Router()
const Subscriptions  = require('../model/SubscriptionsModel')
const Members = require('../model/MembersModel')

router.route('/').
    get(function(req,resp)
    {
        Members.find({},  (err,member) =>
        {
            if(err)
            {
                return resp.send(err)
            }
            return resp.json(member)
        })       
    });
    router.route('/:id').
        get(function(req,resp)
        {
            Members.findById(req.params.id, function(err,member)
          {
                if(err)
                {
                    return resp.send(err)
                }
                return resp.json(member)
          });
        });
module.exports = router; 