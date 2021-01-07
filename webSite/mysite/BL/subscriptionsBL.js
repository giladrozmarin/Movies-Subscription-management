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
                    return  {Name : data.data.Name , date: x.date}}))
    //movie details                
      return Object.assign(data_member.data,{movies:date_movie})
    }))
 
    return members;                
  }           
  
  

 
  /* _id
     Member id 
     Movies{ id , date}
  */
 //for every member id find the id and get the name,city,email
 //for every member id find all*  the movie name and date
