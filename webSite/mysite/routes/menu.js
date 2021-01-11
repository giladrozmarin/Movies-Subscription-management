var express = require('express');
var router = express.Router();
const authentication = require('../BL/authentication')
const manageUsers = require('../BL/manageUsers')

router.post('/', async (req, res, next) =>
{
  if(req.session.auth){
     
    res.render('mainPage', { user: req.session.admin ,  userName: req.session.use})
   }
//check the user details in user.json 
let isAuthenticated = await authentication.authenticationUser(req.body.userName, req.body.password)
  let user =isAuthenticated[0]
  let permissions = isAuthenticated[1]
  console.log(user)
  console.log(permissions)
  if(user === undefined){
    res.render('login', { err: "The user name or password not correct" })
    }
   //if the user pass authentication pass to menuPage with admin permissions
   else if (user[0]?.userName === 'Admin') {
    req.session.auth=true 
    req.session.admin=true 
    req.session.user = `${user[0].firstName} ${user[0].lastName}`
    req.session.permissions = permissions
    res.render('mainPage', { user: req.session.admin ,  userName: req.session.use})
  }
  else 
  {
    req.session.auth=true 
    req.session.admin=false 
    req.session.user = `${user[0].firstName} ${user[0].lastName}`
    req.session.cookie.maxAge = parseInt(user[0].sessionTimeOut)* 600000
    req.session.permissions = permissions

    res.render('mainPage', { user: req.session.admin ,  userName: req.session.user })
  }

});
router.get('/manageUsers', async (req, res, next) =>
{
  if(!req.session.auth){
     
    res.redirect('/')
   }
  //check the user details in user.json 
  let users = await manageUsers.getUsers()
  let permissions = await manageUsers.getPermissions()

  let data = users.map((item, i) => Object.assign({}, item, permissions[i]));
  console.log(data)
   res.render('manageUsers', { user: req.session.admin ,  userName: req.session.use , data: data })
})
router.get('/' ,async (req,res)=>
{
  if(req.session.auth){
     
    res.render('mainPage', { user: req.session.admin ,  userName: req.session.user})
   }
   else{
    res.render('login',{err : 'Time out'})
   }
})

module.exports = router;
