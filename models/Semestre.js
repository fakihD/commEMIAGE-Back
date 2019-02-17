//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

//------------------------------------------- Resources Schema
let SemestreSchema = new Schema({
    nom : {
        type: String,
        required: true
    },
    dateDebut : {
        type: Date,
        required: true
    },
    dateFin : {
        type: Date,
        required: true
    },
    module : [{
            nom : String
    }],
});

let Semestre = mongoose.model('Semestre', SemestreSchema);
module.exports = Semestre;