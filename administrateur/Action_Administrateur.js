// -- Load model needed for the project
const process = require('./Process_Administrateur');

// -- FIND ALL
function actionFindAll (req, res) {
    console.log("Action : Administrateur - FIND ALL");

    try{
        process.processFindAll().then((callback) => {
            console.log("Process : Administrateur - FIND ALL : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Administrateur - FIND ALL : Error - " + err);

        res.send(err);
    }
};

// -- CREATE
function actionCreate (req, res) {
    console.log("Action : Administrateur - CREATE");

    try{
        process.processCreate(req).then((callback) => {
            console.log("Process : Administrateur - CREATE : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Administrateur - CREATE : Error - " + err);

        res.send(err);
    }
};

// -- UPDATE
function actionUpdate (req, res) {
    console.log("Action : Administrateur - UPDATE");

    try{
        process.processUpdate(req.params.id, req.body.administrateur).then((callback) => {
            console.log("Process : Administrateur - UPDATE : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Administrateur - UPDATE : Error - " + err);

        res.send(err);
    }
};

// -- UPDATE ALL
function actionUpdateAll (req, res) {
    console.log("Action : Administrateur - UPDATE ALL");

    try{
        let res = "";
        req.body.administrateur.forEach(function(administrateur){
            process.processUpdate(administrateur._id, administrateur).then((callback) => {
                console.log("Process : Administrateur - UPDATE : " + JSON.stringify(callback));
            });
        }).then(() => {
            console.log("Action : Administrateur - UPDATE ALL DONE");
            res.send("Done");
        });
    } catch(err) {
        console.log("Process : Administrateur - UPDATE ALL : Error - " + err);

        res.send(err);
    }
};

// -- DELETE
function actionDelete (req, res) {
    console.log("Action : Administrateur - DELETE");

    try{
        process.processDelete(req).then((callback) => {
            console.log("Process : Administrateur - DELETE : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Administrateur - DELETE : Error - " + err);

        res.send(err);
    }
};

// -- READ ID
function actionRead (req, res) {
    console.log("Action : Administrateur - READ ID");
    
    try{
        process.processRead(req).then((callback) => {
            console.log("Process : Administrateur - READ ID : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Administrateur - READ ID : Error - " + err);

        res.send(err);
    }
};

// -- READ EMAIL
function actionReadEmail (req, res) {
    console.log("Action : Administrateur - READ EMAIL");

    try{
        process.processReadEmail(req).then((callback) => {
            console.log("Process : Administrateur - READ EMAIL : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Administrateur - READ  EMAIL: Error - " + err);

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