//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

//------------------------------------------- Resources Schema
let ApprenantSchema = new Schema({
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
  dateFormation : {
    type: Date,
    default: Date.now,
    required: true
  },
  filiere : {
      filiereId: String,
      nom: String
  },
  semestre : [{
        nom : String,
        dateDebut : {
            type: Date,
            required: true
        },
        dateFin : {
            type: Date,
            required: true
        },
        module : [{
              nom : String,
              evaluation : [{
                    alias : String,
              }],
              suivi : [{
                    alias : String,
              }]
        }]
  }],
});

let Apprenant = mongoose.model('Apprenant', ApprenantSchema);
module.exports = Apprenant;