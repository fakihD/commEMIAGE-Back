express = require('express');
mongoose = require('mongoose');
app = express();

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// -- Load model needed for the project
require('../models/Module');

lienErreur = '/error';
lienAll = '/';
lienAjouter = '/add';
lienModifier = '/update/:id';
lienSupprimer = '/delete/:id';
lienGet = '/get/:id';

pageErreur ='';
pageModules = '';
pageModule = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    console.log("Module - ERROR");

    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    console.log("Module - FIND ALL");

    let Module = mongoose.model('Module');
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

    let Module = mongoose.model('Module');
    let newModule = new Module({nom:req.body.nom, coefficient:req.body.coefficient, seuil:req.body.seuil});
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
    
    mongoose.model('Module').updateOne({id : req.params.id}, {$set : req.body}, (err, updatedModule)=>{
       if(err){
            console.log("Module - UPDATE : Error");

            res.redirect(lienErreur);
       }else{
            console.log("Module - UPDATE : Done");

            res.redirect(lienAll);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    console.log("Module - DELETE");
    console.log("Module - DELETE id : " + req.params.id);
    
    let Module = mongoose.model('Module');
    Module.find({id : req.params.id}).deleteOne().then(()=>{
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
    console.log("Module - READ id : " + req.params.id);
    
    mongoose.model('Module').findOne({id : req.params.id}).then((module)=>{
        if(module){
            console.log("Module - READ : Done");

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