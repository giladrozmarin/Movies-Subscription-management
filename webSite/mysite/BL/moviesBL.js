const moviesDAL = require('../DAL/moviesDAL')





exports.getMovies = async () => {
     
     let data =  await moviesDAL.getMovies()
     return data.data
}
exports.delete =  (id) => {

    
     moviesDAL.deleteMoviesById(id)
}
exports.addMovie =  (obj) => {

     

     moviesDAL.addMovie(obj)
}
exports.updateMovie =  (obj) => {

    
     moviesDAL.updateMovie(obj)
}