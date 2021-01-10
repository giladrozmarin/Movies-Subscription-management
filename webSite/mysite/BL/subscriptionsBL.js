const subscriptionsDAL = require('../DAL/subscriptionsDAL')
const membersDAL = require('../DAL/membersDAL')
const moviesDAL = require('../DAL/moviesDAL')


exports.getMembers = async ()=>
{
  //get subscriptions 
  let subscriptions = await subscriptionsDAL.getSubscriptions();

  let members =await Promise.all (subscriptions.data.map(async x => {
  
  let data_member = await membersDAL.getMembersById(x.MemberId)
    //member details 
  let date_movie  = await Promise.all (x.Movies.map(async x =>{
                    let data = await moviesDAL.getMoviesById(x.movieId)
                    return  {Name : data.data.Name,id:x.movieId, date: x.date}}))
                   
    //movie details                
      return Object.assign(data_member.data,{movies:date_movie},{_ids:x._id})
    }))

  
    return members;                
  }           
  
  
exports.getMovies = async (movies) => {
     //movies no filter
    let data = await moviesDAL.getMovies()
    //movies Name:x.Name,id:x._id
    let movies_s = data.data.map(x => {return{ Name:x.Name,id:x._id}})
    //movies id:x._id
    let data1 = movies.map(x => x.id)
    //movies Name:x.Name,id:x._id filter by id 
    let difference =  movies_s.filter(x => 
      !data1.includes(x.id))
     
  
    return Array.from(difference)
   
  //step 1 : get data
 
  
  }
  
exports.addMovie = async (data,id) => {

    subscriptionsDAL.updateSubscriptions(data,id)
  }



 
 exports.delete =  (id) => {
  subscriptionsDAL.deleteSubscriptionsById(id)
}