const bcrypt = require('bcrypt');

// -- Load model needed for the project
const process = require('./Process_Utilisateur');

// -- FIND ALL
function actionFindAll (req, res) {
    console.log("Action : Utilisateur - FIND ALL");

    try{
        process.processFindAll().then((callback) => {
            console.log("Process : Utilisateur - FIND ALL : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Utilisateur - FIND ALL : Error - " + err);

        res.send(err);
    }
};

// -- CREATE
async function actionCreate (req, res) {
    console.log("Action : Utilisateur - CREATE");

    try{        
        password = await new Promise((resolve, reject) => {
            bcrypt.hash(req.body.password, 10, async function (err, hash){
                console.log("Action : Utilisateur - LOGIN - hash : " + hash);
                resolve(hash);
            });
        })

        process.processCreate(req, password).then((callback) => {
            console.log("Process : Utilisateur - CREATE : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Utilisateur - CREATE : Error - " + err);

        res.send(err);
    }
};

// -- UPDATE
function actionUpdate (req, res) {
    console.log("Action : Utilisateur - UPDATE");

    try{
        process.processUpdate(req.params.id, req.body.utilisateur).then((callback) => {
            console.log("Process : Utilisateur - UPDATE : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Utilisateur - UPDATE : Error - " + err);

        res.send(err);
    }
};

// -- UPDATE ALL
function actionUpdateAll (req, res) {
    console.log("Action : Utilisateur - UPDATE ALL");

    try{
        let res = "";
        req.body.utilisateur.forEach(function(utilisateur){
            process.processUpdate(utilisateur._id, utilisateur).then((callback) => {
                console.log("Process : Utilisateur - UPDATE : " + callback);
                res.send(callback);
            });
        }).then(() => {
            console.log("Action : Utilisateur - UPDATE ALL DONE");
            res.send("Done");
        });
    } catch(err) {
        console.log("Process : Utilisateur - UPDATE ALL : Error - " + err);

        res.send(err);
    }
};

// -- DELETE
function actionDelete (req, res) {
    console.log("Action : Utilisateur - DELETE");

    try{
        process.processDelete(req).then((callback) => {
            console.log("Process : Utilisateur - DELETE : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Utilisateur - DELETE : Error - " + err);

        res.send(err);
    }
};

// -- READ
function actionRead (req, res) {
    console.log("Action : Utilisateur - READ");

    try{
        process.processRead(req).then((callback) => {
            console.log("Process : Utilisateur - READ : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Utilisateur - READ : Error - " + err);

        res.send(err);
    }
};

// -- LOGIN
async function actionLogin (req, res) {
    console.log("Action : Utilisateur - LOGIN");

    try {
        process.processLogin(req.params.email).then(async function(callback) {
            console.log("Process : Utilisateur - LOGIN : " + callback);

            rslt = await new Promise((resolve, reject) => {
                bcrypt.compare(req.params.password, callback.password, function(err, rslt){
                    console.log("Action : Utilisateur - LOGIN - rslt : " + rslt);
                    resolve(rslt);
                });
            })

            if(rslt) {
                res.send(callback);
            } else {
                console.log("Process : Utilisateur - LOGIN : Error - Incorrecte");
                res.send("Erreur");
            }
        });
    } catch(err) {
        console.log("Process : Utilisateur - LOGIN : Error - " + err);

        res.send(err);
    }
};

exports.actionFindAll = actionFindAll;
exports.actionCreate = actionCreate;
exports.actionUpdate = actionUpdate;
exports.actionUpdateAll = actionUpdateAll;
exports.actionDelete = actionDelete;
exports.actionRead = actionRead;
exports.actionLogin = actionLogin;