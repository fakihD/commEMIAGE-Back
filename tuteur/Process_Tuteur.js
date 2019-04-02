const mongoose = require('mongoose');

ObjectId = mongoose.Types.ObjectId;

// -- Load model needed for the project
require('./Model_Tuteur');
Tuteur = mongoose.model('Tuteur');


// -- FIND ALL
async function processFindAll () {
    console.log("Process : Tuteur - FIND ALL");

    return await Tuteur.find().then((tuteurs)=>{
        console.log("Process : Tuteur - FIND ALL : " + tuteurs);

        return tuteurs;
    },(err)=>{
        console.log("Process : Tuteur - FIND ALL : Error");

        return "Erreur";
    })
};

// -- CREATE
async function processCreate (req) {
    console.log("Process : Tuteur - CREATE");
    console.log("Process : Tuteur - CREATE :" + req.body.nom);

    newTuteur = new Tuteur({nom:req.body.nom, prenom:req.body.prenom, adresse:req.body.adresse, email:req.body.email, module:req.body.module});
    newTuteur.id = newTuteur._id;

    return await newTuteur.save().then(()=>{
        console.log("Process : Tuteur - CREATE : Done");

        return "Done";
    },(err)=>{
        console.log("Process : Tuteur - CREATE : Error: " + err);

        return "Erreur";
    })
};

// -- UPDATE
async function processUpdate (id, body) {
    console.log("Process : Tuteur - UPDATE");
    
    return await Tuteur.updateOne({_id : new ObjectId(id)}, {$set : body}, (err, updatedTuteur)=>{
        if(err){
                console.log("Process : Tuteur - UPDATE : Error");

                return "Erreur";
        }else{
                console.log("Process : Tuteur - UPDATE : " + JSON.stringify(updatedTuteur));

                return "Done";
        }
    });
};

// -- DELETE
async function processDelete (req) {
    console.log("Process : Tuteur - DELETE");
    console.log("Process : Tuteur - DELETE id : " + req.params.id);
    
    return await Tuteur.find({_id : new ObjectId(req.params.id)}).deleteOne().then(()=>{
        console.log("Process : Tuteur - DELETE : Done");

        return "Done";
    },(err)=>{
        console.log("Process : Tuteur - DELETE : Error");

        return "Erreur";
    });
};

// -- READ ID
async function processRead (req) {
    console.log("Process : Adminstrateur - READ");
    console.log("Process : Adminstrateur - READ id : " + new ObjectId(req.params.id));

    Tuteur.findOne({_id : new ObjectId(req.params.id)}).then((tuteur)=>{
        if(tuteur){
            console.log("Process : Tuteur - READ : " + tuteur);

            return tuteur;
        }else{
            console.log("Process : Tuteur - READ : Inexistant");

            return "Inexistant";
        }
    },(err)=>{
        console.log("Process : Tuteur - READ : Error");

        return "Erreur";
    });
};

// -- READ EMAIL
async function processReadEmail (req) {
    console.log("Process : Adminstrateur - READ EMAIL");
    console.log("Process : Adminstrateur - READ EMAIL : " + req.params.email);

    Tuteur.findOne({email : req.params.email}).then((tuteur)=>{
        if(tuteur){
            console.log("Process : Tuteur - READ : " + tuteur);

            return tuteur;
        }else{
            console.log("Process : Tuteur - READ : Inexistant");

            return "Inexistant";
        }
    },(err)=>{
        console.log("Process : Tuteur - READ : Error");

        return "Erreur";
    });
};

exports.processFindAll = processFindAll;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;
exports.processReadEmail = processReadEmail;