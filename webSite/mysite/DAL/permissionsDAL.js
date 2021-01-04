const js  = require ('jsonfile')


exports.getAllPermissions = () => 
{
    return new Promise ((res,rej) => 
      js.readFile(`${__dirname}/../Data Sources/Permissions.json`, (err,data) => err ?rej(err) : res(data))
    )
}

exports.setPermissions = (data) =>{
    js.writeFile(`${__dirname}/../DataSource/Permissions.json`,{data},err => err? err : console.log("success"))
}