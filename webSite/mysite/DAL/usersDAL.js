const js  = require ('jsonfile')


exports.getAllUsers = () => 
{
    return new Promise ((res,rej) => 
      js.readFile(`${__dirname}/../Data Sources/Users.json`, (err,data) => err ?rej(err) : res(data))
    )
}

exports.setUsers = (data) =>{
    js.writeFile(`${__dirname}/../DataSource/Users.json`,{"users":data},err => err? err : console.log("success"))
}