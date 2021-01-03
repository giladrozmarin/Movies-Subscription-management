const User  = require('../model/UserModel')



exports.getAllUsers = function()
{
    return new Promise((resolve,reject) =>
        {
            User.find({}, function(err,users)
            {
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve(users)
                }
            })
        })
}

exports.getUser = function(userName,password)
{
    return new Promise((resolve,reject) =>
        {
            User.find( {UserName : userName , Password: password }, (err,per) =>
            {
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve(per)
                }
            })
        })
}


exports.findUserByUsername = function(userName)
{
    return new Promise((resolve,reject) =>
        {
            User.find( {UserName : userName }, (err,per) =>
            {
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve(per)
                }
            })
        })
}

exports.creatUser =  (id,userName, password) => 
{
	return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(id , {
            UserName: userName,
            Password: password
		},(err, data) => {
			if (err) {
				reject(err)
			} else {
				resolve(data)
			}
		}
		)
	 
	})
}