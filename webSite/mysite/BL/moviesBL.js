const moviesDAL = require('../DAL/moviesDAL')
const subscriptionsDAL = require('../DAL/subscriptionsDAL')
const membersDAL = require('../DAL/membersDAL')




exports.getMovies = async () => {
     //movie list
     let data =  await moviesDAL.getMovies()
     //subscriptions list
     let subscriptions = await subscriptionsDAL.getSubscriptions()
      
                                    //get one movie object from array = x 
     await Promise.all(data.data.map(async x =>{
          Object.assign(x,{subscribe :[]})
          //get all subscriptions 
          await Promise.all(subscriptions.data.map(async subs => {
                                                  //get one subs  
               let data = subs.Movies.map( x =>x.movieId)//take all movie Id from specific sub 
               //if the member subs after that movie ? take is name and add to movie object
               if  (data.includes(x._id)){

                    let getMembersName = await membersDAL.getMembersById(subs.MemberId)
                    let data = subs.Movies.filter( m => m.movieId === x._id)
                   
                    let obj = { 
                         Name : getMembersName.data.Name,
                         date: data[0].date,
                         id: subs.MemberId
                    }
                       x.subscribe.push(obj)
               }
          }))
     }))
     return data.data
}
exports.delete =  (id) => {

    
     moviesDAL.deleteMoviesById(id)
}
exports.addMovie =  (obj) => {

     

     moviesDAL.addMovie(obj)
}
exports.updateMovie =  (obj) => {

    
     moviesDAL.updateMovie(obj)
}