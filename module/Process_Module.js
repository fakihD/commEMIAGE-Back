const mongoose = require('mongoose');

ObjectId = mongoose.Types.ObjectId;

// -- Load model needed for the project
require('./Model_Module');


// -- FIND ALL
function processFindAll () {
    return new Promise(function(resolve, reject) {
        console.log("Process : Module - FIND ALL");

        Module = mongoose.model('Module');
        Module.find().then((modules)=>{
        // console.log("Process : Module - FIND ALL : " + modules);

            resolve(modules);
        },(err)=>{
            console.log("Process : Module - FIND ALL : Error");

            reject("Erreur");
        })
    });
};

// -- CREATE
function processCreate (req) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Module - CREATE");
        console.log("Process : Module - CREATE :" + req.body.nom);

        Module = mongoose.model('Module');
        newModule = new Module({nom:req.body.nom, coefficient:req.body.coefficient, seuil:req.body.seuil});
        newModule.id = newModule._id;

        newModule.save().then(()=>{
            console.log("Process : Module - CREATE : Done");

            resolve("Done");
        },(err)=>{
            console.log("Process : Module - CREATE : Error: " + err);

            reject("Erreur");
        })
    });
};

// -- UPDATE
function processUpdate (id, body) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Module - UPDATE");
        
        mongoose.model('Module').updateOne({_id : new ObjectId(id)}, {$set : body}, (err, updatedModule)=>{
        if(err){
                console.log("Process : Module - UPDATE : Error");

                reject("Erreur");
        }else{
                console.log("Process : Module - UPDATE : " + updatedModule);

                resolve("Done");
        }
        });
    });
};

// -- DELETE
function processDelete (req) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Module - DELETE");
        console.log("Process : Module - DELETE id : " + req.params.id);
        
        Module = mongoose.model('Module');
        Module.find({_id : new ObjectId(req.params.id)}).deleteOne().then(()=>{
            console.log("Process : Module - DELETE : Done");

            resolve("Done");
        },(err)=>{
            console.log("Process : Module - DELETE : Error");

            reject("Erreur");
        });
    });
};

// -- READ
function processRead (req) {
    return new Promise(function(resolve, reject) {
        console.log("Process : Module - READ");
        console.log("Process : Module - READ id : " + new ObjectId(req.params.id));

        mongoose.model('Module').findOne({_id : new ObjectId(req.params.id)}).then((module)=>{
            if(module){
                console.log("Process : Module - READ : " + module);

                resolve(module);
            }else{
                console.log("Process : Module - READ : Inexistant");

                reject("Inexistant");
            }
        },(err)=>{
            console.log("Process : Module - READ : Error");

            reject("Erreur");
        });
    });
};

exports.processFindAll = processFindAll;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;