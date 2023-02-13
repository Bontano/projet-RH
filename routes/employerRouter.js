const express = require("express");
const companyModel = require("../models/companyModel");
const employeeModel = require("../models/employeeModel")
const employeeRouter = express.Router()
const multer = require("../services/multer")
const routeGuard = require("../services/authGuard.js")


employeeRouter.get('/affichemployee', routeGuard, async (req, res) => {
    try {
        let company = await companyModel.findOne({ _id: req.session.companyId }).populate('employees')
        res.render('affiemployee.twig', {
            employees: company.employees
        })
    } catch (err) {
        console.log(err);
        res.send(err)
    }
})


employeeRouter.get('/createEmployee', routeGuard, async (req, res) => {
    try {
        res.render('createemployer.twig')
    } catch (err) {
        console.log(err);
        res.send(err)
    }
})
employeeRouter.post('/createEmployee', routeGuard, multer.single("photo"), async (req, res) => {
    try {
        req.body.photo = req.file.filename
        let employee = new employeeModel(req.body)
        employee.save()
        await companyModel.updateOne({ _id: req.session.companyId }, { $push: { employees: employee._id } })
        res.redirect('/createEmployee')
    } catch (err) {
        console.log(err);
        res.send(err)
    }
})

employeeRouter.get("/delete/:id", routeGuard, async (req, res) => {

    try {
        await employeeModel.deleteOne({ _id: req.params.id });
        res.redirect("/createEmployee")
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

employeeRouter.get("/modifier/:id", routeGuard, async (req, res) => {
    try {
        let employee = await employeeModel.findOne({_id: req.params.id})
        res.render("modifier.twig",{
            idEmployee: employee.id
        })
    } catch (err) {
        console.error(err);
        res.send(err)
    }
})
employeeRouter.post("/modifier/:id", routeGuard,multer.single("photo"), async (req, res) => {
    try {
        if (req.file) {
            req.body.photo=req.body.filename
        }
        await employeeModel.updateOne({_id:req.params.id},req.body)
        res.redirect("/affichemployee")
    } catch (err) {
        console.error(err);
        res.send(err)
    }
})

employeeRouter.get("/blame/:id", routeGuard, async (req, res) => {
    try {
        let employee = await employeeModel.findOne({_id: req.params.id})
        await employeeModel.updateOne({_id:req.params.id}, {blame:employee.blame+1})
        if (employee.blame>=2) {
            res.redirect("/delete/" + req.params.id)
        }else{
            res.redirect("/affichemployee")
        }

    } catch (err) {
        console.error(err);
        res.send(err)
    }
})


module.exports = employeeRouter