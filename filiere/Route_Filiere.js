const express = require('express');
const bodyParser = require('body-parser');

app = express();

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// -- Load model needed for the project
const action = require('./Action_Filiere');

const lienError = '/error';
const lienAll = '/';
const lienAdd = '/add';
const lienUpdateAll = '/update';
const lienUpdate = '/update/:id';
const lienDelete = '/delete/:id';
const lienGet = '/get/:id';

const pageError ='';

// -- ERROR
app.get(lienError, function(req, res) {
    console.log("Route : Filiere - ERROR");

    res.render(pageError);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    console.log("Route : Filiere - FIND ALL");

    action.actionFindAll().then((callback) => {
        res.send(callback);
    });
});

// -- CREATE
app.post(lienAdd, function (req, res) {
    console.log("Route : Filiere - CREATE");
    console.log("Route : Filiere - CREATE :" + req.body.nom);

    action.actionCreate(req).then((callback) => {
        res.send(callback);
    });
});

// -- UPDATE
app.put(lienUpdate, function (req, res) {
    console.log("Route : Filiere - UPDATE");

    action.actionUpdate(req).then((callback) => {
        res.send(callback);
    });
});

// -- UPDATE ALL
app.put(lienUpdateAll, function (req, res) {
    console.log("Route : Filiere - UPDATE ALL");

    action.actionUpdateAll(req).then((callback) => {
        res.send(callback);
    });
});

// -- DELETE
app.delete(lienDelete, function (req, res) {
    console.log("Route : Filiere - DELETE");
    console.log("Route : Filiere - DELETE id : " + req.params.id);

    action.actionDelete(req).then((callback) => {
        res.send(callback);
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    console.log("Route : Filiere - READ");
    console.log("Route : Filiere - READ id : " + new ObjectId(req.params.id));

    action.actionRead(req).then((callback) => {
        res.send(callback);
    });
});

module.exports = app;