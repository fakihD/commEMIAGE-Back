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
require('../models/Module');

const lienErreur = '/error';
const lienAll = '/';
const lienAjouter = '/add';
const lienModifier = '/update/:id';
const lienSupprimer = '/delete/:id';
const lienGet = '/get/:id';

const pageErreur ='';
const pageModules = '';
const pageModule = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    console.log("Module - ERROR");

    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    console.log("Module - FIND ALL");

    Module = mongoose.model('Module');
    Module.find().then((modules)=>{
        console.log("Module - FIND ALL : " + modules);

        res.render(pageModules, modules);
    },(err)=>{
        console.log("Module - FIND ALL : Error");

        res.redirect(lienErreur);
    })
});

// -- CREATE
app.post(lienAjouter, function (req, res) {
    console.log("Module - CREATE");
    console.log("Module - CREATE :" + req.body.nom);

    Module = mongoose.model('Module');
    newModule = new Module({nom:req.body.nom, coefficient:req.body.coefficient, seuil:req.body.seuil});
    newModule.id = newModule._id;

    newModule.save().then(()=>{
        console.log("Module - CREATE : Done");

        res.redirect(lienAll);
    },(err)=>{
        console.log("Module - CREATE : Error");

        res.redirect(lienErreur);
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    console.log("Module - UPDATE");
    
    mongoose.model('Module').updateOne({_id : new ObjectId(req.params.id)}, {$set : req.body}, (err, updatedModule)=>{
       if(err){
            console.log("Module - UPDATE : Error");

            res.redirect(lienErreur);
       }else{
            console.log("Module - UPDATE : " + updatedModule);

            res.redirect(lienAll);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    console.log("Module - DELETE");
    console.log("Module - DELETE id : " + req.params.id);
    
    Module = mongoose.model('Module');
    Module.find({_id : new ObjectId(req.params.id)}).deleteOne().then(()=>{
        console.log("Module - DELETE : Done");

        res.redirect(lienAll);
    },(err)=>{
        console.log("Module - DELETE : Error");

        res.redirect(lienErreur);
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    console.log("Module - READ");
    console.log("Module - READ id : " + new ObjectId(req.params.id));

    mongoose.model('Module').findOne({_id : new ObjectId(req.params.id)}).then((module)=>{
        if(module){
            console.log("Module - READ : " + module);

            res.render(pageModule, module);
        }else{
            console.log("Module - READ : Inexistant");

            res.status(404).json({message : "Inexistant"});
        }
    },(err)=>{
        console.log("Module - READ : Error");

        res.redirect(lienErreur);
    });
});

module.exports = app;