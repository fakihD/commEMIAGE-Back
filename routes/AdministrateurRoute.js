express = require('express');
mongoose = require('mongoose');
app = express();

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// -- Load model needed for the project
require('../models/Administrateur');

lienErreur = '/error';
lienAll = '/';
lienAjouter = '/add';
lienModifier = '/update/:id';
lienSupprimer = '/delete/:id';
lienGet = '/get/:id';

pageErreur ='';
pageAdministrateurs = '';
pageAdministrateur = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    console.log("Administrateur - ERROR");

    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    console.log("Administrateur - FIND ALL");

    let Administrateur = mongoose.model('Administrateur');
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

    let Administrateur = mongoose.model('Administrateur');
    let newAdministrateur = new Administrateur({nom:req.body.nom, coefficient:req.body.coefficient, seuil:req.body.seuil});
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
    
    mongoose.model('Administrateur').updateOne({id : req.params.id}, {$set : req.body}, (err, updatedAdministrateur)=>{
       if(err){
            console.log("Administrateur - UPDATE : Error");

            res.redirect(lienErreur);
       }else{
            console.log("Administrateur - UPDATE : Done");

            res.redirect(lienAll);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    console.log("Administrateur - DELETE");
    console.log("Administrateur - DELETE id : " + req.params.id);
    
    let Administrateur = mongoose.model('Administrateur');
    Administrateur.find({id : req.params.id}).deleteOne().then(()=>{
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
    console.log("Administrateur - READ id : " + req.params.id);
    
    mongoose.model('Administrateur').findOne({id : req.params.id}).then((administrateur)=>{
        if(administrateur){
            console.log("Administrateur - READ : Done");

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

administrateur.exports = app;