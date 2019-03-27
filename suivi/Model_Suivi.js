//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

//------------------------------------------- Resources Schema
let SuiviSchema = new Schema({
    alias : String,
    questions : String,
    remarques : String,
    tuteur : {
        tuteurId : String,
        nom : String,
        prenom : String
    },
    apprenant : {
        apprenantId : String,
        nom : String,
        prenom : String
    },
    module : {
        moduleId : String,
        nom : String
    },
});

let Suivi = mongoose.model('Suivi', SuiviSchema);
module.exports = Suivi;