// -- Load model needed for the project
const process = require('./Process_Administrateur');

// -- FIND ALL
function actionFindAll () {
    return new Promise(function(resolve, reject) {
        console.log("Action : Administrateur - FIND ALL"); 
            
        resolve(process.processFindAll());
    });
};

// -- CREATE
function actionCreate (req) {
    return new Promise(function(resolve, reject) {
        console.log("Action : Administrateur - CREATE");

        resolve(process.processCreate(req));
    });
};

// -- UPDATE
function actionUpdate (req) {
    return new Promise(function(resolve, reject) {
        console.log("Action : Administrateur - UPDATE");

        resolve(process.processUpdate(req.params.id, req.body));
    });
};

// -- UPDATE ALL
function actionUpdateAll (req) {
    return new Promise(function(resolve, reject) {
        console.log("Action : Administrateur - UPDATE ALL");
        let res = "";
        req.body.administrateur.forEach(function(administrateur){
            res  = processUpdate(administrateur._id, administrateur);
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
        console.log("Action : Administrateur - DELETE");

        resolve(process.processDelete(req));
    });
};

// -- READ ID
function actionRead (req) {
    return new Promise(function(resolve, reject) {
        console.log("Action : Administrateur - READ ID");

        resolve(process.processRead(req));
    });
};

// -- READ EMAIL
function actionReadEmail (req) {
    return new Promise(function(resolve, reject) {
        console.log("Action : Administrateur - READ EMAIL");

        resolve(process.processReadEmail(req));
    });
};

exports.actionFindAll = actionFindAll;
exports.actionCreate = actionCreate;
exports.actionUpdate = actionUpdate;
exports.actionUpdateAll = actionUpdateAll;
exports.actionDelete = actionDelete;
exports.actionRead = actionRead;
exports.actionReadEmail = actionReadEmail;

