const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "pas de nom"]
    },
    siretNumber:{
        type: String,
        required: [true, "pas de numero de siret"]
    },
    mail:{
        type: String,
        required: [true, "pas d'adresse mail"]
    },
    ceoName:{
        type: String,
        required: [true, "pas de nom du directeur"]
    },
    password:{
        type: String,
        required: [true, "pas de mot de passe"]
    },
    employees: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "employees"
        }]
    
    }
})

const companyModel = mongoose.model('companies', companySchema)
module.exports = companyModel