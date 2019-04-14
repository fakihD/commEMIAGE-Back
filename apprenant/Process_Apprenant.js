const mongoose = require('mongoose');

ObjectId = mongoose.Types.ObjectId;

// -- Load model needed for the project
require('./Model_Apprenant');
Apprenant = mongoose.model('Apprenant');


// -- FIND ALL
async function processFindAll () {
    console.log("Process : Apprenant - FIND ALL");

    return await Apprenant.find();
};

// -- CREATE
async function processCreate (req) {
    console.log("Process : Apprenant - CREATE :" + req.body.nom);

    newApprenant = new Apprenant({nom:req.body.nom, prenom:req.body.prenom, adresse:req.body.adresse, email:req.body.email, filiere:req.body.filiere, semestre:req.body.semestre});
    newApprenant.id = newApprenant._id;

    return await newApprenant.save();
};

// -- UPDATE
async function processUpdate (id, body) {
    console.log("Process : Apprenant - UPDATE id : " + id);
    
    return await Apprenant.updateOne({_id : new ObjectId(id)}, {$set : body});
};

// -- DELETE
async function processDelete (req) {
    console.log("Process : Apprenant - DELETE id : " + req.params.id);
    
    return await Apprenant.find({_id : new ObjectId(req.params.id)}).deleteOne();
};

// -- READ ID
async function processRead (req) {
    console.log("Process : Adminstrateur - READ id : " + new ObjectId(req.params.id));

    return await Adminstrateur.findOne({_id : new ObjectId(req.params.id)});
};

// -- READ EMAIL
async function processReadEmail (req) {
    console.log("Process : Adminstrateur - READ EMAIL : " + req.params.email);

    return await Apprenant.findOne({email : req.params.email});
};

exports.processFindAll = processFindAll;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;
exports.processReadEmail = processReadEmail;