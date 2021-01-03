const userBL = require('../BL/userBL')
const authentication = require('../BL/authentication')



exports.authenticationUser = async (userName, password) => {
        //get data user list
        let data = await userBL.getUser(userName, password);

        return data.length != 0 ? data[0] : false

}
exports.checkUser = async (userName) => {
        //get data user list
        let data = await userBL.findUserByUsername(userName);
        return data.length != 0 ? data[0] : false
}

exports.creatUser = async (userName, password) => {
        //get data user list
        let data = await authentication.checkUser(userName);
 
        if (data) {
         userBL.creatUser(data._id,userName, password)
        
        }
        return data === false ? false : true
}