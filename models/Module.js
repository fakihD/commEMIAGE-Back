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
    filiere : {
        nom : String
    },
    tuteur : {
        tuteurId : String,
        nom : String,
        prenom : String
    },
    semestre : {
        nom : String,
        dateDebut : {
            type: Date,
            required: true
        },
        dateFin : {
            type: Date,
            required: true
        }
    }
});

let Module = mongoose.model('Module', ModuleSchema);
module.exports = Module;