const express = require('express')
const router = express.Router();
const Movies  = require('../model/MoviesModel')


router.route('/').
    get(function(req,resp)
    {
        Movies.find({}, function(err,movies)
        {
            if(err)
            {
                return resp.send(err)
            }
            return resp.json(movies)
        })       
    });

router.route('/:id').
    get(function(req,resp)
    {
        Movies.findById(req.params.id, function(err,movies)
        {
            if(err)
            {
                return resp.send(err)
            }
            return resp.json(movies)
        })       
    });
router.route('/:id').
    delete(function(req,resp)
    {
   
        Movies.findByIdAndDelete(req.params.id,function(err)
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
router.route('/').
    post(function(req,resp)
        {
     
            const m = new Movies({
                Name : req.body.Name,
                Genres : req.body.Genres,
                Image : req.body.Image,
                Premiered: req.body.Premiered
            });

            m.save(function(err) {
                if(err)
                {
                    return resp.send(err);
                }
                else
                {  
                    return resp.send('Created !') 
                }
            })       
          
        });
router.route('/:id').
    put(function(req,resp)
        {
            Movies.findByIdAndUpdate(req.params.id,
            {
                Name : req.body.Name,
                Genres : req.body.Genres,
                Image : req.body.Image,
                Premiered: req.body.Premiered
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
module.exports = router; 