const companyModel = require("../models/companyModel");

let routeGuard = async (req,res,next)=>{

    let user= await companyModel.findOne({_id:req.session.companyId})
    if (user) {
        next()
    }else{
        res.redirect("/")
    }

}

module.exports = routeGuard

