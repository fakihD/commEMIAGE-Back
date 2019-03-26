const express = require('express');
const bodyParser = require('body-parser');

app = express();

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// -- Load model needed for the project
const action = require('./Action_Apprenant');

const lienError = '/error';
const lienAll = '/';
const lienAdd = '/add';
const lienUpdateAll = '/update';
const lienUpdate = '/update/:id';
const lienDelete = '/delete/:id';
const lienGet = '/get/:id';
const lienGetEmail = '/getEmail/:email';

const pageError ='';

// -- ERROR
app.get(lienError, function(req, res) {
    console.log("Route : Apprenant - ERROR");

    res.render(pageError);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    console.log("Route : Apprenant - FIND ALL");

    action.actionFindAll().then((callback) => {
        res.send(callback);
    });
});

// -- CREATE
app.post(lienAdd, function (req, res) {
    console.log("Route : Apprenant - CREATE");
    console.log("Route : Apprenant - CREATE :" + req.body.nom);

    action.actionCreate(req).then((callback) => {
        res.send(callback);
    });
});

// -- UPDATE
app.put(lienUpdate, function (req, res) {
    console.log("Route : Apprenant - UPDATE");

    action.actionUpdate(req).then((callback) => {
        res.send(callback);
    });
});

// -- UPDATE ALL
app.put(lienUpdateAll, function (req, res) {
    console.log("Route : Apprenant - UPDATE ALL");

    action.actionUpdateAll(req).then((callback) => {
        res.send(callback);
    });
});

// -- DELETE
app.delete(lienDelete, function (req, res) {
    console.log("Route : Apprenant - DELETE");
    console.log("Route : Apprenant - DELETE id : " + req.params.id);

    action.actionDelete(req).then((callback) => {
        res.send(callback);
    });
});

// -- READ ID
app.get(lienGet, function (req, res) {
    console.log("Route : Apprenant - READ ID");
    console.log("Route : Apprenant - READ id : " + new ObjectId(req.params.id));

    action.actionRead(req).then((callback) => {
        res.send(callback);
    });
});

// -- READ EMAIL
app.get(lienGetEmail, function (req, res) {
    console.log("Route : Apprenant - READ EMAIL");
    console.log("Route : Apprenant - READ EMAIL : " + req.params.email);

    action.actionReadEmail(req).then((callback) => {
        res.send(callback);
    });
});

module.exports = app;