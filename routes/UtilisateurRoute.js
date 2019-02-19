const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

app = express();

ObjectId = mongoose.Types.ObjectId;

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// -- Load model needed for the project
require('../models/Utilisateur');

const lienErreur = '/error';
const lienAll = '/';
const lienAjouter = '/add';
const lienModifier = '/update/:id';
const lienSupprimer = '/delete/:id';
const lienLogin = '/login/';
const lienLogout = '/logout/';

const pageErreur ='';
const pageUtilisateurs = '';
const pageUtilisateur = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    console.log("Utilisateur - ERROR");

    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    console.log("Utilisateur - FIND ALL");

    Utilisateur = mongoose.model('Utilisateur');
    Utilisateur.find().then((utilisateurs)=>{
        console.log("Utilisateur - FIND ALL : " + utilisateurs);

        res.send(utilisateurs);
    },(err)=>{
        console.log("Utilisateur - FIND ALL : Error");

        res.send("Erreur");
    })
});

// -- CREATE
app.post(lienAjouter, function (req, res) {
    console.log("Utilisateur - CREATE");
    console.log("Utilisateur - CREATE :" + req.body.email);

    Utilisateur = mongoose.model('Utilisateur');

    password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash){
        if (err) {
            console.log("Utilisateur - CREATE - hashError : " + err);
            return next(err);
        }
        console.log("Utilisateur - CREATE - hash : " + hash);
        password = hash;
        next();
      })

    newUtilisateur = new Utilisateur({role:req.body.role, email:req.body.email, password:password});
    newUtilisateur.id = newUtilisateur._id;

    newUtilisateur.save().then(()=>{
        console.log("Utilisateur - CREATE : Done");

        res.send("Done");
    },(err)=>{
        console.log("Utilisateur - CREATE : Error");

        res.send("Erreur");
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    console.log("Utilisateur - UPDATE");
    
    mongoose.model('Utilisateur').updateOne({_id : new ObjectId(req.params.id)}, {$set : req.body}, (err, updatedUtilisateur)=>{
       if(err){
            console.log("Utilisateur - UPDATE : Error");

            res.send("Erreur");
       }else{
            console.log("Utilisateur - UPDATE : " + updatedUtilisateur);

            res.send("Done");
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    console.log("Utilisateur - DELETE");
    console.log("Utilisateur - DELETE id : " + req.params.id);
    
    Utilisateur = mongoose.model('Utilisateur');
    Utilisateur.find({_id : new ObjectId(req.params.id)}).deleteOne().then(()=>{
        console.log("Utilisateur - DELETE : Done");

        res.send("Done");
    },(err)=>{
        console.log("Utilisateur - DELETE : Error");

        res.send("Erreur");
    });
});

// -- CONNECT
app.post(lienLogin, function (req, res) {
    console.log("Utilisateur - CONNECT");
    console.log("Utilisateur - CONNECT id : " + new ObjectId(req.body.email));

    if (req.body.email && req.body.password && req.body.passwordConf) {
        mongoose.model('Utilisateur').findOne({email : req.body.email}).exec(function (err, utilisateur) {
            if (err) {
                console.log("Utilisateur - CONNECT : Error");
        
                res.send("Erreur");
            } else if (!utilisateur) {
                var err = new Error('User not found.');
                console.log("Utilisateur - CONNECT : Error " + err);
        
                res.send("Erreur");
            }
            bcrypt.compare(req.body.password, utilisateur.password, function (err, result) {
                if (result === true) {
                    console.log("Utilisateur - CONNECT : " + utilisateur);
                    return callback(null, utilisateur);
                } else {
                    console.log("Utilisateur - CONNECT : password different");
                    return callback();
                }
            })
            res.send(utilisateur);
        });
    }
});

module.exports = app;