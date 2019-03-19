const express = require('express');
const bodyParser = require('body-parser');

app = express();

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// -- Load model needed for the project
const action = require('./Action_Module');

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
    console.log("Route : Module - ERROR");

    res.render(pageError);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    console.log("Route : Module - FIND ALL");

    action.actionFindAll().then((callback) => {
        res.send(callback);
    });
});

// -- CREATE
app.post(lienAdd, function (req, res) {
    console.log("Route : Module - CREATE");
    console.log("Route : Module - CREATE :" + req.body.nom);

    action.actionCreate(req).then((callback) => {
        res.send(callback);
    });
});

// -- UPDATE
app.put(lienUpdate, function (req, res) {
    console.log("Route : Module - UPDATE");

    action.actionUpdate(req).then((callback) => {
        res.send(callback);
    });
});

// -- UPDATE ALL
app.put(lienUpdateAll, function (req, res) {
    console.log("Route : Module - UPDATE ALL");

    action.actionUpdateAll(req).then((callback) => {
        res.send(callback);
    });
});

// -- DELETE
app.delete(lienDelete, function (req, res) {
    console.log("Route : Module - DELETE");
    console.log("Route : Module - DELETE id : " + req.params.id);

    action.actionDelete(req).then((callback) => {
        res.send(callback);
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    console.log("Route : Module - READ");
    console.log("Route : Module - READ id : " + new ObjectId(req.params.id));

    action.actionRead(req).then((callback) => {
        res.send(callback);
    });
});

module.exports = app;