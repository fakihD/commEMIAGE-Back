const mongoose = require('mongoose');

ObjectId = mongoose.Types.ObjectId;

// -- Load model needed for the project
require('./Model_Suivi');


// -- FIND ALL
function processFindAll () {
    return new Promise(function(resolve, reject) {
        console.log("Process : Suivi - FIND ALL");

        Suivi = mongoose.model('Suivi');
        Suivi.find().then((suivis)=>{
        // console.log("Process : Suivi - FIND ALL : " + suivis);

            resolve(suivis);
        },(err)=>{
            console.log("Process : Suivi - FIND ALL : Error");

            reject("Erreur");
        })
    });
};

// -- CREATE
function processCreate (req) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Suivi - CREATE");
        console.log("Process : Suivi - CREATE :" + req.body.nom);

        Suivi = mongoose.model('Suivi');
        newSuivi = new Suivi({alias:req.body.alias});
        newSuivi.id = newSuivi._id;

        newSuivi.save().then(()=>{
            console.log("Process : Suivi - CREATE : Done");

            resolve("Done");
        },(err)=>{
            console.log("Process : Suivi - CREATE : Error: " + err);

            reject("Erreur");
        })
    });
};

// -- UPDATE
function processUpdate (id, body) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Suivi - UPDATE");
        
        mongoose.model('Suivi').updateOne({_id : new ObjectId(id)}, {$set : body}, (err, updatedSuivi)=>{
        if(err){
                console.log("Process : Suivi - UPDATE : Error");

                reject("Erreur");
        }else{
                console.log("Process : Suivi - UPDATE : " + updatedSuivi);

                resolve("Done");
        }
        });
    });
};

// -- DELETE
function processDelete (req) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Suivi - DELETE");
        console.log("Process : Suivi - DELETE id : " + req.params.id);
        
        Suivi = mongoose.model('Suivi');
        Suivi.find({_id : new ObjectId(req.params.id)}).deleteOne().then(()=>{
            console.log("Process : Suivi - DELETE : Done");

            resolve("Done");
        },(err)=>{
            console.log("Process : Suivi - DELETE : Error");

            reject("Erreur");
        });
    });
};

// -- READ
function processRead (req) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Suivi - READ");
        console.log("Process : Suivi - READ id : " + new ObjectId(req.params.id));

        mongoose.model('Suivi').findOne({_id : new ObjectId(req.params.id)}).then((suivi)=>{
            if(suivi){
                console.log("Process : Suivi - READ : " + suivi);

                reject(suivi);
            }else{
                console.log("Process : Suivi - READ : Inexistant");

                reject("Inexistant");
            }
        },(err)=>{
            console.log("Process : Suivi - READ : Error");

            reject("Erreur");
        });
    });
};

exports.processFindAll = processFindAll;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;