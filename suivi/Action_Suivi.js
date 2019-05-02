// -- Load model needed for the project
const process = require('./Process_Suivi');

// -- FIND ALL
function actionFindAll (req, res) {
    console.log("Action : Suivi - FIND ALL");

    try{
        process.processFindAll().then((callback) => {
            console.log("Process : Suivi - FIND ALL : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Suivi - FIND ALL : Error - " + err);

        res.send(err);
    }
};

// -- CREATE
function actionCreate (req, res) {
    console.log("Action : Suivi - CREATE");

    try{
        process.processCreate(req).then((callback) => {
            console.log("Process : Suivi - CREATE : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Suivi - CREATE : Error - " + err);

        res.send(err);
    }
};

// -- UPDATE
function actionUpdate (req, res) {
    console.log("Action : Suivi - UPDATE");

    try{
        process.processUpdate(req.params.id, req.body.suivi).then((callback) => {
            console.log("Process : Suivi - UPDATE : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Suivi - UPDATE : Error - " + err);

        res.send(err);
    }
};

// -- UPDATE ALL
function actionUpdateAll (req, res) {
    console.log("Action : Suivi - UPDATE ALL");

    try{
        req.body.suivi.forEach(function(suivi){
            process.processUpdate(suivi._id, suivi).then((callback) => {
                console.log("Process : Suivi - UPDATE : " + JSON.stringify(callback));
            });
        }).then(() => {
            console.log("Action : Suivi - UPDATE ALL DONE");
            res.send("Done");
        });
    } catch(err) {
        console.log("Process : Suivi - UPDATE ALL : Error - " + err);

        res.send(err);
    }
};

// -- DELETE
function actionDelete (req, res) {
    console.log("Action : Suivi - DELETE");

    try{
        process.processDelete(req).then((callback) => {
            console.log("Process : Suivi - DELETE : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Suivi - DELETE : Error - " + err);

        res.send(err);
    }
};

// -- READ
function actionRead (req, res) {
    console.log("Action : Suivi - READ");

    try{
        process.processRead(req).then((callback) => {
            console.log("Process : Suivi - READ : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Suivi - READ : Error - " + err);

        res.send(err);
    }
};

exports.actionFindAll = actionFindAll;
exports.actionCreate = actionCreate;
exports.actionUpdate = actionUpdate;
exports.actionUpdateAll = actionUpdateAll;
exports.actionDelete = actionDelete;
exports.actionRead = actionRead;