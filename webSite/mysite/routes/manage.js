var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//Edit
router.get('/edit/:id', function(req, res, next) {
  //get all data from prev page
  let data = JSON.parse(req.params.id)
 
   let arr = 
   [
    'View Subscriptions',
    'Create Subscriptions',
    'Delete Subscriptions',
    'Update Subscriptions',
    'View Movies',
    'Create Movies',
    'Delete Movies',
    'Update Movies'
  ]
   res.render('editUser',{data,arr} );
});

module.exports = router;
