var express = require('express');
var router = express.Router();
const moviesBL = require('../BL/moviesBL')
//Movies list
router.get('/', async (req, res, next) => {

    let data = await moviesBL.getMovies()
     
    res.render('moviesPage',{data,user:true})
  });
//Edit
router.get('/edit', function(req, res) {  
    //add
  if(req.query.obj === 0 )
  { 
    let data=0
    res.render('editMovies',data );
  }
  else{
  //get all data from prev page
  let data = JSON.parse(req.query.obj);
  res.render('editMovies',{data} );
  }
});
//Find-post
router.post('/find', async (req, res) => {
   //step 1 : get data
   let data_m = await moviesBL.getMovies()
   
   //step 2 : get relevant movies 
   let data=  data_m.filter( x => x.Name.includes(req.body.find)) 

    res.render('moviesPage',{data,user:true})
  });
//Find-get
router.get('/find/:id', async (req, res) => {
  //step 1 : get data
  let data_m = await moviesBL.getMovies()
  
  //step 2 : get relevant movies 
  let data=  data_m.filter( x => x.Name.includes(req.params.id)) 

   res.render('moviesPage',{data,user:true})
 });
//Delete
  router.get('/delete/:id' , async (req,res) =>{

  
   await moviesBL.delete(req.params.id)
   res.redirect('/movies')
} ) 
//Create
router.post('/create', async (req, res) =>
{
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