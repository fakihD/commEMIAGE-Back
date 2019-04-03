const mongoose = require('mongoose');

ObjectId = mongoose.Types.ObjectId;

// -- Load model needed for the project
require('./Model_Administrateur');
Administrateur = mongoose.model('Administrateur');


// -- FIND ALL
async function processFindAll () {
    console.log("Process : Administrateur - FIND ALL");

    return await Administrateur.find().then((administrateurs)=>{
        console.log("Process : Administrateur - FIND ALL : " + administrateurs);

        return administrateurs;
    },(err)=>{
        console.log("Process : Administrateur - FIND ALL : Error");

        return "Erreur";
    })
};

// -- CREATE
async function processCreate (req) {
    console.log("Process : Administrateur - CREATE");
    console.log("Process : Administrateur - CREATE :" + req.body.nom);

    newAdministrateur = new Administrateur({nom:req.body.nom, prenom:req.body.prenom, adresse:req.body.adresse, email:req.body.email});
    newAdministrateur.id = newAdministrateur._id;

    return await newAdministrateur.save().then(()=>{
        console.log("Process : Administrateur - CREATE : Done");

        return "Done";
    },(err)=>{
        console.log("Process : Administrateur - CREATE : Error: " + err);

        return "Erreur";
    })
};

// -- UPDATE
async function processUpdate (id, body) {
    console.log("Process : Administrateur - UPDATE");
    
    return await Administrateur.updateOne({_id : new ObjectId(id)}, {$set : body}, (err, updatedAdministrateur)=>{
        if(err){
                console.log("Process : Administrateur - UPDATE : Error");

                return "Erreur";
        }else{
                console.log("Process : Administrateur - UPDATE : " + JSON.stringify(updatedAdministrateur));

                return "Done";
        }
    });
};

// -- DELETE
async function processDelete (req) {
    console.log("Process : Administrateur - DELETE");
    console.log("Process : Administrateur - DELETE id : " + req.params.id);
    
    return await Administrateur.find({_id : new ObjectId(req.params.id)}).deleteOne().then(()=>{
        console.log("Process : Administrateur - DELETE : Done");

        return "Done";
    },(err)=>{
        console.log("Process : Administrateur - DELETE : Error");

        return "Erreur";
    });
};

// -- READ ID
async function processRead (req) {
    console.log("Process : Adminstrateur - READ");
    console.log("Process : Adminstrateur - READ id : " + new ObjectId(req.params.id));

    return await Administrateur.findOne({_id : new ObjectId(req.params.id)}).then((administrateur)=>{
        if(administrateur){
            console.log("Process : Administrateur - READ : " + administrateur);

            return administrateur;
        }else{
            console.log("Process : Administrateur - READ : Inexistant");

            return "Inexistant";
        }
    },(err)=>{
        console.log("Process : Administrateur - READ : Error");

        return "Erreur";
    });
};

// -- READ EMAIL
async function processReadEmail (req) {
    console.log("Process : Adminstrateur - READ EMAIL");
    console.log("Process : Adminstrateur - READ EMAIL : " + req.params.email);

    return await Administrateur.findOne({email : req.params.email}).then((administrateur)=>{
        if(administrateur){
            console.log("Process : Administrateur - READ : " + administrateur);

            return administrateur;
        }else{
            console.log("Process : Administrateur - READ : Inexistant");

            return "Inexistant";
        }
    },(err)=>{
        console.log("Process : Administrateur - READ : Error");

        return "Erreur";
    });
};

exports.processFindAll = processFindAll;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;
exports.processReadEmail = processReadEmail;