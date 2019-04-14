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
app.get(lienAll, action.actionFindAll);

// -- CREATE
app.post(lienAdd, action.actionCreate);

// -- UPDATE
app.put(lienUpdate, action.actionUpdate);

// -- UPDATE ALL
app.put(lienUpdateAll, action.actionUpdateAll);

// -- DELETE
app.delete(lienDelete, action.actionDelete);

// -- READ
app.get(lienGet, action.actionRead);

module.exports = app;