
const axios = require('axios')


exports.getMembers = ()=> {


    return axios.get(`https://jsonplaceholder.typicode.com/users`)

}