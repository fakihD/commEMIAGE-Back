express = require('express');
mongoose = require('mongoose');
app = express();

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// -- Load model needed for the project
require('../models/Evaluation');

lienErreur = '/error';
lienAll = '/';
lienAjouter = '/add';
lienModifier = '/update/:id';
lienSupprimer = '/delete/:id';
lienGet = '/get/:id';

pageErreur ='';
pageEvaluations = '';
pageEvaluation = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    console.log("Evaluation - ERROR");

    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    console.log("Evaluation - FIND ALL");

    let Evaluation = mongoose.model('Evaluation');
    Evaluation.find().then((evaluations)=>{
        console.log("Evaluation - FIND ALL : " + evaluations);

        res.render(pageEvaluations, evaluations);
    },(err)=>{
        console.log("Evaluation - FIND ALL : Error");

        res.redirect(lienErreur);
    })
});
// -- CREATE
app.post(lienAjouter, function (req, res) {
    console.log("Evaluation - CREATE");
    console.log("Evaluation - CREATE :" + req.body.nom);

    let Evaluation = mongoose.model('Evaluation');
    let newEvaluation = new Evaluation({nom:req.body.nom, coefficient:req.body.coefficient, seuil:req.body.seuil});
    newEvaluation.id = newEvaluation._id;

    newEvaluation.save().then(()=>{
        console.log("Evaluation - CREATE : Done");

        res.redirect(lienAll);
    },(err)=>{
        console.log("Evaluation - CREATE : Error");

        res.redirect(lienErreur);
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    console.log("Evaluation - UPDATE");
    
    mongoose.model('Evaluation').updateOne({id : req.params.id}, {$set : req.body}, (err, updatedEvaluation)=>{
       if(err){
            console.log("Evaluation - UPDATE : Error");

            res.redirect(lienErreur);
       }else{
            console.log("Evaluation - UPDATE : Done");

            res.redirect(lienAll);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    console.log("Evaluation - DELETE");
    console.log("Evaluation - DELETE id : " + req.params.id);
    
    let Evaluation = mongoose.model('Evaluation');
    Evaluation.find({id : req.params.id}).deleteOne().then(()=>{
        console.log("Evaluation - DELETE : Done");

        res.redirect(lienAll);
    },(err)=>{
        console.log("Evaluation - DELETE : Error");

        res.redirect(lienErreur);
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    console.log("Evaluation - READ");
    console.log("Evaluation - READ id : " + req.params.id);
    
    mongoose.model('Evaluation').findOne({id : req.params.id}).then((evaluation)=>{
        if(evaluation){
            console.log("Evaluation - READ : Done");

            res.render(pageEvaluation, evaluation);
        }else{
            console.log("Evaluation - READ : Inexistant");

            res.status(404).json({message : "Inexistant"});
        }
    },(err)=>{
        console.log("Evaluation - READ : Error");

        res.redirect(lienErreur);
    });
});

module.exports = app;