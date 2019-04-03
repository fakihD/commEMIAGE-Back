const mongoose = require('mongoose');

ObjectId = mongoose.Types.ObjectId;

// -- Load model needed for the project
require('./Model_Apprenant');
Apprenant = mongoose.model('Apprenant');


// -- FIND ALL
async function processFindAll () {
    console.log("Process : Apprenant - FIND ALL");

    return await Apprenant.find().then((apprenants)=>{
        console.log("Process : Apprenant - FIND ALL : " + apprenants);

        return apprenants;
    },(err)=>{
        console.log("Process : Apprenant - FIND ALL : Error");

        return "Erreur";
    })
};

// -- CREATE
async function processCreate (req) {
    console.log("Process : Apprenant - CREATE");
    console.log("Process : Apprenant - CREATE :" + req.body.nom);

    newApprenant = new Apprenant({nom:req.body.nom, prenom:req.body.prenom, adresse:req.body.adresse, email:req.body.email, filiere:req.body.filiere, semestre:req.body.semestre});
    newApprenant.id = newApprenant._id;

    return await newApprenant.save().then(()=>{
        console.log("Process : Apprenant - CREATE : Done");

        return "Done";
    },(err)=>{
        console.log("Process : Apprenant - CREATE : Error: " + err);

        return "Erreur";
    })
};

// -- UPDATE
async function processUpdate (id, body) {
    console.log("Process : Apprenant - UPDATE");
    
    return await Apprenant.updateOne({_id : new ObjectId(id)}, {$set : body}, (err, updatedApprenant)=>{
        if(err){
                console.log("Process : Apprenant - UPDATE : Error");

                return "Erreur";
        }else{
                console.log("Process : Apprenant - UPDATE : " + JSON.stringify(updatedApprenant));

                return "Done";
        }
    });
};

// -- DELETE
async function processDelete (req) {
    console.log("Process : Apprenant - DELETE");
    console.log("Process : Apprenant - DELETE id : " + req.params.id);
    
    return await Apprenant.find({_id : new ObjectId(req.params.id)}).deleteOne().then(()=>{
        console.log("Process : Apprenant - DELETE : Done");

        return "Done";
    },(err)=>{
        console.log("Process : Apprenant - DELETE : Error");

        return "Erreur";
    });
};

// -- READ ID
async function processRead (req) {
    console.log("Process : Adminstrateur - READ");
    console.log("Process : Adminstrateur - READ id : " + new ObjectId(req.params.id));

    return await Apprenant.findOne({_id : new ObjectId(req.params.id)}).then((apprenant)=>{
        if(apprenant){
            console.log("Process : Apprenant - READ : " + apprenant);

            return apprenant;
        }else{
            console.log("Process : Apprenant - READ : Inexistant");

            return "Inexistant";
        }
    },(err)=>{
        console.log("Process : Apprenant - READ : Error");

        return "Erreur";
    });
};

// -- READ EMAIL
async function processReadEmail (req) {
    console.log("Process : Adminstrateur - READ EMAIL");
    console.log("Process : Adminstrateur - READ EMAIL : " + req.params.email);

    return await Apprenant.findOne({email : req.params.email}).then((apprenant)=>{
        if(apprenant){
            console.log("Process : Apprenant - READ : " + apprenant);

            return apprenant;
        }else{
            console.log("Process : Apprenant - READ : Inexistant");

            return "Inexistant";
        }
    },(err)=>{
        console.log("Process : Apprenant - READ : Error");

        return "Erreur";
    });
};

exports.processFindAll = processFindAll;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;
exports.processReadEmail = processReadEmail;