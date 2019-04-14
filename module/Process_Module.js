const mongoose = require('mongoose');

ObjectId = mongoose.Types.ObjectId;

// -- Load model needed for the project
require('./Model_Module');
Module = mongoose.model('Module');


// -- FIND ALL
async function processFindAll () {
    console.log("Process : Module - FIND ALL");

    return await Module.find();
};

// -- CREATE
async function processCreate (req) {
    console.log("Process : Module - CREATE :" + req.body.nom);

    newModule = new Module({nom:req.body.nom, coefficient:req.body.coefficient, seuil:req.body.seuil, semestre:req.body.semestre});
    newModule.id = newModule._id;

    return await newModule.save();
};

// -- UPDATE
async function processUpdate (id, body) {
    console.log("Process : Module - UPDATE id : " + id);
    
    return await Module.updateOne({_id : new ObjectId(id)}, {$set : body});
};

// -- DELETE
async function processDelete (req) {
    console.log("Process : Module - DELETE id : " + req.params.id);
    
    return await Module.find({_id : new ObjectId(req.params.id)}).deleteOne();
};

// -- READ
async function processRead (req) {
    console.log("Process : Module - READ id : " + new ObjectId(req.params.id));

    return await Module.findOne({_id : new ObjectId(req.params.id)});
};

exports.processFindAll = processFindAll;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;