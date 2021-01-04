var express = require('express');
var router = express.Router();
const authentication = require('../BL/authentication')
const manageUsers = require('../BL/manageUsers')

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
router.get('/manageUsers', async (req, res, next) =>
{
  //check the user details in user.json 
  let users = await manageUsers.getUsers()
  let permissions = await manageUsers.getPermissions()
  let data = users.map((item, i) => Object.assign({}, item, permissions[i]));
   res.render('manageUsers', { user: true , data: data })
})


module.exports = router;
