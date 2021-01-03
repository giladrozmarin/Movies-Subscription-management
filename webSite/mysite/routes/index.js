var express = require('express');
var router = express.Router();
const authentication = require('../BL/authentication')

router.get('/', function (req, res, next) {
  var passedVariable = req.query.valid;
  res.render('login', { err: passedVariable });
});
router.get('/createAccount', async (req, res, next) =>
{
  res.render('createAccount');
});
router.post('/createAccount', async (req, res, next) =>
{
  let creatAccount = await authentication.creatUser(req.body.userName,req.body.password)

  //case 1 - Username not exist in db 
  if(!creatAccount)
  {
    var string = encodeURIComponent("your Username not exist in db, connect your admin" );
    res.redirect('/?valid=' + string);
  }
  else {

    var string = encodeURIComponent("created successfully");
    res.redirect('/?valid=' + string);
  }

});
module.exports = router;
