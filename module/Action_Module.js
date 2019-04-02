// -- Load model needed for the project
const process = require('./Process_Module');

// -- FIND ALL
async function actionFindAll () {
    console.log("Action : Module - FIND ALL");

    return await process.processFindAll();
};

// -- CREATE
async function actionCreate (req) {
    console.log("Action : Module - CREATE");

    return await process.processCreate(req);
};

// -- UPDATE
async function actionUpdate (req) {
    console.log("Action : Module - UPDATE");

    return await process.processUpdate(req.params.id, req.body);
};

// -- UPDATE ALL
async function actionUpdateAll (req) {
    console.log("Action : Module - UPDATE ALL");

    let res = "";
    req.body.module.forEach(async function(module){
        res  = await process.processUpdate(module._id, module);
        console.log("Action : Module - UPDATE ALL IN");
        if( res == "Erreur"){
            console.log("Action : Module - UPDATE ALL ERR");
            return res;
        }
    });
    console.log("Action : Module - UPDATE ALL DONE");
    return "Done";
};

// -- DELETE
async function actionDelete (req) {
    console.log("Action : Module - DELETE");

    return await process.processDelete(req);
};

// -- READ
async function actionRead (req) {
    console.log("Action : Module - READ");

    return await process.processRead(req);
};

exports.actionFindAll = actionFindAll;
exports.actionCreate = actionCreate;
exports.actionUpdate = actionUpdate;
exports.actionUpdateAll = actionUpdateAll;
exports.actionDelete = actionDelete;
exports.actionRead = actionRead;