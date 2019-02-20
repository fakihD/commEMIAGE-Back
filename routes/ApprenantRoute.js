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
require('../models/Apprenant');

const lienErreur = '/error';
const lienAll = '/';
const lienAjouter = '/add';
const lienModifier = '/update/:id';
const lienSupprimer = '/delete/:id';
const lienGet = '/get/:id';

const pageErreur ='';
const pageApprenants = '';
const pageApprenant = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    console.log("Apprenant - ERROR");

    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    console.log("Apprenant - FIND ALL");

    Apprenant = mongoose.model('Apprenant');
    Apprenant.find().then((apprenants)=>{
        console.log("Apprenant - FIND ALL : " + apprenants);

        res.send(apprenants);
    },(err)=>{
        console.log("Apprenant - FIND ALL : Error");

        res.send("Erreur");
    })
});

// -- CREATE
app.post(lienAjouter, function (req, res) {
    console.log("Apprenant - CREATE");
    console.log("Apprenant - CREATE :" + req.body.nom);

    Apprenant = mongoose.model('Apprenant');
    newApprenant = new Apprenant({nom:req.body.nom, prenom:req.body.prenom, adresse:req.body.adresse, email:req.body.email, filiere:req.body.filiere, semestre:req.body.semestre});
    newApprenant.id = newApprenant._id;

    newApprenant.save().then(()=>{
        console.log("Apprenant - CREATE : Done");

        res.send("Done");
    },(err)=>{
        console.log("Apprenant - CREATE : Error");

        res.send("Erreur");
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    console.log("Apprenant - UPDATE");
    
    mongoose.model('Apprenant').updateOne({_id : new ObjectId(req.params.id)}, {$set : req.body}, (err, updatedApprenant)=>{
       if(err){
            console.log("Apprenant - UPDATE : Error");

            res.send("Erreur");
       }else{
            console.log("Apprenant - UPDATE : " + updatedApprenant);

            res.send("Done");
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    console.log("Apprenant - DELETE");
    console.log("Apprenant - DELETE id : " + req.params.id);
    
    Apprenant = mongoose.model('Apprenant');
    Apprenant.find({_id : new ObjectId(req.params.id)}).deleteOne().then(()=>{
        console.log("Apprenant - DELETE : Done");

        res.send("Done");
    },(err)=>{
        console.log("Apprenant - DELETE : Error");

        res.send("Erreur");
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    console.log("Apprenant - READ");
    console.log("Apprenant - READ id : " + new ObjectId(req.params.id));

    mongoose.model('Apprenant').findOne({_id : new ObjectId(req.params.id)}).then((apprenant)=>{
        if(apprenant){
            console.log("Apprenant - READ : " + apprenant);

            res.send(apprenant);
        }else{
            console.log("Apprenant - READ : Inexistant");

            res.send("Inexistant");
        }
    },(err)=>{
        console.log("Apprenant - READ : Error");

        res.send("Erreur");
    });
});

module.exports = app;