const userBL = require('../BL/userBL')
const authentication = require('../BL/authentication')
const usersDAL = require('../DAL/usersDAL')
const permissionsDAL = require('../DAL/permissionsDAL')



exports.authenticationUser = async (userName, password) => {
        //get data user list
        let data = await userBL.getUser(userName, password);
   
       if(data.length != 0 ){
         let users = await usersDAL.getAllUsers()
         let user = users.users.filter(x => x.userName === userName)

         let permissions = await permissionsDAL.getAllPermissions()
         let permission = permissions.filter(x => x.id === user[0].id)
         return [user,permission]
       }else {
        return false     
       }


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