express = require('express');
mongoose = require('mongoose');
app = express();

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// -- Load model needed for the project
require('../models/Suivi');

lienErreur = '/error';
lienAll = '/';
lienAjouter = '/add';
lienModifier = '/update/:id';
lienSupprimer = '/delete/:id';
lienGet = '/get/:id';

pageErreur ='';
pageSuivis = '';
pageSuivi = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    console.log("Suivi - ERROR");

    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    console.log("Suivi - FIND ALL");

    let Suivi = mongoose.model('Suivi');
    Suivi.find().then((suivis)=>{
        console.log("Suivi - FIND ALL : " + suivis);

        res.render(pageSuivis, suivis);
    },(err)=>{
        console.log("Suivi - FIND ALL : Error");

        res.redirect(lienErreur);
    })
});
// -- CREATE
app.post(lienAjouter, function (req, res) {
    console.log("Suivi - CREATE");
    console.log("Suivi - CREATE :" + req.body.nom);

    let Suivi = mongoose.model('Suivi');
    let newSuivi = new Suivi({nom:req.body.nom, coefficient:req.body.coefficient, seuil:req.body.seuil});
    newSuivi.id = newSuivi._id;

    newSuivi.save().then(()=>{
        console.log("Suivi - CREATE : Done");

        res.redirect(lienAll);
    },(err)=>{
        console.log("Suivi - CREATE : Error");

        res.redirect(lienErreur);
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    console.log("Suivi - UPDATE");
    
    mongoose.model('Suivi').updateOne({id : req.params.id}, {$set : req.body}, (err, updatedSuivi)=>{
       if(err){
            console.log("Suivi - UPDATE : Error");

            res.redirect(lienErreur);
       }else{
            console.log("Suivi - UPDATE : Done");

            res.redirect(lienAll);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    console.log("Suivi - DELETE");
    console.log("Suivi - DELETE id : " + req.params.id);
    
    let Suivi = mongoose.model('Suivi');
    Suivi.find({id : req.params.id}).deleteOne().then(()=>{
        console.log("Suivi - DELETE : Done");

        res.redirect(lienAll);
    },(err)=>{
        console.log("Suivi - DELETE : Error");

        res.redirect(lienErreur);
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    console.log("Suivi - READ");
    console.log("Suivi - READ id : " + req.params.id);
    
    mongoose.model('Suivi').findOne({id : req.params.id}).then((suivi)=>{
        if(suivi){
            console.log("Suivi - READ : Done");

            res.render(pageSuivi, suivi);
        }else{
            console.log("Suivi - READ : Inexistant");

            res.status(404).json({message : "Inexistant"});
        }
    },(err)=>{
        console.log("Suivi - READ : Error");

        res.redirect(lienErreur);
    });
});

suivi.exports = app;