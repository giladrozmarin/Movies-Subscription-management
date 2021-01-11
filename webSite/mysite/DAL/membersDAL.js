const axios = require('axios')


exports.getMembersById = (id) => {
    return axios.get(`http://localhost:3001/members/${id}`)
}

exports.addMember = (obj) => {
   return axios.post(`http://localhost:3001/members`,{
        Name: obj.Name,
        Email : obj.Email,
        City : obj.City

    })
}


exports.updateMember = (obj) => {
    console.log(obj.id)

    return axios.put(`http://localhost:3001/members/${obj.id}`,{
        Name: obj.Name,
        Email : obj.Email,
        City : obj.City
      })
}

exports.deleteMoviesById = (id) => {
    axios.delete(`http://localhost:3001/members/${id}`)
}
