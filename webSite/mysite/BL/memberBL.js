const membersDAL = require('../DAL/membersDAL')

exports.addMember = (obj) => {
    membersDAL.addMember(obj)
}
exports.updateMember =  (obj) => {

    
    membersDAL.updateMember(obj)
}
exports.delete =  (id) => {

    
    membersDAL.deleteMoviesById(id)
}