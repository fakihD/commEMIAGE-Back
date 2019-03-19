const mongoose = require('mongoose');

ObjectId = mongoose.Types.ObjectId;

// -- Load model needed for the project
require('./Model_Semestre');


// -- FIND ALL
function processFindAll () {
    return new Promise(function(resolve, reject) {
        console.log("Process : Semestre - FIND ALL");

        Semestre = mongoose.model('Semestre');
        Semestre.find().then((semestres)=>{
        // console.log("Process : Semestre - FIND ALL : " + semestres);

            resolve(semestres);
        },(err)=>{
            console.log("Process : Semestre - FIND ALL : Error");

            reject("Erreur");
        })
    });
};

// -- CREATE
function processCreate (req) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Semestre - CREATE");
        console.log("Process : Semestre - CREATE :" + req.body.nom);

        Semestre = mongoose.model('Semestre');
        newSemestre = new Semestre({nom:req.body.nom, dateDebut:req.body.dateDebut, dateFin:req.body.dateFin});
        newSemestre.id = newSemestre._id;

        newSemestre.save().then(()=>{
            console.log("Process : Semestre - CREATE : Done");

            resolve("Done");
        },(err)=>{
            console.log("Process : Semestre - CREATE : Error: " + err);

            reject("Erreur");
        })
    });
};

// -- UPDATE
function processUpdate (id, body) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Semestre - UPDATE");
        
        mongoose.model('Semestre').updateOne({_id : new ObjectId(id)}, {$set : body}, (err, updatedSemestre)=>{
        if(err){
                console.log("Process : Semestre - UPDATE : Error");

                reject("Erreur");
        }else{
                console.log("Process : Semestre - UPDATE : " + updatedSemestre);

                resolve("Done");
        }
        });
    });
};

// -- DELETE
function processDelete (req) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Semestre - DELETE");
        console.log("Process : Semestre - DELETE id : " + req.params.id);
        
        Semestre = mongoose.model('Semestre');
        Semestre.find({_id : new ObjectId(req.params.id)}).deleteOne().then(()=>{
            console.log("Process : Semestre - DELETE : Done");

            resolve("Done");
        },(err)=>{
            console.log("Process : Semestre - DELETE : Error");

            reject("Erreur");
        });
    });
};

// -- READ
function processRead (req) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Semestre - READ");
        console.log("Process : Semestre - READ id : " + new ObjectId(req.params.id));

        mongoose.model('Semestre').findOne({_id : new ObjectId(req.params.id)}).then((semestre)=>{
            if(semestre){
                console.log("Process : Semestre - READ : " + semestre);

                reject(semestre);
            }else{
                console.log("Process : Semestre - READ : Inexistant");

                reject("Inexistant");
            }
        },(err)=>{
            console.log("Process : Semestre - READ : Error");

            reject("Erreur");
        });
    });
};

exports.processFindAll = processFindAll;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;