var express = require('express');
var router = express.Router();
const authentication = require('../BL/authentication')

/* 1. login Page 
router.get('/', function (req, res, next) {
  var passedVariable = req.query.valid;
  res.render('loginPage', { err: passedVariable });
});
 */
router.post('/', async (req, res, next) =>
{

//check the user details in user.json 
let isAuthenticated = await authentication.authenticationUser(req.body.userName, req.body.password)

   //if the user pass authentication pass to menuPage with admin permissions
   if (isAuthenticated.UserName === 'Admin') {
    //req.session.auth=true 
    //req.session.admin=true 
    res.render('mainPage', { user: true })
  }
  else if  (isAuthenticated) 
  {
    res.render('mainPage', { user: false })
  }
  else{
  res.render('login', { err: "The user name or password not correct" })
  }
});

module.exports = router;
