const mongoose = require('mongoose');

ObjectId = mongoose.Types.ObjectId;

// -- Load model needed for the project
require('./Model_Semestre');
Semestre = mongoose.model('Semestre');


// -- FIND ALL
async function processFindAll () {
    console.log("Process : Semestre - FIND ALL");

    return await Semestre.find();
};

// -- CREATE
async function processCreate (req) {
    console.log("Process : Semestre - CREATE :" + req.body.nom);

    newSemestre = new Semestre({nom:req.body.nom, dateDebut:req.body.dateDebut, dateFin:req.body.dateFin});
    newSemestre.id = newSemestre._id;

    return await newSemestre.save();
};

// -- UPDATE
async function processUpdate (id, body) {
    console.log("Process : Semestre - UPDATE id : " + id);
    
    return await Semestre.updateOne({_id : new ObjectId(id)}, {$set : body});
};

// -- DELETE
async function processDelete (req) {
    console.log("Process : Semestre - DELETE id : " + req.params.id);
    
    return await Semestre.find({_id : new ObjectId(req.params.id)}).deleteOne();
};

// -- READ
async function processRead (req) {
    console.log("Process : Semestre - READ id : " + new ObjectId(req.params.id));

    return await Semestre.findOne({_id : new ObjectId(req.params.id)});
};

exports.processFindAll = processFindAll;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;