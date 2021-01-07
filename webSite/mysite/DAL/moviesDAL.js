const axios = require('axios')


exports.getMovies = ()=> {


    return axios.get(`http://localhost:3001/movies`)

}

exports.getMoviesById = (id)=> {


  return axios.get(`http://localhost:3001/movies/${id}`)

}


exports.deleteMoviesById = (id) => {
     axios.delete(`http://localhost:3001/movies/${id}`)
}


exports.addMovie = (obj) => {

   axios.post(`http://localhost:3001/movies/`,{
    Name: obj.Name,
    Genres: obj.Genres,
    Image: obj.Image,
    Premiered:obj.Premiered
  }).then(function (response) {
    console.log(response.data);
  })
}

exports.updateMovie = (obj) => {
    console.log(obj.id)

    axios.put(`http://localhost:3001/movies/${obj.id}`,{
        Name: obj.Name,
        Genres: obj.Genres,
        Image: obj.Image,
        Premiered:obj.Premiered
      }).then(function (response) {
        console.log(response.data);
      })
}