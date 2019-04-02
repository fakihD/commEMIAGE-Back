// -- Load model needed for the project
const process = require('./Process_Tuteur');

// -- FIND ALL
async function actionFindAll () {
    console.log("Action : Tuteur - FIND ALL");

    return await process.processFindAll();
};

// -- CREATE
async function actionCreate (req) {
    console.log("Action : Tuteur - CREATE");

    return await process.processCreate(req);
};

// -- UPDATE
async function actionUpdate (req) {
    console.log("Action : Tuteur - UPDATE");

    return await process.processUpdate(req.params.id, req.body);
};

// -- UPDATE ALL
async function actionUpdateAll (req) {
    console.log("Action : Tuteur - UPDATE ALL");

    let res = "";
    req.body.tuteur.forEach(async function(tuteur){
        res  = await process.processUpdate(tuteur._id, tuteur);
        console.log("Action : Tuteur - UPDATE ALL IN");
        if( res == "Erreur"){
            console.log("Action : Tuteur - UPDATE ALL ERR");
            return res;
        }
    });
    console.log("Action : Tuteur - UPDATE ALL DONE");
    return "Done";
};

// -- DELETE
async function actionDelete (req) {
    console.log("Action : Tuteur - DELETE");

    return await process.processDelete(req);
};

// -- READ ID
async function actionRead (req) {
    console.log("Action : Apprenant - READ ID");

    return await process.processRead(req);
};

// -- READ EMAIL
async function actionReadEmail (req) {
    console.log("Action : Apprenant - READ EMAIL");

    return await process.processReadEmail(req);
};

exports.actionFindAll = actionFindAll;
exports.actionCreate = actionCreate;
exports.actionUpdate = actionUpdate;
exports.actionUpdateAll = actionUpdateAll;
exports.actionDelete = actionDelete;
exports.actionRead = actionRead;
exports.actionReadEmail = actionReadEmail;