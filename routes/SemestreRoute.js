express = require('express');
mongoose = require('mongoose');
app = express();

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// -- Load model needed for the project
require('../models/Semestre');

lienErreur = '/error';
lienAll = '/';
lienAjouter = '/add';
lienModifier = '/update/:id';
lienSupprimer = '/delete/:id';
lienGet = '/get/:id';

pageErreur ='';
pageSemestres = '';
pageSemestre = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    console.log("Semestre - ERROR");

    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    console.log("Semestre - FIND ALL");

    let Semestre = mongoose.model('Semestre');
    Semestre.find().then((semestres)=>{
        console.log("Semestre - FIND ALL : " + semestres);

        res.render(pageSemestres, semestres);
    },(err)=>{
        console.log("Semestre - FIND ALL : Error");

        res.redirect(lienErreur);
    })
});
// -- CREATE
app.post(lienAjouter, function (req, res) {
    console.log("Semestre - CREATE");
    console.log("Semestre - CREATE :" + req.body.nom);

    let Semestre = mongoose.model('Semestre');
    let newSemestre = new Semestre({nom:req.body.nom, coefficient:req.body.coefficient, seuil:req.body.seuil});
    newSemestre.id = newSemestre._id;

    newSemestre.save().then(()=>{
        console.log("Semestre - CREATE : Done");

        res.redirect(lienAll);
    },(err)=>{
        console.log("Semestre - CREATE : Error");

        res.redirect(lienErreur);
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    console.log("Semestre - UPDATE");
    
    mongoose.model('Semestre').updateOne({id : req.params.id}, {$set : req.body}, (err, updatedSemestre)=>{
       if(err){
            console.log("Semestre - UPDATE : Error");

            res.redirect(lienErreur);
       }else{
            console.log("Semestre - UPDATE : Done");

            res.redirect(lienAll);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    console.log("Semestre - DELETE");
    console.log("Semestre - DELETE id : " + req.params.id);
    
    let Semestre = mongoose.model('Semestre');
    Semestre.find({id : req.params.id}).deleteOne().then(()=>{
        console.log("Semestre - DELETE : Done");

        res.redirect(lienAll);
    },(err)=>{
        console.log("Semestre - DELETE : Error");

        res.redirect(lienErreur);
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    console.log("Semestre - READ");
    console.log("Semestre - READ id : " + req.params.id);
    
    mongoose.model('Semestre').findOne({id : req.params.id}).then((semestre)=>{
        if(semestre){
            console.log("Semestre - READ : Done");

            res.render(pageSemestre, semestre);
        }else{
            console.log("Semestre - READ : Inexistant");

            res.status(404).json({message : "Inexistant"});
        }
    },(err)=>{
        console.log("Semestre - READ : Error");

        res.redirect(lienErreur);
    });
});

semestre.exports = app;