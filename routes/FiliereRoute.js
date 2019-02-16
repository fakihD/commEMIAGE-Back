express = require('express');
mongoose = require('mongoose');
app = express();

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// -- Load model needed for the project
require('../models/Filiere');

lienErreur = '/error';
lienAll = '/';
lienAjouter = '/add';
lienModifier = '/update/:id';
lienSupprimer = '/delete/:id';
lienGet = '/get/:id';

pageErreur ='';
pageFilieres = '';
pageFiliere = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    console.log("Filiere - ERROR");

    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    console.log("Filiere - FIND ALL");

    let Filiere = mongoose.model('Filiere');
    Filiere.find().then((filieres)=>{
        console.log("Filiere - FIND ALL : " + filieres);

        res.render(pageFilieres, filieres);
    },(err)=>{
        console.log("Filiere - FIND ALL : Error");

        res.redirect(lienErreur);
    })
});
// -- CREATE
app.post(lienAjouter, function (req, res) {
    console.log("Filiere - CREATE");
    console.log("Filiere - CREATE :" + req.body.nom);

    let Filiere = mongoose.model('Filiere');
    let newFiliere = new Filiere({nom:req.body.nom, coefficient:req.body.coefficient, seuil:req.body.seuil});
    newFiliere.id = newFiliere._id;

    newFiliere.save().then(()=>{
        console.log("Filiere - CREATE : Done");

        res.redirect(lienAll);
    },(err)=>{
        console.log("Filiere - CREATE : Error");

        res.redirect(lienErreur);
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    console.log("Filiere - UPDATE");
    
    mongoose.model('Filiere').updateOne({id : req.params.id}, {$set : req.body}, (err, updatedFiliere)=>{
       if(err){
            console.log("Filiere - UPDATE : Error");

            res.redirect(lienErreur);
       }else{
            console.log("Filiere - UPDATE : Done");

            res.redirect(lienAll);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    console.log("Filiere - DELETE");
    console.log("Filiere - DELETE id : " + req.params.id);
    
    let Filiere = mongoose.model('Filiere');
    Filiere.find({id : req.params.id}).deleteOne().then(()=>{
        console.log("Filiere - DELETE : Done");

        res.redirect(lienAll);
    },(err)=>{
        console.log("Filiere - DELETE : Error");

        res.redirect(lienErreur);
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    console.log("Filiere - READ");
    console.log("Filiere - READ id : " + req.params.id);
    
    mongoose.model('Filiere').findOne({id : req.params.id}).then((filiere)=>{
        if(filiere){
            console.log("Filiere - READ : Done");

            res.render(pageFiliere, filiere);
        }else{
            console.log("Filiere - READ : Inexistant");

            res.status(404).json({message : "Inexistant"});
        }
    },(err)=>{
        console.log("Filiere - READ : Error");

        res.redirect(lienErreur);
    });
});

module.exports = app;