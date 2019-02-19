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

        res.send(administrateurs);
    },(err)=>{
        console.log("Administrateur - FIND ALL : Error");

        res.send("Erreur");
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

        res.send("Done");
    },(err)=>{
        console.log("Administrateur - CREATE : Error");

        res.send("Erreur");
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    console.log("Administrateur - UPDATE");
    
    mongoose.model('Administrateur').updateOne({_id : new ObjectId(req.params.id)}, {$set : req.body}, (err, updatedAdministrateur)=>{
       if(err){
            console.log("Administrateur - UPDATE : Error");

            res.send("Erreur");
       }else{
            console.log("Administrateur - UPDATE : " + updatedAdministrateur);

            res.send("Done");
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

        res.send("Done");
    },(err)=>{
        console.log("Administrateur - DELETE : Error");

        res.send("Erreur");
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    console.log("Administrateur - READ");
    console.log("Administrateur - READ id : " + new ObjectId(req.params.id));

    mongoose.model('Administrateur').findOne({_id : new ObjectId(req.params.id)}).then((administrateur)=>{
        if(administrateur){
            console.log("Administrateur - READ : " + administrateur);

            res.send(administrateur);
        }else{
            console.log("Administrateur - READ : Inexistant");

            res.send("Inexistant");
        }
    },(err)=>{
        console.log("Administrateur - READ : Error");

        res.send("Erreur");
    });
});

module.exports = app;