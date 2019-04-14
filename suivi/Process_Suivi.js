const mongoose = require('mongoose');

ObjectId = mongoose.Types.ObjectId;

// -- Load model needed for the project
require('./Model_Suivi');
Suivi = mongoose.model('Suivi');


// -- FIND ALL
async function processFindAll () {
    console.log("Process : Suivi - FIND ALL");

    return await Suivi.find();
};

// -- CREATE
async function processCreate (req) {
    console.log("Process : Suivi - CREATE :" + req.body.nom);

    newSuivi = new Suivi({alias:req.body.alias, questions:req.body.questions, remarques:req.body.remarques, tuteur:req.body.tuteur, apprenant:req.body.apprenant, module:req.body.module});
    newSuivi.id = newSuivi._id;

    return await newSuivi.save();
};

// -- UPDATE
async function processUpdate (id, body) {
    console.log("Process : Suivi - UPDATE id : " + id);
    
    return await Suivi.updateOne({_id : new ObjectId(id)}, {$set : body});
};

// -- DELETE
async function processDelete (req) {
    console.log("Process : Suivi - DELETE id : " + req.params.id);
    
    return await Suivi.find({_id : new ObjectId(req.params.id)}).deleteOne();
};

// -- READ
async function processRead (req) {
    console.log("Process : Suivi - READ id : " + new ObjectId(req.params.id));

    return await Suivi.findOne({_id : new ObjectId(req.params.id)});
};

exports.processFindAll = processFindAll;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;