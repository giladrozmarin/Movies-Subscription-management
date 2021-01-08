const axios = require('axios')


exports.getSubscriptions = ()=> {


    return axios.get(`http://localhost:3001/subscriptions`)

}


exports.updateSubscriptions = (data,id)=> {
   
 

    return axios.put(`http://localhost:3001/subscriptions/${id.id}`,
    {movieId: data.movie, date: data.date }
    )
}