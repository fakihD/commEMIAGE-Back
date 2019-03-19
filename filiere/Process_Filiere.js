const mongoose = require('mongoose');

ObjectId = mongoose.Types.ObjectId;

// -- Load model needed for the project
require('./Model_Filiere');


// -- FIND ALL
function processFindAll () {
    return new Promise(function(resolve, reject) {
        console.log("Process : Filiere - FIND ALL");

        Filiere = mongoose.model('Filiere');
        Filiere.find().then((filieres)=>{
        // console.log("Process : Filiere - FIND ALL : " + filieres);

            resolve(filieres);
        },(err)=>{
            console.log("Process : Filiere - FIND ALL : Error");

            reject("Erreur");
        })
    });
};

// -- CREATE
function processCreate (req) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Filiere - CREATE");
        console.log("Process : Filiere - CREATE :" + req.body.nom);

        Filiere = mongoose.model('Filiere');
        newFiliere = new Filiere({nom:req.body.nom, description:req.body.description, module:req.body.module});
        newFiliere.id = newFiliere._id;

        newFiliere.save().then(()=>{
            console.log("Process : Filiere - CREATE : Done");

            resolve("Done");
        },(err)=>{
            console.log("Process : Filiere - CREATE : Error: " + err);

            reject("Erreur");
        })
    });
};

// -- UPDATE
function processUpdate (id, body) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Filiere - UPDATE");
        
        mongoose.model('Filiere').updateOne({_id : new ObjectId(id)}, {$set : body}, (err, updatedFiliere)=>{
        if(err){
                console.log("Process : Filiere - UPDATE : Error");

                reject("Erreur");
        }else{
                console.log("Process : Filiere - UPDATE : " + updatedFiliere);

                resolve("Done");
        }
        });
    });
};

// -- DELETE
function processDelete (req) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Filiere - DELETE");
        console.log("Process : Filiere - DELETE id : " + req.params.id);
        
        Filiere = mongoose.model('Filiere');
        Filiere.find({_id : new ObjectId(req.params.id)}).deleteOne().then(()=>{
            console.log("Process : Filiere - DELETE : Done");

            resolve("Done");
        },(err)=>{
            console.log("Process : Filiere - DELETE : Error");

            reject("Erreur");
        });
    });
};

// -- READ
function processRead (req) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Filiere - READ");
        console.log("Process : Filiere - READ id : " + new ObjectId(req.params.id));

        mongoose.model('Filiere').findOne({_id : new ObjectId(req.params.id)}).then((filiere)=>{
            if(filiere){
                console.log("Process : Filiere - READ : " + filiere);

                reject(filiere);
            }else{
                console.log("Process : Filiere - READ : Inexistant");

                reject("Inexistant");
            }
        },(err)=>{
            console.log("Process : Filiere - READ : Error");

            reject("Erreur");
        });
    });
};

exports.processFindAll = processFindAll;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;