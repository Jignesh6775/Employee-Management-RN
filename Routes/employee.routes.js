const express = require("express")
const employeeRouter = express.Router()
const { EmployeeModel } = require("../Models/employee.model")


employeeRouter.get("/", async (req, res)=> {
    try {
        const data = await EmployeeModel.find()
        res.status(201).send(data)
    } catch (error) {
        res.status(404).send({ "message": error.message })
    }
})

employeeRouter.get("/:id", async (req, res)=> {
    const {id} = req.params
    try {
        const data = await EmployeeModel.findOne({ _id: id })
        res.status(201).send(data)
    } catch (error) {
        res.status(404).send({ "message": error.message })
    }
})

employeeRouter.post("/add", async(req, res)=>{
    try {
        const data = await new EmployeeModel(req.body)
        await data.save()
        res.status(201).json({ message : 'New User Added' })
    } catch (error) {
        res.status(404).send({ "message": error.message })
    }
})

employeeRouter.patch("/update/:id", async(req, res)=>{
    const {id} = req.params
    const payload = req.body
    try {
        await EmployeeModel.findByIdAndUpdate({ _id: id }, payload)
        res.status(201).json({ message : 'A User is Updated' })
    } catch (error) {
        res.status(404).send({ "message": error.message })
    }
})

employeeRouter.delete("/delete/:id", async(req, res)=>{
    const {id} = req.params
    try {
        await EmployeeModel.findByIdAndDelete({ _id: id })
        res.status(201).json({ message : 'A User is Deleted' })
    } catch (error) {
        res.status(404).send({ "message": error.message })
    }
})


module.exports = { employeeRouter }