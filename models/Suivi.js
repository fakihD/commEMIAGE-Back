//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

//------------------------------------------- Resources Schema
let SuiviSchema = new Schema({
    alias : String,
    tuteur : {
        nom : String,
        prenom : String
    },
    apprenant : {
        nom : String,
        prenom : String
    },
    module : {
        nom : String
    },
});

let Suivi = mongoose.model('Suivi', SuiviSchema);
module.exports = Suivi;