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
    filiere : {type: Object, objectType: {
        nom: String
    }},
    tuteur : {type: Object, objectType: {
        nom : String,
        prenom : String
    }},
    semestre : {type: Object, objectType: {
        nom : String
    }}
});

let Module = mongoose.model('Module', ModuleSchema);
module.exports = Module;