// -- Load model needed for the project
const process = require('./Process_Administrateur');

// -- FIND ALL
async function actionFindAll () {
    console.log("Action : Administrateur - FIND ALL");

    return await process.processFindAll();
};

// -- CREATE
async function actionCreate (req) {
    console.log("Action : Administrateur - CREATE");

    return await process.processCreate(req);
};

// -- UPDATE
async function actionUpdate (req) {
    console.log("Action : Administrateur - UPDATE");

    return await process.processUpdate(req.params.id, req.body);
};

// -- UPDATE ALL
async function actionUpdateAll (req) {
    console.log("Action : Administrateur - UPDATE ALL");

    let res = "";
    req.body.administrateur.forEach(async function(administrateur){
        res  = await process.processUpdate(administrateur._id, administrateur);
        console.log("Action : Administrateur - UPDATE ALL IN");
        if( res == "Erreur"){
            console.log("Action : Administrateur - UPDATE ALL ERR");
            return res;
        }
    });
    console.log("Action : Administrateur - UPDATE ALL DONE");
    return "Done";
};

// -- DELETE
async function actionDelete (req) {
    console.log("Action : Administrateur - DELETE");

    return await process.processDelete(req);
};

// -- READ ID
async function actionRead (req) {
    console.log("Action : Administrateur - READ ID");

    return await process.processRead(req);
};

// -- READ EMAIL
async function actionReadEmail (req) {
    console.log("Action : Administrateur - READ EMAIL");

    return await process.processReadEmail(req);
};

exports.actionFindAll = actionFindAll;
exports.actionCreate = actionCreate;
exports.actionUpdate = actionUpdate;
exports.actionUpdateAll = actionUpdateAll;
exports.actionDelete = actionDelete;
exports.actionRead = actionRead;
exports.actionReadEmail = actionReadEmail;