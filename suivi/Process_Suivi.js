const mongoose = require('mongoose');

ObjectId = mongoose.Types.ObjectId;

// -- Load model needed for the project
require('./Model_Suivi');
Suivi = mongoose.model('Suivi');


// -- FIND ALL
async function processFindAll () {
    console.log("Process : Suivi - FIND ALL");

    return await Suivi.find().then((suivis)=>{
        console.log("Process : Suivi - FIND ALL : " + suivis);

        return suivis;
    },(err)=>{
        console.log("Process : Suivi - FIND ALL : Error");

        return "Erreur";
    })
};

// -- CREATE
async function processCreate (req) {
    console.log("Process : Suivi - CREATE");
    console.log("Process : Suivi - CREATE :" + req.body.nom);

    newSuivi = new Suivi({alias:req.body.alias, questions:req.body.questions, remarques:req.body.remarques, tuteur:req.body.tuteur, apprenant:req.body.apprenant, suivi:req.body.suivi});
    newSuivi.id = newSuivi._id;

    return await newSuivi.save().then(()=>{
        console.log("Process : Suivi - CREATE : Done");

        return "Done";
    },(err)=>{
        console.log("Process : Suivi - CREATE : Error: " + err);

        return "Erreur";
    })
};

// -- UPDATE
async function processUpdate (id, body) {
    console.log("Process : Suivi - UPDATE");
    
    return await Suivi.updateOne({_id : new ObjectId(id)}, {$set : body}, (err, updatedSuivi)=>{
        if(err){
                console.log("Process : Suivi - UPDATE : Error");

                return "Erreur";
        }else{
                console.log("Process : Suivi - UPDATE : " + JSON.stringify(updatedSuivi));

                return "Done";
        }
    });
};

// -- DELETE
async function processDelete (req) {
    console.log("Process : Suivi - DELETE");
    console.log("Process : Suivi - DELETE id : " + req.params.id);
    
    return await Suivi.find({_id : new ObjectId(req.params.id)}).deleteOne().then(()=>{
        console.log("Process : Suivi - DELETE : Done");

        return "Done";
    },(err)=>{
        console.log("Process : Suivi - DELETE : Error");

        return "Erreur";
    });
};

// -- READ
async function processRead (req) {
    console.log("Process : Suivi - READ");
    console.log("Process : Suivi - READ id : " + new ObjectId(req.params.id));

    return await Suivi.findOne({_id : new ObjectId(req.params.id)}).then((suivi)=>{
        if(suivi){
            console.log("Process : Suivi - READ : " + suivi);

            return suivi;
        }else{
            console.log("Process : Suivi - READ : Inexistant");

            return "Inexistant";
        }
    },(err)=>{
        console.log("Process : Suivi - READ : Error");

        return "Erreur";
    });
};

exports.processFindAll = processFindAll;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;