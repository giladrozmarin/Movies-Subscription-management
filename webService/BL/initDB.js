 const getMovies = require('../DAL/MoviesWsDAL')
const getMembers = require('../DAL/MemberWsDAL')
const getSubscriptions = require('../DAL/SubscriptionsDAL')
const Members  = require('../model/MembersModel')
const Movies  = require('../model/MoviesModel')
const Subscriptions  = require('../model/SubscriptionsModel')


exports.initMovies = async () => 
{
    return await getMovies.getMovies()
 
}

exports.initMembers = async () => 
{
     
    return await getMembers.getMembers()
 
}

exports.initSubscriptions = async () => 
{
     
    return await getSubscriptions.getMembersDB()
 
}

exports.addMember = (obj) => {
	return new Promise((resolve, reject) => {
		const m = new Members({
			Name: obj.Name,
			Email: obj.Email,
			City: obj.City	 
		})
		console.log(m)
		m.save((err, data) => {
			if (err) {
				reject(err)
			} else {
				resolve(data)
			}
		})
	})
}

exports.addSubscriptions = (obj) => {
	return new Promise((resolve, reject) => {
		const s = new Subscriptions({
			MemberId: obj.MemberId,
			Movies: []

		})
		console.log(s)
		s.save((err, data) => {
			if (err) {
				reject(err)
			} else {
				resolve(data)
			}
		})
	})
}

exports.addMovies = (obj) => {
	return new Promise((resolve, reject) => {
		const m = new Movies({
			Name: obj.Name,
			Genres: obj.Genres,
			Image: obj.Image,
			Premiered: obj.Premiered
			 
		})
		console.log(m)
		m.save((err, data) => {
			if (err) {
				reject(err)
			} else {
				resolve(data)
			}
		})
	})
}

/*
{
    "_id" : ObjectId("5ff6c308aa6e705be889bf6a"),
    "MemberId" : ObjectId("5ff18010dc5e5e2bec3713e5"),
    "Movies" : [ 
        {
            "_id" : ObjectId("5ff85f842b0e1b44035fdac7"),
            "movieId" : ObjectId("5ff1805022136f2d57b51ee8"),
            "date" : ISODate("2021-01-08T00:00:00.000Z")
        }
    ]
}
 */