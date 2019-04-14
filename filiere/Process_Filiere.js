const mongoose = require('mongoose');

ObjectId = mongoose.Types.ObjectId;

// -- Load model needed for the project
require('./Model_Filiere');
Filiere = mongoose.model('Filiere');


// -- FIND ALL
async function processFindAll () {
    console.log("Process : Filiere - FIND ALL");

    return await Filiere.find();
};

// -- CREATE
async function processCreate (req) {
    console.log("Process : Filiere - CREATE :" + req.body.nom);

    newFiliere = new Filiere({nom:req.body.nom, description:req.body.description, module:req.body.module});
    newFiliere.id = newFiliere._id;

    return await newFiliere.save();
};

// -- UPDATE
async function processUpdate (id, body) {
    console.log("Process : Filiere - UPDATE id : " + id);
    
    return await Filiere.updateOne({_id : new ObjectId(id)}, {$set : body});
};

// -- DELETE
async function processDelete (req) {
    console.log("Process : Filiere - DELETE id : " + req.params.id);
    
    return await Filiere.find({_id : new ObjectId(req.params.id)}).deleteOne();
};

// -- READ
async function processRead (req) {
    console.log("Process : Filiere - READ id : " + new ObjectId(req.params.id));

    return await Filiere.findOne({_id : new ObjectId(req.params.id)});
};

exports.processFindAll = processFindAll;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;