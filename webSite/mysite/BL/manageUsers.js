const usersDAL = require('../DAL/usersDAL')
const usersPermissions = require('../DAL/permissionsDAL')

exports.getUsers = async () => {

    let data = await usersDAL.getAllUsers()
    return data.users
}


exports.getPermissions = async () => {

    return await usersPermissions.getAllPermissions()
}

