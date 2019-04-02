const mongoose = require('mongoose');

ObjectId = mongoose.Types.ObjectId;

// -- Load model needed for the project
require('./Model_Semestre');
Semestre = mongoose.model('Semestre');


// -- FIND ALL
async function processFindAll () {
    console.log("Process : Semestre - FIND ALL");

    return await Semestre.find().then((semestres)=>{
        console.log("Process : Semestre - FIND ALL : " + semestres);

        return semestres;
    },(err)=>{
        console.log("Process : Semestre - FIND ALL : Error");

        return "Erreur";
    })
};

// -- CREATE
async function processCreate (req) {
    console.log("Process : Semestre - CREATE");
    console.log("Process : Semestre - CREATE :" + req.body.nom);

    newSemestre = new Semestre({nom:req.body.nom, dateDebut:req.body.dateDebut, dateFin:req.body.dateFin});
    newSemestre.id = newSemestre._id;

    return await newSemestre.save().then(()=>{
        console.log("Process : Semestre - CREATE : Done");

        return "Done";
    },(err)=>{
        console.log("Process : Semestre - CREATE : Error: " + err);

        return "Erreur";
    })
};

// -- UPDATE
async function processUpdate (id, body) {
    console.log("Process : Semestre - UPDATE");
    
    return await Semestre.updateOne({_id : new ObjectId(id)}, {$set : body}, (err, updatedSemestre)=>{
        if(err){
                console.log("Process : Semestre - UPDATE : Error");

                return "Erreur";
        }else{
                console.log("Process : Semestre - UPDATE : " + JSON.stringify(updatedSemestre));

                return "Done";
        }
    });
};

// -- DELETE
async function processDelete (req) {
    console.log("Process : Semestre - DELETE");
    console.log("Process : Semestre - DELETE id : " + req.params.id);
    
    return await Semestre.find({_id : new ObjectId(req.params.id)}).deleteOne().then(()=>{
        console.log("Process : Semestre - DELETE : Done");

        return "Done";
    },(err)=>{
        console.log("Process : Semestre - DELETE : Error");

        return "Erreur";
    });
};

// -- READ
async function processRead (req) {
    console.log("Process : Semestre - READ");
    console.log("Process : Semestre - READ id : " + new ObjectId(req.params.id));

    return await Semestre.findOne({_id : new ObjectId(req.params.id)}).then((semestre)=>{
        if(semestre){
            console.log("Process : Semestre - READ : " + semestre);

            return semestre;
        }else{
            console.log("Process : Semestre - READ : Inexistant");

            return "Inexistant";
        }
    },(err)=>{
        console.log("Process : Semestre - READ : Error");

        return "Erreur";
    });
};

exports.processFindAll = processFindAll;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;