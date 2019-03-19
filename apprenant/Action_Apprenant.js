// -- Load model needed for the project
const process = require('./Process_Apprenant');

// -- FIND ALL
function actionFindAll () {
    return new Promise(function(resolve, reject) {
        console.log("Action : Apprenant - FIND ALL"); 
            
        resolve(process.processFindAll());
    });
};

// -- CREATE
function actionCreate (req) {
    return new Promise(function(resolve, reject) {
        console.log("Action : Apprenant - CREATE");

        resolve(process.processCreate(req));
    });
};

// -- UPDATE
function actionUpdate (req) {
    return new Promise(function(resolve, reject) {
        console.log("Action : Apprenant - UPDATE");

        resolve(process.processUpdate(req.params.id, req.body));
    });
};

// -- UPDATE ALL
function actionUpdateAll (req) {
    return new Promise(function(resolve, reject) {
        console.log("Action : Apprenant - UPDATE ALL");
        let res = "";
        req.body.apprenant.forEach(function(apprenant){
            res  = processUpdate(apprenant._id, apprenant);
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
        console.log("Action : Apprenant - DELETE");

        resolve(process.processDelete(req));
    });
};

// -- READ
function actionRead (req) {
    return new Promise(function(resolve, reject) {
        console.log("Action : Apprenant - READ");

        resolve(process.processRead(req));
    });
};

exports.actionFindAll = actionFindAll;
exports.actionCreate = actionCreate;
exports.actionUpdate = actionUpdate;
exports.actionUpdateAll = actionUpdateAll;
exports.actionDelete = actionDelete;
exports.actionRead = actionRead;

