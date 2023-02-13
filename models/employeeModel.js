const mongoose = require('mongoose');


const employeeSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: [true, 'Photo'],
    },
    nom: {
        type: String,
        required: [true, 'Nom'],
    },
    fonction: {
        type: String,
        required: [true, 'Fonction'],
    },
    blame: {
        type: Number,
        required: [true, "Nombre blame"],
    },

})

const employeeModel = mongoose.model('employees', employeeSchema)
module.exports = employeeModel