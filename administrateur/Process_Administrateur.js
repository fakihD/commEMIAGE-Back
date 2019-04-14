const mongoose = require('mongoose');

ObjectId = mongoose.Types.ObjectId;

// -- Load model needed for the project
require('./Model_Administrateur');
Administrateur = mongoose.model('Administrateur');


// -- FIND ALL
async function processFindAll () {
    console.log("Process : Administrateur - FIND ALL");

    return await Administrateur.find();
};

// -- CREATE
async function processCreate (req) {
    console.log("Process : Administrateur - CREATE :" + req.body.nom);

    newAdministrateur = new Administrateur({nom:req.body.nom, prenom:req.body.prenom, adresse:req.body.adresse, email:req.body.email});
    newAdministrateur.id = newAdministrateur._id;

    return await newAdministrateur.save();
};

// -- UPDATE
async function processUpdate (id, body) {
    console.log("Process : Administrateur - UPDATE id : " + id);
    
    return await Administrateur.updateOne({_id : new ObjectId(id)}, {$set : body});
};

// -- DELETE
async function processDelete (req) {
    console.log("Process : Administrateur - DELETE id : " + req.params.id);
    
    return await Administrateur.find({_id : new ObjectId(req.params.id)}).deleteOne();
};

// -- READ ID
async function processRead (req) {
    console.log("Process : Adminstrateur - READ id : " + new ObjectId(req.params.id));

    return await Adminstrateur.findOne({_id : new ObjectId(req.params.id)});
};

// -- READ EMAIL
async function processReadEmail (req) {
    console.log("Process : Adminstrateur - READ EMAIL : " + req.params.email);

    return await Administrateur.findOne({email : req.params.email});
};

exports.processFindAll = processFindAll;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;
exports.processReadEmail = processReadEmail;