const express = require('express')
const router = express.Router();
const Subscriptions  = require('../model/SubscriptionsModel')
/*
id: '5ffaffd0022064562cf18017',
id_subs: '5ffb0333886d4e5c0f0f1df2'
*/
router.route('/').
//Get
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
//Get byID
router.route('/:id').
    get(function(req,resp)
    {
        Subscriptions.findById(req.params.id, function(err,subs)
        {
            if(err)
            {
                return resp.send(err)
            }
            return resp.json(subs)
        })       
    });

//POST (create)
router.route('/'). 
post(function(req,resp)
            {
         
                const s = new Subscriptions({
                    MemberId : req.body.MemberId,
                    Movies : [] 
                 
                });
    
                s.save(function(err,subs) {
                    if(err)
                    {
                        return resp.send(err);
                    }
                    else
                    {  
                        return resp.send(subs._id) 
                    }
                })       
              
            });  

router.route('/:id').
//Update    
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
router.route('/').
//Update    
    put(function(req,resp)
                {
         
                    
                    Subscriptions.findByIdAndUpdate(req.body._id,
                    {
                    
                        Movies:req.body.Movies
                     
                    }, function(err)
                    {
                        if(err)
                        {
                            return resp.send(err);
                        }
                        else
                        {
                            return resp.send(req.Movies);
                        }
        
                    }) 
                  
                });
//Delete  
router.route('/:id').
    delete(function(req,resp)
    {
   
        Subscriptions.findByIdAndDelete(req.params.id,function(err)
       {
           if(err)
           {
               return resp.send(err)
           }
           else
           {
               return resp.send("Object Deleted !")
           }
       }) 
    
    });




module.exports = router; 