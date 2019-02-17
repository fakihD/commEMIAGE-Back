//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

//------------------------------------------- Resources Schema
let FiliereSchema = new Schema({
    nom : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    module : [{
            nom : String
    }],
    apprenant : [{
        nom : String,
        prenom : String
    }]
});

let Filiere = mongoose.model('Filiere', FiliereSchema);
module.exports = Filiere;