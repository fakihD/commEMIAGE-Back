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
require('../models/Administrateur');

const lienErreur = '/error';
const lienAll = '/';
const lienAjouter = '/add';
const lienModifier = '/update/:id';
const lienSupprimer = '/delete/:id';
const lienGet = '/get/:id';

const pageErreur ='';
const pageAdministrateurs = '';
const pageAdministrateur = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    console.log("Administrateur - ERROR");

    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    console.log("Administrateur - FIND ALL");

    Administrateur = mongoose.model('Administrateur');
    Administrateur.find().then((administrateurs)=>{
        console.log("Administrateur - FIND ALL : " + administrateurs);

        res.render(pageAdministrateurs, administrateurs);
    },(err)=>{
        console.log("Administrateur - FIND ALL : Error");

        res.redirect(lienErreur);
    })
});

// -- CREATE
app.post(lienAjouter, function (req, res) {
    console.log("Administrateur - CREATE");
    console.log("Administrateur - CREATE :" + req.body.nom);

    Administrateur = mongoose.model('Administrateur');
    newAdministrateur = new Administrateur({nom:req.body.nom, prenom:req.body.prenom, adresse:req.body.adresse, email:req.body.email});
    newAdministrateur.id = newAdministrateur._id;

    newAdministrateur.save().then(()=>{
        console.log("Administrateur - CREATE : Done");

        res.redirect(lienAll);
    },(err)=>{
        console.log("Administrateur - CREATE : Error");

        res.redirect(lienErreur);
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    console.log("Administrateur - UPDATE");
    
    mongoose.model('Administrateur').updateOne({_id : new ObjectId(req.params.id)}, {$set : req.body}, (err, updatedAdministrateur)=>{
       if(err){
            console.log("Administrateur - UPDATE : Error");

            res.redirect(lienErreur);
       }else{
            console.log("Administrateur - UPDATE : " + updatedAdministrateur);

            res.redirect(lienAll);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    console.log("Administrateur - DELETE");
    console.log("Administrateur - DELETE id : " + req.params.id);
    
    Administrateur = mongoose.model('Administrateur');
    Administrateur.find({_id : new ObjectId(req.params.id)}).deleteOne().then(()=>{
        console.log("Administrateur - DELETE : Done");

        res.redirect(lienAll);
    },(err)=>{
        console.log("Administrateur - DELETE : Error");

        res.redirect(lienErreur);
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    console.log("Administrateur - READ");
    console.log("Administrateur - READ id : " + new ObjectId(req.params.id));

    mongoose.model('Administrateur').findOne({_id : new ObjectId(req.params.id)}).then((administrateur)=>{
        if(administrateur){
            console.log("Administrateur - READ : " + administrateur);

            res.render(pageAdministrateur, administrateur);
        }else{
            console.log("Administrateur - READ : Inexistant");

            res.status(404).json({message : "Inexistant"});
        }
    },(err)=>{
        console.log("Administrateur - READ : Error");

        res.redirect(lienErreur);
    });
});

module.exports = app;