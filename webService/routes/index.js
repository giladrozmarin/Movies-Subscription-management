const express = require('express')
const router = express.Router();
const initDB = require('../BL/initDB')

router.route('/').
    get( async (req,resp) => 
    {
        let Subscriptions = await initDB.initSubscriptions()
        Subscriptions.data.map(v => {
            let obj = {
               "MemberId" : v._id,
            }
            initDB.addSubscriptions(obj)
        })   

   
     return  resp.json(Subscriptions.data)     
    });
 
  

initDB.addMember


module.exports = router; 