const mongoose = require('mongoose');

ObjectId = mongoose.Types.ObjectId;

// -- Load model needed for the project
require('./Model_Tuteur');


// -- FIND ALL
function processFindAll () {
    return new Promise(function(resolve, reject) {
        console.log("Process : Tuteur - FIND ALL");

        Tuteur = mongoose.model('Tuteur');
        Tuteur.find().then((tuteurs)=>{
        // console.log("Process : Tuteur - FIND ALL : " + tuteurs);

            resolve(tuteurs);
        },(err)=>{
            console.log("Process : Tuteur - FIND ALL : Error");

            reject("Erreur");
        })
    });
};

// -- CREATE
function processCreate (req) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Tuteur - CREATE");
        console.log("Process : Tuteur - CREATE :" + req.body.nom);

        Tuteur = mongoose.model('Tuteur');
        newTuteur = new Tuteur({nom:req.body.nom, prenom:req.body.prenom, adresse:req.body.adresse, email:req.body.email, module:req.body.module});
        newTuteur.id = newTuteur._id;

        newTuteur.save().then(()=>{
            console.log("Process : Tuteur - CREATE : Done");

            resolve("Done");
        },(err)=>{
            console.log("Process : Tuteur - CREATE : Error: " + err);

            reject("Erreur");
        })
    });
};

// -- UPDATE
function processUpdate (id, body) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Tuteur - UPDATE");
        
        mongoose.model('Tuteur').updateOne({_id : new ObjectId(id)}, {$set : body}, (err, updatedTuteur)=>{
        if(err){
                console.log("Process : Tuteur - UPDATE : Error");

                reject("Erreur");
        }else{
                console.log("Process : Tuteur - UPDATE : " + updatedTuteur);

                resolve("Done");
        }
        });
    });
};

// -- DELETE
function processDelete (req) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Tuteur - DELETE");
        console.log("Process : Tuteur - DELETE id : " + req.params.id);
        
        Tuteur = mongoose.model('Tuteur');
        Tuteur.find({_id : new ObjectId(req.params.id)}).deleteOne().then(()=>{
            console.log("Process : Tuteur - DELETE : Done");

            resolve("Done");
        },(err)=>{
            console.log("Process : Tuteur - DELETE : Error");

            reject("Erreur");
        });
    });
};

// -- READ
function processRead (req) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Tuteur - READ");
        console.log("Process : Tuteur - READ id : " + new ObjectId(req.params.id));

        mongoose.model('Tuteur').findOne({_id : new ObjectId(req.params.id)}).then((tuteur)=>{
            if(tuteur){
                console.log("Process : Tuteur - READ : " + tuteur);

                resolve(tuteur);
            }else{
                console.log("Process : Tuteur - READ : Inexistant");

                reject("Inexistant");
            }
        },(err)=>{
            console.log("Process : Tuteur - READ : Error");

            reject("Erreur");
        });
    });
};

exports.processFindAll = processFindAll;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;