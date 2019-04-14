//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

//------------------------------------------- Resources Schema
ModuleSchema = new Schema({
    nom : {
        type: String,
        required: true
    },
    coefficient : {
        type: Number,
        min: 0,
        default: 1,
        required: true
    },
    seuil : {
        type: Number,
        min: 0,
        default: 10,
        required: true
    },
    semestre : [{
        nom : String,
        dateDebut : {
            type: Date,
        },
        dateFin : {
            type: Date,
        },
        tuteur : {
            nom : String,
            prenom : String
        },
        apprenant : [{
            apprenantId : String,
            nom : String,
            prenom : String
        }]
    }]
});

let Module = mongoose.model('Module', ModuleSchema);
module.exports = Module;