// -- Load model needed for the project
const process = require('./Process_Suivi');

// -- FIND ALL
async function actionFindAll () {
    console.log("Action : Suivi - FIND ALL");

    return await process.processFindAll();
};

// -- CREATE
async function actionCreate (req) {
    console.log("Action : Suivi - CREATE");

    return await process.processCreate(req);
};

// -- UPDATE
async function actionUpdate (req) {
    console.log("Action : Suivi - UPDATE");

    return await process.processUpdate(req.params.id, req.body);
};

// -- UPDATE ALL
async function actionUpdateAll (req) {
    console.log("Action : Suivi - UPDATE ALL");

    let res = "";
    req.body.suivi.forEach(async function(suivi){
        res  = await process.processUpdate(suivi._id, suivi);
        console.log("Action : Suivi - UPDATE ALL IN");
        if( res == "Erreur"){
            console.log("Action : Suivi - UPDATE ALL ERR");
            return res;
        }
    });
    console.log("Action : Suivi - UPDATE ALL DONE");
    return "Done";
};

// -- DELETE
async function actionDelete (req) {
    console.log("Action : Suivi - DELETE");

    return await process.processDelete(req);
};

// -- READ
async function actionRead (req) {
    console.log("Action : Suivi - READ");

    return await process.processRead(req);
};

exports.actionFindAll = actionFindAll;
exports.actionCreate = actionCreate;
exports.actionUpdate = actionUpdate;
exports.actionUpdateAll = actionUpdateAll;
exports.actionDelete = actionDelete;
exports.actionRead = actionRead;