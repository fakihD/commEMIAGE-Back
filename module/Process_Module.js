const mongoose = require('mongoose');

ObjectId = mongoose.Types.ObjectId;

// -- Load model needed for the project
require('./Model_Module');
Module = mongoose.model('Module');


// -- FIND ALL
async function processFindAll () {
    console.log("Process : Module - FIND ALL");

    return await Module.find().then((modules)=>{
        console.log("Process : Module - FIND ALL : " + modules);

        return modules;
    },(err)=>{
        console.log("Process : Module - FIND ALL : Error");

        return "Erreur";
    })
};

// -- CREATE
async function processCreate (req) {
    console.log("Process : Module - CREATE");
    console.log("Process : Module - CREATE :" + req.body.nom);

    newModule = new Module({nom:req.body.nom, coefficient:req.body.coefficient, seuil:req.body.seuil, semestre:req.body.semestre});
    newModule.id = newModule._id;

    return await newModule.save().then(()=>{
        console.log("Process : Module - CREATE : Done");

        return "Done";
    },(err)=>{
        console.log("Process : Module - CREATE : Error: " + err);

        return "Erreur";
    })
};

// -- UPDATE
async function processUpdate (id, body) {
    console.log("Process : Module - UPDATE");
    
    return await Module.updateOne({_id : new ObjectId(id)}, {$set : body}, (err, updatedModule)=>{
        if(err){
                console.log("Process : Module - UPDATE : Error");

                return "Erreur";
        }else{
                console.log("Process : Module - UPDATE : " + JSON.stringify(updatedModule));

                return "Done";
        }
    });
};

// -- DELETE
async function processDelete (req) {
    console.log("Process : Module - DELETE");
    console.log("Process : Module - DELETE id : " + req.params.id);
    
    return await Module.find({_id : new ObjectId(req.params.id)}).deleteOne().then(()=>{
        console.log("Process : Module - DELETE : Done");

        return "Done";
    },(err)=>{
        console.log("Process : Module - DELETE : Error");

        return "Erreur";
    });
};

// -- READ
async function processRead (req) {
    console.log("Process : Module - READ");
    console.log("Process : Module - READ id : " + new ObjectId(req.params.id));

    return await Module.findOne({_id : new ObjectId(req.params.id)}).then((module)=>{
        if(module){
            console.log("Process : Module - READ : " + module);

            return module;
        }else{
            console.log("Process : Module - READ : Inexistant");

            return "Inexistant";
        }
    },(err)=>{
        console.log("Process : Module - READ : Error");

        return "Erreur";
    });
};

exports.processFindAll = processFindAll;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;