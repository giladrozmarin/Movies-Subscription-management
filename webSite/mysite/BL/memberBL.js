const membersDAL = require('../DAL/membersDAL')



exports.getMember = async (id) => {
   let data = await membersDAL.getMembersById(id)
    return data.data
   
}
exports.addMember = (obj) => {
    membersDAL.addMember(obj)
}
exports.updateMember =  (obj) => {

    
    membersDAL.updateMember(obj)
}
exports.delete =  (id) => {

    
    membersDAL.deleteMoviesById(id)
}