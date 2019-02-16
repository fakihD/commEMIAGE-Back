express = require('express');
mongoose = require('mongoose');
app = express();

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// -- Load model needed for the project
require('../models/Tuteur');

lienErreur = '/error';
lienAll = '/';
lienAjouter = '/add';
lienModifier = '/update/:id';
lienSupprimer = '/delete/:id';
lienGet = '/get/:id';

pageErreur ='';
pageTuteurs = '';
pageTuteur = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    console.log("Tuteur - ERROR");

    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    console.log("Tuteur - FIND ALL");

    let Tuteur = mongoose.model('Tuteur');
    Tuteur.find().then((tuteurs)=>{
        console.log("Tuteur - FIND ALL : " + tuteurs);

        res.render(pageTuteurs, tuteurs);
    },(err)=>{
        console.log("Tuteur - FIND ALL : Error");

        res.redirect(lienErreur);
    })
});
// -- CREATE
app.post(lienAjouter, function (req, res) {
    console.log("Tuteur - CREATE");
    console.log("Tuteur - CREATE :" + req.body.nom);

    let Tuteur = mongoose.model('Tuteur');
    let newTuteur = new Tuteur({nom:req.body.nom, coefficient:req.body.coefficient, seuil:req.body.seuil});
    newTuteur.id = newTuteur._id;

    newTuteur.save().then(()=>{
        console.log("Tuteur - CREATE : Done");

        res.redirect(lienAll);
    },(err)=>{
        console.log("Tuteur - CREATE : Error");

        res.redirect(lienErreur);
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    console.log("Tuteur - UPDATE");
    
    mongoose.model('Tuteur').updateOne({id : req.params.id}, {$set : req.body}, (err, updatedTuteur)=>{
       if(err){
            console.log("Tuteur - UPDATE : Error");

            res.redirect(lienErreur);
       }else{
            console.log("Tuteur - UPDATE : Done");

            res.redirect(lienAll);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    console.log("Tuteur - DELETE");
    console.log("Tuteur - DELETE id : " + req.params.id);
    
    let Tuteur = mongoose.model('Tuteur');
    Tuteur.find({id : req.params.id}).deleteOne().then(()=>{
        console.log("Tuteur - DELETE : Done");

        res.redirect(lienAll);
    },(err)=>{
        console.log("Tuteur - DELETE : Error");

        res.redirect(lienErreur);
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    console.log("Tuteur - READ");
    console.log("Tuteur - READ id : " + req.params.id);
    
    mongoose.model('Tuteur').findOne({id : req.params.id}).then((tuteur)=>{
        if(tuteur){
            console.log("Tuteur - READ : Done");

            res.render(pageTuteur, tuteur);
        }else{
            console.log("Tuteur - READ : Inexistant");

            res.status(404).json({message : "Inexistant"});
        }
    },(err)=>{
        console.log("Tuteur - READ : Error");

        res.redirect(lienErreur);
    });
});

tuteur.exports = app;