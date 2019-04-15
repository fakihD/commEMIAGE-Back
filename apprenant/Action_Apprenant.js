// -- Load model needed for the project
const process = require('./Process_Apprenant');

// -- FIND ALL
function actionFindAll (req, res) {
    console.log("Action : Apprenant - FIND ALL");

    try{
        process.processFindAll().then((callback) => {
            console.log("Process : Apprenant - FIND ALL : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Apprenant - FIND ALL : Error - " + err);

        res.send(err);
    }
};

// -- CREATE
function actionCreate (req, res) {
    console.log("Action : Apprenant - CREATE");

    try{
        process.processCreate(req).then((callback) => {
            console.log("Process : Apprenant - CREATE : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Apprenant - CREATE : Error - " + err);

        res.send(err);
    }
};

// -- UPDATE
function actionUpdate (req, res) {
    console.log("Action : Apprenant - UPDATE");

    try{
        process.processUpdate(req.params.id, req.body.apprenant).then((callback) => {
            console.log("Process : Apprenant - UPDATE : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Apprenant - UPDATE : Error - " + err);

        res.send(err);
    }
};

// -- UPDATE ALL
function actionUpdateAll (req, res) {
    console.log("Action : Apprenant - UPDATE ALL");

    try{
        let res = "";
        req.body.apprenant.forEach(function(apprenant){
            process.processUpdate(apprenant._id, apprenant).then((callback) => {
                console.log("Process : Apprenant - UPDATE : " + callback);
                res.send(callback);
            });
        }).then(() => {
            console.log("Action : Apprenant - UPDATE ALL DONE");
            res.send("Done");
        });
    } catch(err) {
        console.log("Process : Apprenant - UPDATE ALL : Error - " + err);

        res.send(err);
    }
};

// -- DELETE
function actionDelete (req, res) {
    console.log("Action : Apprenant - DELETE");

    try{
        process.processDelete(req).then((callback) => {
            console.log("Process : Apprenant - DELETE : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Apprenant - DELETE : Error - " + err);

        res.send(err);
    }
};

// -- READ ID
function actionRead (req, res) {
    console.log("Action : Apprenant - READ ID");
    
    try{
        process.processRead(req).then((callback) => {
            console.log("Process : Apprenant - READ ID : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Apprenant - READ ID : Error - " + err);

        res.send(err);
    }
};

// -- READ EMAIL
function actionReadEmail (req, res) {
    console.log("Action : Apprenant - READ EMAIL");

    try{
        process.processReadEmail(req).then((callback) => {
            console.log("Process : Apprenant - READ EMAIL : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Apprenant - READ EMAIL : Error - " + err);

        res.send(err);
    }
};

exports.actionFindAll = actionFindAll;
exports.actionCreate = actionCreate;
exports.actionUpdate = actionUpdate;
exports.actionUpdateAll = actionUpdateAll;
exports.actionDelete = actionDelete;
exports.actionRead = actionRead;
exports.actionReadEmail = actionReadEmail;