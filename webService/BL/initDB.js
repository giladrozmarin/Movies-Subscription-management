const mongoose = require('mongoose')
const getMovies = require('../DAL/MoviesWsDAL')
const getMembers = require('../DAL/MemberWsDAL')
const Members  = require('../model/MembersModel')
const Movies  = require('../model/MoviesModel')


exports.initMovies = async () => 
{
    return await getMovies.getMovies()
 
}

exports.initMembers = async () => 
{
     
    return await getMembers.getMembers()
 
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

