// -- Load model needed for the project
const process = require('./Process_Evaluation');

// -- FIND ALL
async function actionFindAll () {
    console.log("Action : Evaluation - FIND ALL");

    return await process.processFindAll();
};

// -- CREATE
async function actionCreate (req) {
    console.log("Action : Evaluation - CREATE");

    return await process.processCreate(req);
};

// -- UPDATE
async function actionUpdate (req) {
    console.log("Action : Evaluation - UPDATE");

    return await process.processUpdate(req.params.id, req.body);
};

// -- UPDATE ALL
async function actionUpdateAll (req) {
    console.log("Action : Evaluation - UPDATE ALL");

    let res = "";
    req.body.evaluation.forEach(async function(evaluation){
        res  = await process.processUpdate(evaluation._id, evaluation);
        console.log("Action : Evaluation - UPDATE ALL IN");
        if( res == "Erreur"){
            console.log("Action : Evaluation - UPDATE ALL ERR");
            return res;
        }
    });
    console.log("Action : Evaluation - UPDATE ALL DONE");
    return "Done";
};

// -- DELETE
async function actionDelete (req) {
    console.log("Action : Evaluation - DELETE");

    return await process.processDelete(req);
};

// -- READ
async function actionRead (req) {
    console.log("Action : Evaluation - READ");

    return await process.processRead(req);
};

exports.actionFindAll = actionFindAll;
exports.actionCreate = actionCreate;
exports.actionUpdate = actionUpdate;
exports.actionUpdateAll = actionUpdateAll;
exports.actionDelete = actionDelete;
exports.actionRead = actionRead;