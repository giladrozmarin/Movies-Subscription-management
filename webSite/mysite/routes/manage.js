var express = require('express');
const manageUsers = require('../BL/manageUsers');
const userBL = require('../BL/userBL')
var router = express.Router();
 
//Edit
router.get('/edit', function(req, res) {
  if(!req.session.auth){
     
    res.redirect('/')
   }
   
  console.log(req.query.obj)
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
  //add
  if(req.query.obj === 0 )
  { 
    let data=0
    res.render('editUser',{data,arr} );
  }
  else{
  //get all data from prev page
  let data = JSON.parse(req.query.obj);
   res.render('editUser',{data,arr} );
  }
});

//delete
router.get('/delete/:id', (req, res) => {
  if(!req.session.auth){
     
    res.redirect('/')
   }
   
   manageUsers.deleteUser(req.params.id)
    
   res.redirect('/menu/manageUsers');
});

//create
router.post('/create', async (req, res) =>
{
  if(!req.session.auth){
     
    res.redirect('/')
   }
  if(req.body.cancel != undefined)
  {
    res.redirect('/menu/manageUsers')
  }
  else{
   let data =  JSON.parse(JSON.stringify(req.body))
   if(data.id === undefined){
   //add user ro userDB
   await userBL.userConfig(data.userName)
   
   let id = await userBL.findUserByUsername(data.userName)
   console.log(id)
   console.log(id[0]._id)
   //add id to user (from db)
   data.id=id[0]._id.toString();;
   }
   delete data.update
   //data shaping
   
   let permissions ={id:data.id,permissions:[]}
   Object.entries(data).map(item => {
    var res = item[1].match(/Subscriptions|Movies/g);
    if(res?.length>0){
       permissions.permissions.push(item[1])
       delete data[item[0]]
    }
   })
      //add user to Users.json
      manageUsers.addUsers(data)
      manageUsers.addPermissions(permissions)
      res.redirect('/menu/manageUsers')
   }});
module.exports = router;
