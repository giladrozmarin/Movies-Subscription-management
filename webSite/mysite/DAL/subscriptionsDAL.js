const axios = require('axios')


exports.getSubscriptions = ()=> {


    return axios.get(`http://localhost:3001/subscriptions`)

}
exports.getSubscriptionsById = (id)=> {


    return axios.get(`http://localhost:3001/subscriptions/${id}`)

}
exports.addSubscriptions = (id)=> {


     axios.post(`http://localhost:3001/subscriptions/`,{
         MemberId: id
     })

}

exports.updateSubscriptions = (data,id)=> {
   
 

    return axios.put(`http://localhost:3001/subscriptions/${id.id}`,
    {movieId: data.movie, date: data.date }
    )
}
exports.updateSubscriptionsMoviesDelete = (data)=> {
   
 
   console.log(data)
    return axios.put(`http://localhost:3001/subscriptions/`,
    {
        _id: data._id,
        Movies: data.Movies
    }
    ).then(console.log(x => x))
}

exports.deleteSubscriptionsById = (id) => {
    axios.delete(`http://localhost:3001/subscriptions/${id}`)
}
