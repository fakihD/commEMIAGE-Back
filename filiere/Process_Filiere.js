const mongoose = require('mongoose');

ObjectId = mongoose.Types.ObjectId;

// -- Load model needed for the project
require('./Model_Filiere');
Filiere = mongoose.model('Filiere');


// -- FIND ALL
async function processFindAll () {
    console.log("Process : Filiere - FIND ALL");

    return await Filiere.find().then((filieres)=>{
        console.log("Process : Filiere - FIND ALL : " + filieres);

        return filieres;
    },(err)=>{
        console.log("Process : Filiere - FIND ALL : Error");

        return "Erreur";
    })
};

// -- CREATE
async function processCreate (req) {
    console.log("Process : Filiere - CREATE");
    console.log("Process : Filiere - CREATE :" + req.body.nom);

    newFiliere = new Filiere({nom:req.body.nom, description:req.body.description, filiere:req.body.filiere});
    newFiliere.id = newFiliere._id;

    return await newFiliere.save().then(()=>{
        console.log("Process : Filiere - CREATE : Done");

        return "Done";
    },(err)=>{
        console.log("Process : Filiere - CREATE : Error: " + err);

        return "Erreur";
    })
};

// -- UPDATE
async function processUpdate (id, body) {
    console.log("Process : Filiere - UPDATE");
    
    return await Filiere.updateOne({_id : new ObjectId(id)}, {$set : body}, (err, updatedFiliere)=>{
        if(err){
                console.log("Process : Filiere - UPDATE : Error");

                return "Erreur";
        }else{
                console.log("Process : Filiere - UPDATE : " + JSON.stringify(updatedFiliere));

                return "Done";
        }
    });
};

// -- DELETE
async function processDelete (req) {
    console.log("Process : Filiere - DELETE");
    console.log("Process : Filiere - DELETE id : " + req.params.id);
    
    return await Filiere.find({_id : new ObjectId(req.params.id)}).deleteOne().then(()=>{
        console.log("Process : Filiere - DELETE : Done");

        return "Done";
    },(err)=>{
        console.log("Process : Filiere - DELETE : Error");

        return "Erreur";
    });
};

// -- READ
async function processRead (req) {
    console.log("Process : Filiere - READ");
    console.log("Process : Filiere - READ id : " + new ObjectId(req.params.id));

    return await Filiere.findOne({_id : new ObjectId(req.params.id)}).then((filiere)=>{
        if(filiere){
            console.log("Process : Filiere - READ : " + filiere);

            return filiere;
        }else{
            console.log("Process : Filiere - READ : Inexistant");

            return "Inexistant";
        }
    },(err)=>{
        console.log("Process : Filiere - READ : Error");

        return "Erreur";
    });
};

exports.processFindAll = processFindAll;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;