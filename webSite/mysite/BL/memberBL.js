const membersDAL = require('../DAL/membersDAL')



exports.getMember = async (id) => {
   let data = await membersDAL.getMembersById(id)
    return data.data
   
}
exports.addMember = async (obj) => {
    let data = await membersDAL.addMember(obj)
    return data.data
}
exports.updateMember =  (obj) => {

    
    membersDAL.updateMember(obj)
}
exports.delete =  (id) => {

    
    membersDAL.deleteMoviesById(id)
}