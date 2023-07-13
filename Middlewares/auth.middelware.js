const jwt = require("jsonwebtoken")
require("dotenv").config()

const auth = async(req,res, next)=>{
    try {
        const accessToken = req.headers.authorization

        if(!accessToken) return res.status(400).json({message: "Please Login"})

        jwt.verify(
            accessToken,
            process.env.JWT_SECRET,
            (err, payload) =>{
                if(err){
                    return res.status(401).json({err: err.message})
                } else{
                    req.email = payload.email
                    next()
                }
            }
        )

    } catch (err) {
        console.log(err)
        return res.status(401).json({message: "Invalid Credentials", err: err.message})
    }
}

module.exports = { auth }