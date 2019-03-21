const mongoose = require('mongoose');

ObjectId = mongoose.Types.ObjectId;

// -- Load model needed for the project
require('./Model_Evaluation');


// -- FIND ALL
function processFindAll () {
    return new Promise(function(resolve, reject) {
        console.log("Process : Evaluation - FIND ALL");

        Evaluation = mongoose.model('Evaluation');
        Evaluation.find().then((evaluations)=>{
        // console.log("Process : Evaluation - FIND ALL : " + evaluations);

            resolve(evaluations);
        },(err)=>{
            console.log("Process : Evaluation - FIND ALL : Error");

            reject("Erreur");
        })
    });
};

// -- CREATE
function processCreate (req) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Evaluation - CREATE");
        console.log("Process : Evaluation - CREATE :" + req.body.nom);

        Evaluation = mongoose.model('Evaluation');
        newEvaluation = new Evaluation({alias:req.body.alias});
        newEvaluation.id = newEvaluation._id;

        newEvaluation.save().then(()=>{
            console.log("Process : Evaluation - CREATE : Done");

            resolve("Done");
        },(err)=>{
            console.log("Process : Evaluation - CREATE : Error: " + err);

            reject("Erreur");
        })
    });
};

// -- UPDATE
function processUpdate (id, body) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Evaluation - UPDATE");
        
        mongoose.model('Evaluation').updateOne({_id : new ObjectId(id)}, {$set : body}, (err, updatedEvaluation)=>{
        if(err){
                console.log("Process : Evaluation - UPDATE : Error");

                reject("Erreur");
        }else{
                console.log("Process : Evaluation - UPDATE : " + updatedEvaluation);

                resolve("Done");
        }
        });
    });
};

// -- DELETE
function processDelete (req) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Evaluation - DELETE");
        console.log("Process : Evaluation - DELETE id : " + req.params.id);
        
        Evaluation = mongoose.model('Evaluation');
        Evaluation.find({_id : new ObjectId(req.params.id)}).deleteOne().then(()=>{
            console.log("Process : Evaluation - DELETE : Done");

            resolve("Done");
        },(err)=>{
            console.log("Process : Evaluation - DELETE : Error");

            reject("Erreur");
        });
    });
};

// -- READ
function processRead (req) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Evaluation - READ");
        console.log("Process : Evaluation - READ id : " + new ObjectId(req.params.id));

        mongoose.model('Evaluation').findOne({_id : new ObjectId(req.params.id)}).then((evaluation)=>{
            if(evaluation){
                console.log("Process : Evaluation - READ : " + evaluation);

                resolve(evaluation);
            }else{
                console.log("Process : Evaluation - READ : Inexistant");

                reject("Inexistant");
            }
        },(err)=>{
            console.log("Process : Evaluation - READ : Error");

            reject("Erreur");
        });
    });
};

exports.processFindAll = processFindAll;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;