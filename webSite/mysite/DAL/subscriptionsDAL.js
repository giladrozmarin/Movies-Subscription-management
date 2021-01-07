const axios = require('axios')


exports.getSubscriptions = ()=> {


    return axios.get(`http://localhost:3001/subscriptions`)

}

