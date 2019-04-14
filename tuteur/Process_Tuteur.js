const mongoose = require('mongoose');

ObjectId = mongoose.Types.ObjectId;

// -- Load model needed for the project
require('./Model_Tuteur');
Tuteur = mongoose.model('Tuteur');


// -- FIND ALL
async function processFindAll () {
    console.log("Process : Tuteur - FIND ALL");

    return await Tuteur.find();
};

// -- CREATE
async function processCreate (req) {
    console.log("Process : Tuteur - CREATE :" + req.body.nom);

    newTuteur = new Tuteur({nom:req.body.nom, prenom:req.body.prenom, adresse:req.body.adresse, email:req.body.email, module:req.body.module});
    newTuteur.id = newTuteur._id;

    return await newTuteur.save();
};

// -- UPDATE
async function processUpdate (id, body) {
    console.log("Process : Tuteur - UPDATE id : " + id);
    
    return await Tuteur.updateOne({_id : new ObjectId(id)}, {$set : body});
};

// -- DELETE
async function processDelete (req) {
    console.log("Process : Tuteur - DELETE id : " + req.params.id);
    
    return await Tuteur.find({_id : new ObjectId(req.params.id)}).deleteOne();
};

// -- READ ID
async function processRead (req) {
    console.log("Process : Adminstrateur - READ id : " + new ObjectId(req.params.id));

    return await Adminstrateur.findOne({_id : new ObjectId(req.params.id)});
};

// -- READ EMAIL
async function processReadEmail (req) {
    console.log("Process : Adminstrateur - READ EMAIL : " + req.params.email);

    return await Tuteur.findOne({email : req.params.email});
};

exports.processFindAll = processFindAll;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;
exports.processReadEmail = processReadEmail;