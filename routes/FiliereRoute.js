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
require('../models/Filiere');

const lienErreur = '/error';
const lienAll = '/';
const lienAjouter = '/add';
const lienModifier = '/update/:id';
const lienSupprimer = '/delete/:id';
const lienGet = '/get/:id';

const pageErreur ='';
const pageFilieres = '';
const pageFiliere = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    console.log("Filiere - ERROR");

    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    console.log("Filiere - FIND ALL");

    Filiere = mongoose.model('Filiere');
    Filiere.find().then((filieres)=>{
        console.log("Filiere - FIND ALL : " + filieres);

        res.render(pageFilieres, filieres);
    },(err)=>{
        console.log("Filiere - FIND ALL : Error");

        res.send("Erreur");
    })
});

// -- CREATE
app.post(lienAjouter, function (req, res) {
    console.log("Filiere - CREATE");
    console.log("Filiere - CREATE :" + req.body.nom);

    Filiere = mongoose.model('Filiere');
    newFiliere = new Filiere({nom:req.body.nom, description:req.body.description, module:req.body.module});
    newFiliere.id = newFiliere._id;

    newFiliere.save().then(()=>{
        console.log("Filiere - CREATE : Done");

        res.send("Done");
    },(err)=>{
        console.log("Filiere - CREATE : Error");

        res.send("Erreur");
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    console.log("Filiere - UPDATE");
    
    mongoose.model('Filiere').updateOne({_id : new ObjectId(req.params.id)}, {$set : req.body}, (err, updatedFiliere)=>{
       if(err){
            console.log("Filiere - UPDATE : Error");

            res.send("Erreur");
       }else{
            console.log("Filiere - UPDATE : " + updatedFiliere);

            res.send("Done");
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    console.log("Filiere - DELETE");
    console.log("Filiere - DELETE id : " + req.params.id);
    
    Filiere = mongoose.model('Filiere');
    Filiere.find({_id : new ObjectId(req.params.id)}).deleteOne().then(()=>{
        console.log("Filiere - DELETE : Done");

        res.send("Done");
    },(err)=>{
        console.log("Filiere - DELETE : Error");

        res.send("Erreur");
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    console.log("Filiere - READ");
    console.log("Filiere - READ id : " + new ObjectId(req.params.id));

    mongoose.model('Filiere').findOne({_id : new ObjectId(req.params.id)}).then((filiere)=>{
        if(filiere){
            console.log("Filiere - READ : " + filiere);

            res.send(filiere);
        }else{
            console.log("Filiere - READ : Inexistant");

            res.send("Inexistant");
        }
    },(err)=>{
        console.log("Filiere - READ : Error");

        res.send("Erreur");
    });
});

module.exports = app;