// -- Load model needed for the project
const process = require('./Process_Module');

// -- FIND ALL
function actionFindAll (req, res) {
    console.log("Action : Module - FIND ALL");

    try{
        process.processFindAll().then((callback) => {
            console.log("Process : Module - FIND ALL : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Module - FIND ALL : Error - " + err);

        res.send(err);
    }
};

// -- CREATE
function actionCreate (req, res) {
    console.log("Action : Module - CREATE");

    try{
        process.processCreate(req).then((callback) => {
            console.log("Process : Module - CREATE : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Module - CREATE : Error - " + err);

        res.send(err);
    }
};

// -- UPDATE
function actionUpdate (req, res) {
    console.log("Action : Module - UPDATE");

    try{
        process.processUpdate(req.params.id, req.body.module).then((callback) => {
            console.log("Process : Module - UPDATE : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Module - UPDATE : Error - " + err);

        res.send(err);
    }
};

// -- UPDATE ALL
function actionUpdateAll (req, res) {
    console.log("Action : Module - UPDATE ALL");

    try{
        req.body.module.forEach(function(module){
            process.processUpdate(module._id, module).then((callback) => {
                console.log("Process : Module - UPDATE : " + callback);
                res.send(callback);
            });
        }).then(() => {
            console.log("Action : Module - UPDATE ALL DONE");
            res.send("Done");
        });
    } catch(err) {
        console.log("Process : Module - UPDATE ALL : Error - " + err);

        res.send(err);
    }
};

// -- DELETE
function actionDelete (req, res) {
    console.log("Action : Module - DELETE");

    try{
        process.processDelete(req).then((callback) => {
            console.log("Process : Module - DELETE : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Module - DELETE : Error - " + err);

        res.send(err);
    }
};

// -- READ
function actionRead (req, res) {
    console.log("Action : Module - READ");

    try{
        process.processRead(req).then((callback) => {
            console.log("Process : Module - READ : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Module - READ : Error - " + err);

        res.send(err);
    }
};

exports.actionFindAll = actionFindAll;
exports.actionCreate = actionCreate;
exports.actionUpdate = actionUpdate;
exports.actionUpdateAll = actionUpdateAll;
exports.actionDelete = actionDelete;
exports.actionRead = actionRead;