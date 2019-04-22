// -- Load model needed for the project
const process = require('./Process_Filiere');

// -- FIND ALL
function actionFindAll (req, res) {
    console.log("Action : Filiere - FIND ALL");

    try{
        process.processFindAll().then((callback) => {
            console.log("Process : Filiere - FIND ALL : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Filiere - FIND ALL : Error - " + err);

        res.send(err);
    }
};

// -- CREATE
function actionCreate (req, res) {
    console.log("Action : Filiere - CREATE");

    try{
        process.processCreate(req).then((callback) => {
            console.log("Process : Filiere - CREATE : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Filiere - CREATE : Error - " + err);

        res.send(err);
    }
};

// -- UPDATE
function actionUpdate (req, res) {
    console.log("Action : Filiere - UPDATE");

    try{
        process.processUpdate(req.params.id, req.body.filiere).then((callback) => {
            console.log("Process : Filiere - UPDATE : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Filiere - UPDATE : Error - " + err);

        res.send(err);
    }
};

// -- UPDATE ALL
function actionUpdateAll (req, res) {
    console.log("Action : Filiere - UPDATE ALL");

    try{
        req.body.filiere.forEach(function(filiere){
            process.processUpdate(filiere._id, filiere).then((callback) => {
                console.log("Process : Filiere - UPDATE : " + callback);
                res.send(callback);
            });
        }).then(() => {
            console.log("Action : Filiere - UPDATE ALL DONE");
            res.send("Done");
        });
    } catch(err) {
        console.log("Process : Filiere - UPDATE ALL : Error - " + err);

        res.send(err);
    }
};

// -- DELETE
function actionDelete (req, res) {
    console.log("Action : Filiere - DELETE");

    try{
        process.processDelete(req).then((callback) => {
            console.log("Process : Filiere - DELETE : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Filiere - DELETE : Error - " + err);

        res.send(err);
    }
};

// -- READ
function actionRead (req, res) {
    console.log("Action : Filiere - READ");

    try{
        process.processRead(req).then((callback) => {
            console.log("Process : Filiere - READ : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Filiere - READ : Error - " + err);

        res.send(err);
    }
};

exports.actionFindAll = actionFindAll;
exports.actionCreate = actionCreate;
exports.actionUpdate = actionUpdate;
exports.actionUpdateAll = actionUpdateAll;
exports.actionDelete = actionDelete;
exports.actionRead = actionRead;