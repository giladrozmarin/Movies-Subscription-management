var express = require('express');
var router = express.Router();
const moviesBL = require('../BL/moviesBL')
const subscriptionsBL = require ('../BL/subscriptionsBL')
//Movies list
router.get('/', async (req, res, next) => {
  if(!req.session.auth){
     
    res.redirect('/')
   }
   if(req.session.permissions[0].permissions.includes('View Movies')){
    let data = await moviesBL.getMovies()
     console.log(req.session.permissions[0].permissions)
    res.render('moviesPage',{data,user: req.session.admin ,  userName: req.session.user })}
    else{
      res.redirect('/menu')
     }
  });
//Edit
router.get('/edit', function(req, res) {  
  if(!req.session.auth){
     
    res.redirect('/')
   }
  
  //add
  if(req.query.obj === 0 )
  { 
    if(req.session.permissions[0].permissions.includes('Update Movies')){
    let data=0
    res.render('editMovies',data );}
    else { 
      res.redirect('/movies')
    }
  }
  else{
    if(req.session.permissions[0].permissions.includes('Create Movies')){
  //get all data from prev page
  let data = JSON.parse(req.query.obj);
  res.render('editMovies',{data} );
  }
  else { 
    res.redirect('/movies')
  }
}
  


});
//Find-post
router.post('/find', async (req, res) => {
  if(!req.session.auth){
     
    res.redirect('/')
   }
   if(req.session.permissions[0].permissions.includes('View Movies')){
 
  //step 1 : get data
   let data_m = await moviesBL.getMovies()
   
   //step 2 : get relevant movies 
   let data=  data_m.filter( x => x.Name.includes(req.body.find)) 

    res.render('moviesPage',{data,user: req.session.admin, userName: req.session.user})}
    else{
      res.redirect('/menu')
     }
  });
//Find-get
router.get('/find/:id', async (req, res) => {
  if(!req.session.auth){
     
    res.redirect('/')
   }
 
 
 
  //step 1 : get data
  let data_m = await moviesBL.getMovies()
  
  //step 2 : get relevant movies 
  let data=  data_m.filter( x => x.Name.includes(req.params.id)) 

   res.render('moviesPage',{data,user: req.session.admin, userName: req.session.user})
 });
//Delete
  router.get('/delete/:id' , async (req,res) =>{
    if(!req.session.auth){
     
      res.redirect('/')
     }
  
     if(req.session.permissions[0].permissions.includes('Delete Movies')){
  
    let data = JSON.parse(req.query.obj);
 
   await moviesBL.delete(req.params.id)
   data.subscribe.forEach(element => {
    subscriptionsBL.deleteMovie(req.params.id,element.id_subs)
   });

   res.redirect('/movies')}
   else{
    res.redirect('/movies')
   }
} ) 
//Create
router.post('/create', async (req, res) =>
{
  if(!req.session.auth){
     
    res.redirect('/')
   } 
  
  
  
  if(req.body.cancel != undefined)
  {
    res.redirect('/movies')

  }
  else{
    let data =  JSON.parse(JSON.stringify(req.body))
    delete data.save
    if(req.body.id != undefined)
    {
      moviesBL.updateMovie(data)
   
       res.redirect('/movies')
   }
   else{
   
    moviesBL.addMovie(data)
    res.redirect('/movies')
   }}

})
module.exports = router;