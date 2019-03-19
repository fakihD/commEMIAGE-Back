const mongoose = require('mongoose');

ObjectId = mongoose.Types.ObjectId;

// -- Load model needed for the project
require('./Model_Utilisateur');


// -- FIND ALL
function processFindAll () {
    return new Promise(function(resolve, reject) {
        console.log("Process : Utilisateur - FIND ALL");

        Utilisateur = mongoose.model('Utilisateur');
        Utilisateur.find().then((utilisateurs)=>{
        // console.log("Process : Utilisateur - FIND ALL : " + utilisateurs);

            resolve(utilisateurs);
        },(err)=>{
            console.log("Process : Utilisateur - FIND ALL : Error");

            reject("Erreur");
        })
    });
};

// -- CREATE
function processCreate (req, password) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Utilisateur - CREATE");
        console.log("Process : Utilisateur - CREATE :" + req.body.nom);

        Utilisateur = mongoose.model('Utilisateur');
        newUtilisateur = new Utilisateur({role:req.body.role, email:req.body.email, password:password});
        newUtilisateur.id = newUtilisateur._id;

        newUtilisateur.save().then(()=>{
            console.log("Process : Utilisateur - CREATE : Done");

            resolve("Done");
        },(err)=>{
            console.log("Process : Utilisateur - CREATE : Error: " + err);

            reject("Erreur");
        })
    });
};

// -- UPDATE
function processUpdate (id, body) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Utilisateur - UPDATE");
        
        mongoose.model('Utilisateur').updateOne({_id : new ObjectId(id)}, {$set : body}, (err, updatedUtilisateur)=>{
        if(err){
                console.log("Process : Utilisateur - UPDATE : Error");

                reject("Erreur");
        }else{
                console.log("Process : Utilisateur - UPDATE : " + updatedUtilisateur);

                resolve("Done");
        }
        });
    });
};

// -- DELETE
function processDelete (req) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Utilisateur - DELETE");
        console.log("Process : Utilisateur - DELETE id : " + req.params.id);
        
        Utilisateur = mongoose.model('Utilisateur');
        Utilisateur.find({_id : new ObjectId(req.params.id)}).deleteOne().then(()=>{
            console.log("Process : Utilisateur - DELETE : Done");

            resolve("Done");
        },(err)=>{
            console.log("Process : Utilisateur - DELETE : Error");

            reject("Erreur");
        });
    });
};

// -- READ
function processRead (req) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Utilisateur - READ");
        console.log("Process : Utilisateur - READ id : " + new ObjectId(req.params.id));

        mongoose.model('Utilisateur').findOne({_id : new ObjectId(req.params.id)}).then((utilisateur)=>{
            if(utilisateur){
                console.log("Process : Utilisateur - READ : " + utilisateur);

                reject(utilisateur);
            }else{
                console.log("Process : Utilisateur - READ : Inexistant");

                reject("Inexistant");
            }
        },(err)=>{
            console.log("Process : Utilisateur - READ : Error");

            reject("Erreur");
        });
    });
};

exports.processFindAll = processFindAll;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;