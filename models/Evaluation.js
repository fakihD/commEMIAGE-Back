//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

//------------------------------------------- Resources Schema
let EvaluationSchema = new Schema({
    alias : String,
    controleContinue : {type: [Number]},
    controleTerminal : {type: Number, min: 0, default: 1},
    commentaireTuteur : String,
    commentaireApprenant : String,
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
    }
});

let Evaluation = mongoose.model('Evaluation', EvaluationSchema);
module.exports = Evaluation;