const mongoose = require('mongoose');

ObjectId = mongoose.Types.ObjectId;

// -- Load model needed for the project
require('./Model_Evaluation');
Evaluation = mongoose.model('Evaluation');


// -- FIND ALL
async function processFindAll () {
    console.log("Process : Evaluation - FIND ALL");

    return await Evaluation.find();
};

// -- CREATE
async function processCreate (req) {
    console.log("Process : Evaluation - CREATE :" + req.body.nom);

    newEvaluation = new Evaluation({alias:req.body.alias});
    newEvaluation.id = newEvaluation._id;

    return await newEvaluation.save();
};

// -- UPDATE
async function processUpdate (id, body) {
    console.log("Process : Evaluation - UPDATE id : " + id);
    
    return await Evaluation.updateOne({_id : new ObjectId(id)}, {$set : body});
};

// -- DELETE
async function processDelete (req) {
    console.log("Process : Evaluation - DELETE id : " + req.params.id);
    
    return await Evaluation.find({_id : new ObjectId(req.params.id)}).deleteOne();
};

// -- READ
async function processRead (req) {
    console.log("Process : Evaluation - READ id : " + new ObjectId(req.params.id));

    return await Evaluation.findOne({_id : new ObjectId(req.params.id)});
};

exports.processFindAll = processFindAll;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;