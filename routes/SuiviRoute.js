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
require('../models/Suivi');

const lienErreur = '/error';
const lienAll = '/';
const lienAjouter = '/add';
const lienModifier = '/update/:id';
const lienSupprimer = '/delete/:id';
const lienGet = '/get/:id';

const pageErreur ='';
const pageSuivis = '';
const pageSuivi = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    console.log("Suivi - ERROR");

    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    console.log("Suivi - FIND ALL");

    Suivi = mongoose.model('Suivi');
    Suivi.find().then((suivis)=>{
        console.log("Suivi - FIND ALL : " + suivis);

        res.send(suivis);
    },(err)=>{
        console.log("Suivi - FIND ALL : Error");

        res.send("Erreur");
    })
});

// -- CREATE
app.post(lienAjouter, function (req, res) {
    console.log("Suivi - CREATE");
    console.log("Suivi - CREATE :" + req.body.alias);

    Suivi = mongoose.model('Suivi');
    newSuivi = new Suivi({alias:req.body.alias});
    newSuivi.id = newSuivi._id;

    newSuivi.save().then(()=>{
        console.log("Suivi - CREATE : Done");

        res.send("Done");
    },(err)=>{
        console.log("Suivi - CREATE : Error");

        res.send("Erreur");
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    console.log("Suivi - UPDATE");
    
    mongoose.model('Suivi').updateOne({_id : new ObjectId(req.params.id)}, {$set : req.body}, (err, updatedSuivi)=>{
       if(err){
            console.log("Suivi - UPDATE : Error");

            res.send("Erreur");
       }else{
            console.log("Suivi - UPDATE : " + updatedSuivi);

            res.send("Done");
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    console.log("Suivi - DELETE");
    console.log("Suivi - DELETE id : " + req.params.id);
    
    Suivi = mongoose.model('Suivi');
    Suivi.find({_id : new ObjectId(req.params.id)}).deleteOne().then(()=>{
        console.log("Suivi - DELETE : Done");

        res.send("Done");
    },(err)=>{
        console.log("Suivi - DELETE : Error");

        res.send("Erreur");
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    console.log("Suivi - READ");
    console.log("Suivi - READ id : " + new ObjectId(req.params.id));

    mongoose.model('Suivi').findOne({_id : new ObjectId(req.params.id)}).then((suivi)=>{
        if(suivi){
            console.log("Suivi - READ : " + suivi);

            res.send(suivi);
        }else{
            console.log("Suivi - READ : Inexistant");

            res.send("Inexistant");
        }
    },(err)=>{
        console.log("Suivi - READ : Error");

        res.send("Erreur");
    });
});

module.exports = app;