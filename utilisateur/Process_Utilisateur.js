const mongoose = require('mongoose');

ObjectId = mongoose.Types.ObjectId;

// -- Load model needed for the project
require('./Model_Utilisateur');
Utilisateur = mongoose.model('Utilisateur');


// -- FIND ALL
async function processFindAll () {
    console.log("Process : Utilisateur - FIND ALL");

    return await Utilisateur.find().then((utilisateurs)=>{
        console.log("Process : Utilisateur - FIND ALL : " + utilisateurs);

        return utilisateurs;
    },(err)=>{
        console.log("Process : Utilisateur - FIND ALL : Error");

        return "Erreur";
    })
};

// -- CREATE
async function processCreate (req, password) {
    console.log("Process : Utilisateur - CREATE");
    console.log("Process : Utilisateur - CREATE :" + req.body.nom);

    newUtilisateur = new Utilisateur({role:req.body.role, email:req.body.email, password:password});
    newUtilisateur.id = newUtilisateur._id;

    return await newUtilisateur.save().then(()=>{
        console.log("Process : Utilisateur - CREATE : Done");

        return "Done";
    },(err)=>{
        console.log("Process : Utilisateur - CREATE : Error: " + err);

        return "Erreur";
    })
};

// -- UPDATE
async function processUpdate (id, body) {
    console.log("Process : Utilisateur - UPDATE");
    
    return await Utilisateur.updateOne({_id : new ObjectId(id)}, {$set : body}, (err, updatedUtilisateur)=>{
        if(err){
                console.log("Process : Utilisateur - UPDATE : Error");

                return "Erreur";
        }else{
                console.log("Process : Utilisateur - UPDATE : " + JSON.stringify(updatedUtilisateur));

                return "Done";
        }
    });
};

// -- DELETE
async function processDelete (req) {
    console.log("Process : Utilisateur - DELETE");
    console.log("Process : Utilisateur - DELETE id : " + req.params.id);
    
    return await Utilisateur.find({_id : new ObjectId(req.params.id)}).deleteOne().then(()=>{
        console.log("Process : Utilisateur - DELETE : Done");

        return "Done";
    },(err)=>{
        console.log("Process : Utilisateur - DELETE : Error");

        return "Erreur";
    });
};

// -- READ
async function processRead (req) {
    console.log("Process : Utilisateur - READ");
    console.log("Process : Utilisateur - READ id : " + new ObjectId(req.params.id));

    return await Utilisateur.findOne({_id : new ObjectId(req.params.id)}).then((utilisateur)=>{
        if(utilisateur){
            console.log("Process : Utilisateur - READ : " + utilisateur);

            return utilisateur;
        }else{
            console.log("Process : Utilisateur - READ : Inexistant");

            return "Inexistant";
        }
    },(err)=>{
        console.log("Process : Utilisateur - READ : Error");

        return "Erreur";
    });
};

// -- LOGIN
async function processLogin (email, password) {
    console.log("Process : Utilisateur - LOGIN");
    console.log("Process : Utilisateur - LOGIN email : " + email);

    return await Utilisateur.findOne({email : email, password : password}).then(async utilisateur => {
        if(utilisateur){
            // --- Generate token
            return await utilisateur.generateToken().then((utilisateurWebFormat)=>{
                console.log("Process : Utilisateur - LOGIN : " + utilisateurWebFormat);

                return utilisateurWebFormat;
            },(err)=>{
                console.log("Process : Utilisateur TOKEN - LOGIN : Error");
    
                return "Erreur";
            })
        }else{
            console.log("Process : Utilisateur - LOGIN : Inexistant");

            return "Inexistant";
        }
    },(err)=>{
        console.log("Process : Utilisateur - LOGIN : Error");

        return "Erreur";
    })
};

exports.processFindAll = processFindAll;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;
exports.processLogin = processLogin;