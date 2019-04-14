// -- Load model needed for the project
const process = require('./Process_Semestre');

// -- FIND ALL
function actionFindAll (req, res) {
    console.log("Action : Semestre - FIND ALL");

    try{
        process.processFindAll().then((callback) => {
            console.log("Process : Semestre - FIND ALL : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Semestre - FIND ALL : Error - " + err);

        res.send(err);
    }
};

// -- CREATE
function actionCreate (req, res) {
    console.log("Action : Semestre - CREATE");

    try{
        process.processCreate(req).then((callback) => {
            console.log("Process : Semestre - CREATE : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Semestre - CREATE : Error - " + err);

        res.send(err);
    }
};

// -- UPDATE
function actionUpdate (req, res) {
    console.log("Action : Semestre - UPDATE");

    try{
        process.processUpdate(req.params.id, req.body).then((callback) => {
            console.log("Process : Semestre - UPDATE : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Semestre - UPDATE : Error - " + err);

        res.send(err);
    }
};

// -- UPDATE ALL
function actionUpdateAll (req, res) {
    console.log("Action : Semestre - UPDATE ALL");

    try{
        let res = "";
        req.body.semestre.forEach(function(semestre){
            process.processUpdate(semestre._id, semestre).then((callback) => {
                console.log("Process : Semestre - UPDATE : " + callback);
                res.send(callback);
            });
        }).then(() => {
            console.log("Action : Semestre - UPDATE ALL DONE");
            res.send("Done");
        });
    } catch(err) {
        console.log("Process : Semestre - UPDATE ALL : Error - " + err);

        res.send(err);
    }
};

// -- DELETE
function actionDelete (req, res) {
    console.log("Action : Semestre - DELETE");

    try{
        process.processDelete(req).then((callback) => {
            console.log("Process : Semestre - DELETE : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Semestre - DELETE : Error - " + err);

        res.send(err);
    }
};

// -- READ
function actionRead (req, res) {
    console.log("Action : Semestre - READ");

    try{
        process.processRead(req).then((callback) => {
            console.log("Process : Semestre - READ : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Semestre - READ : Error - " + err);

        res.send(err);
    }
};

exports.actionFindAll = actionFindAll;
exports.actionCreate = actionCreate;
exports.actionUpdate = actionUpdate;
exports.actionUpdateAll = actionUpdateAll;
exports.actionDelete = actionDelete;
exports.actionRead = actionRead;