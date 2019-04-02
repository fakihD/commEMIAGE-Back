// -- Load model needed for the project
const process = require('./Process_Semestre');

// -- FIND ALL
async function actionFindAll () {
    console.log("Action : Semestre - FIND ALL");

    return await process.processFindAll();
};

// -- CREATE
async function actionCreate (req) {
    console.log("Action : Semestre - CREATE");

    return await process.processCreate(req);
};

// -- UPDATE
async function actionUpdate (req) {
    console.log("Action : Semestre - UPDATE");

    return await process.processUpdate(req.params.id, req.body);
};

// -- UPDATE ALL
async function actionUpdateAll (req) {
    console.log("Action : Semestre - UPDATE ALL");

    let res = "";
    req.body.semestre.forEach(async function(semestre){
        res  = await process.processUpdate(semestre._id, semestre);
        console.log("Action : Semestre - UPDATE ALL IN");
        if( res == "Erreur"){
            console.log("Action : Semestre - UPDATE ALL ERR");
            return res;
        }
    });
    console.log("Action : Semestre - UPDATE ALL DONE");
    return "Done";
};

// -- DELETE
async function actionDelete (req) {
    console.log("Action : Semestre - DELETE");

    return await process.processDelete(req);
};

// -- READ
async function actionRead (req) {
    console.log("Action : Semestre - READ");

    return await process.processRead(req);
};

exports.actionFindAll = actionFindAll;
exports.actionCreate = actionCreate;
exports.actionUpdate = actionUpdate;
exports.actionUpdateAll = actionUpdateAll;
exports.actionDelete = actionDelete;
exports.actionRead = actionRead;