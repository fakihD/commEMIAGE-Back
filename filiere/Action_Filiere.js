// -- Load model needed for the project
const process = require('./Process_Filiere');

// -- FIND ALL
async function actionFindAll () {
    console.log("Action : Filiere - FIND ALL");

    return await process.processFindAll();
};

// -- CREATE
async function actionCreate (req) {
    console.log("Action : Filiere - CREATE");

    return await process.processCreate(req);
};

// -- UPDATE
async function actionUpdate (req) {
    console.log("Action : Filiere - UPDATE");

    return await process.processUpdate(req.params.id, req.body);
};

// -- UPDATE ALL
async function actionUpdateAll (req) {
    console.log("Action : Filiere - UPDATE ALL");

    let res = "";
    req.body.filiere.forEach(async function(filiere){
        res  = await process.processUpdate(filiere._id, filiere);
        console.log("Action : Filiere - UPDATE ALL IN");
        if( res == "Erreur"){
            console.log("Action : Filiere - UPDATE ALL ERR");
            return res;
        }
    });
    console.log("Action : Filiere - UPDATE ALL DONE");
    return "Done";
};

// -- DELETE
async function actionDelete (req) {
    console.log("Action : Filiere - DELETE");

    return await process.processDelete(req);
};

// -- READ
async function actionRead (req) {
    console.log("Action : Filiere - READ");

    return await process.processRead(req);
};

exports.actionFindAll = actionFindAll;
exports.actionCreate = actionCreate;
exports.actionUpdate = actionUpdate;
exports.actionUpdateAll = actionUpdateAll;
exports.actionDelete = actionDelete;
exports.actionRead = actionRead;