const bcrypt = require('bcrypt');

// -- Load model needed for the project
const process = require('./Process_Utilisateur');

// -- FIND ALL
async function actionFindAll () {
    console.log("Action : Utilisateur - FIND ALL");

    return await process.processFindAll();
};

// -- CREATE
async function actionCreate (req) {
    console.log("Action : Utilisateur - CREATE");

    return await process.processCreate(req);
};

// -- UPDATE
async function actionUpdate (req) {
    console.log("Action : Utilisateur - UPDATE");

    return await process.processUpdate(req.params.id, req.body);
};

// -- UPDATE ALL
async function actionUpdateAll (req) {
    console.log("Action : Utilisateur - UPDATE ALL");

    let res = "";
    req.body.utilisateur.forEach(async function(utilisateur){
        res  = await process.processUpdate(utilisateur._id, utilisateur);
        console.log("Action : Utilisateur - UPDATE ALL IN");
        if( res == "Erreur"){
            console.log("Action : Utilisateur - UPDATE ALL ERR");
            return res;
        }
    });
    console.log("Action : Utilisateur - UPDATE ALL DONE");
    return "Done";
};

// -- DELETE
async function actionDelete (req) {
    console.log("Action : Utilisateur - DELETE");

    return await process.processDelete(req);
};

// -- READ
async function actionRead (req) {
    console.log("Action : Utilisateur - READ");

    return await process.processRead(req);
};

// -- LOGIN
function actionLogin (email, password) {
    return new Promise(function(resolve, reject) {
        console.log("Action : Utilisateur - LOGIN");

        bcrypt.hash(password, 10, function (err, hash){
            if (err) {
                console.log("Utilisateur - LOGIN - hashError : " + err);
                return next(err);
            }
            console.log("Utilisateur - LOGIN - hash : " + hash);
            password = hash;
        })

        resolve(process.processLogin(email, password));
    });
};

exports.actionFindAll = actionFindAll;
exports.actionCreate = actionCreate;
exports.actionUpdate = actionUpdate;
exports.actionUpdateAll = actionUpdateAll;
exports.actionDelete = actionDelete;
exports.actionRead = actionRead;
exports.actionLogin = actionLogin;