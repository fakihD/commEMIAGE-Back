const mongoose = require('mongoose');

ObjectId = mongoose.Types.ObjectId;

// -- Load model needed for the project
require('./Model_Utilisateur');
Utilisateur = mongoose.model('Utilisateur');


// -- FIND ALL
async function processFindAll () {
    console.log("Process : Utilisateur - FIND ALL");

    return await Utilisateur.find();
};

// -- CREATE
async function processCreate (req) {
    console.log("Process : Utilisateur - CREATE :" + req.body.nom);

    newUtilisateur = new Utilisateur({role:req.body.role, email:req.body.email, password:password});
    newUtilisateur.id = newUtilisateur._id;

    return await newUtilisateur.save();
};

// -- UPDATE
async function processUpdate (id, body) {
    console.log("Process : Utilisateur - UPDATE id : " + id);
    
    return await Utilisateur.updateOne({_id : new ObjectId(id)}, {$set : body});
};

// -- DELETE
async function processDelete (req) {
    console.log("Process : Utilisateur - DELETE id : " + req.params.id);
    
    return await Utilisateur.find({_id : new ObjectId(req.params.id)}).deleteOne();
};

// -- READ
async function processRead (req) {
    console.log("Process : Utilisateur - READ id : " + new ObjectId(req.params.id));

    return await Utilisateur.findOne({_id : new ObjectId(req.params.id)});
};

// -- LOGIN
async function processLogin (email, password) {
    console.log("Process : Utilisateur - LOGIN email : " + email);

    return await Utilisateur.findOne({email : email});
};

exports.processFindAll = processFindAll;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;
exports.processLogin = processLogin;