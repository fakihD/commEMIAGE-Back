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
require('../models/Semestre');

const lienErreur = '/error';
const lienAll = '/';
const lienAjouter = '/add';
const lienModifier = '/update/:id';
const lienSupprimer = '/delete/:id';
const lienGet = '/get/:id';

const pageErreur ='';
const pageSemestres = '';
const pageSemestre = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    console.log("Semestre - ERROR");

    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    console.log("Semestre - FIND ALL");

    Semestre = mongoose.model('Semestre');
    Semestre.find().then((semestres)=>{
        console.log("Semestre - FIND ALL : " + semestres);

        res.render(pageSemestres, semestres);
    },(err)=>{
        console.log("Semestre - FIND ALL : Error");

        res.send("Erreur");
    })
});

// -- CREATE
app.post(lienAjouter, function (req, res) {
    console.log("Semestre - CREATE");
    console.log("Semestre - CREATE :" + req.body.nom);

    Semestre = mongoose.model('Semestre');
    newSemestre = new Semestre({nom:req.body.nom, dateDebut:req.body.dateDebut, dateFin:req.body.dateFin});
    newSemestre.id = newSemestre._id;

    newSemestre.save().then(()=>{
        console.log("Semestre - CREATE : Done");

        res.send("Done");
    },(err)=>{
        console.log("Semestre - CREATE : Error");

        res.send("Erreur");
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    console.log("Semestre - UPDATE");
    
    mongoose.model('Semestre').updateOne({_id : new ObjectId(req.params.id)}, {$set : req.body}, (err, updatedSemestre)=>{
       if(err){
            console.log("Semestre - UPDATE : Error");

            res.send("Erreur");
       }else{
            console.log("Semestre - UPDATE : " + updatedSemestre);

            res.send("Done");
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    console.log("Semestre - DELETE");
    console.log("Semestre - DELETE id : " + req.params.id);
    
    Semestre = mongoose.model('Semestre');
    Semestre.find({_id : new ObjectId(req.params.id)}).deleteOne().then(()=>{
        console.log("Semestre - DELETE : Done");

        res.send("Done");
    },(err)=>{
        console.log("Semestre - DELETE : Error");

        res.send("Erreur");
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    console.log("Semestre - READ");
    console.log("Semestre - READ id : " + new ObjectId(req.params.id));

    mongoose.model('Semestre').findOne({_id : new ObjectId(req.params.id)}).then((semestre)=>{
        if(semestre){
            console.log("Semestre - READ : " + semestre);

            res.send(semestre);
        }else{
            console.log("Semestre - READ : Inexistant");

            res.send("Inexistant");
        }
    },(err)=>{
        console.log("Semestre - READ : Error");

        res.send("Erreur");
    });
});

module.exports = app;