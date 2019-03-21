const bcrypt = require('bcrypt');

// -- Load model needed for the project
const process = require('./Process_Utilisateur');

// -- FIND ALL
function actionFindAll () {
    return new Promise(function(resolve, reject) {
        console.log("Action : Utilisateur - FIND ALL"); 
            
        resolve(process.processFindAll());
    });
};

// -- CREATE
function actionCreate (req) {
    return new Promise(function(resolve, reject) {
        console.log("Action : Utilisateur - CREATE");

        password = req.body.password;
        bcrypt.hash(password, 10, function (err, hash){
            if (err) {
                console.log("Utilisateur - CREATE - hashError : " + err);
                return next(err);
            }
            console.log("Utilisateur - CREATE - hash : " + hash);
            password = hash;
        })

        resolve(process.processCreate(req, password));
    });
};

// -- UPDATE
function actionUpdate (req) {
    return new Promise(function(resolve, reject) {
        console.log("Action : Utilisateur - UPDATE");

        resolve(process.processUpdate(req.params.id, req.body));
    });
};

// -- UPDATE ALL
function actionUpdateAll (req) {
    return new Promise(function(resolve, reject) {
        console.log("Action : Utilisateur - UPDATE ALL");
        let res = "";
        req.body.utilisateur.forEach(function(utilisateur){
            res  = processUpdate(utilisateur._id, utilisateur);
            if( res == "Erreur"){
                reject(res);
            }
        });
        resolve("Done");
    });
};

// -- DELETE
function actionDelete (req) {
    return new Promise(function(resolve, reject) {
        console.log("Action : Utilisateur - DELETE");

        resolve(process.processDelete(req));
    });
};

// -- READ
function actionRead (req) {
    return new Promise(function(resolve, reject) {
        console.log("Action : Utilisateur - READ");

        resolve(process.processRead(req));
    });
};

// -- LOGIN
function actionLogin (req) {
    return new Promise(function(resolve, reject) {
        console.log("Action : Utilisateur - LOGIN");

        password = req.body.password;
        bcrypt.hash(password, 10, function (err, hash){
            if (err) {
                console.log("Utilisateur - LOGIN - hashError : " + err);
                return next(err);
            }
            console.log("Utilisateur - LOGIN - hash : " + hash);
            password = hash;
        })

        resolve(process.processLogin(req, password));
    });
};

exports.actionFindAll = actionFindAll;
exports.actionCreate = actionCreate;
exports.actionUpdate = actionUpdate;
exports.actionUpdateAll = actionUpdateAll;
exports.actionDelete = actionDelete;
exports.actionRead = actionRead;
exports.actionLogin = actionLogin;

