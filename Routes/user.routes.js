const express = require("express")
const userRouter = express.Router()
const { UserModel } = require("../Models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()
const app = express()

userRouter.post("/signup", async(req, res)=> {
    const { email, password } = req.body
    try {
        //Check User
        const userExist = await UserModel.findOne({ email })
        if(userExist){
            return res.status(400).json({ message : 'User Already Exists, Please Login.' })
        }

        //Create new user
        bcrypt.hash(password, 5, async(err, hash) =>{
            const user = new UserModel({ email, password:hash })
            await user.save()
            res.status(201).json({ message : 'Signup Successful' })
        })
    } catch (error) {
        res.status(404).send({ "message": error.message })
    }
})


userRouter.post("/login", async(req, res) =>{
    const { email, password } = req.body
    try {
        //Check User
        const user = await UserModel.findOne({ email })
        if(!user){
            return res.status(400).json({ message : 'Invalid Username' })
        }

        //Check password
        const passwordExist = await bcrypt.compare(password, user.password)
        if(!passwordExist){
            return res.status(400).json({ message : 'Invalid Password' })
        }

        //Create access token
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" })

        res.status(201).json({ message : 'Login Successful' , token})
    } catch (error) {
        res.status(404).send({ "message": error.message })
    }
})



module.exports = { userRouter }