var express = require('express');
var router = express.Router();
const subscriptionsBL = require('../BL/subscriptionsBL')

router.get('/', async (req, res, next) => {

    let data = await subscriptionsBL.getMembers()
   
    res.render('subscriptions',{data,user:true})
  });

  router.get('/newMovie', async (req, res, next) => {
   
    let data1 = JSON.parse(req.query.obj);
    console.log(data1)
    let movies = data1.movies.map(x=>{return{ Name:x.Name,id:x.id}} )
    let movies_list = await subscriptionsBL.getMovies(movies)
 
    let data = await subscriptionsBL.getMembers()

    res.render('subscriptionsNewMovie',{data,user:true,movies_list})
  });
  router.post('/addMovie', async (req, res, next) => {
    let data1 =  JSON.parse(JSON.stringify(req.body))
   
    let new_movie ={name:"" ,id: data1.movie}
    console.log(new_movie)
    let id =  {id: JSON.parse(req.query.obj)._ids}
    let data2 = JSON.parse(req.query.obj);
    //let a = {id: JSON.parse(req.query.obj)._id}
    //add movie
    await subscriptionsBL.addMovie(data1,id)
      //current movie list 
      let movies = data2.movies.map(x=>{return{ Name:x.Name,id:x.id}} )
      movies.push(new_movie)
    
      let movies_list = await subscriptionsBL.getMovies(movies)
      let data = await subscriptionsBL.getMembers()
    res.render('subscriptionsNewMovie',{data,user:true,movies_list})
  });
module.exports = router;
