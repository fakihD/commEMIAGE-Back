const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app = express();

ObjectId = mongoose.Types.ObjectId;

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// -- Load model needed for the project
require('../models/Evaluation');

const lienErreur = '/error';
const lienAll = '/';
const lienAjouter = '/add';
const lienModifier = '/update/:id';
const lienSupprimer = '/delete/:id';
const lienGet = '/get/:id';

const pageErreur ='';
const pageEvaluations = '';
const pageEvaluation = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    console.log("Evaluation - ERROR");

    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    console.log("Evaluation - FIND ALL");

    Evaluation = mongoose.model('Evaluation');
    Evaluation.find().then((evaluations)=>{
        console.log("Evaluation - FIND ALL : " + evaluations);

        res.render(pageEvaluations, evaluations);
    },(err)=>{
        console.log("Evaluation - FIND ALL : Error");

        res.send("Erreur");
    })
});

// -- CREATE
app.post(lienAjouter, function (req, res) {
    console.log("Evaluation - CREATE");
    console.log("Evaluation - CREATE :" + req.body.alias);

    Evaluation = mongoose.model('Evaluation');
    newEvaluation = new Evaluation({alias:req.body.alias});
    newEvaluation.id = newEvaluation._id;

    newEvaluation.save().then(()=>{
        console.log("Evaluation - CREATE : Done");

        res.send("Done");
    },(err)=>{
        console.log("Evaluation - CREATE : Error");

        res.send("Erreur");
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    console.log("Evaluation - UPDATE");
    
    mongoose.model('Evaluation').updateOne({_id : new ObjectId(req.params.id)}, {$set : req.body}, (err, updatedEvaluation)=>{
       if(err){
            console.log("Evaluation - UPDATE : Error");

            res.send("Erreur");
       }else{
            console.log("Evaluation - UPDATE : " + updatedEvaluation);

            res.send("Done");
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    console.log("Evaluation - DELETE");
    console.log("Evaluation - DELETE id : " + req.params.id);
    
    Evaluation = mongoose.model('Evaluation');
    Evaluation.find({_id : new ObjectId(req.params.id)}).deleteOne().then(()=>{
        console.log("Evaluation - DELETE : Done");

        res.send("Done");
    },(err)=>{
        console.log("Evaluation - DELETE : Error");

        res.send("Erreur");
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    console.log("Evaluation - READ");
    console.log("Evaluation - READ id : " + new ObjectId(req.params.id));

    mongoose.model('Evaluation').findOne({_id : new ObjectId(req.params.id)}).then((evaluation)=>{
        if(evaluation){
            console.log("Evaluation - READ : " + evaluation);

            res.send(evaluation);
        }else{
            console.log("Evaluation - READ : Inexistant");

            res.send("Inexistant");
        }
    },(err)=>{
        console.log("Evaluation - READ : Error");

        res.send("Erreur");
    });
});

module.exports = app;