var express = require('express');
var router = express.Router();
const subscriptionsBL = require('../BL/subscriptionsBL')
const memberBL = require('../BL/memberBL')

router.get('/', async (req, res, next) => {

    let data = await subscriptionsBL.getMembers()
   
    res.render('subscriptions',{data,user:true})
  });

  router.get('/newMovie', async (req, res, next) => {
   
    let data1 = JSON.parse(req.query.obj);
    debugger;
    let movies = data1.movies.map(x=>{return{ Name:x.Name,id:x.id}} )
    let movies_list = await subscriptionsBL.getMovies(movies)
 
    let data = await subscriptionsBL.getMembers()

    res.render('subscriptionsNewMovie',{data,user:true,movies_list})
  });
  router.post('/addMovie', async (req, res, next) => {
    //data1
    //{ movie: '5ff97c49eeb2ff64b8408090', date: '2021-01-12' }
    let data1 =  JSON.parse(JSON.stringify(req.body))
    //new_movie
    //{ name: '', id: '5ff97c49eeb2ff64b8408090' }
    let new_movie ={name:"" ,id: data1.movie}
    console.log(`data1`)
    console.log(data1)
    console.log(`new_movie`)
    console.log(new_movie)
    // id : { id: '5ff97ff248bec968ce2a682b' }
    let id =  {id: JSON.parse(req.query.obj)._ids}
    console.log(`id`)
    console.log(id)

     /* //data2
    {
      _id: '5ff97c1f84179463f5fe94a1',
      Name: 'GT1 Graham',
      Email: 'Sincere@april.biz',
      City: 'Gwenborough',
      __v: 0,
      movies: [
        {
          Name: 'Person1',
          id: '5ff97c49eeb2ff64b8408090',
          date: '2021-01-14T00:00:00.000Z'
        },....
      */
    let data2 =JSON.parse(req.query.obj);

    console.log(`data2`)
    console.log(data2._id)
    let a = {id: JSON.parse(req.query.obj)._id}
    console.log(`a`)
    console.log(a)
    //add movie
    await subscriptionsBL.addMovie(data1,id)
      //current movie list 
      let movies = data2.movies.map(x=>{return{ Name:x.Name,id:x.id}} )
      movies.push(new_movie)
    
      let movies_list = await subscriptionsBL.getMovies(movies)
      let data = await subscriptionsBL.getMembers()
    res.render('subscriptionsNewMovie',{data,user:true,movies_list,idUser :data2._id})
  });
//Edit
  router.get('/edit/:id?', async (req, res, next) => {
     
    if(req.params.id !== undefined)
    {
      //if come from movie page I have just Id
      let data = await memberBL.getMember(req.params.id)
      res.render('members',{data})
    }
    else if(req.query.obj === 'add' )
    { 
      let data=0
      res.render('members',{data})
    }
    else{
      //get all data from prev page
      let data = JSON.parse(req.query.obj);
      
      res.render('members',{data} );
      }
  });
//Create
router.post('/create', async (req, res) =>
{
 
  if(req.body.cancel != undefined)
  {
    res.redirect('/subscriptions')

  }
  else{
    let data =  JSON.parse(JSON.stringify(req.body))
    delete data.save
    
    if(req.body.id != undefined)
    {
      memberBL.updateMember(data)
   
      res.redirect('/subscriptions')

   }
   else{
   
    memberBL.addMember(data)
    res.redirect('/subscriptions')

   }}
})
//Delete
router.get('/delete/:id' , async (req,res) =>{

  
  await memberBL.delete(req.params.id)
  res.redirect('/subscriptions')
} ) 
  module.exports = router;
