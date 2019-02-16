express = require('express');
mongoose = require('mongoose');
app = express();

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// -- Load model needed for the project
require('../models/Utilisateur');

lienErreur = '/error';
lienAll = '/';
lienAjouter = '/add';
lienModifier = '/update/:id';
lienSupprimer = '/delete/:id';
lienGet = '/get/:id';

pageErreur ='';
pageUtilisateurs = '';
pageUtilisateur = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    console.log("Utilisateur - ERROR");

    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    console.log("Utilisateur - FIND ALL");

    let Utilisateur = mongoose.model('Utilisateur');
    Utilisateur.find().then((utilisateurs)=>{
        console.log("Utilisateur - FIND ALL : " + utilisateurs);

        res.render(pageUtilisateurs, utilisateurs);
    },(err)=>{
        console.log("Utilisateur - FIND ALL : Error");

        res.redirect(lienErreur);
    })
});
// -- CREATE
app.post(lienAjouter, function (req, res) {
    console.log("Utilisateur - CREATE");
    console.log("Utilisateur - CREATE :" + req.body.nom);

    let Utilisateur = mongoose.model('Utilisateur');
    let newUtilisateur = new Utilisateur({nom:req.body.nom, coefficient:req.body.coefficient, seuil:req.body.seuil});
    newUtilisateur.id = newUtilisateur._id;

    newUtilisateur.save().then(()=>{
        console.log("Utilisateur - CREATE : Done");

        res.redirect(lienAll);
    },(err)=>{
        console.log("Utilisateur - CREATE : Error");

        res.redirect(lienErreur);
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    console.log("Utilisateur - UPDATE");
    
    mongoose.model('Utilisateur').updateOne({id : req.params.id}, {$set : req.body}, (err, updatedUtilisateur)=>{
       if(err){
            console.log("Utilisateur - UPDATE : Error");

            res.redirect(lienErreur);
       }else{
            console.log("Utilisateur - UPDATE : Done");

            res.redirect(lienAll);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    console.log("Utilisateur - DELETE");
    console.log("Utilisateur - DELETE id : " + req.params.id);
    
    let Utilisateur = mongoose.model('Utilisateur');
    Utilisateur.find({id : req.params.id}).deleteOne().then(()=>{
        console.log("Utilisateur - DELETE : Done");

        res.redirect(lienAll);
    },(err)=>{
        console.log("Utilisateur - DELETE : Error");

        res.redirect(lienErreur);
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    console.log("Utilisateur - READ");
    console.log("Utilisateur - READ id : " + req.params.id);
    
    mongoose.model('Utilisateur').findOne({id : req.params.id}).then((utilisateur)=>{
        if(utilisateur){
            console.log("Utilisateur - READ : Done");

            res.render(pageUtilisateur, utilisateur);
        }else{
            console.log("Utilisateur - READ : Inexistant");

            res.status(404).json({message : "Inexistant"});
        }
    },(err)=>{
        console.log("Utilisateur - READ : Error");

        res.redirect(lienErreur);
    });
});

utilisateur.exports = app;