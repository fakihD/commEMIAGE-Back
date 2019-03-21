// -- Load model needed for the project
const process = require('./Process_Tuteur');

// -- FIND ALL
function actionFindAll () {
    return new Promise(function(resolve, reject) {
        console.log("Action : Tuteur - FIND ALL"); 
            
        resolve(process.processFindAll());
    });
};

// -- CREATE
function actionCreate (req) {
    return new Promise(function(resolve, reject) {
        console.log("Action : Tuteur - CREATE");

        resolve(process.processCreate(req));
    });
};

// -- UPDATE
function actionUpdate (req) {
    return new Promise(function(resolve, reject) {
        console.log("Action : Tuteur - UPDATE");

        resolve(process.processUpdate(req.params.id, req.body));
    });
};

// -- UPDATE ALL
function actionUpdateAll (req) {
    return new Promise(function(resolve, reject) {
        console.log("Action : Tuteur - UPDATE ALL");
        let res = "";
        req.body.tuteur.forEach(function(tuteur){
            res  = processUpdate(tuteur._id, tuteur);
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
        console.log("Action : Tuteur - DELETE");

        resolve(process.processDelete(req));
    });
};

// -- READ
function actionRead (req) {
    return new Promise(function(resolve, reject) {
        console.log("Action : Tuteur - READ");

        resolve(process.processRead(req));
    });
};

exports.actionFindAll = actionFindAll;
exports.actionCreate = actionCreate;
exports.actionUpdate = actionUpdate;
exports.actionUpdateAll = actionUpdateAll;
exports.actionDelete = actionDelete;
exports.actionRead = actionRead;
