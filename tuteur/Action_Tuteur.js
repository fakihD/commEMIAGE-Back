// -- Load model needed for the project
const process = require('./Process_Tuteur');

// -- FIND ALL
function actionFindAll (req, res) {
    console.log("Action : Tuteur - FIND ALL");

    try{
        process.processFindAll().then((callback) => {
            console.log("Process : Tuteur - FIND ALL : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Tuteur - FIND ALL : Error - " + err);

        res.send(err);
    }
};

// -- CREATE
function actionCreate (req, res) {
    console.log("Action : Tuteur - CREATE");

    try{
        process.processCreate(req).then((callback) => {
            console.log("Process : Tuteur - CREATE : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Tuteur - CREATE : Error - " + err);

        res.send(err);
    }
};

// -- UPDATE
function actionUpdate (req, res) {
    console.log("Action : Tuteur - UPDATE");

    try{
        process.processUpdate(req.params.id, req.body.tuteur).then((callback) => {
            console.log("Process : Tuteur - UPDATE : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Tuteur - UPDATE : Error - " + err);

        res.send(err);
    }
};

// -- UPDATE ALL
function actionUpdateAll (req, res) {
    console.log("Action : Tuteur - UPDATE ALL");

    try{
        req.body.tuteur.forEach(function(tuteur){
            process.processUpdate(tuteur._id, tuteur).then((callback) => {
                console.log("Process : Tuteur - UPDATE : " + callback);
                res.send(callback);
            });
        }).then(() => {
            console.log("Action : Tuteur - UPDATE ALL DONE");
            res.send("Done");
        });
    } catch(err) {
        console.log("Process : Tuteur - UPDATE ALL : Error - " + err);

        res.send(err);
    }
};

// -- DELETE
function actionDelete (req, res) {
    console.log("Action : Tuteur - DELETE");

    try{
        process.processDelete(req).then((callback) => {
            console.log("Process : Tuteur - DELETE : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Tuteur - DELETE : Error - " + err);

        res.send(err);
    }
};

// -- READ ID
function actionRead (req, res) {
    console.log("Action : Tuteur - READ ID");
    
    try{
        process.processRead(req).then((callback) => {
            console.log("Process : Tuteur - READ ID : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Tuteur - READ ID : Error - " + err);

        res.send(err);
    }
};

// -- READ EMAIL
function actionReadEmail (req, res) {
    console.log("Action : Tuteur - READ EMAIL");

    try{
        process.processReadEmail(req).then((callback) => {
            console.log("Process : Tuteur - READ EMAIL : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Tuteur - READ EMAIL : Error - " + err);

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