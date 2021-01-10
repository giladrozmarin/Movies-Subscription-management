const express = require('express')
const router = express.Router();
const initDB = require('../BL/initDB')



router.route('/').
    get( async (req,resp) => 
    {
    //  let Members = await initDB.initMembers()
    //  Members.data.map(v => {let obj = {
    //         "Name" : v.name,
    //         "Email" : v.email,
    //         "City" : v.address.city

    //     }

    //      initDB.addMember(obj)
    // }) 

    //  let Movies = await initDB.initMovies()
    //  Movies.data.map(v => {
    //      let obj = {
    //         "Name" : v.name,
    //         "Genres": v.genres,
    //         "Image": v.image.medium,
    //         "Premiered": v.premiered
    //      }
    //      initDB.addMovies(obj)
    //  })    


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