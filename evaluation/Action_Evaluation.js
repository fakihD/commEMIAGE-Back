// -- Load model needed for the project
const process = require('./Process_Evaluation');

// -- FIND ALL
function actionFindAll (req, res) {
    console.log("Action : Evaluation - FIND ALL");

    try{
        process.processFindAll().then((callback) => {
            console.log("Process : Evaluation - FIND ALL : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Evaluation - FIND ALL : Error - " + err);

        res.send(err);
    }
};

// -- CREATE
function actionCreate (req, res) {
    console.log("Action : Evaluation - CREATE");

    try{
        process.processCreate(req).then((callback) => {
            console.log("Process : Evaluation - CREATE : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Evaluation - CREATE : Error - " + err);

        res.send(err);
    }
};

// -- UPDATE
function actionUpdate (req, res) {
    console.log("Action : Evaluation - UPDATE");

    try{
        process.processUpdate(req.params.id, req.body.evaluation).then((callback) => {
            console.log("Process : Evaluation - UPDATE : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Evaluation - UPDATE : Error - " + err);

        res.send(err);
    }
};

// -- UPDATE ALL
function actionUpdateAll (req, res) {
    console.log("Action : Evaluation - UPDATE ALL");

    try{
        req.body.evaluation.forEach(function(evaluation){
            process.processUpdate(evaluation._id, evaluation).then((callback) => {
                console.log("Process : Evaluation - UPDATE : " + JSON.stringify(callback));
            });
        }).then(() => {
            console.log("Action : Evaluation - UPDATE ALL DONE");
            res.send("Done");
        });
    } catch(err) {
        console.log("Process : Evaluation - UPDATE ALL : Error - " + err);

        res.send(err);
    }
};

// -- DELETE
function actionDelete (req, res) {
    console.log("Action : Evaluation - DELETE");

    try{
        process.processDelete(req).then((callback) => {
            console.log("Process : Evaluation - DELETE : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Evaluation - DELETE : Error - " + err);

        res.send(err);
    }
};

// -- READ
function actionRead (req, res) {
    console.log("Action : Evaluation - READ");

    try{
        process.processRead(req).then((callback) => {
            console.log("Process : Evaluation - READ : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Evaluation - READ : Error - " + err);

        res.send(err);
    }
};

exports.actionFindAll = actionFindAll;
exports.actionCreate = actionCreate;
exports.actionUpdate = actionUpdate;
exports.actionUpdateAll = actionUpdateAll;
exports.actionDelete = actionDelete;
exports.actionRead = actionRead;