const express = require('express')
const router = express.Router()
const Members = require('../model/MembersModel')
//full rest API
//GET
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
//GET (by id)
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
//POST (create)
router.route('/'). 
post(function(req,resp)
            {
         
                const m = new Members({
                    Name : req.body.Name,
                    Email : req.body.Email,
                    City : req.body.City
                 
                });
    
                m.save(function(err,MemberId) {
                    if(err)
                    {
                        return resp.send(err);
                    }
                    else
                    {  
                        return resp.send(MemberId._id) 
                    }
                })       
              
            });  
//PUT (update)
router.route('/:id').
 put(function(req,resp)
        {
            Members.findByIdAndUpdate(req.params.id,
            {
                Name : req.body.Name,
                Email : req.body.Email,
                City : req.body.City
            }, function(err)
            {
                if(err)
                {
                    return resp.send(err);
                }
                else
                {
                    return resp.send("Object Updated !!");
                }

            }) 
          
        });
//DELETE  
router.route('/:id').
 delete(function(req,resp)
    {
   
        Members.findByIdAndDelete(req.params.id,function(err)
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