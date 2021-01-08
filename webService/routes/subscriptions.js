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
    router.route('/:id').
put(function(req,resp)
        {
 
            console.log(req.body)
            Subscriptions.findByIdAndUpdate(req.params.id,
            {
               
                
             $push:{Movies:{movieId:req.body.movieId,date:req.body.date}}
            }, function(err)
            {
                if(err)
                {
                    return resp.send(err);
                }
                else
                {
                    return resp.send(req.body);
                }

            }) 
          
        });

module.exports = router; 