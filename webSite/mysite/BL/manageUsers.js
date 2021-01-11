const usersDAL = require('../DAL/usersDAL')
const PermissionsDAL = require('../DAL/permissionsDAL')
const Users = require('../model/UserModel')
exports.getUsers = async () => {

    let data = await usersDAL.getAllUsers()
    return data.users
}

exports.addUsers = async (obj) => {
    let data = await exports.getUsers()

    //find user and replace
    let index=-1;
    data.flatMap((x,i)=> x.id ===obj.id ? index=i :x) 
    //if i didn't find user else replace 
    index === -1? data.push(obj) :  data.splice(index, 1, obj) 

    usersDAL.setUsers(data)

}
exports.getPermissions = async () => {

    return await PermissionsDAL.getAllPermissions()
}

exports.addPermissions = async (obj) => {

   let data = await exports.getPermissions()
 
   //find permission and by id 
   let index=-1;
   data.flatMap((x,i)=> x.id ===obj.id ? index=i :x)  
   index === -1? data.push(obj) :  data.splice(index, 1, obj) 

   PermissionsDAL.setPermissions(data)

}
exports.deleteUser= async (id) => {

 let data = await exports.getUsers()
 let newData =  data.filter( x => x.id != id )
 await usersDAL.setUsers(newData)

 data = await exports.getPermissions()
 newData =  data.filter( x => x.id != id )

 PermissionsDAL.setPermissions(newData)
  exports.deleteUserDB(id)

}

exports.deleteUserDB = (id) => {
      
    Users.findByIdAndDelete(id,function(err)
    {
        if(err)
        {
           console.log(err)
        }
        else
        {
            console.log("Object Deleted !")
        }
    }) 
}