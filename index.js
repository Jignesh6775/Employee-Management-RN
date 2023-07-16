const express = require("express")
const cors = require("cors")
const { connection } = require("./Connections/db")
const { userRouter } = require("./Routes/user.routes")
const { auth } = require("./Middlewares/auth.middelware")
const { employeeRouter } = require("./Routes/employee.routes")
require('dotenv').config
const port = process.env.PORT || 8080
const app = express()

app.use(express.json())
app.use(cors())

app.use("/", userRouter)
// app.use(auth)
app.use("/employees", employeeRouter)


app.listen(port, async()=>{
    try {
        await connection
        console.log("Connected to DB Successfully")
    } catch (error) {
        console.log("Not Connected to DB")
        console.log(error)
    }
    console.log(`Server is running on port ${port}`)
})
