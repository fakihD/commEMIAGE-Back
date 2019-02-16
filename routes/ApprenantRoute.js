express = require('express');
mongoose = require('mongoose');
app = express();

ObjectId = mongoose.Types.ObjectId;

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// -- Load model needed for the project
require('../models/Apprenant');

lienErreur = '/error';
lienAll = '/';
lienAjouter = '/add';
lienModifier = '/update/:id';
lienSupprimer = '/delete/:id';
lienGet = '/get/:id';

pageErreur ='';
pageApprenants = '';
pageApprenant = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    console.log("Apprenant - ERROR");

    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    console.log("Apprenant - FIND ALL");

    let Apprenant = mongoose.model('Apprenant');
    Apprenant.find().then((apprenants)=>{
        console.log("Apprenant - FIND ALL : " + apprenants);

        res.render(pageApprenants, apprenants);
    },(err)=>{
        console.log("Apprenant - FIND ALL : Error");

        res.redirect(lienErreur);
    })
});
// -- CREATE
app.post(lienAjouter, function (req, res) {
    console.log("Apprenant - CREATE");
    console.log("Apprenant - CREATE :" + req.body.nom);

    let Apprenant = mongoose.model('Apprenant');
    let newApprenant = new Apprenant({nom:req.body.nom, coefficient:req.body.coefficient, seuil:req.body.seuil});
    newApprenant.id = newApprenant._id;

    newApprenant.save().then(()=>{
        console.log("Apprenant - CREATE : Done");

        res.redirect(lienAll);
    },(err)=>{
        console.log("Apprenant - CREATE : Error");

        res.redirect(lienErreur);
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    console.log("Apprenant - UPDATE");
    
    mongoose.model('Apprenant').updateOne({_id : new ObjectId(req.params.id)}, {$set : req.body}, (err, updatedApprenant)=>{
       if(err){
            console.log("Apprenant - UPDATE : Error");

            res.redirect(lienErreur);
       }else{
            console.log("Apprenant - UPDATE : " + updatedApprenant);

            res.redirect(lienAll);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    console.log("Apprenant - DELETE");
    console.log("Apprenant - DELETE id : " + req.params.id);
    
    let Apprenant = mongoose.model('Apprenant');
    Apprenant.find({_id : new ObjectId(req.params.id)}).deleteOne().then(()=>{
        console.log("Apprenant - DELETE : Done");

        res.redirect(lienAll);
    },(err)=>{
        console.log("Apprenant - DELETE : Error");

        res.redirect(lienErreur);
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    console.log("Apprenant - READ");
    console.log("Apprenant - READ id : " + new ObjectId(req.params.id));

    mongoose.model('Apprenant').findOne({_id : new ObjectId(req.params.id)}).then((apprenant)=>{
        if(apprenant){
            console.log("Apprenant - READ : " + apprenant);

            res.render(pageApprenant, apprenant);
        }else{
            console.log("Apprenant - READ : Inexistant");

            res.status(404).json({message : "Inexistant"});
        }
    },(err)=>{
        console.log("Apprenant - READ : Error");

        res.redirect(lienErreur);
    });
});

module.exports = app;