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
require('../models/Tuteur');

const lienErreur = '/error';
const lienAll = '/';
const lienAjouter = '/add';
const lienModifier = '/update/:id';
const lienSupprimer = '/delete/:id';
const lienGet = '/get/:id';

const pageErreur ='';
const pageTuteurs = '';
const pageTuteur = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    console.log("Tuteur - ERROR");

    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    console.log("Tuteur - FIND ALL");

    Tuteur = mongoose.model('Tuteur');
    Tuteur.find().then((tuteurs)=>{
        console.log("Tuteur - FIND ALL : " + tuteurs);

        res.send(tuteurs);
    },(err)=>{
        console.log("Tuteur - FIND ALL : Error");

        res.send("Erreur");
    })
});

// -- CREATE
app.post(lienAjouter, function (req, res) {
    console.log("Tuteur - CREATE");
    console.log("Tuteur - CREATE :" + req.body.nom);

    Tuteur = mongoose.model('Tuteur');
    newTuteur = new Tuteur({nom:req.body.nom, prenom:req.body.prenom, adresse:req.body.adresse, email:req.body.email});
    newTuteur.id = newTuteur._id;

    newTuteur.save().then(()=>{
        console.log("Tuteur - CREATE : Done");

        res.redirect(lienAll);
    },(err)=>{
        console.log("Tuteur - CREATE : Error");

        res.send("Erreur");
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    console.log("Tuteur - UPDATE");
    
    mongoose.model('Tuteur').updateOne({_id : new ObjectId(req.params.id)}, {$set : req.body}, (err, updatedTuteur)=>{
       if(err){
            console.log("Tuteur - UPDATE : Error");

            res.send("Erreur");
       }else{
            console.log("Tuteur - UPDATE : " + updatedTuteur);

            res.redirect(lienAll);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    console.log("Tuteur - DELETE");
    console.log("Tuteur - DELETE id : " + req.params.id);
    
    Tuteur = mongoose.model('Tuteur');
    Tuteur.find({_id : new ObjectId(req.params.id)}).deleteOne().then(()=>{
        console.log("Tuteur - DELETE : Done");

        res.redirect(lienAll);
    },(err)=>{
        console.log("Tuteur - DELETE : Error");

        res.send("Erreur");
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    console.log("Tuteur - READ");
    console.log("Tuteur - READ id : " + new ObjectId(req.params.id));

    mongoose.model('Tuteur').findOne({_id : new ObjectId(req.params.id)}).then((tuteur)=>{
        if(tuteur){
            console.log("Tuteur - READ : " + tuteur);

            res.send(tuteur);
        }else{
            console.log("Tuteur - READ : Inexistant");

            res.send("Inexistant");
        }
    },(err)=>{
        console.log("Tuteur - READ : Error");

        res.send("Erreur");
    });
});

module.exports = app;