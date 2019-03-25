const mongoose = require('mongoose');

ObjectId = mongoose.Types.ObjectId;

// -- Load model needed for the project
require('./Model_Apprenant');


// -- FIND ALL
function processFindAll () {
    return new Promise(function(resolve, reject) {
        console.log("Process : Apprenant - FIND ALL");

        Apprenant = mongoose.model('Apprenant');
        Apprenant.find().then((apprenants)=>{
        // console.log("Process : Apprenant - FIND ALL : " + apprenants);

            resolve(apprenants);
        },(err)=>{
            console.log("Process : Apprenant - FIND ALL : Error");

            reject("Erreur");
        })
    });
};

// -- CREATE
function processCreate (req) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Apprenant - CREATE");
        console.log("Process : Apprenant - CREATE :" + req.body.nom);

        Apprenant = mongoose.model('Apprenant');
        newApprenant = new Apprenant({nom:req.body.nom, prenom:req.body.prenom, adresse:req.body.adresse, email:req.body.email, filiere:req.body.filiere, semestre:req.body.semestre});
        newApprenant.id = newApprenant._id;

        newApprenant.save().then(()=>{
            console.log("Process : Apprenant - CREATE : Done");

            resolve("Done");
        },(err)=>{
            console.log("Process : Apprenant - CREATE : Error: " + err);

            reject("Erreur");
        })
    });
};

// -- UPDATE
function processUpdate (id, body) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Apprenant - UPDATE");
        
        mongoose.model('Apprenant').updateOne({_id : new ObjectId(id)}, {$set : body}, (err, updatedApprenant)=>{
        if(err){
                console.log("Process : Apprenant - UPDATE : Error");

                reject("Erreur");
        }else{
                console.log("Process : Apprenant - UPDATE : " + JSON.stringify(updatedApprenant));

                resolve("Done");
        }
        });
    });
};

// -- DELETE
function processDelete (req) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Apprenant - DELETE");
        console.log("Process : Apprenant - DELETE id : " + req.params.id);
        
        Apprenant = mongoose.model('Apprenant');
        Apprenant.find({_id : new ObjectId(req.params.id)}).deleteOne().then(()=>{
            console.log("Process : Apprenant - DELETE : Done");

            resolve("Done");
        },(err)=>{
            console.log("Process : Apprenant - DELETE : Error");

            reject("Erreur");
        });
    });
};

// -- READ ID
function processRead (req) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Apprenant - READ");
        console.log("Process : Apprenant - READ id : " + new ObjectId(req.params.id));

        mongoose.model('Apprenant').findOne({_id : new ObjectId(req.params.id)}).then((apprenant)=>{
            if(apprenant){
                console.log("Process : Apprenant - READ : " + apprenant);

                resolve(apprenant);
            }else{
                console.log("Process : Apprenant - READ : Inexistant");

                reject("Inexistant");
            }
        },(err)=>{
            console.log("Process : Apprenant - READ : Error");

            reject("Erreur");
        });
    });
};

// -- READ EMAIL
function processReadEmail (req) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Apprenant - READ EMAIL");
        console.log("Process : Apprenant - READ EMAIL : " + req.params.email);

        mongoose.model('Apprenant').findOne({email : req.params.email}).then((apprenant)=>{
            if(apprenant){
                console.log("Process : Apprenant - READ EMAIL : " + apprenant);

                resolve(apprenant);
            }else{
                console.log("Process : Apprenant - READ EMAIL : Inexistant");

                reject("Inexistant");
            }
        },(err)=>{
            console.log("Process : Apprenant - READ EMAIL : Error");

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