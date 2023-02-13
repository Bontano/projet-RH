const express = require("express");
const companyModel = require("../models/companyModel");
const employeeModel = require("../models/employeeModel")
const mainRouter = express.Router()
const crypto = require("../services/crypto")
const routeGuard = require("../services/authGuard.js")



// mainRouter.get('/', async (req,res)=>{
//    try {
//       res.render
//    } catch (error) {

//    }
// })

mainRouter.get('/register', async (req, res) => {
   try {
      res.render('main.twig')
   } catch (err) {
      console.log(err);
      res.send(err)
   }
})

mainRouter.post('/register', async (req, res) => {
   console.log(req.body);
   try {
      req.body.password = await crypto.cryptPassword(req.body.password);
         let newCompany = new companyModel(req.body)
      await newCompany.save()
      res.redirect('/companyLogin')
   } catch (err) {
      res.send(err)
   }

})

mainRouter.post('/companyLogin', async (req, res) => {
   try {
      let company = await companyModel.findOne({ mail: req.body.mail })
      if (company) {
         if (await crypto.comparePassword(req.body.password, company.password)) {
            req.session.companyId = company._id
            res.redirect('/createEmployee') //TODO route a definir    
         }else{
            res.redirect("/companyLogin")
         }
      } else {
         throw "mail non valide"
      }
   } catch (err) {
      console.log(err);
      res.redirect('/companyLogin')
   }
})


mainRouter.get('/companyLogin', async (req, res) => {
   try {
      res.render('login.twig')
   } catch (err) {
      console.log(err);
      res.send(err)
   }
})

mainRouter.get('/', async (req, res) => {
   try {
      res.redirect('/companyLogin')
   } catch (err) {
      console.log(err);
      res.send(err)
   }
})



module.exports = mainRouter


