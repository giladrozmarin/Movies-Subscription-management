const axios = require('axios')


exports.getMembersById = (id) => {
    return axios.get(`http://localhost:3001/members/${id}`)
}