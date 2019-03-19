//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

//------------------------------------------- Resources Schema
let TuteurSchema = new Schema({
    nom: {
        type: String,
        required: true,
        stringTransform: function(string) {
            return string.toUpperCase();
        }
    },
    prenom : {
        type: String,
        required: true
    },
    adresse : {
        type: String,
        required: true
    },
    email : {
        type: String,
        unique: true,
        required: true,
        regex: new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
    },
    module : [{
        moduleId : String,
        nom : String
    }],
    apprenant : [{
        apprenantId : String,
        nom : String,
        prenom : String
    }]
});

let Tuteur = mongoose.model('Tuteur', TuteurSchema);
module.exports = Tuteur;