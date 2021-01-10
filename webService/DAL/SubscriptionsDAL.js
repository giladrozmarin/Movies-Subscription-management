const axios = require('axios')

exports.getMembersDB = () =>
{
 
    return axios.get('http://localhost:3001/members')

}