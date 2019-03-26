const mongoose = require('mongoose');

ObjectId = mongoose.Types.ObjectId;

// -- Load model needed for the project
require('./Model_Administrateur');


// -- FIND ALL
function processFindAll () {
    return new Promise(function(resolve, reject) {
        console.log("Process : Administrateur - FIND ALL");

        Administrateur = mongoose.model('Administrateur');
        Administrateur.find().then((administrateurs)=>{
        // console.log("Process : Administrateur - FIND ALL : " + administrateurs);

            resolve(administrateurs);
        },(err)=>{
            console.log("Process : Administrateur - FIND ALL : Error");

            reject("Erreur");
        })
    });
};

// -- CREATE
function processCreate (req) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Administrateur - CREATE");
        console.log("Process : Administrateur - CREATE :" + req.body.nom);

        Administrateur = mongoose.model('Administrateur');
        newAdministrateur = new Administrateur({nom:req.body.nom, prenom:req.body.prenom, adresse:req.body.adresse, email:req.body.email});
        newAdministrateur.id = newAdministrateur._id;

        newAdministrateur.save().then(()=>{
            console.log("Process : Administrateur - CREATE : Done");

            resolve("Done");
        },(err)=>{
            console.log("Process : Administrateur - CREATE : Error: " + err);

            reject("Erreur");
        })
    });
};

// -- UPDATE
function processUpdate (id, body) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Administrateur - UPDATE");
        
        mongoose.model('Administrateur').updateOne({_id : new ObjectId(id)}, {$set : body}, (err, updatedAdministrateur)=>{
        if(err){
                console.log("Process : Administrateur - UPDATE : Error");

                reject("Erreur");
        }else{
                console.log("Process : Administrateur - UPDATE : " + updatedAdministrateur);

                resolve("Done");
        }
        });
    });
};

// -- DELETE
function processDelete (req) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Administrateur - DELETE");
        console.log("Process : Administrateur - DELETE id : " + req.params.id);
        
        Administrateur = mongoose.model('Administrateur');
        Administrateur.find({_id : new ObjectId(req.params.id)}).deleteOne().then(()=>{
            console.log("Process : Administrateur - DELETE : Done");

            resolve("Done");
        },(err)=>{
            console.log("Process : Administrateur - DELETE : Error");

            reject("Erreur");
        });
    });
};

// -- READ ID
function processRead (req) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Adminstrateur - READ");
        console.log("Process : Adminstrateur - READ id : " + new ObjectId(req.params.id));

        mongoose.model('Adminstrateur').findOne({_id : new ObjectId(req.params.id)}).then((administrateur)=>{
            if(administrateur){
                console.log("Process : Adminstrateur - READ : " + administrateur);

                resolve(administrateur);
            }else{
                console.log("Process : Adminstrateur - READ : Inexistant");

                reject("Inexistant");
            }
        },(err)=>{
            console.log("Process : Adminstrateur - READ : Error");

            reject("Erreur");
        });
    });
};

// -- READ EMAIL
function processReadEmail (req) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Adminstrateur - READ EMAIL");
        console.log("Process : Adminstrateur - READ EMAIL : " + req.params.email);

        mongoose.model('Adminstrateur').findOne({email : req.params.email}).then((administrateur)=>{
            if(administrateur){
                console.log("Process : Adminstrateur - READ EMAIL : " + administrateur);

                resolve(administrateur);
            }else{
                console.log("Process : Adminstrateur - READ EMAIL : Inexistant");

                reject("Inexistant");
            }
        },(err)=>{
            console.log("Process : Adminstrateur - READ EMAIL : Error");

            reject("Erreur");
        });
    });
};

exports.processFindAll = processFindAll;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;
exports.processReadEmail = processReadEmail;