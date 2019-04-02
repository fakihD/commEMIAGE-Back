const mongoose = require('mongoose');

ObjectId = mongoose.Types.ObjectId;

// -- Load model needed for the project
require('./Model_Evaluation');
Evaluation = mongoose.model('Evaluation');


// -- FIND ALL
async function processFindAll () {
    console.log("Process : Evaluation - FIND ALL");

    return await Evaluation.find().then((evaluations)=>{
        console.log("Process : Evaluation - FIND ALL : " + evaluations);

        return evaluations;
    },(err)=>{
        console.log("Process : Evaluation - FIND ALL : Error");

        return "Erreur";
    })
};

// -- CREATE
async function processCreate (req) {
    console.log("Process : Evaluation - CREATE");
    console.log("Process : Evaluation - CREATE :" + req.body.nom);

    newEvaluation = new Evaluation({alias:req.body.alias});
    newEvaluation.id = newEvaluation._id;

    return await newEvaluation.save().then(()=>{
        console.log("Process : Evaluation - CREATE : Done");

        return "Done";
    },(err)=>{
        console.log("Process : Evaluation - CREATE : Error: " + err);

        return "Erreur";
    })
};

// -- UPDATE
async function processUpdate (id, body) {
    console.log("Process : Evaluation - UPDATE");
    
    return await Evaluation.updateOne({_id : new ObjectId(id)}, {$set : body}, (err, updatedEvaluation)=>{
        if(err){
                console.log("Process : Evaluation - UPDATE : Error");

                return "Erreur";
        }else{
                console.log("Process : Evaluation - UPDATE : " + JSON.stringify(updatedEvaluation));

                return "Done";
        }
    });
};

// -- DELETE
async function processDelete (req) {
    console.log("Process : Evaluation - DELETE");
    console.log("Process : Evaluation - DELETE id : " + req.params.id);
    
    return await Evaluation.find({_id : new ObjectId(req.params.id)}).deleteOne().then(()=>{
        console.log("Process : Evaluation - DELETE : Done");

        return "Done";
    },(err)=>{
        console.log("Process : Evaluation - DELETE : Error");

        return "Erreur";
    });
};

// -- READ
async function processRead (req) {
    console.log("Process : Evaluation - READ");
    console.log("Process : Evaluation - READ id : " + new ObjectId(req.params.id));

    return await Evaluation.findOne({_id : new ObjectId(req.params.id)}).then((evaluation)=>{
        if(evaluation){
            console.log("Process : Evaluation - READ : " + evaluation);

            return evaluation;
        }else{
            console.log("Process : Evaluation - READ : Inexistant");

            return "Inexistant";
        }
    },(err)=>{
        console.log("Process : Evaluation - READ : Error");

        return "Erreur";
    });
};

exports.processFindAll = processFindAll;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;