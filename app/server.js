var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var passport = require('passport');
var Chiller = require('./models/chiller_model');
require('./models/user_model');
require('./config/passport');
var config = require('./config/config.json');

// [SH] Traigo el routeo para el back de admin
var routesApi = require('./routes/index');

var app = express();

//Conexión base de datos
mongoose.connect(config.connectionString, { useNewUrlParser: true }, function (err) {
	if (err) throw err;
	console.log('Successfully connected');
});
//Evitar warning createIndex
mongoose.set('useCreateIndex', true);


//Config
//Ubicación archivos estáticos (frontend)
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

const PORT = process.env.PORT || 9229;
app.listen(PORT, function(){
	console.log(`Escuchando en ${PORT}`);
})


//REST
// Uso API routes cuando el path empieza con /admin
app.use('/admin', routesApi);

app.get('/api/chillers', function(req,res){
	Chiller.find(function(err,chillers) {
		if(err){
			console.log(err);
			res.send(err);
		}
		res.json(chillers);
	});
});

app.get('/api/chillers/:chiller', function(req,res){
	Chiller.findById(req.params.chiller,function(err,chiller){
		if(err){
			console.log(err);
		}
		res.json(chiller);
	})
})

//Llamado a angular
app.use(express.static('../public'));