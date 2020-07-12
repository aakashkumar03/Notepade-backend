
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const User = mongoose.model("User")
module.exports = (req, res, next) => {
    const token = req.header('TOKEN')
    if (!token) {
         res.status(401).json({ error: "you must be logged in" })
    }
    try{
    
        var login = jwt.verify( token,process.env.SECRET)
        req.user=login
       next() 
        
    }
    catch(err){
        res.send("error in jwt")
    }
    
    
    
}


