// ---- MANAGE DATABASE
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

//ES6 promises
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/COMMEMIAGE");
var db = mongoose.connection;
db.on('Error',console.error.bind(console, 'Error: erreur de connection à mongodb'));
db.once('open', function(){
  console.log("BDD: Connected")
})

//Body Parser
let urlencodedParser = bodyParser.urlencoded({
    extended: true,
});
app.use(urlencodedParser);
app.use(bodyParser.json({type:"*/*"}));

app.listen(3010);

//Définition des CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

/*app.use('/administrateurs',require('./administrateur/AdministrateurRoute'));
app.use('/apprenants',require('./routes/ApprenantRoute'));
app.use('/evaluations',require('./routes/EvaluationRoute'));
app.use('/filieres',require('./routes/FiliereRoute'));
app.use('/modules',require('./routes/ModuleRoute'));
app.use('/semestres',require('./routes/SemestreRoute'));
app.use('/suivis',require('./routes/SuiviRoute'));
app.use('/tuteurs',require('./routes/TuteurRoute'));
app.use('/utilisateurs',require('./routes/UtilisateurRoute'));*/



app.use('/administrateurs',require('./administrateur/Route_Administrateur'));
app.use('/apprenants',require('./apprenant/Route_Apprenant'));
app.use('/evaluations',require('./evaluation/Route_Evaluation'));
app.use('/filieres',require('./filiere/Route_Filiere'));
app.use('/modules',require('./module/Route_Module'));
app.use('/semestres',require('./semestre/Route_Semestre'));
app.use('/suivis',require('./suivi/Route_Suivi'));
app.use('/tuteurs',require('./tuteur/Route_Tuteur'));
app.use('/utilisateurs',require('./utilisateur/Route_Utilisateur'));

require('./semestre/Model_Semestre');

createSemestre = function(nom, debut, fin){
  Semestre = mongoose.model('Semestre');

  newSemestre = new Semestre({nom:nom, dateDebut:debut, dateFin:fin});

  newSemestre.save().then(()=>{
      console.log("Semestre - CREATE : Done");
  },(err)=>{
      console.log("Semestre - CREATE : Error :" + err);
  })
}

/*createSemestre("2019 Semestre 1", new Date('January 01, 2019 00:00:00'), new Date('June 30, 2019 00:00:00'));
createSemestre("2019 Semestre 2", new Date('July 01, 2019 00:00:00'), new Date('December 31, 2019 00:00:00'));
createSemestre("2020 Semestre 1", new Date('January 01, 2019 00:00:00'), new Date('June 30, 2019 00:00:00'));
createSemestre("2020 Semestre 2", new Date('July 01, 2019 00:00:00'), new Date('December 31, 2019 00:00:00'));
createSemestre("2021 Semestre 1", new Date('January 01, 2019 00:00:00'), new Date('June 30, 2019 00:00:00'));
createSemestre("2021 Semestre 2", new Date('July 01, 2019 00:00:00'), new Date('December 31, 2019 00:00:00'));*/