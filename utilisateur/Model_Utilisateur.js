//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

//------------------------------------------- Resources Schema
let UtilisateurSchema = new Schema({
  role : {
    type: String,
    required: true,
    enum: ['Apprenant', 'Tuteur', 'Administrateur'],
    default : 'Apprenant',
    stringTransform: function(string) {
      return string.toUpperCase();
    }
  },
  email : {
    type: String,
    unique: true,
    required: true,
    regex: new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
  },
  password: {
    type: String,
    required: true,
  },
  token : String
});

UtilisateurSchema.methods.generateToken = function(){
  return new Promise((resolve, reject) =>{
      // ---- algo
      this.token = Date.now();
      this.save().then(()=>{
          resolve({
              role : this.role,
              email : this.email,
              token : this.token
          })
      },(err)=>{
          reject(err)
      })
  })
};

let Utilisateur = mongoose.model('Utilisateur', UtilisateurSchema);
module.exports = Utilisateur;